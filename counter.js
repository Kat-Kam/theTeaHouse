const counter = document.getElementById("counter");

document.addEventListener("keydown", countChars);
//document.addEventListener('keyup', countChars);

let num;
let chars;

function countChars(charItem) {
  // Enable writing as long as the amount of characters is between 0 and 800:

  if (charItem.target.value.length >= 0 && charItem.target.value.length < 800) {
    chars = charItem.target.value.length;
    num = charItem.target.value.length + 1;
    let key = event.keyCode || event.charCode;

    //pressing backspace let increase number of characters:
    if (key == 8) {
      if (chars >= 1) {
        num = charItem.target.value.length - 1;
      } else {
        document.getElementById("counter").innerHTML = 0;
      }
    }
  }
  counter.innerHTML = num;
}
