function modal(){

}
//버튼 클릭 시 로그인 함수 실행
function login(){

    const idValue = document.getElementById("iddd").value;
    const passValue = document.getElementById("password").value;
    console.log(idValue);
    console.log(passValue);
    firebase.database().ref('join/'+idValue+'/'+'id').on('value',function(getData){
        var data = getData.val();
        console.log(data);
        if(data == idValue){
            firebase.database().ref('join/'+passValue+'/'+'pass').on('value',function(getData){
                var data = getData.val();
                if(data == passValue){
                    location.href="main.html";
                }
                else{
                    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
                }
            })
        }
        else{
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    });
};
