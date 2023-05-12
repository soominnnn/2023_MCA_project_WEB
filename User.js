
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

const soap = new item('soap');
const text = document.getElementById('number1');
const btn = document.p

testbtn.addEventListener('click',function(){
  i.countUp();
  text.innerHTML = i.getCount();
})


