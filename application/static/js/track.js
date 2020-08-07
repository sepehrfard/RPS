
const video = document.getElementById("myvideo");
const canvas = document.getElementById("video-canvas");
var picCanv = document.getElementById("pic-canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
// script.type = 'text/javascript';
// document.getElementsByTagName('head')[0].appendChild(script);

let isVideo = false;
let model = null;

const modelParams = {
  flipHorizontal: true,   // flip e.g for video
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.8,    // confidence threshold for predictions.
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

function clearphoto() {
  var context = canvas.getContext('2d');
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var data = canvas.toDataURL('image/png');
  picCanv.setAttribute('src', data);
}

function takepicture(bbox, video) {
  var context = canvas.getContext('2d');
  dims = img_crop(bbox);
  context.drawImage(video, bbox[0], dims[1], dims[2], dims[3], 0, 0, 128, 128);
  if (bbox) {
    const data = canvas.toDataURL('image/jpeg');
    sendImage(data);
  }
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

function runDetection() {
  model.detect(video).then(predictions => {
    if (predictions[0] && predictions[0].score > .8) {
      // setInterval(takepicture(predictions[0].bbox, video), 10000);
    }
    model.renderPredictions(predictions, canvas, context, video);
    var canv = document.createElement('canvas');
    var context1 = canv.getContext('2d');
    context1.drawImage(video, 0, 0, video.width, video.height);
    var dataURL = canv.toDataURL();
    // console.log(dataURL)
    $.ajax({
      type: "POST",
      url: "/img",
      data: {
        imgBase64: dataURL.split(',')[1]
      }
    }).done(function (o) {
      console.log(o['img']);
    })
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

// async function sendImage(data) {
//   var xhttp = new XMLHttpRequest();
//   var path = "http://127.0.0.1:5000/img";
//   var img = JSON.stringify({"image": data});
//   xhttp.onreadystatechange = function (err) {
//     if (xhttp.readyState == 4 && xhttp.status == 200){
//       console.log(xhttp.responseText);
//     }
//     else {
//       console.log(err);
//     }
//   }
//   xhttp.open("POST", path, true);
//   xhttp.send(img);
// }

// Load the model.
handTrack.load(modelParams).then(lmodel => {
  // detect objects in the image.
  model = lmodel
  updateNote.innerText = "Loaded Model!"
  trackButton.disabled = false
});
