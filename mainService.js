const tagArea_order = document.getElementsByClassName("contentOrder")[0];
const tagArea_conti = document.getElementsByClassName('contentConti')[0];
const tagArea_comp = document.getElementsByClassName('contentComp')[0];
const contentOrderNum = document.getElementById('content_order');
const contentContiNum = document.getElementById('content_conti');
const contentCompNum = document.getElementById('content_comp');

let OrderCount = 0;
let ProcessCount = 0;
let completeCount = 0;

const createBoxTags = (count, valuedata,Area) => {
    let DivArea = document.createElement("div");
    DivArea.setAttribute("id", "rectang");
  
    // 객실 번호 태그 생성
    let roomNumTag = document.createElement("p");
    roomNumTag.setAttribute("class", "room_number");
    roomNumTag.innerHTML = "101호";
    DivArea.appendChild(roomNumTag);
  
    let LiTag = document.createElement('div');
    LiTag.setAttribute("class", "In");
    DivArea.appendChild(LiTag);
    // 내역 태그 생성
    for (let i = 0; i < count; i +=2) {
      let amenityTag = document.createElement("p");
      amenityTag.setAttribute("class", "amenity");
      amenityTag.innerHTML = valuedata[i] + "&emsp;" + valuedata[i + 1]+"개";
      LiTag.appendChild(amenityTag);
  
      // 라인 태그 생성
      let lineTag = document.createElement("div");
      lineTag.setAttribute("class", "line_room");
      LiTag.appendChild(lineTag);
    }
    Area.appendChild(DivArea);
    return DivArea;
  }
  const createElement = (count,valuedata) => {
    let firstBox = createBoxTags(count,valuedata,tagArea_order);
    //취소 요청 버튼 생성
    let cancelOrderBtn = document.createElement("button");
    cancelOrderBtn.setAttribute("id", "btnCanOrder");
    cancelOrderBtn.innerHTML = "취소 요청";
    //버튼 리스너 추가
    cancelOrderBtn.addEventListener('click', function () {
        const parent = this.parentNode; // 부모 요소 찾기
        parent.parentNode.removeChild(parent); // 부모 요소 삭제
        //박스 생성
        let boxTaginCancel = createBoxTags(count,valuedata,tagArea_comp);
        //카운트 증가

        // 완료 버튼 생성
        let btnCanAlltoComp = document.createElement('button');
        btnCanAlltoComp.setAttribute('id', 'btnCancelAlltoComp');
        boxTaginCancel.appendChild(btnCanAlltoComp);
        btnCanAlltoComp.innerHTML = "취소 완료"
        //완료 컨텐츠에 생성
        tagArea_comp.appendChild(boxTaginCancel);
      })
      firstBox.appendChild(cancelOrderBtn);
    
    // 접수 받기 버튼 생성
    let takeOrderBtn = document.createElement("button");
    takeOrderBtn.setAttribute("id", "btnTakeOrder");
    takeOrderBtn.addEventListener('click', function () {
        const parent = this.parentNode; // 부모 요소 찾기
        parent.parentNode.removeChild(parent); // 부모 요소 삭제    
    
        let boxTaginOrder = createBoxTags(count,valuedata,tagArea_conti);
    
        //완료 버튼 생성
        const btnConti = document.createElement('button');
        btnConti.setAttribute('id', 'btnTakeOrdertoComp');
        boxTaginOrder.appendChild(btnConti);
        btnConti.innerHTML = "완료하기";
    
        tagArea_conti.appendChild(boxTaginOrder);
        //처리완료 버튼 생성
        btnConti.addEventListener('click', function () {
          const parentConti = this.parentNode;
          parentConti.parentNode.removeChild(parentConti);
          process.countDown();
    
          let boxTagincon = createBoxTags(count,valuedata,tagArea_comp);
    
          complete.countUp();
    
          const btnComp = document.createElement('button');
          btnComp.setAttribute('id', 'btnTakeContitoComp');
          DivArea.appendChild(btnComp);
          btnComp.innerHTML = "처리 완료";
    
          tagArea_comp.appendChild(boxTagincon);
        })
      })
      takeOrderBtn.innerHTML = "접수 받기";
      firstBox.appendChild(takeOrderBtn);
  }

  firebase.database().ref('service/장바구니/101').on('value',function(getData){
    let test = getData.val();
    let count = getData.numChildren();
  
    if(test != null){
      //배열 변경
      let entries = Object.entries(test);
      let tester = Object.fromEntries(entries);
      let valuedata = Object.values(tester);
  
      createElement(count, valuedata);
    }
  })