const inputid = document.querySelector("#inputid");
const inputpw = document.querySelector("#inputpw");
const inputcheck = document.querySelector("#inputcheck");
const inputemail = document.querySelector("#inputemail");
const inputphone = document.querySelector("#inputphone");
const submitbtn = document.querySelector("#submitbtn");
const canclebtn = document.querySelector("#canclebtn");
const alertid = document.querySelector("#alertid");
const alertpw = document.querySelector("#alertpw");
const alertcheck = document.querySelector("#alertcheck");
const alertemail = document.querySelector("#alertemail");
const alertphone = document.querySelector("#alertphone");
const inputemailaddr = document.querySelector("#inputmailaddr");
const selectemail = document.querySelector("#selectemail");
const emailbutton = document.querySelector("#emailbutton");
const idcheckbutton = document.querySelector("#idcheck");

let idcheck = false;
let pwcheck = false;
let checkcheck = false;
let emailcheck = false;
let phonecheck = false;

window.addEventListener("keyup", event => {
  if (inputid.value.length > 6) {
  }
  inputid.value.length;
});

selectemail.addEventListener("change", () => {
  if (selectemail.value == "enter") {
    inputemailaddr.value = "";
    inputemailaddr.style.display = "inline-block";
    emailbutton.style.display = "inline-block";
    selectemail.style.display = "none";
  } else {
    inputemailaddr.value = selectemail.value;
  }
});

emailbutton.addEventListener("click", e => {
  e.preventDefault();
  inputemailaddr.style.display = "none";
  emailbutton.style.display = "none";
  selectemail.style.display = "inline-block";
  selectemail.getElementsByTagName("option")[1].selected = "selected";
});

canclebtn.addEventListener("click", e => {
  e.preventDefault();
  location.href = "http://192.168.219.102:3010/";
});

submitbtn.addEventListener("click", e => {
  e.preventDefault();
  if (inputid.value.length < 6) {
    alertid.style.display = "block";
    alertid.innerHTML = "6자리 이상 입력해주세요";
  } else {
    alertid.style.display = "none";
  }
  if (inputpw.value.length < 8) {
    alertpw.innerHTML = "8자리 이상 입력해주세요";
    alertpw.style.display = "block";
  } else {
    alertpw.style.display = "none";
  }
  if (inputpw.value != inputcheck.value) {
    alertcheck.style.display = "block";
  } else {
    alertcheck.style.display = "none";
  }
  if (idcheck == true) {
    openhref =
      "http://192.168.30.112:3010/joinresult?id=" +
      inputid.value +
      "&pw=" +
      inputpw.value +
      "&email=" +
      inputemail.value +
      "&domain=" +
      inputemailaddr.value +
      "&phone1=" +
      selectphone.value +
      "&phone2=" +
      inputphone2.value +
      "&phone3=" +
      inputphone3.value;
    console.log("openhref = " + openhref);
    location.href = openhref;
  }
});

idcheckbutton.addEventListener("click", e => {
  // e.preventDefault();
  e.preventDefault();
  if (inputid.value.length < 6) {
    alertid.innerHTML = "아이디는 6자리 이상이여야 합니다";
    alertid.style.display = "block";
  } else {
    alertid.style.display = "none";

    var socket = io();

    socket.emit("idcheck", inputid.value);
    // console.log("idcheck1");
    socket.on("idcheckresult", function(msg) {
      // console.log("idcheck5");
      // console.log(msg);
      // if (msg == 0) {
      //   idcheckresult = true;
      //   // console.log("idcheck6");
      // } else {
      //   idcheckresult = false;
      //   // console.log("idcheck7");
      // }
      let idcheckresult = msg == 0 ? true : false;

      if (idcheckresult == true) {
        // console.log("1");

        idcheck = true;
        alertid.innerHTML = "사용 가능합니다.";
        alertid.style.display = "block";
      } else {
        // console.log("2");
        alertid.innerHTML = "이미 존재하는 ID입니다.";
        alertid.style.display = "block";
      }

      // idcheckresult = msg;
      // console.log();
    });

    // console.log("idcheckresult = " + idcheckresult);
  }
});
