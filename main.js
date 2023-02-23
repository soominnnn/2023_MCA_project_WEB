const clock = document.getElementById("clock");
function getClock(){
    const now = new Date();	// 현재 날짜 및 시간
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    clock.innerText = `${hour}:${minutes}:${seconds}`;
  }
setInterval(getClock, 1000);

function room_change(value){
  for( var i = 1; i<=2; i++){
    document.getElementById(i).style.display="none";
  }
  document.getElementById(value).style.display="block";
}
let tagArea = document.getElementsByClassName("content-all")[0];
function make_rectang(){
  let base = document.createElement('div');
  base.setAttribute('class','rectang');
  tagArea.appendChild(base);
}

function newtag(){
  firebase.database().ref('service/service').on('value',function(getData){
      var data = getData.val();
      console.log(data);
      if(data == "1")
      {
          make_rectang();

          firebase.database().ref('service/101호').on('value',function(getData){
              var data = getData.val();
              console.log(data);
              var arr = JSON.parse(data);

              for( var i = 0; i < arr.length; i++){
                console.log(arr[i])
              }
          })
          let tagArea_line = document.getElementsByClassName("rectang")[0];

          function make_roomname(){
            let room_namee = document.createElement('div');
                    room_namee.setAttribute('class','room_number');
                    tagArea_line.appendChild(room_namee);
                    room_namee.innerHTML = "101호"
          }
          function make_service(){
              let line_1 = document.createElement('p');
              line_1.setAttribute('class','amenity');
              tagArea_line.appendChild(line_1);
              line_1.innerHTML = data;
          
              let line123 = document.createElement('div');
              line123.setAttribute('class', 'line123');
              tagArea_line.appendChild(line123);
          }
          make_roomname();
          make_service();
      }
  })

}
function buttonchange(){
  var button_state = document.getElementById('button_change');
}

function firebasenum(){
  firebase.database().ref('service/101호').once('value').then(function(snapshot){
    var count = snapshot.numChildren();
    console.log(count);
  })
}
newtag();
firebasenum();