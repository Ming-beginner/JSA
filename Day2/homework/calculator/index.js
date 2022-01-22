$("document").ready(function () {
  const calcInput = $("#calc-input");
  const calcBtn = $("#calc-btn");
  const result = $("#result");

  calcInput.keypress(function (e) {
    if (e.which == 13) {
      calcBtn.click();
    }
  });
  calcInput.focus(function () {
    calcInput.css({
      outline: "2px solid #2193b0",
    });
  });
  calcInput.focusout(function () {
    calcInput.css({ outline: "none" });
  });
  calcBtn.click(function () {
    let inputArray = calcInput.val().split("");
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i] == ":") {
        inputArray[i] = "/";
      }
      if (inputArray[i] == "x") {
        inputArray[i] = "*";
      }
    }
    let output = eval(inputArray.join(""));
    result.text(output);
    calcInput.val("");
  });
});
