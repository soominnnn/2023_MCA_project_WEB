const backArrow = document.querySelector('.arrow');
backArrow.addEventListener('click',function(){
    window.location.href="/UserPage.html";
})

const ImageFile = [
    './image/set.png',
    './image/RoomItem.png',
    './image/ObathSoap.png',
    './image/ObathBodyrotion.png',
    './image/ObathBodywash.png',
    './image/ObathConditioner.png',
    './image/ObathShampoo.png',
    './image/mouthwasher.png',
    './image/RoomItem3.png',
    './image/BathTowel.png',
    './image/Slipper.png',
    './image/Showerwear.png',
    './image/RoomItem4.png',
    './image/RoomItem2.png',
    './image/Bath2.png',
    './image/Bath1.png',
    './image/OsulocAlgreyTea.png',
    './image/OsulocegreenTea.png',
    './image/kitchenTowel.png',
    './image/HotPack.png',
  ]

  const getImageUrl = (name) => {
    switch (name) {
        case '칫솔/치약 세트':
            return ImageFile[0];
        case '면도기 세트':
            return ImageFile[1];
        case 'O\'bath 비누':
            return ImageFile[2];
        case 'O\'bath 바디로션':
            return ImageFile[3];
        case 'O\'bath 바디워시':
            return ImageFile[4];
        case 'O\'bath 컨디셔너':
            return ImageFile[5];
        case 'O\'bath 샴푸':
            return ImageFile[6];
        case '알로알로 마우스워시':
            return ImageFile[7];
        case '스크럽 샤워타올':
            return ImageFile[8];
        case '바스 타올':
            return ImageFile[9];
        case '슬리퍼':
            return ImageFile[10];
        case '샤워 가운':
            return ImageFile[11];
        case '옷걸이':
            return ImageFile[12];
        case '베니티킷':
            return ImageFile[13];
        case '침구 정리':
            return ImageFile[14];
        case '배게 교체':
            return ImageFile[15];
        case '오설록 제주 얼그레이 티':
            return ImageFile[16];
        case '오설록 순수 녹차':
            return ImageFile[17];
        case '키친 타올':
            return ImageFile[18];
        case '핫팩':
            return ImageFile[19];
    }
};
const CartDiv = (Img, name, count) => {
    const Boxdiv = document.createElement('div');
    Boxdiv.className = 'CartBox';
  
    const BoxImg = document.createElement('img');
    BoxImg.src = Img;
    BoxImg.className = 'itemImg';
  
    const BoxP1 = document.createElement('p');
    BoxP1.textContent = name;
    BoxP1.className = 'itemName';
  
    const BoxP2 = document.createElement('p');
    BoxP2.textContent = '원산지 : 중국';
    BoxP2.className = 'itemWon';
  
    const linediv = document.createElement('div');
    linediv.className = 'LineDiv';

    const numberP = document.createElement('p');
    numberP.className = 'numberP';
    numberP.textContent = count + '개';
  
    Boxdiv.appendChild(BoxImg);
    Boxdiv.appendChild(BoxP1);
    Boxdiv.appendChild(BoxP2);
    Boxdiv.appendChild(linediv);
    Boxdiv.appendChild(numberP);
    document.querySelector('.main').appendChild(Boxdiv);
  };


firebase.database().ref('service/장바구니/101').on('value',function(getData){
    let test = getData.val();
    let count = getData.numChildren();

    if(test != null){
        //배열 변경
        let entries = Object.entries(test);
        let tester = Object.fromEntries(entries);
        let valuedata = Object.values(tester);
        for ( var i = 0; i < count; i+=2){
            CartDiv(getImageUrl(valuedata[i]),valuedata[i], valuedata[i+1]);
        }
        if( document.querySelector('.main').querySelectorAll('.CartBox').length == 0){
            document.querySelector('.footer').style.marginTop= ' 473px'
        }
        else{
            document.querySelector('.footer').style.marginTop = '16px';
        }
    }
})

var permission = Notification.requestPermission();

console.log(permission);

var ros = new ROSLIB.Ros({
    url : 'ws://192.168.50.39:9090'
  });

  var notify = new ROSLIB.Topic ({
    ros : ros,
    name : '/Check',
    messageType : 'std_msgs/String'
  })
  ros.on('connection', function() {
    console.log("연결");
  });
  notify.subscribe((message)=> {
    if(message){
        console.log(message);
// 브라우저 지원 여부 체크
        if (!("Notification" in window)) {
            alert("데스크톱 알림을 지원하지 않는 브라우저입니다.");
        }
        // 데스크탑 알림 권한 요청
        Notification.requestPermission(function (result) {
            // 권한 거절
            if(result == 'denied') {
                Notification.requestPermission();
                alert('알림을 차단하셨습니다.\n브라우저의 사이트 설정에서 변경하실 수 있습니다.');
                return false;
            }
            else if (result == 'granted'){
                new Notification("로봇이 도착했습니다.", {body:'물건을 받아주세요'});
            }
        });
    }
});