//className 가져오기
let tagArea_all = document.getElementsByClassName("contentAll")[0];
let tagArea_order = document.getElementsByClassName("contentOrder")[0];
let tagArea_conti = document.getElementsByClassName('contentConti')[0];
let tagArea_comp = document.getElementsByClassName('contentComp')[0];

//카운트 생성
let allCount = 0;
let orderCount = 0;
let contiCount = 0;
let compCount = 0;

//정적변수를 위한 function
function AllCounting(){
  allCount++;
}
function AllCountingMinus(){
  allCount--;
}
function OrderCounting(){
  orderCount++;
}
function OrderCountingMinus(){
  orderCount--;
}
function compCounting(){
  compCount++;
}
function compCountingMinus(){
  compCount--;
}
function contiCounting(){
  contiCount++;
}
function contiCountingMinus(){
  contiCount--;
}

//검은색 박스 생성 function 
function baseElementCreate(DivArea,num,countNum,kind,contentNum,DivID,contents){
  let DivBase = document.createElement('div');
  DivBase.setAttribute('class','rectang'+num);
  DivBase.setAttribute('id','rectang_'+kind);
  DivArea.appendChild(DivBase);
  contentNum = document.getElementById('content_'+DivID);
  contentNum.innerHTML = contents+'\u00a0'+'\u00a0'+countNum+'건';
}

//객실 번호 생성 function
function roomNumPrint(Area, num, roomnum,content){
  Area = document.getElementsByClassName("rectang"+num)[0];
  let DivName = document.createElement('div');
        DivName.setAttribute('class','room_number_'+content);
        Area.appendChild(DivName);
        DivName.innerHTML = roomnum+"호"
}

//내역 생성 function
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

