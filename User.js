
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
const text = document.getElementById('number1');
const btn = document.p

testbtn.addEventListener('click',function(){
  i.countUp();
  text.innerHTML = i.getCount();
})

const tooth = new item('tooth');
const Shaver = new item('Shaver');
const soap = new item('soap');
const bodyrotion = new item('bodyrotion');
const bodywash = new item('bodywash');
const conditioner = new item('conditioner');
const shampoo = new item('shampoo');
const mouthwash = new item('mouthwash');
const showertowel = new item('showertowel');
const bathtowel = new item('bathtowel');
const slipper = new item('slipper');
const hanger = new item('hanger');
const benitykit = new item('benitykit');
const bathClear = new item('bathClear');
const pillowClear = new item('pillowClear');



const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search");
const relContainer = document.querySelector(".rel_search");

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
  searchP.innerHTML = event.value;
})



