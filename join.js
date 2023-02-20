function data(){
    const idValue = document.getElementById("idd").value;
    const passValue = document.getElementById("pass").value;
    const passreValue = document.getElementById("passre").value;
    const nameeValue = document.getElementById("namee").value;
    const emailValue = document.getElementById("email").value;
    const teamValue = document.getElementById("team").value;
    const phonenumValue = document.getElementById("phonenum").value;

    if (idValue =="")
    {
      alert("아이디를 입력해주세요.");
      return false;
    }
    if (passValue == "")
    {
      alert("비밀번호를 입력해주세요.");
      return false;
    }
    if (passreValue == "")
    {
      alert("비밀번호를 재입력해주세요.");
      return false;
    }
    if (passreValue != passValue)
    {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if(nameeValue =="")
    {
      alert("이름을 입력해주세요.");
      return false;
    }
    if(emailValue == "")
    {
      return false;
    }
    if(teamValue == "")
    {
      alert("팀명을 입력해주세요.");
      return false;
    }
    if(phonenumValue == "")
    {
      alert("전화번호를 입력해주세요.")
      return false;
    }
    if(idValue != "" && passValue != "" && nameeValue !="" && emailValue != "" && teamValue != "" && phonenumValue != "" ){
      function fire(pushID){
        firebase.database().ref('join/'+pushID).set({
          id:idValue,
          pass:passValue,
          name:nameeValue,
          email:emailValue,
          team:teamValue,
          phonenum:phonenumValue
        });
      };
      fire(idValue);
      alert("회원가입이 정상적으로 되었습니다. 반갑습니다 " +nameeValue +"님");
    }
  }
