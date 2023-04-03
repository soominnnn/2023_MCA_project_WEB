
function room_change(value){
  for( const i = 1; i<=2; i++){
    document.getElementById(i).style.display="none";
  }
  document.getElementById(value).style.display="block";
}
  //룸 상태 변경 버튼 제작

  function RoomList(num){
    const button_list = document.getElementById("button_change"+num);
    const list = document.getElementById('list'+num);
    button_list.addEventListener('click',function(event){
      const btnTakeTarget = event.target;
      const btnSibling = btnTakeTarget.nextElementSibling;
      if (btnSibling.style.display == 'none'){
        btnSibling.style.display = 'block';
      }
      else{
        btnSibling.style.display = 'none';
      }
    })
  }

for(let i = 1; i<11; i++){
  RoomList(i);
}