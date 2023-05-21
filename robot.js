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
const rosLoading = () => {
  // pathShape
var listenerforPath = new ROSLIB.Topic ({
  ros : ros,
  name : '/move_base/NavfnROS/plan',
  messageType : 'nav_msgs/Path'
  });
  
  // TraceShape
  var moveBaseFB = new ROSLIB.Topic ({
  ros : ros,
  name : '/move_base/feedback',
  messageType : 'move_base_msgs/MoveBaseActionFeedback'
  });
  
  
  
  function mapLoad() {
  // conf
  let OperRatingMode="nav"
  
  const CreatePoseTopic=(OperRatingMode)=>{
  
    console.log(`Create posetopic , mode :${OperRatingMode}`)
  
    if(OperRatingMode == "slam"){
      console.log("poseTopic slam")
        // Make robot pose subscriber
    const SlamPoseTopic = new ROSLIB.Topic({
      ros : ros,
      name : '/tf',
      messageType:'tf2_msgs/TFMessage'
      // messageType : 'turtlesim/Pose'
      // messageType : 'geometry_msgs/Pose'
    })
    return SlamPoseTopic
  
    }else if(OperRatingMode=="nav"){
      console.log("poseTopic nav")
      const NavPoseTopic = new ROSLIB.Topic({
        ros: ros,
        name: '/amcl_pose',
        messageType: 'geometry_msgs/PoseWithCovarianceStamped'
      });
      return NavPoseTopic
    }
  
  }
  
  // poseTopic Publisher
  let PoseTopic=CreatePoseTopic(OperRatingMode)
  
  // Connect to ROS.
  // Create the main viewer.
  var viewer = new ROS2D.Viewer({
    divID : 'map',
    width : 700,
    height : 700,
  });
  
  // Setup the map client.
  var gridClient = new ROS2D.OccupancyGridClient({
    ros : ros,
    rootObject : viewer.scene,
    image: 'turtlebot.png',
    continuous: true
  });
  
  // robot odometry
  var robotMarker = new ROS2D.ArrowShape({
  size : 0.7,
  strokeSize : 0.01,
  pulse: true,
  fillColor: createjs.Graphics.getRGB(255,0,0, 0.9),
  });
  
  
  // pathShape 
  var pathShape = new ROS2D.PathShape({
  strokeSize : 0.03,
  strokeColor : createjs.Graphics.getRGB(0, 255, 0,1),
  });
  
  gridClient.rootObject.addChild(pathShape);
  
  listenerforPath.subscribe((message)=> {
    if(message){
      pathShape.setPath(message);
    }
    // listenerforPath.unsubscribe();
  });
  
  // create initial Pose Topic and msg
  const creatInitialPose=(pose_x,pose_y,orientation)=>{
  const initialPose = new ROSLIB.Topic({
    ros: ros,
    name: '/initialpose',
    messageType: 'geometry_msgs/PoseWithCovarianceStamped'
  });
  
  var posestamped_msg = new ROSLIB.Message({
    header: {
      stamp: {
        secs : 0, 
        nsecs : 100
      },
      frame_id : "map"              
    },
    pose: {
     pose:{
      position: {
        x : pose_x,
        y : pose_y,
        z : 0.0
      },
      orientation: orientation
     }
      ,
      covariance: [0.25, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.25, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.06853892326654787]
    },
  });
   initialPose.publish(posestamped_msg)
    console.log("initialPose publish")
  }
  // create Goal Pose Topic and msg
  const creatGoalPose=(pose_x,pose_y,orientation)=>{
  const goalPose = new ROSLIB.Topic({
    ros: ros,
    name: '/move_base_simple/goal',
    messageType: 'geometry_msgs/PoseStamped'
  });
  
  var posestamped_msg = new ROSLIB.Message({
    header: {
      stamp: {
        secs : 0, 
        nsecs : 100
      },
      frame_id : "map"              
    },
    pose: {
      position: {
        x : pose_x,
        y : pose_y,
        z : 0.0
      },
      orientation: orientation
     }
  });
    goalPose.publish(posestamped_msg)
    console.log("goalPose publish")
  }
  
  
  const createFunc = function (handlerToCall, discriminator, robotMarker,OperRatingMode) {
  
  
  return discriminator.subscribe(function(pose){
  
      if (OperRatingMode=="slam"){
      // slam
      // CrtoGrapher slam case(tf2_msgs/TFMessage)
      console.log("slam work")
      let odomPose = pose.transforms[0].transform.translation
      let baseLinkPose=pose.transforms[1].transform.translation
  
      //  When using Nav,  gemometry_msgs/Pose .orientation. {x,y,z,w} (Quarternion)  
      //  When using SLAM  tf2_msgs/TFMessage .transform . rotation  {x,y,z,w} (quarternion)
      let quaZ=pose.transforms[1].transform.rotation.z
  
      // pose using odom
      robotMarker.x = baseLinkPose.x;
      robotMarker.y = -baseLinkPose.y;
  
      let degreeZ = 0;
      if( quaZ >= 0 ) {
          degreeZ = quaZ / 1 * 180
      } else {
          degreeZ = (-quaZ) / 1 * 180 + 180
      };
      // degree
      robotMarker.rotation = degreeZ;
  
      }else if(OperRatingMode=="nav"){
      // navigation
      console.log("nav work")
      robotMarker.x = pose.pose.pose.position.x;
      robotMarker.y = -pose.pose.pose.position.y;
  
      let orientationQuerter=pose.pose.pose.orientation
      var q0 = orientationQuerter.w;
      var q1 = orientationQuerter.x;
      var q2 = orientationQuerter.y;
      var q3 = orientationQuerter.z;
      degree=-Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - 2 * (q2 * q2 + q3 * q3)) * 180.0 / Math.PI
      robotMarker.rotation = degree;
      }
  
        // rootObject를 통해서 robotMaker에 Marker 넣어줌
        gridClient.rootObject.addChild(robotMarker);
  
    })
  }
  
  // navigation pose / tf 
  createFunc('subscribe',PoseTopic, robotMarker,OperRatingMode);
  
  // Scale the canvas to fit to the map
  gridClient.on('change', function(){
    viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
  });
  }
  mapLoad();
}
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

  let createState = document.createElement('span');
  createState.setAttribute('id','stateCircle');
  parentDiv.appendChild(createState);
  
  let createStateH = document.createElement('h4');
  createStateH.setAttribute('id', 'h4');
  createStateH.innerHTML = "연결안됨"
  parentDiv.appendChild(createStateH);

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

const mapView = document.getElementsByClassName('mapView')[0];

mapView.addEventListener('click',function() {
  const show = document.getElementsByClassName('isShow')[0];
  if( show.style.display == 'block'){
    show.style.display = 'none';
  }
  else{
    show.style.display = 'block';
  }
})


