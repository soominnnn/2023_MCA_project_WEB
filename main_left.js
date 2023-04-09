let StandbyCount = 20;
let CheckinCount = 0;
let CheckoutCount = 0;

let State = 'standby';



function standbyCounting(){
  StandbyCount++;
};
function standbyMinus(){
  StandbyCount--;
}
function checkinCounting(){
  CheckinCount++;
};
function checkinMinus(){
  CheckinCount--;
}
function checkoutCounting(){
  CheckoutCount++;
};
function checkoutMinus(){
  CheckoutCount--;
}

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
const StandbyNum = document.getElementsByClassName('standbyNum')[0];
const CheckinNum = document.getElementsByClassName('checkinNum')[0];
const CheckoutNum = document.getElementsByClassName('checkoutNum')[0];

function eventTargetStandby (str,i){
  const standbyButton = document.getElementsByClassName('buttonP'+i)[0];
  const ButtonStyle = document.getElementById('button_change'+i);
  if(str == 'standby'){
    standbyButton.innerHTML = "Stand-by";
    ButtonStyle.style.backgroundColor = '#A6A6A6';
    if(State = 'checkin'){
      checkinMinus();
      standbyCounting();
      StandbyNum.innerHTML = StandbyCount+'/20';
      CheckinNum.innerHTML = CheckinCount+'/20';
      State = "standby";
      
    }
    else if(State = 'checkout'){
      checkoutMinus();
      standbyCounting();
      StandbyNum.innerHTML = StandbyCount+'/20';
      CheckoutNum.innerHTML = CheckoutCount+'/20';
      State = "standby";
    }
    else{State = "standby";}
  }

  else if (str == 'checkin'){
    standbyButton.innerHTML = "Check-in";
    ButtonStyle.style.backgroundColor = '#017FC7';
    if(State = 'standby'){
      standbyMinus();
      checkinCounting();
      CheckinNum.innerHTML = CheckinCount+'/20';
      StandbyNum.innerHTML = StandbyCount+'/20';
      State = "checkin";
    }
    else if(State = 'checkout'){
      checkoutMinus();
      checkinCounting();
      CheckinNum.innerHTML = CheckinCount+'/20';
      CheckoutNum.innerHTML = CheckoutCount+'/20';
      State = "checkin";
    }
    else{State = "checkin";}
  }
  else{
    standbyButton.innerHTML = "Check-out";
    ButtonStyle.style.backgroundColor = '#FE6161';
    if(State = 'standby'){
      standbyMinus();
      checkoutCounting();
      CheckoutNum.innerHTML = CheckoutCount+'/20';
      StandbyNum.innerHTML = StandbyCount+'/20';
      State = "checkout";
    }
    else if(State = 'checkin'){
      checkinMinus();
      checkoutCounting();
      CheckoutNum.innerHTML = CheckoutCount+'/20';
      CheckinNum.innerHTML = CheckinCount+'/20';
      State = "checkout";
    }
    else{State = "checkout";}
  }
}
