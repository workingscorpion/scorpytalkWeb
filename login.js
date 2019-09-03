const inputid = document.querySelector("#inputid");
const inputpw = document.querySelector("#inputpw");
const button = document.querySelector("#submitbnt");
const joinbnt = document.querySelector("#joinbnt");

joinbnt.addEventListener("click", e => {
  e.preventDefault();
  window.location.href = "/join";
});

window.addEventListener("keyup", e => {
  changeButtonColor();
});

const changeButtonColor = () => {
  if (inputid.value != "") {
    if (inputpw.value.length >= 4) {
      button.disabled = false;
      button.style.color = "#ffffff";
      button.style.backgroundColor = "#594941";
    } else {
      button.style.color = "#acacac";
      button.style.backgroundColor = "#f6f6f6";
    }
  }
};
