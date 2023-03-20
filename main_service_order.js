//className 가져오기
let tagArea = document.getElementsByClassName("contentAll")[0];
let tagArea_order = document.getElementsByClassName("contentOrder")[0];
let tagArea_conti = document.getElementsByClassName('contentConti')[0];
let tagArea_comp = document.getElementsByClassName('contentComp')[0];

//카운트 생성
let allCount = 0;
        let orderCount = 0;
        let contiCount = 0;
        let compCount = 0;

//검은색 박스 생성 function 
function baseElementCreate(DivBase,DivArea,num,countNum,i,contentNum,DivID,contents){
  DivBase = document.createElement('div');
  DivBase.setAttribute('class','rectang'+num);
  DivBase.setAttribute('id','rectang');
  DivArea.appendChild(DivBase)
  countNum = countNum + i
  console.log("DivArea는",countNum);
  contentNum = document.getElementById('content_'+DivID);
  contentNum.innerHTML = contents+'\u00a0'+'\u00a0'+countNum+'건';
}

//객실 번호 생성 function
function roomNumPrint(Area, DivName, num, roomnum,content){
  Area = document.getElementsByClassName("rectang"+num)[0];
  DivName = document.createElement('div');
        DivName.setAttribute('class','room_number_'+content);
        Area.appendChild(DivName);
        DivName.innerHTML = roomnum+"호"
}

function roomLinePrint(count,num,keydata,valuedata,PName){
  let tagAreaLine = document.getElementsByClassName("rectang"+num)[0];
  for( var i = 0; i < count; i++)
  {
    //룸 내 라인 위 요청 내역
    PName = document.createElement('p');
    PName.setAttribute('class','amenity');
    tagAreaLine.appendChild(PName);
    PName.innerHTML = keydata[i] + "&emsp;" + "&emsp;" + valuedata[i];

  // 룸 내 라인 
    Line = document.createElement('div');
    Line.setAttribute('class', 'line_room');
    tagAreaLine.appendChild(Line);
  }
}

//전체 내역 파이어베이스 function
function database_roomAllOrder(roomnum,num){
    firebase.database().ref('service/장바구니/'+roomnum).on('value',function(getData){
      //데이터 가져오기
        var test = getData.val();
        var count = getData.numChildren();

      if(test != null){
        //배열 변경
        const entries = Object.entries(test);
        const tester = Object.fromEntries(entries);
        const valuedata = Object.values(tester);
        const keydata = Object.keys(tester);

        // 검은색 박스 생성
        baseElementCreate("baseAll",tagArea,num,allCount,num,'contentAll','all','전체');
        baseElementCreate("baseOrder",tagArea_order,"10"+num,orderCount,num,'contentOrder','order','요청');

        roomNumPrint("tagArea_line","room_namee", num,roomnum,"all");
        roomNumPrint("tagAreaLineOrder","room_nameeOrder","10"+num,roomnum,"order");

        roomLinePrint(count,num,keydata,valuedata,"All",num);
        roomLinePrint(count,"10"+num,keydata,valuedata,"Order",num);

        let tagAreaLine = document.getElementsByClassName("rectang"+num)[0];
        let btnCan_cre = document.createElement('button');
        btnCan_cre.setAttribute('class','btnCanorder'+num);
        btnCan_cre.setAttribute('id','btnCanOrder');
        tagAreaLine.appendChild(btnCan_cre);
        btnCan_cre.innerHTML = "취소 요청"
        btnCan_cre.addEventListener('click', function() {
          const parent = this.parentNode; // 부모 요소 찾기
          parent.parentNode.removeChild(parent); // 부모 요소 삭제
          console.log(allCount)
          const contentAllNum = document.getElementById('content_all')
          contentAllNum.innerHTML = '전체'+'\u00a0'+allCount+'건';
        });
    //접수 버튼
    let btnOrderOk = document.createElement('button');
        btnOrderOk.setAttribute('class','btnOrderOk');
        tagAreaLine.appendChild(btnOrderOk);
        btnOrderOk.innerHTML = "접수 받기"
      }
        })
  }



  for(var i = 1; i<4; i++){
    database_roomAllOrder("10"+i,i);
  }




