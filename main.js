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

function make_rectang0(){
  let base = document.createElement('div');
  base.setAttribute('class','rectang0');
  tagArea.appendChild(base);
  const rectangstyle = document.getElementsByClassName("rectang0")[0];
  rectangstyle.style.width = '383px';
  rectangstyle.style.height = '161px';
  rectangstyle.style.backgroundColor = '#060715';
  rectangstyle.style.border = '1px solid white';
  rectangstyle.style.borderRadius = '10px';
}
function make_rectang1(){
  let base = document.createElement('div');
      base.setAttribute('class','rectang1');
      tagArea.appendChild(base);
      const rectangstyle = document.getElementsByClassName("rectang1")[0];
      rectangstyle.style.width = '383px';
      rectangstyle.style.height = '161px';
      rectangstyle.style.backgroundColor = '#060715';
      rectangstyle.style.border = '1px solid white';
      rectangstyle.style.borderRadius = '10px';
}
  firebase.database().ref('service/service').on('value',function(getData){
      var data = getData.val();
      console.log(data);
      if(data == "1")
      {
           //101호
          firebase.database().ref('service/장바구니/101호').on('value',function(getData){
            var test = getData.val();
            var count = getData.numChildren();
          // 서비스 요청 내역_ 룸 넘버
            const entries = Object.entries(test);
            const tester = Object.fromEntries(entries);
            const keytest = Object.values(tester);
            const valuetest = Object.keys(tester);


            make_rectang0();
            let tagArea_line = document.getElementsByClassName("rectang0")[0];
            let room_namee = document.createElement('div');
            room_namee.setAttribute('class','room_number');
            tagArea_line.appendChild(room_namee);
            room_namee.innerHTML = "101호"

            for( var i = 0; i < count; i++)
            {
              //룸 내 라인 위 요청 내

              let tagArea_line = document.getElementsByClassName("rectang0")[0];
              let order_p = document.createElement('p');
              order_p.setAttribute('class','amenity');
              tagArea_line.appendChild(order_p);
              order_p.innerHTML = valuetest[i] + "&emsp;" + "&emsp;" + keytest[i];

          // 룸 내 라인 
              let line123 = document.createElement('div');
              line123.setAttribute('class', 'line_room');
              tagArea_line.appendChild(line123);
            }
          })
      }
  })
  //102호
  firebase.database().ref('service/장바구니/102호').on('value',function(getData){
    var test = getData.val();
    var count = getData.numChildren();
  // 서비스 요청 내역_ 룸 넘버
    const entries = Object.entries(test);
    const tester = Object.fromEntries(entries);
    const keytest = Object.values(tester);
    const valuetest = Object.keys(tester);


    make_rectang1();
    let tagArea_line = document.getElementsByClassName("rectang1")[0];
    let room_namee = document.createElement('div');
            room_namee.setAttribute('class','room_number');
            tagArea_line.appendChild(room_namee);
            room_namee.innerHTML = "102호"

    for( var i = 0; i < count; i++)
    {
      //룸 내 라인 위 요청 내역

      let tagArea_line = document.getElementsByClassName("rectang1")[0];
      let order_p = document.createElement('p');
      order_p.setAttribute('class','amenity');
      tagArea_line.appendChild(order_p);
      order_p.innerHTML = valuetest[i] + "&emsp;" + "&emsp;" + keytest[i];

  // 룸 내 라인 
      let line123 = document.createElement('div');
      line123.setAttribute('class', 'line_room');
      tagArea_line.appendChild(line123);
    }
  })

  //룸 상태 변경 버튼 제작
  const button_list = document.getElementById("button_change");
  const list = document.getElementById('list');
  button_list.addEventListener('click',function(){
    if (list.style.display == 'none'){
      list.style.display = 'block';
    }
    else{
      list.style.display = 'none';
    }
  })