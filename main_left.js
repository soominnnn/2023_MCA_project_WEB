
function room_change(value){
  for( var i = 1; i<=2; i++){
    document.getElementById(i).style.display="none";
  }
  document.getElementById(value).style.display="block";
}
  //룸 상태 변경 버튼 제작
  const button_list = document.getElementById("button_change");
  const list = document.getElementById('list');
  button_list.addEventListener('click',function(){
    if (list.style.display == 'none'){
      list.style.display = 'block';
    }
    else{
      list.style.display = 'none';
    }
  })