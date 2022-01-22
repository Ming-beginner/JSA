let userData = JSON.parse(localStorage.getItem("userData"));

const commentsBlock = document.getElementById("comments");

commentsBlock.innerHTML = [...userData].join(", ");
