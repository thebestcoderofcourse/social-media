var scetch = document.getElementById("scetch"),
    video = document.getElementById("video"),
    scetchContext = scetch.getContext("2d");
var recording = false;

window.AudioContext =
    window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
console.log(audioContext);
navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia ||
    false
);

var virec = new VIRecorder.initVIRecorder({
        recorvideodsize: 0.4, // recorded video dimentions are 0.4 times smaller than the original
        webpquality: 0.7, // chrome and opera support webp imags, this is about the aulity of a frame
        framerate: 15, // recording frame rate 
        videotagid: "video",
        videoWidth: "640",
        videoHeight: "480",

    },
    function() {
        //success callback. this will fire if browsers supports 
    },
    function(err) {
        //onerror callback, this will fire if browser does not support
        console.log(err.code + " , " + err.name);
    }
);
var errBack = function(error) {
    console.log("Video capture error: ", error.code);
};



if (navigator.getUserMedia) {
    console.log('normal')
    navigator.getUserMedia({ video: true }, function(stream) {
        console.log("stream");

        video.src = window.URL.createObjectURL(stream);
    }, errBack);

} else if (navigator.webkitGetUserMedia) {
    console.log('webKit')
    navigator.webkitGetUserMedia({ video: true }, function(stream) {
        console.log("webkitstream");
        video.src = window.webkitURL.createObjectURL(stream);
        audio: true
        video: true
    }, errBack);

} else if (navigator.mozGetUserMedia) {
    console.log('moz')
    navigator.mozGetUserMedia({ video: true }, function(stream) {
        video.src = window.URL.createObjectURL(stream);

    }, errBack);
}

function drawCap() {
    var image = scetch.toDataURL("image/png");
    var imgdata = image.replace(/^data:image\/(png|jpeg);base64,/, "");
    // document.write(image.replace("data:image/png;base64,",""));

    var boxThatDoesNotHaveText = new Image();
    boxThatDoesNotHaveText.src = 'data:image/png;base64,' + imgdata;
    $('#scetch').after(boxThatDoesNotHaveText);

}
document.getElementById("snapPhoto").addEventListener("click", function() {
    var tweettext = document.getElementById("tweettext").value;

    console.log(tweettext);
    //tweet(tweettext);

    $('body').attr('data-active-scene', 'playback');
     //drawCap();
//     "snapPhoto" = Math.random();
});

document.getElementById("snapVideo").addEventListener("click", function() {

    if (recording) {
        recording = false;
        virec.stopCapture(oncaptureFinish);
    } else {
        virec.startCapture();
        recording = true;
    }
});
/*
download.addEventListener("click", function() {
  // only jpeg is supported by jsPDF
  var imgData = canvas.toDataURL("image/jpeg", 1.0);
  var pdf = new jsPDF();

  pdf.addImage(imgData, 'JPEG', 0, 0);
  var download = document.getElementById('download');

  pdf.save("download.pdf");
}, false);
*/

function oncaptureFinish(audioblob, videoblob) {

    var audiobase64 = window.URL.createObjectURL(audioblob);
    var videobase64 = window.URL.createObjectURL(videoblob);
    document.getElementById('audiored').src = audiobase64;
    document.getElementById('recordedvideo').src = videobase64;
    document.getElementById('downloadurl').style.display = '';
    document.getElementById('downloadurl').href = videobase64;
}



$("#colorpicker").bind("click", function(e){
    console.log("YOU GET VERIATY NOWW");
    if ($("#picker").css('opacity') == 0 ){
        $("#picker").css('opacity', 1);
    }else{
        $("#picker").css('opacity', 0);
    }
})


$("#video")[0].onplay = function() {

        draw(this, scetchContext, scetch.width, scetch.height);
}

$(document).ready(function() {
    scetchContext.canvas.width = window.innerWidth;
    scetchContext.canvas.height = window.innerHeight;
});

connect();