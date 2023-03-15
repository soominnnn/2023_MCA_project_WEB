let tagArea = document.getElementsByClassName("content-all")[0];
let tagArea_order = document.getElementsByClassName("content-order")[0];
let tagArea_conti = document.getElementsByClassName('content-conti')[0];
let tagArea_comp = document.getElementsByClassName('content-comp')[0];
let allCount = 0;
let orderCount = 0;
let contiCount = 0;
let compCount = 0;

function database_room_all(roomnum,num){
    firebase.database().ref('service/장바구니/'+roomnum).on('value',function(getData){
        var test = getData.val();
        var count = getData.numChildren();
        allCount= allCount + 1;
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
            room_namee.setAttribute('class','room_number_all');
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
        btnCan_cre.addEventListener('click', function() {
          const parent = this.parentNode; // 부모 요소 찾기
          parent.parentNode.removeChild(parent); // 부모 요소 삭제
          allCount = allCount - 1 ;
          contentAllNum.innerHTML = '전체'+'\u00a0'+allCount+'건';
        });
    
    let btnOrderOk = document.createElement('button');
        btnOrderOk.setAttribute('class','btnOrderOk');
        tagArea_line.appendChild(btnOrderOk);
        btnOrderOk.innerHTML = "접수 받기"
  }
  var contentAllNum = document.getElementById('content_all');
  contentAllNum.innerHTML = '전체'+'\u00a0'+'\u00a0'+allCount+'건';
    })
    console.log(allCount);
  }
  function database_room_order(roomnum,num){
    firebase.database().ref('service/장바구니/'+roomnum).on('value',function(getData){
      var contentcontiNum = document.getElementById('content_conti');
      contentcontiNum.innerHTML = '처리중'+'\u00a0'+contiCount+'건';
      var contentcompNum = document.getElementById('content_comp');
       contentcompNum.innerHTML = '완료'+'\u00a0'+compCount+'건';
        var test = getData.val();
        var count = getData.numChildren();
        orderCount= orderCount + 1;
  // 서비스 요청 내역_ 룸 넘버
  if(test != null){
    const entries = Object.entries(test);
    const tester = Object.fromEntries(entries);
    const valuedata = Object.values(tester);
    const keydata = Object.keys(tester);

    let base = document.createElement('div');
        base.setAttribute('class','rectang'+num);
        base.setAttribute('id','rectang');
        tagArea_order.appendChild(base);

    let tagArea_line = document.getElementsByClassName("rectang"+num)[0];
    let room_namee = document.createElement('div');
            room_namee.setAttribute('class','room_number_order');
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
        btnCan_on = document.getElementsByClassName('btnCanorder'+num);

        btnCan_cre.addEventListener('click', function() {
          const parent = this.parentNode; // 부모 요소 찾기
          parent.parentNode.removeChild(parent); // 부모 요소 삭제
          orderCount = orderCount - 1;
          contentAllNum.innerHTML = '요청'+'\u00a0'+orderCount+'건';

        let base = document.createElement('div');
        base.setAttribute('class','rectang'+num);
        base.setAttribute('id','rectang');
        tagArea_comp.appendChild(base);

    let tagArea_line = document.getElementsByClassName("rectang"+num)[0];
    let room_namee = document.createElement('div');
            room_namee.setAttribute('class','room_number_order');
            tagArea_line.appendChild(room_namee);
            room_namee.innerHTML = roomnum+"호"
          compCount = compCount + 1;
    var contentcompNum = document.getElementById('content_comp');
    contentcompNum.innerHTML = '완료'+'\u00a0'+compCount+'건';

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

        });

    let btnOrderOk = document.createElement('button');
        btnOrderOk.setAttribute('class','btnOrderOk');
        tagArea_line.appendChild(btnOrderOk);
        btnOrderOk.innerHTML = "접수 받기"
  }
  var contentAllNum = document.getElementById('content_order');
  contentAllNum.innerHTML = '요청'+'\u00a0'+orderCount+'건';
    })
  }

  for(var i = 1; i<4; i++){
    database_room_all("10"+i,i);
    database_room_order("10"+i,"10"+i);
  }



