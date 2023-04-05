let StandbyCount = 20;
let CheckinCount = 0;
let CheckoutCount = 0;

let State = '';



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

function eventTargetStandby (str){
const standby = document.getElementsByClassName('standOne')[0];
const StandbyNum = document.getElementsByClassName('standbyNum')[0];
const CheckinNum = document.getElementsByClassName('checkinNum')[0];
const CheckoutNum = document.getElementsByClassName('checkoutNum')[0];
    if( str == 'standby'){
      console.log(State);
      standby.innerHTML = 'Stand-by';
      State = 'standby';
      if(State != 'standby'){
        if(State == 'checkin'){
          standbyMinus();
          checkinCounting();
          StandbyNum.innerHTML = (StandbyCount+'/20');
          CheckinNum.innerHTML = (CheckinCount+'/20');
        }
        else if(State == 'checkout'){
          standbyMinus();
          checkoutCounting();
          StandbyNum.innerHTML = (StandbyCount+'/20');
          CheckoutNum.innerHTML = (CheckoutCount + '/20');
        }
        else{}
      }
      else{}
    }

    else if( str == 'checkin'){
      standby.innerHTML = 'Check-in';
      State = 'checkin';
      if(State != 'checkin'){
        if(State == 'standby'){
          standbyCounting();
          checkinMinus();
          StandbyNum.innerHTML = (StandbyCount+'/20');
          CheckinNum.innerHTML = (CheckinNum+'/20');
        }
        else if(State == 'checkout'){
          checkoutCounting();
          checkinMinus();
          CheckinNum.innerHTML = (CheckinNum+'/20');
          CheckoutNum.innerHTML = (CheckoutNum+'/20');
        }
        else{}
      }
      else{}
    }

    else {
      standby.innerHTML = 'check-out'
      State = 'checkout';
      if(State != 'checkout'){
        if(State == 'standby'){
          standbyCounting();
          checkoutMinus();
          StandbyNum.innerHTML = (StandbyCount+'/20');
          CheckoutNum.innerHTML = (CheckoutNum+'/20');
        }
        else if(State = 'checkin'){
          checkoutMinus();
          checkinCounting();
          CheckinNum.innerHTML = (CheckinNum+'/20');
          CheckoutNum.innerHTML = (CheckoutNum+'/20');
        }
        else{}
      }
      else{}
    }
}