const $ = (query) => document.querySelector(query);

let word = [..."cameleon"];
let hidden = [..."_".repeat(word.length)];
let lives = 5;

const replaceChars = (char) => {
  for (let i in word) {
    if (word[i] === char) hidden[i] = char;
  }
  $(".word").innerHTML = "";
  for (let char of hidden) {
    $(".word").innerHTML += `<button class='btn'>${char}</button>`;
  }
};

//  Replace first and last characters in hidden word
replaceChars(word[0]);
$(`#${word[0]}`).disabled = true;
replaceChars(word.at(-1));
$(`#${word.at(-1)}`).disabled = true;

const message = (str, bool = true) => {
  $(".message").textContent = str;
  $(".modal").style.display = "block";
  if (bool) setTimeout(() => ($(".modal").style.display = "none"), 1000);
};

const gameOver = () => {
  if (word.join("") === hidden.join("")) {
    message("You saved the cat!", 0);
    return true;
  } else if (lives === 0) {
    message(`Game over.\nThe word was "${word.join("")}".`, 0);
    return true;
  }
  return false;
};

$(".buttons").addEventListener("click", (e) => {
  let char = e.target.id;
  console.log(char);
  if (char) {
    $(`#${char}`).disabled = true;
    if (word.includes(char)) {
      replaceChars(char);
      if (!gameOver()) message("Good guess!");
    } else {
      lives -= 1;
      $(".container").style.backgroundImage = `url("./cat/${lives}.jpg")`;
      if (!gameOver()) message("Wrong guess.");
    }
  }
});
