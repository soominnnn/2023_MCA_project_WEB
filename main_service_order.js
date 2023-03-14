let tagArea = document.getElementsByClassName("content-all")[0];

function database_room(roomnum,num){
    firebase.database().ref('service/장바구니/'+roomnum).on('value',function(getData){
        var test = getData.val();
        var count = getData.numChildren();

  // 서비스 요청 내역_ 룸 넘버
  if(test != null){
    const entries = Object.entries(test);
    const tester = Object.fromEntries(entries);
    const valuedata = Object.values(tester);
    const keydata = Object.keys(tester);

    let base = document.createElement('div');
        base.setAttribute('class','rectang'+num);
        tagArea.appendChild(base);
        const rectangstyle = document.getElementsByClassName("rectang"+num)[0];
        rectangstyle.style.width = '383px';
        rectangstyle.style.height = '161px';
        rectangstyle.style.backgroundColor = '#060715';
        rectangstyle.style.border = '1px solid white';
        rectangstyle.style.borderRadius = '10px';

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
  }

    })
  }

  for(var i = 1; i<4; i++){
    database_room("10"+i,i);
  }


