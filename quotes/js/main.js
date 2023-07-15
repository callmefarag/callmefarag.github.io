// Adding the dark-mode
var cb = document.getElementById("toggle");

function themeChange() {
  if (cb.checked) {
    document.documentElement.style.setProperty("--text-main", "#fefae0ff");
    document.documentElement.style.setProperty("--main-bg", "#283618ff");
    document.documentElement.style.setProperty("--shadow-color", "#606c38ff");
    console.log("Dark Theme");
  } else {
    document.documentElement.style.setProperty("--text-main", "#283618ff");
    document.documentElement.style.setProperty("--main-bg", "#fefae0ff");
    console.log("Light Theme");
  }
}
// Adding quotes to an array, as array of objects, With an author and content to each one of the objects..
var quotes = [
  {
    author: "Oscar Wilde",
    content: "Be yourself; everyone else is already taken.",
  },
  {
    author: "Albert Einstein",
    content:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  },
  {
    author: "Frank Zappa",
    content: "So many books, so little time.",
  },
  {
    author: "Dr. Seuss",
    content:
      "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
  },
  {
    author: "Mae West",
    content: "You only live once, but if you do it right, once is enough.",
  },
  {
    author: "Robert Frost",
    content:
      "In three words I can sum up everything I've learned about life: it goes on.",
  },
  {
    author: "Mark Twain",
    content: "If you tell the truth, you don't have to remember anything.",
  },
  {
    author: "C.S. Lewis",
    content:
      "Friendship ... is born at the moment when one man says to another 'What! You too? I thought that no one but myself . . .'",
  },
  {
    author: "Elbert Hubbard",
    content: "A friend is someone who knows all about you and still loves you.",
  },
  {
    author: "Oscar Wilde",
    content: "Always forgive your enemies; nothing annoys them so much.",
  },
  {
    author: "Andre Gide",
    content:
      "It is better to be hated for what you are than to be loved for what you are not.",
  },
];

var author = quotes.author;
var quoteContent = quotes.content;
var previousRandom = []; // This is an array to save the random numbers

function getRandom() {
  var random = Math.floor(Math.random() * quotes.length); //Get a random number within the array length

  if (random === previousRandom.pop()) {
    getRandom();
    // Here I will restart the function if the current random number equals the last index in the previousRandom array..
  } else {
    // Use random to be an array index
    var showQuote = quotes[random];
    // Insert the code in the div called quote..
    document.getElementById("quote").innerHTML = `
    <p class="quoteText p-5 mx-auto">
    ${showQuote.content}
    <span class="d-block text-end">${showQuote.author}</span>
  </p>
    `;
    previousRandom.push(random); //Adding the current random number in the previousRandom array
  }
}