//취소 버튼 클릭 functionAll
function btnClickCancelAll(num,roomnum,count,keydata,valuedata){
  //tagAreaLine -> all의 경우 num order 의 경우 10+num
  let tagAreaLine = document.getElementsByClassName("rectang"+num)[0];
  //버튼 동적생성
        let btnCan_cre = document.createElement('button');
        //버튼 attribute 지정
        btnCan_cre.setAttribute('class','btnCanorder'+num);
        btnCan_cre.setAttribute('id','btnCanAll');
        tagAreaLine.appendChild(btnCan_cre);
        btnCan_cre.innerHTML = "취소 요청"
        //버튼 이벤트 리스너 생성
        btnCan_cre.addEventListener('click', function() {
          //전체와 요청 사항에 있는 취소 버튼 삭제 처리
          const btnCreCancel = document.getElementById('btnCanAll');
          const btnCreCancelOrder = document.getElementById('btnCanOrder');
          const parent = btnCreCancelOrder.parentNode;
          parent.parentNode.removeChild(parent);
          OrderCountingMinus();

          //접수 버튼 삭제 처리
          const btnTakeAll = document.getElementById('btnTakeAll');
          btnTakeAll.remove();

          //완료로 처리
          compCounting();
          baseElementCreate(tagArea_comp,"1000"+num,compCount,'comp','contentComp','comp','완료');
          roomNumPrint("tagAreaLineComp", "1000"+num,roomnum,"comp");
          roomLinePrint(count,"1000"+num,keydata,valuedata,"comp","1000"+num);

          //요청 삭제 처리
          const contentOrderNum = document.getElementById('content_order');
          contentOrderNum.innerHTML = '요청'+'\u00a0'+'\u00a0'+orderCount+'건';
          btnCreCancelOrder.remove();
          btnCreCancel.remove();

          //수량 변경
          const contentAllNum = document.getElementById('content_all');
          contentAllNum.innerHTML = '전체'+'\u00a0'+'\u00a0'+allCount+'건';
          console.log(compCount);
        })
}
//order 취소버튼 클릭 function
function btnClickCancelOrder(num,roomnum,count,keydata,valuedata){
  //tagAreaLine -> all의 경우 num order 의 경우 10+num
  let tagAreaLine = document.getElementsByClassName("rectang"+num)[0];
  //버튼 동적생성
        let btnCan_cre = document.createElement('button');
        //버튼 attribute 지정
        btnCan_cre.setAttribute('class','btnCanorder'+num);
        btnCan_cre.setAttribute('id','btnCanOrder');
        tagAreaLine.appendChild(btnCan_cre);
        btnCan_cre.innerHTML = "취소 요청"
        //버튼 이벤트 리스너 생성
        btnCan_cre.addEventListener('click', function() {
          //버튼 삭제 처리
          const parent = this.parentNode; // 부모 요소 찾기
          parent.parentNode.removeChild(parent); // 부모 요소 삭제
          const btnCanAll = document.getElementById('btnCanAll');
          btnCanAll.remove();
          const btnTakeAll = document.getElementById('btnTakeAll');
          btnTakeAll.remove();
          //요청 카운트 다운, 완료 카운트 업
          OrderCountingMinus();
          compCounting();
          //완료 요소 생성
          baseElementCreate(tagArea_comp,"1000"+num,compCount,'comp','contentComp','comp','완료');
          roomNumPrint("tagAreaLineComp", "1000"+num,roomnum,"comp");
          roomLinePrint(count,"1000"+num,keydata,valuedata,"comp","1000"+num);
          //카운트 재생성
          const contentOrderNum = document.getElementById('content_order');
          const contentAllNum = document.getElementById('content_all');
          contentAllNum.innerHTML = '전체'+'\u00a0'+'\u00a0'+allCount+'건';
          contentOrderNum.innerHTML = '요청'+'\u00a0'+'\u00a0'+orderCount+'건';
        })
}
//All 접수버튼 클릭 function
function btnClickTakeAll(num,roomnum,count,keydata,valuedata){
  let tagAreaLine = document.getElementsByClassName("rectang"+num)[0];
  //버튼 동적생성
        let btnTake = document.createElement('button');
        //버튼 attribute 지정
        btnTake.setAttribute('class','btnOrderOk'+num);
        btnTake.setAttribute('id','btnTakeAll');
        tagAreaLine.appendChild(btnTake);
        btnTake.innerHTML = "접수 받기"
        //버튼 이벤트 리스너 생성
        btnTake.addEventListener('click', function() {
          //자신 버튼 삭제
          const parent = this.parentNode; // 부모 요소 찾기
          parent.parentNode.removeChild(parent); // 부모 요소 삭제
          
          //요청중에 있는 취소 버튼 삭제
          const btnCreCancelOrder = document.getElementById('btnCanOrder');
          const parentOrder = btnCreCancelOrder.parentNode;
          parentOrder.parentNode.removeChild(parentOrder);
          //요청 카운트 다운, 처리중 카운트 업
          OrderCountingMinus();
          contiCounting();
          baseElementCreate(tagArea_conti,"100"+num,contiCount,'conti','contentConti','conti','처리중');
          roomNumPrint("tagAreaLineConti", "100"+num,roomnum,"conti");
          roomLinePrint(count,"100"+num,keydata,valuedata,"conti","100"+num);
          const contentContiNum = document.getElementById('content_conti');
          contentContiNum.innerHTML = '처리중'+'\u00a0'+'\u00a0'+contiCount+'건';
          const contentOrderNum = document.getElementById('content_order');
          contentOrderNum.innerHTML = '요청'+'\u00a0'+'\u00a0'+orderCount+'건';
        })
}
//요청 접수버튼 클릭 function
function btnClickTakeOrder(num,roomnum,count,keydata,valuedata){
  let tagAreaLine = document.getElementsByClassName("rectang"+num)[0];
  //버튼 동적생성
        let btnTake = document.createElement('button');
        //버튼 attribute 지정
        btnTake.setAttribute('class','btnOrderOk'+num);
        btnTake.setAttribute('id','btnTakeOrder');
        tagAreaLine.appendChild(btnTake);
        btnTake.innerHTML = "접수 받기"
        //버튼 이벤트 리스너 생성
        btnTake.addEventListener('click', function() {
          const parent = this.parentNode; // 부모 요소 찾기
          parent.parentNode.removeChild(parent); // 부모 요소 삭제    
          
          //요청 카운트 다운, 처리중 카운트 업   
          OrderCountingMinus();
          contiCounting();
          
          //처리중 요소 생성
          baseElementCreate(tagArea_conti,"100"+num,contiCount,'conti','contentConti','conti','처리중');
          roomNumPrint("tagAreaLineConti", "100"+num,roomnum,"conti");
          roomLinePrint(count,"100"+num,keydata,valuedata,"conti","100"+num);
          
          //카운트 재생성
          const contentContiNum = document.getElementById('content_conti');
          contentContiNum.innerHTML = '처리중'+'\u00a0'+'\u00a0'+contiCount+'건';
          const contentOrderNum = document.getElementById('content_order');
          contentOrderNum.innerHTML = '요청'+'\u00a0'+'\u00a0'+orderCount+'건';

          //전체 버튼 삭제
          const btnCanAll = document.getElementById('btnCanAll');
          btnCanAll.remove();
          const btnTakeAll = document.getElementById('btnTakeAll');
          btnTakeAll.remove();
        })
}

//전체 내역 파이어베이스 function
function database_roomAllOrder(roomnum,num){
  AllCounting();
  OrderCounting();
  const contentContiNum = document.getElementById('content_conti');
        contentContiNum.innerHTML = '처리중'+'\u00a0'+'\u00a0'+contiCount+'건';
  const contentCompNum = document.getElementById('content_comp');
        contentCompNum.innerHTML = '완료'+'\u00a0'+'\u00a0'+compCount+'건';
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
        baseElementCreate(tagArea_all,num,allCount,'all','contentAll','all','전체');
        baseElementCreate(tagArea_order,"10"+num,orderCount,'order','contentOrder','order','요청');


        roomNumPrint("tagArea_line", num,roomnum,"all");
        roomNumPrint("tagAreaLineOrder","10"+num,roomnum,"order");

        roomLinePrint(count,num,keydata,valuedata,"All",num);
        roomLinePrint(count,"10"+num,keydata,valuedata,"Order",num);
        btnClickCancelAll(num,roomnum,count,keydata,valuedata);
        btnClickCancelOrder('10'+num,roomnum,count,keydata,valuedata);
        btnClickTakeAll(num,roomnum,count,keydata,valuedata);
        btnClickTakeOrder('10'+num,roomnum,count,keydata,valuedata);
      }
        })
  }


  for(var i = 1; i<4; i++){
    database_roomAllOrder("10"+i,i);
  }




