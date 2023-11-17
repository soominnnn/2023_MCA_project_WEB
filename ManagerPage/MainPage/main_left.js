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
  RoomList('2'+i);
}

let State = 'standby';
const StandbyNum = document.getElementsByClassName('standbyNum')[0];
const CheckinNum = document.getElementsByClassName('checkinNum')[0];
const CheckoutNum = document.getElementsByClassName('checkoutNum')[0];

function eventTarget(str,num){
  let buttonNum = document.getElementById('buttonP'+num);
  let buttonChangeNum = document.getElementById('button_change'+num);
  if( str == 'standby'){
    switch (State) {
      case 'standby':
        buttonNum.className = 'standby';
        buttonNum.innerHTML ="Stand-by";
        State = 'standby';
        buttonChangeNum.style.backgroundColor ='#A6A6A6';
        break;
      case 'checkin':
        buttonNum.className = 'standby';
        buttonNum.innerHTML ="Stand-by";
        buttonChangeNum.style.backgroundColor = '#A6A6A6';
        State = 'standby';
        break;
      case 'checkout':
        buttonNum.innerHTML ="Stand-by";
        buttonNum.className = 'standby';
        buttonChangeNum.style.backgroundColor = '#A6A6A6';
        State = 'standby';
        break;
    }
  
  }  
  else if (str == 'checkin'){
    switch (State) {
      case 'standby':
        buttonNum.innerHTML ="Check-in";
        buttonNum.className = 'checkin';
        buttonChangeNum.style.backgroundColor ='#017FC7';
        State = 'checkin';
        break;
      case 'checkin':
        buttonNum.className = 'checkin';
        buttonNum.innerHTML ="Check-in";
        buttonChangeNum.style.backgroundColor ='#017FC7';
        State = 'checkin';
        break;
      case 'checkout':
        buttonNum.className = 'checkin';
        buttonNum.innerHTML ="Check-in";
        buttonChangeNum.style.backgroundColor ='#017FC7';
        State = 'checkin';
        break;
    }
  }
  else{
    switch (State) {
      case 'standby':
        buttonNum.className = 'checkout';
        buttonNum.innerHTML ="Check-out";
        buttonChangeNum.style.backgroundColor ='#FE6161';
        State = 'checkout';
        break;
      case 'checkin':
        buttonNum.className = 'checkout';
        buttonNum.innerHTML ="Check-out";
        buttonChangeNum.style.backgroundColor ='#FE6161';
        State = 'checkout';
        break;
      case 'checkout':
        buttonNum.className = 'checkout';
        buttonChangeNum.style.backgroundColor ='#FE6161';
        State = 'checkout';
        buttonNum.innerHTML ="Check-out";
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