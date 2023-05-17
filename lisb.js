//로스 서버 커넥션 확인
let IpValueE = document.getElementById('IP');

var ros = new ROSLIB.Ros({
  url : 'ws://'+IpValueE.value+':9090'
});
// 로스 토픽 받아오기
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

// map 로드 펑션
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
    let PoseTopic=CreatePoseTopic(OperRatingMode)

    // Connect to ROS.
    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
      divID : 'map',
      width : 300,
      height : 300,
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
    size : 1.0,
    strokeSize : 0.02,
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
      createFunc('subscribe',PoseTopic, robotMarker,OperRatingMode);
      // Scale the canvas to fit to the map
      gridClient.on('change', function(){
        viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
        viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
      });
    }
    mapLoad();
   const btn = document.getElementById("btn");
   const div = document.getElementById("isShow");
   div.style.display = 'none';
   btn.addEventListener('click',function(){
    if(div.style.display == 'block'){
        div.style.display = 'none';
    }
    else{
        div.style.display = 'block';
    }
   }) 