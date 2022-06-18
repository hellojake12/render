song1="";
song2="";

song1status="";

song2status="";
leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

leftWristScore=0;
rightWristScore=0;
function preload(){
	song1=loadSound("music.mp3");
	song2=loadSound("music2.mp3");
}

function setup(){
	canvas=createCanvas(600,500);
	canvas.center();
	video=createCapture(VIDEO);
	video.hide();
	poseNet=ml5.poseNet(video,modelLoaded);
	poseNet.on('pose',gotPoses);
}
function modelLoaded(){
	console.log('poseNet is Initialized');
}

function draw(){
	image(video,0,0,600,500);
	song1status=song1.isPlaying()
	sonng2status=song2.isPlaying()

	fill('#4061db');
	stroke('#4061db');
	if(rightWristScore>0.01 ){
		circle(rightWristX,rightWristY,20);
		song2.stop();
		if(song1status == false){
			song1.play()
			document.getElementById("song").innerHTML = "playSong1"
		}
	}
	if(leftWristScore>0.01 ){
		circle(leftWristX,leftWristY,20);
		song1.stop();
		if(song2status == false){
			song2.play()
			document.getElementById("song").innerHTML = "playSong2"
		}
	}
	
}

function play(){
	song.play();
}

function gotPoses(results){
	if(results.length>0){
		console.log(results);
		leftWristScore=results[0].pose.keypoints[9].leftWristScore;
		console.log("leftWristScore"+leftWristScore);
		leftWristX=results[0].pose.leftWristX.x;
		leftWristY=results[0].pose.leftWristY.y;
		console.log("leftWristX ="+leftWristX+"leftWristY ="+leftWristY);

		rightWristScore=results[0].pose.keypoints[10].rightWristScore;
		console.log("rightWristScore"+rightWristScore)
		rightWristX=results[0].pose.rightWristX.x;
		rightWristY=results[0].pose.rightWristY.y;
		console.log(" RightWristX = "+rightWristX+"rightWristY ="+rightWristY);
	}
}