const tagArea_order = document.getElementsByClassName("contentOrder")[0];
const tagArea_conti = document.getElementsByClassName('contentConti')[0];
const tagArea_comp = document.getElementsByClassName('contentComp')[0];
const contentOrderNum = document.getElementById('content_order');
const contentContiNum = document.getElementById('content_conti');
const contentCompNum = document.getElementById('content_comp');

class Contents {
    constructor({ name }){
        this.name = name;
        this.count = 0;
    }
    countUp(){
        return this.count++;
    }
    countDown(){
        return this.count--;
    }
    getCount(){
        return this.count;
    }
}

const Order = new Contents('order');
const process = new Contents('process');
const complete = new Contents('complete');

function createOrderTags(count, valuedata) {
    // 부모 요소 생성
  let DivArea = document.createElement("div");
  DivArea.setAttribute("id", "rectang");

  // 객실 번호 태그 생성
  let roomNumTag = document.createElement("p");
  roomNumTag.setAttribute("class", "room_number");
  roomNumTag.innerHTML = "101호";
  DivArea.appendChild(roomNumTag);

  // 내역 태그 생성
  for(let i = 0; i < count; i+2){
    let amenityTag = document.createElement("p");
    amenityTag.setAttribute("class", "amenity");
    amenityTag.innerHTML = valuedata[i] + "&emsp;" + "&emsp;" + valuedata[i+1];
    DivArea.appendChild(amenityTag);

     // 라인 태그 생성
    let lineTag = document.createElement("div");
    lineTag.setAttribute("class", "line_room");
    DivArea.appendChild(lineTag);
  }

  // 취소 요청 버튼 생성
  let cancelOrderBtn = document.createElement("button");
  cancelOrderBtn.setAttribute("id", "btnCanOrder");
  cancelOrderBtn.innerHTML = "취소 요청";
  cancelOrderBtn.addEventListener('click',function(){
    const parent = this.parentNode; // 부모 요소 찾기
    parent.parentNode.removeChild(parent); // 부모 요소 삭제
    Order.countDown();
    complete.countUp();
    let DivArea = document.createElement("div");
    DivArea.setAttribute("id", "rectang");

    // 객실 번호 태그 생성
    let roomNumTag = document.createElement("p");
    roomNumTag.setAttribute("class", "room_number");
    roomNumTag.innerHTML = "101호";
    DivArea.appendChild(roomNumTag);

    // 내역 태그 생성
  for(let i = 0; i < count; i+2){
    let amenityTag = document.createElement("p");
    amenityTag.setAttribute("class", "amenity");
    amenityTag.innerHTML = valuedata[i] + "&emsp;" + "&emsp;" + valuedata[i+1];
    DivArea.appendChild(amenityTag);

     // 라인 태그 생성
    let lineTag = document.createElement("div");
    lineTag.setAttribute("class", "line_room");
    DivArea.appendChild(lineTag);
  }
    // 완료 버튼 생성
    let btnCanAlltoComp = document.createElement('button');
        btnCanAlltoComp.setAttribute('id','btnCancelAlltoComp');
        DivArea.appendChild(btnCanAlltoComp);
        btnCanAlltoComp.innerHTML = "취소 완료"
    //완료 컨텐츠에 생성
    tagArea_comp.appendChild(DivArea);
  })
  DivArea.appendChild(cancelOrderBtn);

  // 접수 받기 버튼 생성
  let takeOrderBtn = document.createElement("button");
  takeOrderBtn.setAttribute("id", "btnTakeOrder");
  takeOrderBtn.addEventListener('click',function(){
    const parent = this.parentNode; // 부모 요소 찾기
    parent.parentNode.removeChild(parent); // 부모 요소 삭제    

    Order.countDown();
    process.countUp();

    let DivArea = document.createElement("div");
    DivArea.setAttribute("id", "rectang");

    // 객실 번호 태그 생성
    let roomNumTag = document.createElement("p");
    roomNumTag.setAttribute("class", "room_number");
    roomNumTag.innerHTML = "101호";
    DivArea.appendChild(roomNumTag);

    // 내역 태그 생성
  for(let i = 0; i < count; i+2){
    let amenityTag = document.createElement("p");
    amenityTag.setAttribute("class", "amenity");
    amenityTag.innerHTML = valuedata[i] + "&emsp;" + "&emsp;" + valuedata[i+1];
    DivArea.appendChild(amenityTag);

     // 라인 태그 생성
    let lineTag = document.createElement("div");
    lineTag.setAttribute("class", "line_room");
    DivArea.appendChild(lineTag);
  }

    const btnConti = document.createElement('button');
        btnConti.setAttribute('id','btnTakeOrdertoComp');
        DivArea.appendChild(btnConti);
        btnConti.innerHTML = "완료하기";

    tagArea_conti.appendChild(DivArea);    
    btnConti.addEventListener('click',function(){
        const parentConti = this.parentNode;
        parentConti.parentNode.removeChild(parentConti);
        process.countDown();

        let DivArea = document.createElement("div");
        DivArea.setAttribute("id", "rectang");

        // 객실 번호 태그 생성
        let roomNumTag = document.createElement("p");
        roomNumTag.setAttribute("class", "room_number");
        roomNumTag.innerHTML = "101호";
        DivArea.appendChild(roomNumTag);

        // 내역 태그 생성
    for(let i = 0; i < count; i+2){
        let amenityTag = document.createElement("p");
        amenityTag.setAttribute("class", "amenity");
        amenityTag.innerHTML = valuedata[i] + "&emsp;" + "&emsp;" + valuedata[i+1];
        DivArea.appendChild(amenityTag);

        // 라인 태그 생성
        let lineTag = document.createElement("div");
        lineTag.setAttribute("class", "line_room");
        DivArea.appendChild(lineTag);
    }

        complete.countUp();

        const btnComp = document.createElement('button');
                  btnComp.setAttribute('id','btnTakeContitoComp');
                  DivArea.appendChild(btnComp);
                  btnComp.innerHTML = "처리 완료";
        
        tagArea_comp.appendChild(DivArea);
    })
  })
  takeOrderBtn.innerHTML = "접수 받기";
  DivArea.appendChild(takeOrderBtn);

  // 생성한 요소를 원하는 위치에 추가
  tagArea_order.appendChild(DivArea);
}
firebase.database().ref('service/장바구니/101').on('value',function(getData){
  let test = getData.val();
  let count = getData.numChildren();

  if(test != null){
    //배열 변경
    let entries = Object.entries(test);
    let tester = Object.fromEntries(entries);
    let valuedata = Object.values(tester);

    createOrderTags(count, valuedata);
  }
})