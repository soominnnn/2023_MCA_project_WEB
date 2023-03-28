

const now = new Date();
console.log(now);
const year = now.getFullYear();
console.log(year);
const month = now.getMonth();
const date = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const clock = document.getElementById("clock");
function getClock(){
    const now = new Date();	// 현재 날짜 및 시간
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    clock.innerText = `${hour}:${minutes}:${seconds}`;
  }
setInterval(getClock, 1000);

function createRobot(){
  let createBorderline = document.createElement('div');
  createBorderline.setAttribute('class',line);
}

const ros = new ROSLIB.Ros({
  url: 'ws://localhost:9090'
});

ros.on("connection", function() {
  console.log("Connected to ROS Bridge");
});

ros.on("error", function(error) {
  console.log("Error connecting to ROS Bridge: ", error);
});

ros.on("close", function() {
  console.log("Disconnected from ROS Bridge");
});
