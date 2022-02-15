const errorStyle = {
  border: '2px solid red',
  background: 'rgba(255, 153, 153, 0.849)',
};
const successStyle = {
  border: '2px solid green',
  background: '#fff',
};
export default function validate(config) {
  function validateEmail() {
    let isEmail = String(config.node.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    handleValidate(isEmail, 'Invalid email', 'Valid email');
    return isEmail;
  }
  function validatePassword() {
    let isCorrectPassword = config.node.value.length >= config.min;
    handleValidate(
      isCorrectPassword,
      `Password must have at least ${config.min} characters`,
      'Valid password'
    );
    return isCorrectPassword;
  }
  function handleValidate(boolValue, errorText, successText) {
    if (!boolValue) {
      Object.assign(config.node.style, errorStyle);
      config.textNode.innerText = errorText;
      config.textNode.style.color = 'red';
    } else {
      Object.assign(config.node.style, successStyle);
      config.textNode.innerText = successText;
      config.textNode.style.color = 'green';
    }
  }
  switch (config.type) {
    case 'password':
      validatePassword();
      return validatePassword();
    case 'email':
      validateEmail();
      return validateEmail();
    case 'postData':
      let userData = config.userData;
      let userList = JSON.parse(localStorage.getItem('users')) || [];
      userList.push(userData);
      localStorage.setItem('users', JSON.stringify(userList));
      localStorage.setItem('isLogin', true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      break;
    case 'getData':
      let userInfo = config.userData;
      let userList2 = JSON.parse(localStorage.getItem('users')) || [];
      let check = false;
      for (let i of userList2) {
        let checkObject = { ...i };
        delete checkObject['userName'];
        if (JSON.stringify(userInfo) == JSON.stringify(checkObject)) {
          localStorage.setItem('isLogin', true);
          localStorage.setItem('currentUser', JSON.stringify(i));
          console.log('Log in successfully');
          check = true;
          break;
        }
      }
      if (!check) alert('Wrong email/password');
      break;
  }
}
