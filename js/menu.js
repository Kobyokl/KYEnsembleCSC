//video collage and text change scripts
const videos = ["backgroundVideos/Miroirs_1.mp4", "backgroundVideos/Sospiro.mp4", "backgroundVideos/laValse.mp4", "backgroundVideos/OpenWindows.mp4", "backgroundVideos/Bolero.mp4", "backgroundVideos/ImaginationJazz.mp4"];
var curvideo = document.getElementById("BG_VIDS");

// create backgrond video  and randomize the video 
$(document).ready(function(){

    curvideo.src = videos[Math.floor(Math.random() * videos.length)];

    $(".BG_VIDS").on("click", function(){
        curvideo.muted = false;
        curvideo.volume = 0.5;
    });
});


// start button script
$(".opbutton").mouseover(function() {
    var audio = new Audio('butsoundefcts/first_select.mp3');
    audio.volume = 0.05;
    audio.play();
})

// menu button cs to start the program 

function startApp(){
    console.log("The ensemble has begun");
    window.location.href = 'scene0.html';
}