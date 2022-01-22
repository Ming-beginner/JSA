$("document").ready(function () {
  let modeScreen = $(".game-mode");
  let playScreen = $(".game-play");
  let modeSelect = $("#select-mode");
  let modeSubmit = $("#mode-submit");
  let message = $(".message");
  let messageText = $(".message>h1");
  let overlay = $(".overlay");
  let roundNumber = $("#round-number");
  let playerNumber = $("#player-number");
  let computerNumber = $("#computer-number");
  let playerInput = $("#player-input");
  let playSubmitbtn = $(".play-submit-btn");
  let playNextbtn = $("#play-next-btn");
  let resultText = $(".result-text");
  let endBtn = $("#end-btn");
  let score = 0;
  let result;
  let mode;
  let i = 1;

  message.hide();
  overlay.hide();
  modeSubmit.click(function () {
    mode = modeSelect.val();
    modeScreen.removeClass("div-active");
    playScreen.addClass("div-active");
    handleGame();
    playNextbtn.click(function () {
      i = i + 1;
      console.log(i);
      handleGame();
    });
  });

  function handleGame() {
    let randomNumber;
    roundNumber.text(i);
    clearText();
    checkMode(mode);
    gameLogic(mode);
    if (i == 5) {
      playNextbtn.text("Finish");
    }
    if (i > 5) {
      overlay.show();
      message.show();
      messageText.text("Your score: " + score + "/5");
      endBtn.click(function () {
        location.reload();
      });
    }
  }
  function checkMode(mode) {
    if (mode == "easy") {
      randomNumber = Math.ceil(Math.random() * 10);
    } else if (mode == "medium") {
      randomNumber = Math.ceil(Math.random() * 30);
    } else if (mode == "hard") {
      randomNumber = Math.ceil(Math.random() * 50);
    }
  }
  function gameLogic() {
    playSubmitbtn.click(function () {
      let player = Number(playerInput.val());
      playerNumber.text(player);
      computerNumber.text(randomNumber);
      if (player == randomNumber) {
        result = "Great!!!";
        resultText.text(result);
        result.addClass("true-text");
        score++;
      } else {
        result = "Wrong!!!";
        resultText.text(result);
        resultText.addClass("false-text");
      }
    });
  }
  function clearText() {
    playerNumber.text("");
    computerNumber.text("");
    resultText.text("");
    playerInput.val("");
  }
});
