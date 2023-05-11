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

let nameValue = document.getElementById('Name');
let IpValue = document.getElementById('IP');

function createTagOnlyId(tag,ids){
  let createBorderline = document.createElement(tag);
  createBorderline.setAttribute('id',ids);
  parentDiv.appendChild(createBorderline);
}
const parentLine = document.getElementsByClassName('wrapper')[0];
function createRobotLine(){
  let createLine = document.createElement('div');
  createLine.setAttribute('id','line1');
  createLine.setAttribute('class','line2');
  parentLine.appendChild(createLine);

  const parentDiv = document.getElementsByClassName('line2')[0];

  let createNameP = document.createElement('p');
  createNameP.innerHTML = nameValue.value;
  createNameP.setAttribute('id','name');
  parentDiv.appendChild(createNameP);

  let createNameDiv = document.createElement('div');
  createNameDiv.setAttribute('id','nameline');
  parentDiv.appendChild(createNameDiv);

  let createIpP = document.createElement('p');
  createIpP.innerHTML = IpValue.value;
  createIpP.setAttribute('id','ip');
  parentDiv.appendChild(createIpP);

  let createIpDiv = document.createElement('div');
  createIpDiv.setAttribute('id','ipline');
  parentDiv.appendChild(createIpDiv);

  let createStateP = document.createElement('p');
  createStateP.setAttribute('id','state');
  parentDiv.appendChild(createStateP);

  let createStateDiv = document.createElement('div');
  createStateDiv.setAttribute('id','stateline');
  parentDiv.appendChild(createStateDiv);

  let createBatteryP = document.createElement('p');
  createBatteryP.setAttribute('id','battery');
  parentDiv.appendChild(createBatteryP);

  let createBatteryDiv = document.createElement('div');
  createBatteryDiv.setAttribute('id','batteryline');
  parentDiv.appendChild(createBatteryDiv);

  let createKindP = document.createElement('p');
  createKindP.setAttribute('id','kind');
  parentDiv.appendChild(createKindP);

  let createKindDiv = document.createElement('div');
  createKindDiv.setAttribute('id','kindline');
  parentDiv.appendChild(createKindDiv);
}

const ros = new ROSLIB.Ros({
  url: 'ws://172.20.10.4:9090'
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

const modal = document.getElementById("modal");
function modalOn() {
    modal.style.display = "flex";
}
function isModalOn() {
    return modal.style.display === "flex";
}
function modalOff() {
    modal.style.display = "none";
}
const btnModal = document.getElementsByClassName("robotbutton")[0];
btnModal.addEventListener("click", e => {
    modalOn();
})
const closeBtn = modal.querySelector(".close-area");
closeBtn.addEventListener("click", e => {
    modalOff();
})
modal.addEventListener("click", e => {
    const evTarget = e.target;
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff();
    }
})
window.addEventListener("keyup", e => {
    if(isModalOn() && e.key === 'Escape') {
        modalOff();
    }
})

const robotCreateButton = document.getElementById('robotcreate');

function plus(){
  if (nameValue.value =="")
    {
      alert("로봇 이름을 입력해주세요.");
      return false;
    }
  if(IpValue.value == ""){
    alert('로봇의 아이피 주소를 입력해주세요.');
    return false;
  }
  if(nameValue.value != "" && IpValue.value != ""){
    modalOff();
    createRobotLine();
  }
}
