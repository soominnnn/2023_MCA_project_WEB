// 배너 제작
const slideWrap = document.querySelector('.slideWrap');
const slide = document.querySelectorAll('.slide');

const firstEl = slideWrap.firstElementChild;
const lastEl = slideWrap.lastElementChild;
let cloneFirst = firstEl.cloneNode(true);
let cloneLast = lastEl.cloneNode(true);

slideWrap.appendChild(cloneFirst);
slideWrap.insertBefore(cloneLast, slideWrap.firstElementChild);

slideWrap.style.width = `${100*(slide.length+2)}%`;
slideWrap.style.left = '-100%';

let current = 0;
setInterval(()=>move(),4000);
function move(){
    if(current < slide.length - 1){
        current++;
        slideWrap.style.transition = '1000ms';
        slideWrap.style.left = `-${100 * (current + 1)}%`;
      }else{
        current++;
        slideWrap.style.transition = '1000ms';
        slideWrap.style.left = `-${100 * (current + 1)}%`;
        current = 0;
        setTimeout(function(){
          slideWrap.style.transition = '0ms';
          slideWrap.style.left = `-${100 * (current + 1)}%`;
        },550);
      }
}

//tab 클릭 시, 이미지 전환
const tab1 = document.querySelector('#tab-1');
const tab2 = document.querySelector('#tab-2');
const bathimg = document.querySelector('.rainImg');
const badimg = document.querySelector('.RoomImg');


tab1.addEventListener('click',function(){
    bathimg.style.content = 'url(/Image/rain.png)';
    badimg.style.content = 'url(/Image/Vector.png)';
})
tab2.addEventListener('click',function(){
  bathimg.style.content = 'url(/Image/rainn.png)';
  bathimg.style.width = '9.23px';
  bathimg.style.height = '15px';
  badimg.style.content = 'url(/Image/bad_white.png)';
})

// 클래스 선언

class item{
  constructor({name}){
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
let PlusBtn = document.querySelectorAll(".plus");
let Item_Count = document.querySelectorAll("#number");
let MinusBtn  = document.querySelectorAll(".minus");
var btnItemArr = Array.from(Item_Count);
var btnsArr = Array.from(PlusBtn);
var btnMinusArr = Array.from(MinusBtn);

const item0 = new item('tooth');
const item1 = new item('Shaver');
const item2 = new item('soap');
const item3 = new item('bodyrotion');
const item4 = new item('bodywash');
const item5 = new item('conditioner');
const item6 = new item('shampoo');
const item7 = new item('mouthwash');
const item8 = new item('showertowel');
const item9 = new item('bathtowel');
const item10 = new item('slipper');
const item11 = new item('hanger');
const item12 = new item('benitykit');
const item13 = new item('bathClear');
const item14 = new item('pillowClear');

const itemArr = [
  item0,
  item1,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
  item11,
  item12,
  item13,
  item14
]

const btnPlusCreate = (btnArr,item,itemText) => {
  btnArr.addEventListener('click',function(){
    item.countUp();
    itemText.innerHTML = item.getCount();
  })
}
const btnMinusCreate = (btnMinusArr,item,itemText) => {
  btnMinusArr.addEventListener('click',function(){
    if(item.getCount() == 0){
      alert("수량은 0개 이상이어야합니다.");
    }
    else{
      item.countDown();
      itemText.innerHTML = item.getCount();
    }
  })
}
let CartNumber = 0;
const orderNum = document.querySelector('.orderNum');

for(var i = 0; i<16; i++ ){
  btnPlusCreate(btnsArr[i],itemArr[i],btnItemArr[i]);
  btnMinusCreate(btnMinusArr[i],itemArr[i],btnItemArr[i]);
  btnsArr[i].addEventListener('click',function(){
    if(itemArr[i].getCount != 0){
      CartNumber ++;
      orderNum.innerHTML = '총' + CartNumber + '개';
    }
  })
}


const data = [
  '칫솔/치약 세트',
  '면도기 세트',
  'O\'bath 비누',
  'O\'bath 바디로션',
  'O\'bath 바디워시',
  'O\'bath 컨디셔너',
  'O\'bath 샴푸',
  '알로알로 마우스워시',
  '스크럽 샤워타올',
  '바스 타올',
  '슬리퍼',
  '샤워 가운',
  '옷걸이',
  '베니티킷',
  '침구 정리',
  '배게 교체',
  '오설록 제주 얼그레이 티',
  '오설록 순수 녹차',
  '키친 타올',
  '핫팩'
]

const menuDiv = document.querySelector('.Menu');
const searchInput = document.querySelector(".inputSearch");
const resultsContainer = document.querySelector('.searchLi');

// 검색어 입력 시 결과를 업데이트하는 함수
function updateResults() {
  const searchTerm = searchInput.value.toLowerCase();
  resultsContainer.style.display = 'none';
  menuDiv.style.display = 'block';
  resultsContainer.innerHTML = ""; // 이전 결과 초기화

  // 검색어와 일치하는 항목을 찾아 결과에 추가
  const matchingItems = data.filter(item => item.toLowerCase().includes(searchTerm));
  matchingItems.forEach(item => {
    menuDiv.style.display = 'none';
    resultsContainer.style.display = 'block';
    const li = document.createElement("li");
    li.textContent = item;
    resultsContainer.appendChild(li);
  });

  if (matchingItems.length === 0) {
    menuDiv.style.display = 'none';
    const li = document.createElement("li");
    resultsContainer.style.display = 'block';
    li.textContent = "일치하는 결과가 없습니다.";
    resultsContainer.appendChild(li);
  }
}

// 검색어 입력 시 결과 업데이트
searchInput.addEventListener("input", updateResults);


