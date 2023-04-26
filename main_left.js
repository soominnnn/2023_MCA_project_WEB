function room_change(value){
  for( let i = 1; i<=2; i++){
    document.getElementById(i).style.display="none";
  }
  document.getElementById(value).style.display="block";
}
  //룸 상태 변경 버튼 제작

  function RoomList(num){
    const button_list = document.getElementById("button_change"+num);
    button_list.addEventListener('click',function(){
      const listNum = document.getElementById('list'+num);
      if (listNum.style.display == 'none'){
        listNum.style.display = 'block';
      }
      else{
        listNum.style.display = 'none';
      }
    })
  }

for(let i = 1; i<11; i++){
  RoomList(i);
}
let State = 'standby';
const StandbyNum = document.getElementsByClassName('standbyNum')[0];
const CheckinNum = document.getElementsByClassName('checkinNum')[0];
const CheckoutNum = document.getElementsByClassName('checkoutNum')[0];

var buttons = [];
for ( let i = 1; i < 21; i++){
  const button = document.getElementById('buttonP'+i);
  buttons.push(button);
  buttons[i].addEventListener('click',function(event){
    const btnTarget = event.target;
    if( str == 'standby'){
      switch (State) {
        case 'standby':
          btnTarget.className = 'standby';
          btnTarget.innerHTML ="stand-by";
          State = 'standby';
          break;
        case 'checkin':
          btnTarget.className = 'standby';
          btnTarget.innerHTML ="stand-by";
          State = 'standby';
          break;
        case 'checkout':
          btnTarget.innerHTML ="stand-by";
          btnTarget.className = 'standby';
          State = 'standby';
          break;
      }
    
    }  
    else if (str == 'checkin'){
      switch (State) {
        case 'standby':
          btnTarget.innerHTML ="check-in";
          btnTarget.className = 'checkin';
          State = 'checkin';
          break;
        case 'checkin':
          btnTarget.className = 'checkin';
          btnTarget.innerHTML ="check-in";
          State = 'checkin';
          break;
        case 'checkout':
          btnTarget.className = 'checkin';
          btnTarget.innerHTML ="check-in";
          State = 'checkin';
          break;
      }
    }
    else{
      switch (State) {
        case 'standby':
          btnTarget.className = 'checkout';
          btnTarget.innerHTML ="check-out";
          State = 'checkout';
          break;
        case 'checkin':
          btnTarget.className = 'checkout';
          btnTarget.innerHTML ="check-out";
          State = 'checkout';
          break;
        case 'checkout':
          btnTarget.className = 'checkout';
          State = 'checkout';
          btnTarget.innerHTML ="check-out";
          break;
      }
    }
    let standbyButtonLength = document.querySelectorAll('.standby').length;
    let checkinButtonLength = document.querySelectorAll('.checkin').length;
    let checkoutButtonLength = document.querySelectorAll('.checkout').length;
  
    StandbyNum.innerHTML = standbyButtonLength+"/20";
    CheckinNum.innerHTML = checkinButtonLength+"/20";
    CheckoutNum.innerHTML = checkoutButtonLength+"/20";
  })
}
function eventTarget(str,event){
  const btnTarget = event.target;
  if( str == 'standby'){
    switch (State) {
      case 'standby':
        btnTarget.className = 'standby';
        btnTarget.innerHTML ="stand-by";
        State = 'standby';
        break;
      case 'checkin':
        btnTarget.className = 'standby';
        btnTarget.innerHTML ="stand-by";
        State = 'standby';
        break;
      case 'checkout':
        btnTarget.innerHTML ="stand-by";
        btnTarget.className = 'standby';
        State = 'standby';
        break;
    }
  
  }  
  else if (str == 'checkin'){
    switch (State) {
      case 'standby':
        btnTarget.innerHTML ="check-in";
        btnTarget.className = 'checkin';
        State = 'checkin';
        break;
      case 'checkin':
        btnTarget.className = 'checkin';
        btnTarget.innerHTML ="check-in";
        State = 'checkin';
        break;
      case 'checkout':
        btnTarget.className = 'checkin';
        btnTarget.innerHTML ="check-in";
        State = 'checkin';
        break;
    }
  }
  else{
    switch (State) {
      case 'standby':
        btnTarget.className = 'checkout';
        btnTarget.innerHTML ="check-out";
        State = 'checkout';
        break;
      case 'checkin':
        btnTarget.className = 'checkout';
        btnTarget.innerHTML ="check-out";
        State = 'checkout';
        break;
      case 'checkout':
        btnTarget.className = 'checkout';
        State = 'checkout';
        btnTarget.innerHTML ="check-out";
        break;
    }
  }
  let standbyButtonLength = document.querySelectorAll('.standby').length;
  let checkinButtonLength = document.querySelectorAll('.checkin').length;
  let checkoutButtonLength = document.querySelectorAll('.checkout').length;

  StandbyNum.innerHTML = standbyButtonLength+"/20";
  CheckinNum.innerHTML = checkinButtonLength+"/20";
  CheckoutNum.innerHTML = checkoutButtonLength+"/20";
}

//부모 버튼 요소 알아오기
//li addeventlistener 사용하기
//event target 사용하기