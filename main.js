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

function newtag(){
  let tagArea = document.getElementsByClassName("content-all")[0];
  firebase.database().ref('service/service').on('value',function(getData){
      var data = getData.val();
      console.log(data);
      if(data == "1")
      {
          
          let base = document.createElement('div');
          base.setAttribute('class','rectang');
          tagArea.appendChild(base);
          let line_1 = document.createElement('p');
          line_1.setAttribute('class','amenity');
          let tagArea_line = document.getElementsByClassName("rectang")[0];
          tagArea_line.appendChild(line_1);
          line_1.innerHTML = 수건;
      }
  });
}
function buttonchange(){
  var button_state = document.getElementById('button_change');
}