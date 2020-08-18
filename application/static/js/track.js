
const video = document.getElementById("myvideo");
const canvas = document.getElementById("video-canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;

var pred = null;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    video.hidden = true;
    if (status) {
      updateNote.innerText = "Video started. Now tracking"
      isVideo = true
      runDetection()
      // video.hide()
    } else {
      updateNote.innerText = "Please enable video"
    }
  });
}

function img_crop(bbox) {
  const width = bbox[2] - bbox[0];
  const height = bbox[1] - bbox[3];
  let dims = [bbox[0] - 10, bbox[1] - 10, width, height];

  return dims
}

function toggleVideo() {
  if (!isVideo) {
    updateNote.innerText = "Starting video"
    startVideo();
  } else {
    updateNote.innerText = "Stopping video"
    handTrack.stopVideo(video)
    isVideo = false;
    updateNote.innerText = "Video stopped"
  }
}

async function runDetection() {
  model.detect(video).then(predictions => {
    // if (predictions[0] && predictions[0].score > .8) {
    //   setInterval(takeFrame(predictions), 1000)
    // }
    model.renderPredictions(predictions, canvas, context, video);
    if (predictions[0] && predictions[0].score > .8) {
      setInterval(takeFrame(predictions), 2500)
    }
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
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
      var choice = document.getElementById(data['pred']);
      // console.log(choice)
      changeChoice(pred, choice)
      choice.style.background = "white"
      console.log(data['pred'])
      pred = data['pred']

    })
  }).catch(function (err) {
    console.log("FETCH ERROR" + err);
  })
}

function changeChoice(pred, choice) {
  console.log("-----")
  console.log("pred " + pred)
  console.log("choice " + choice.id)
  console.log(typeof pred)
  console.log(typeof choice.id)
  console.log("-----")
  if (pred && pred !== choice.id) {
    document.getElementById(pred).style.background = "transparent"
    console.log("change of pred " + pred)
  }
}


// async function sendImage(img) {
//   data = JSON.stringify({ 'image': img })
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function (err) {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       console.log(xhr.responseText)
//     } else {
//       console.log(err);
//     }
//   }
//   xhr.open("POST", "/img");
//   xhr.setRequestHeader('Content-type', 'application/json');
//   xhr.send(data)
// }
// Load the model.
handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  model = lmodel
  updateNote.innerText = "Loaded Model!"
  trackButton.disabled = false
});
