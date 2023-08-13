const $ = (query) => document.querySelector(query);

const words = [
  "cameleon",
  "bumblebee",
  "baboon",
  "butterfly",
  "dolphin",
  "elephant",
  "penguin",
  "squirrel",
  "hippopotamus",
  "kangaroo",
];
const word = [...words[Math.floor(Math.random() * words.length)]];
const hidden = [..."_".repeat(word.length)];
let lives = 6;
const meow = new Audio("./media/meow.mp3");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
  </svg>`;
$(".hearts").innerHTML = svg.repeat(6);

const replaceChars = (char) => {
  for (let i in word) {
    if (word[i] === char) hidden[i] = char;
  }
  $(".word").innerHTML = "";
  for (let item of hidden) {
    $(".word").innerHTML += `<button class='btn'>${item}</button>`;
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
    $(".cat").style.display = "none";
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
      meow.play();
      $(".hearts").lastElementChild.remove();
      $(".rope").style.backgroundImage = `url("./media/${lives}.png")`;
      if (!gameOver()) message("Wrong guess.");
    }
  }
});
