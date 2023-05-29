const backArrow = document.querySelector('.arrow');
backArrow.addEventListener('click',function(){
    window.location.href="/UserPage.html";
})

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
    numberP.textContent = count;
  
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
            CartDiv(valuedata[i], valuedata[i+1]);
        }
    }
})