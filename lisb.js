//로스 서버 커넥션 확인
var ros = new ROSLIB.Ros({
    url : 'ws://172.20.10.3:9090'
  });

  ros.on('connection', function() {

  });

  ros.on('error', function(error) {

  });

  ros.on('close', function() {

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