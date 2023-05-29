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

class Item {
  constructor({ name }) {
    this.name = name;
    this.count = 0;
    this.create = false;
  }
  countUp() {
    return this.count++;
  }
  countDown() {
    return this.count--;
  }
  getCount() {
    return this.count;
  }
}

const itemArr = [];
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
];
const ImageFile = [
  './image/set',
  './UserImage/RoomItem',
  './UserImage/ObathSoap',
  './UserImage/ObathBodyrotion',
  './UserImage/ObathBodywash',
  './UserImage/ObathConditioner',
  './UserImage/ObathShampoo',
  './UserImage/mouthwasher',
  './UserImage/RoomItem3',
  './UserImage/BathTowel',
  './UserImage/slipper',
  './UserImage/showerwear',
  './UserImage/RoomItem4',
  './UserImage/RoomItem2',
  './UserImage/Bath2',
  './UserImage/Bath1',
  './UserImage/OsulocAlgreyTea',
  './UserImage/OsulocegreenTea',
  './UserImage/kitchenTowel',
  './UserImage/HotPack',
]

// 동적으로 itemArr 생성
data.forEach(item => {
  const newItem = new Item({ name: item });
  itemArr.push(newItem);
});
console.log(itemArr);
const btnPlusMinusCreate = (btn, item, itemText) => {
  btn.addEventListener('click', () => {
    if (item.getCount() < 9) {
      item.countUp();
      itemText.textContent = item.getCount();
    } else {
      alert("9개까지 주문 가능합니다.");
    }
  });
};

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
    li.addEventListener('click',function(e){
      resultsContainer.style.display = 'none'; 
      menuDiv.style.display = 'block';
    })
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

const orderNum = document.querySelector('.orderNum');
// 검색어 입력 시 결과 업데이트
searchInput.addEventListener("input", updateResults);

const btnsArr = Array.from(document.querySelectorAll('.plus'));
const btnMinusArr = Array.from(document.querySelectorAll('.minus'));
const btnItemArr = Array.from(document.querySelectorAll('#number'));

btnsArr.forEach((btn, index) => {
  btnPlusMinusCreate(btn, itemArr[index], btnItemArr[index]);
});

btnMinusArr.forEach((btn, index) => {
  btnPlusMinusCreate(btn, itemArr[index], btnItemArr[index]);
});

const closeModalBtn = document.querySelector('.arrow');
const modalContainer = document.getElementById('modalContainer');
const BoxSelect = document.querySelectorAll('.CartBox').length;
document.querySelector('.modalBTN').addEventListener('click', () => {
  ref.remove();
  modalContainer.style.display = 'block';
  document.body.style.overflow = 'hidden';
  itemArr.forEach((item, index) => {
    if (item.getCount() > 0) {
      if( item.create == false){
        CartDiv(ImageFile[index]+'.png', item.name, item.count);
        item.create = true;
      }
    }
  });
});

closeModalBtn.addEventListener('click', () => {
  modalContainer.style.display = 'none';
  document.body.style.removeProperty('overflow');
});

const CartDiv = (firImg, P1Name, ItemCount) => {
  const Boxdiv = document.createElement('div');
  Boxdiv.className = 'CartBox';

  const BoxImg = document.createElement('img');
  BoxImg.src = firImg;
  BoxImg.className = 'itemImg';

  const BoxP1 = document.createElement('p');
  BoxP1.textContent = P1Name;
  BoxP1.className = 'itemName';

  const BoxP2 = document.createElement('p');
  BoxP2.textContent = '원산지 : 중국';
  BoxP2.className = 'itemWon';

  const linediv = document.createElement('div');
  linediv.className = 'LineDiv';

  const btn1 = document.createElement('button');
  btn1.className = 'CartPlus';
  const btn1Img = document.createElement('img');
  btn1Img.src = '/UserImage/plus.png'
  btn1.appendChild(btn1Img);

  const numberDiv = document.createElement('div');
  numberDiv.className = 'CartNum';
  const numberP = document.createElement('p');

  numberP.textContent = ItemCount;
  numberDiv.appendChild(numberP);

  const btn2 = document.createElement('button');
  btn2.className = 'CartMinus';
  const btn2Img = document.createElement('img');
  btn2Img.src = '/UserImage/minus.png';
  btn2.appendChild(btn2Img);

  Boxdiv.appendChild(BoxImg);
  Boxdiv.appendChild(BoxP1);
  Boxdiv.appendChild(BoxP2);
  Boxdiv.appendChild(linediv);
  Boxdiv.appendChild(btn1);
  Boxdiv.appendChild(numberDiv);
  Boxdiv.appendChild(btn2);
  document.querySelector('.main').appendChild(Boxdiv);
};
const ref = firebase.database().ref('service/장바구니/101');
document.querySelector('.orderFire').addEventListener('click', () => {
  let itemArray = [];
  itemArr.forEach((item) => {
    if (item.getCount() > 0) {
      itemArray.push(item.name, item.count);
      console.log(itemArray);
    }
  })
  ref.set(itemArray)
})





