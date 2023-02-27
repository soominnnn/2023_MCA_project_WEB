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

          firebase.database().ref('service/장바구니/101호').on('value',function(getData){
            var test = getData.val();
            var count = getData.numChildren();
            let tagArea_line = document.getElementsByClassName("rectang")[0];
          // 서비스 요청 내역_ 룸 넘버
            const entries = Object.entries(test);
            console.log(entries);
            let room_namee = document.createElement('div');
                    room_namee.setAttribute('class','room_number');
                    tagArea_line.appendChild(room_namee);
                    room_namee.innerHTML = "101호"
            for( var i = 0; i < count; i++)
            {
              //룸 내 라인 위 요청 내역
              console.log(entries[i]);
              let order_p = document.createElement('p');
              order_p.setAttribute('class','amenity');
              tagArea_line.appendChild(order_p);
              order_p.innerHTML = entries[i];
          // 룸 내 라인 
              let line123 = document.createElement('div');
              line123.setAttribute('class', 'line_room');
              tagArea_line.appendChild(line123);
            }
          })
      }
  })

}
function buttonchange(){
  var button_state = document.getElementById('button_change');
}

newtag();

firebase.database().ref('service').once('value')
  .then(function(snapshot) {
    // snapshot에서 데이터 가져오기
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childKey, childData.name, childData.age);
    });
  });