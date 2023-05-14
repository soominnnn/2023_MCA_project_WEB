
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
setInterval(()=>move(),2000);
function move(){
    if(current < slide.length - 1){
        current++;
        slideWrap.style.transition = '500ms';
        slideWrap.style.left = `-${100 * (current + 1)}%`;
      }else{
        current++;
        slideWrap.style.transition = '500ms';
        slideWrap.style.left = `-${100 * (current + 1)}%`;
        current = 0;
        setTimeout(function(){
          slideWrap.style.transition = '0ms';
          slideWrap.style.left = `-${100 * (current + 1)}%`;
        },550);
      }
}

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
for(var i = 0; i<16; i++ ){
  btnPlusCreate(btnsArr[i],itemArr[i],btnItemArr[i]);
  btnMinusCreate(btnMinusArr[i],itemArr[i],btnItemArr[i]);
}






const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search");


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
searchInput.addEventListener('input', function(event) {
  const filteredData = data.filter(function(item){
    return item.includes(event.target.value);
  });

  ul.innerHTML = '';

  if(filteredData.length > 0){
    filteredData.forEach(function(item){
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}
else{
  const li = document.createElement('li');
  li.textContent = '일치하는 결과가 없습니다.';
  ul.appendChild(li);
}
})
const searchP = document.querySelector(".searchP");
searchInput.addEventListener('click',function(event){
  searchP.innerHTML = searchInput.value;
})



