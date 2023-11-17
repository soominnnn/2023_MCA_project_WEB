class Manage_Join {
  constructor() {
    this.ID_VALUE = document.getElementById('idd').value;
    this.PASSWORD_VALUE = document.getElementById('pass').value;
    this.RE_PASSWORD_VALUE = document.getElementById('passre').value;
    this.NAME_VALUE = document.getElementById('namee').value;
    this.EMAIL_VALUE = document.getElementById('email').value;
    this.PHONE_NUMBER_VALUE = document.getElementById('phonenum').value;
  }
  
  sendToFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyCAT7bkhzoDUEMN7RaYUx9ZyRJyhs4yP0Q",
      authDomain: "project1-6dfc7.firebaseapp.com",
      databaseURL: "https://project1-6dfc7-default-rtdb.firebaseio.com",
      projectId: "project1-6dfc7",
      storageBucket: "project1-6dfc7.appspot.com",
      messagingSenderId: "1086482242380",
      appId: "1:1086482242380:web:7ef4b2d6b3c2a886fc8de9",
      measurementId: "G-FQY04VY3MQ"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.database().ref('join/' + this.ID_VALUE).set({
      id:this.ID_VALUE,
      pass:this.PASSWORD_VALUE,
      name:this.NAME_VALUE,
      email:this.EMAIL_VALUE,
      phonenum:this.PHONE_NUMBER_VALUE
    })
  }

  validateOfValue() {
    if (this.ID_VALUE === '') {
      alert ('아이디를 입력해주세요.');
      return false;
    }
    if (this.PASSWORD_VALUE === '') {
      alert('비밀번호를 입력해주세요.');
      return false;
    }
    if (this.RE_PASSWORD_VALUE === '')
    {
      alert('비밀번호를 재입력해주세요.');
      return false;
    }
    if (this.PASSWORD_VALUE !== this.RE_PASSWORD_VALUE)
    {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (this.NAME_VALUE === '')
    {
      alert ('이름을 입력해주세요.');
      return false;
    }
    if (this.EMAIL_VALUE === '')
    {
      alert('이메일을 입력해주세요.');
      return false;
    }
    if (this.PHONE_NUMBER_VALUE === '')
    {
      alert('전화번호를 입력해주세요.');
      return false;
    } else {
      this.sendToFirebase();
      return alert(`회원가입이 정상적으로 진행되었습니다. 반갑습니다. ${this.ID_VALUE}님`);
    }
  }
}

function onClickEvent () {
  const MANAGE_JOIN = new Manage_Join();
  MANAGE_JOIN.validateOfValue();
}

