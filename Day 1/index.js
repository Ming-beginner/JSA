function checkSoNguyenTo(number) {
  let count = 0;
  if (number < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i == 0) {
      count++;
    }
  }
  if (count > 0) {
    console.log(String(number), "khong la mot so nguyen to");
  } else {
    console.log(String(number), "la mot so nguyen to");
  }
}

let number = 2;
checkSoNguyenTo(number);
