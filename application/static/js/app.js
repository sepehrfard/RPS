
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");

function randInt() {
  return Math.floor(Math.random() * 3)
}

function getComputerChoice() {
  const choices = ['r', 'p', 's'];
  const randChoice = choices[randInt()];
  return randChoice;
}

function getEmoji(choice) {
  const choices = { "r": "✊", "p": "✋", "s": "✌️" };
  return choices[choice]
}

function win(userChoice, compChoice) {
  userScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `Your ${getEmoji(userChoice)} beats Computer ${getEmoji(compChoice)}. You Win!`;
}

function lose(userChoice, compChoice) {
  computerScore++;
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `Your ${getEmoji(userChoice)} loses to ${getEmoji(compChoice)}. You Lost!`;
}

function draw(userChoice, compChoice) {
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
  result_p.innerHTML = `Your ${getEmoji(userChoice)} equals Computer ${getEmoji(compChoice)}. Its a draw!`;
}

function game(userChoice) {
  const compChoice = getComputerChoice();
  switch (userChoice + compChoice) {
    case "sp":
    case "pr":
    case "rs":
      win(userChoice, compChoice);
      break;
    case "ps":
    case "rp":
    case "sr":
      console.log("user lost");
      lose(userChoice, compChoice);
      break;
    case "rr":
    case "pp":
    case "ss":
      console.log("draw");
      draw(userChoice, compChoice);
      break;
  }
}

function main() {
  rock_div.addEventListener('click', function () {
    game('r');
  })

  paper_div.addEventListener('click', function () {
    game('p')
  })

  scissor_div.addEventListener('click', function () {
    game('s')
  })
}

main();
