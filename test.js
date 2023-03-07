firebase.database().ref('service/장바구니/103').on('value',function(getData){
    var test = getData.val();
    var count = getData.numChildren();
  // 서비스 요청 내역_ 룸 넘버
    const entries = Object.entries(test);
    const tester = Object.fromEntries(entries);
    const keytest = Object.values(tester);
    const valuetest = Object.keys(tester);


    make_rectang2();
    let tagArea_line = document.getElementsByClassName("rectang2")[0];
    let room_namee = document.createElement('div');
            room_namee.setAttribute('class','room_number');
            tagArea_line.appendChild(room_namee);
            room_namee.innerHTML = "103호"

    for( var i = 0; i < count; i++)
    {
      //룸 내 라인 위 요청 내역

      let tagArea_line = document.getElementsByClassName("rectang2")[0];
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

  function database_room(roomnum, num){
    firebase.database().ref('service/장바구니/'+roomnum).on('value',function(getData){
        var data = getData.val();
        var count = getData.numChildren();

        const entries = Object.entries(data);
        const entrieofentrie = Object.fromEntries(entries);
        const keydata = Object.values(entrieofentrie);
        const valuedata = Object.keys(entrieofentrie);

        let tagArea_line = document.getElementsByClassName("rectang"+num)[0];
        let room_namee = document.createElement('div');
            room_namee.setAttribute('class','room_number');
            tagArea_line.appendChild(room_namee);
            room_namee.innerHTML = "103호"
    })
  }