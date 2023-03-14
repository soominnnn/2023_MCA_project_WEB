let tagArea = document.getElementsByClassName("content-all")[0];
let tagArea_order = document.getElementsByClassName("content-order")[0];

let rectangCount = 0;
function database_room(roomnum,num){
    firebase.database().ref('service/장바구니/'+roomnum).on('value',function(getData){
        var test = getData.val();
        var count = getData.numChildren();
        rectangCount= rectangCount + 1;
  // 서비스 요청 내역_ 룸 넘버
  if(test != null){
    const entries = Object.entries(test);
    const tester = Object.fromEntries(entries);
    const valuedata = Object.values(tester);
    const keydata = Object.keys(tester);

    let base = document.createElement('div');
        base.setAttribute('class','rectang'+num);
        base.setAttribute('id','rectang');
        tagArea.appendChild(base);

    let tagArea_line = document.getElementsByClassName("rectang"+num)[0];
    let room_namee = document.createElement('div');
            room_namee.setAttribute('class','room_number');
            tagArea_line.appendChild(room_namee);
            room_namee.innerHTML = roomnum+"호"

    for( var i = 0; i < count; i++)
    {
      //룸 내 라인 위 요청 내역

      let tagArea_line = document.getElementsByClassName("rectang"+num)[0];
      let order_p = document.createElement('p');
      order_p.setAttribute('class','amenity');
      tagArea_line.appendChild(order_p);
      order_p.innerHTML = keydata[i] + "&emsp;" + "&emsp;" + valuedata[i];

  // 룸 내 라인 
      let line123 = document.createElement('div');
      line123.setAttribute('class', 'line_room');
      tagArea_line.appendChild(line123);
    }
    let btnCan_cre = document.createElement('button');
        btnCan_cre.setAttribute('class','btnCanorder'+num);
        btnCan_cre.setAttribute('id','btnCanOrder');
        tagArea_line.appendChild(btnCan_cre);
        btnCan_cre.innerHTML = "취소 요청"
    
    let btnOrderOk = document.createElement('button');
        btnOrderOk.setAttribute('class','btnOrderOk');
        tagArea_line.appendChild(btnOrderOk);
        btnOrderOk.innerHTML = "접수 받기"
  }
    })
  }

  for(var i = 1; i<4; i++){
    database_room("10"+i,i);
  }
  function delRectang(){
  }
  console.log(rectangCount);



