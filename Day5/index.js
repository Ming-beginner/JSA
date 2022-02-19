const API_URL = 'https://62109d014cd3049e17807bcf.mockapi.io/api/v1/Students';
const dataTable = document.getElementById('data-table');
const createBtn = document.getElementById('create-btn');
const overlay = document.getElementById('overlay');
const overlay2 = document.getElementById('overlay2');
const form = document.querySelector('form');

const showLoading = () => {
  overlay.classList.remove('d-none');
  overlay.classList.add('d-flex');
};
const hideLoading = () => {
  overlay.classList.remove('d-flex');
  overlay.classList.add('d-none');
};
const showForm = () => {
  overlay2.classList.remove('d-none');
  overlay2.classList.add('d-flex');
  form.classList.add('form-active');
};
const hideForm = () => {
  overlay2.classList.remove('d-flex');
  overlay2.classList.add('d-none');
  form.classList.remove('form-active');
};
const createNewRow = (student) => {
  let averageScore = (
    Math.round(student.math + student.literature + student.english) / 3
  ).toFixed(1);
  let oldStudent = JSON.stringify(student);
  let htmls = `
      <tr>
          <th scope="row">${student.id}</th>
          <td>${student.name}</td>
          <td>${student.class}</td>
          <td>${student.age}</td>
          <td>${student.gender}</td>
          <td>${student.math}</td>
          <td>${student.literature}</td>
          <td>${student.english}</td>
          <td>${averageScore}</td>
          <td>
            <button type="button" class="btn btn-primary" onclick='updateStudent(${oldStudent})'>Update</button>
            <button type="button" class="btn btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
          </td>
        </tr>
    `;
  return htmls;
};

const getStudent = (students) => {
  let htmls = '';
  for (let student of students) {
    htmls += createNewRow(student);
  }
  dataTable.innerHTML = htmls;
};

const createStudent = () => {
  let student = {};

  document.getElementById('header').textContent = 'New Student';

  document.getElementById('name-input').value = '';
  document.getElementById('class-input').value = '';
  document.getElementById('age-input').value = '';
  document.getElementById('math-input').value = '';
  document.getElementById('literature-input').value = '';
  document.getElementById('english-input').value = '';

  showForm();

  document.getElementById('close-form').onclick = hideForm;

  document.getElementById('submit-form').onclick = () => {
    student.name = document.getElementById('name-input').value;
    student.age = document.getElementById('age-input').value;
    student.class = document.getElementById('class-input').value;
    student.gender = document.querySelector(
      'input[name="flexRadioDefault"]:checked'
    ).value;
    student.math = Number(document.getElementById('math-input').value);
    student.literature = Number(
      document.getElementById('literature-input').value
    );
    student.english = Number(document.getElementById('english-input').value);

    hideForm();

    showLoading();

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => render());
  };
};

const deleteStudent = (id) => {
  showLoading();
  fetch(API_URL + '/' + id, {
    method: 'DELETE',
  }).then(() => render());
};
const updateStudent = (oldStudent) => {
  let newStudent = {};

  document.getElementById('header').textContent = 'Update Student';

  document.getElementById('name-input').value = oldStudent.name;
  document.getElementById('class-input').value = oldStudent.class;
  document.getElementById('age-input').value = oldStudent.age;
  document.getElementById('math-input').value = oldStudent.math;
  document.getElementById('literature-input').value = oldStudent.literature;
  document.getElementById('english-input').value = oldStudent.english;

  showForm();

  document.getElementById('close-form').onclick = hideForm;

  document.getElementById('submit-form').onclick = () => {
    newStudent.name = document.getElementById('name-input').value;
    newStudent.age = document.getElementById('age-input').value;
    newStudent.class = document.getElementById('class-input').value;
    newStudent.gender = document.querySelector(
      'input[name="flexRadioDefault"]:checked'
    ).value;
    newStudent.math = Number(document.getElementById('math-input').value);
    newStudent.literature = Number(
      document.getElementById('literature-input').value
    );
    newStudent.english = Number(document.getElementById('english-input').value);

    hideForm();

    showLoading();

    fetch(API_URL + '/' + oldStudent.id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(newStudent),
    }).then(() => render());
  };
};
const render = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      getStudent(data);
      hideLoading();
    });
};

render();
createBtn.onclick = createStudent;
