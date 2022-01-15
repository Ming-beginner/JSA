$("document").ready(function () {
  let textBlock = $(".text-block");
  textBlock.slideUp();
  for (let i = 1; i <= textBlock.length; i++) {
    $(".title-" + i).click(function () {
      console.log("hello");
      $(".text-block-" + i).slideToggle();
      $(".title-" + i).toggleClass("title-active");
    });
  }
});
