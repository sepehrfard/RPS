const video = document.getElementById("myvideo");
const canvas = document.getElementById("video-canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");
document.addEventListener('keypress', restartTimer)
handChoices = ["rock", "paper", "scissor"]

// figure out how to do timer correctly 
var timeLen = 3;
var timeLeft = timeLen;
var timeClear = 1000;
var countElem = document.getElementById('countdown');
var topChoices = null;
var prevChoice = null;
var live = true;
var timerId = -1;


class HandPicks {
  constructor() {
    this.map = { 'rock': 0, 'paper': 0, 'scissor': 0 }
    this.choices = ['rock', 'paper', 'scissor']
  }

  add(value) {
    var count = this.map[value]
    this.map[value]++;
  }

  topChoice() {
    var picks = [this.map[this.choices[0]], this.map[this.choices[1]], this.map[this.choices[2]]];
    var max = Math.max.apply(Math, picks.map((i) => i));
    var pick = this.choices[picks.indexOf(max)];
    return pick;
  }

  getAll() {
    return this.map
  }
}

function countdown() {
  if (timeLeft == 0) {
    for (i = timerId; i < timeClear; i++) {
      clearInterval(i);
    }
    checkPred()
    countElem.innerText = "To play again press any key"
  } else {
    console.log("Interval id before: " + timerId);
    countElem.innerHTML = timeLeft;
    for (i = timerId; i < timeClear; i++) {
      clearInterval(i);
    }
    timerId = setInterval(countdown, 1000);
    // console.log("Interval id after: " + timerId);
    timeLeft--;
  }
}

let isVideo = false;
let model = null;
var pred = null;
var timeLim = 0;
var minDur = 200;
var maxDur = 700;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.7,      // ioU threshold for non-max suppression
  scoreThreshold: 0.9,    // confidence threshold for predictions.
}

function toggleVideo() {
  if (!isVideo) {
    updateNote.innerText = "Starting video"
    startVideo()
  } else {
    updateNote.innerText = "Stopping video"
    handTrack.stopVideo(video)
    isVideo = false;
    updateNote.innerText = "Video stopped"
  }
}

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    video.hidden = true;
    if (status) {
      updateNote.innerText = "Video started. Now tracking"
      isVideo = true
      countdown()
      topChoices = new HandPicks();
      runDetection()
    } else {
      updateNote.innerText = "Please enable video"
    }
  });
}

async function runDetection() {
  model.detect(video).then(predictions => {
    model.renderPredictions(predictions, canvas, context, video);
    if (predictions[0] && timeLeft < 2) {
      takeFrame(predictions)
    }

  })
  if (isVideo) {
    requestAnimationFrame(runDetection);
  }
}

function runRound(userChoice) {
  var choices = { "rock": "r", "paper": "p", "scissor": "s" }
  game(choices[userChoice]);
  changeChoice(userChoice)
}

function restartTimer() {
  timeLeft = timeLen;
  countdown()
  live = true;
  topChoices = new HandPicks();
}

function checkPred() {
  if (timeLeft == 0 && live) {
    console.log(topChoices.getAll())
    runRound(topChoices.topChoice())
    live = false;
  }
}

function takeFrame(predictions) {
  var canv = document.createElement('canvas');
  canv.width = predictions[0].bbox[2]
  canv.height = predictions[0].bbox[3]
  var context1 = canv.getContext('2d');
  context1.drawImage(canvas, predictions[0].bbox[0], predictions[0].bbox[1],
    predictions[0].bbox[2], predictions[0].bbox[3], 0, 0, predictions[0].bbox[2], predictions[0].bbox[3]);
  var img = canv.toDataURL('image/png').split(',')[1];

  fetch(`${window.origin}/img`, {
    method: "POST",
    body: JSON.stringify({ 'img': img }),
    headers: new Headers({
      "content-type": "application/json"
    })
  }).then(function (res) {
    if (res.status !== 200) {
      console.log("ERROR NOT SENDING CORRECTLY")
      return;
    }
    res.json().then(function (data) {
      topChoices.add(String(data['pred']))
    })
  }).catch(function (err) {
    console.log("FETCH ERROR" + err);
  })
}

function changeChoice(userChoice) {
  for (hand in handChoices) {
    if (userChoice != handChoices[hand]) {
      document.getElementById(handChoices[hand]).style.background = "transparent";
    }
    else {
      document.getElementById(userChoice).style.background = "white";
    }
  }
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  model = lmodel
  updateNote.innerText = "Loaded Model!"
  trackButton.disabled = false
});
