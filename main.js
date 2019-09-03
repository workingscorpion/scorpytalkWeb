const adimage = document.querySelector("#adimage");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const icon1 = document.querySelector(".icon-user");
const icon2 = document.querySelector(".icon-comment");
const icon3 = document.querySelector(".icon-ellipsis");
const icon4 = document.querySelector(".icon-menu");
const title = document.querySelector("#title");
const invisible = document.querySelector("#invisible");
const inputsearch = document.querySelector("#inputsearch");
const searchbar = document.querySelector(".searchbar");
const searchicon = document.querySelector(".icon-search");
const addfriendbutton = document.querySelector(".icon-user-plus");
const outdiv = document.querySelector("#outdiv");
const friendid = document.querySelector("#friendid");
const idsearchbox = document.querySelector("#idsearchbox");
const lists = document.querySelectorAll(".list");
const every = document.querySelector(".every");
const whole = document.querySelector(".whole");
const nav = document.querySelector(".nav");
const exitbutton = document.querySelector("#exitbutton");
const friendsnumber = document.querySelector("#friendsnumber");
const myId = document.querySelector("#myId");
const hiddensubmit = document.querySelector("#hiddensubmit");
const friendform = document.querySelector("#friendform");

let i = 0;
let visible = false;
let friendvisible = false;
let friendcount = 0;
const userid = myId.innerHTML;

let imageList = [
  "images/ad1.png",
  "images/ad2.png",
  "images/ad3.png",
  "images/ad4.png",
  "images/ad5.png",
  "images/ad6.png",
  "images/ad7.png"
];

setInterval(adchange, 3000);

function adchange() {
  i++;
  if (i >= 7) {
    i = 0;
  }
  //   console.log(i);
  adimage.src = imageList[i];
}

// button1.addEventListener("click", e => {
//   e.preventDefault();
//   icon1.style.color = "black";
//   icon2.style.color = "#b5b5b6";
//   icon3.style.color = "#b5b5b6";
//   icon4.style.color = "#b5b5b6";
//   title.innerHTML = "친구";
//   inputsearch.placeholder = "이름 검색";
// });

// button2.addEventListener("click", e => {
//   e.preventDefault();
//   icon2.style.color = "black";
//   icon1.style.color = "#b5b5b6";
//   icon3.style.color = "#b5b5b6";
//   icon4.style.color = "#b5b5b6";
//   title.innerHTML = "채팅";
//   inputsearch.placeholder = "채팅방 이름, 참여자 검색";
// });

// button3.addEventListener("click", e => {
//   e.preventDefault();
//   icon3.style.color = "black";
//   icon2.style.color = "#b5b5b6";
//   icon1.style.color = "#b5b5b6";
//   icon4.style.color = "#b5b5b6";
//   title.innerHTML = "더보기";
// });

// icon4.addEventListener("click", e => {
//   e.preventDefault();
//   icon4.style.color = "black";
//   icon2.style.color = "#b5b5b6";
//   icon3.style.color = "#b5b5b6";
//   icon1.style.color = "#b5b5b6";

//   if (visible == false) {
//     visible = true;
//     invisible.style.display = "block";
//     icon4.style.color = "black";
//   } else {
//     visible = false;
//     invisible.style.display = "none";
//     icon4.style.color = "#b5b5b6";
//   }
// });

window.addEventListener("click", event => {
  if (document.activeElement == inputsearch) {
    // console.log("hey");
    searchbar.style.border = "1px solid gray";
    searchicon.style.color = "black";
  } else {
    searchbar.style.border = "1px solid #ececed";
    searchicon.style.color = "#c7c7c7";
  }
});

const handleFriendButton = visible => {
  if (!visible) {
    outdiv.style.display = "block";
    whole.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    lists.forEach(list => {
      list.style.backgroundColor = "#7f7f7f";
    });
    searchbar.style.backgroundColor = "#7f7f7f";
    inputsearch.style.backgroundColor = "#7f7f7f";
  } else {
    outdiv.style.display = "none";
    whole.style.backgroundColor = "white";
    lists.forEach(list => {
      list.style.backgroundColor = "white";
    });
    searchbar.style.backgroundColor = "white";
    inputsearch.style.backgroundColor = "white";
  }
};

addfriendbutton.addEventListener("click", e => {
  handleFriendButton(false);
  // lists.forEach(list => {});
});

exitbutton.addEventListener("click", e => {
  handleFriendButton(true);
});

lists.forEach(list => {
  list.addEventListener("click", () => {
    // console.log(list.textContent.trim());
    let openhref =
      "http://192.168.30.112:3010/chat?id=" +
      userid +
      "&friendid=" +
      list.textContent.trim();
    console.log(openhref);
    // location.href = openhref;
    window.open("about:blank").location.href = openhref;
    // window.open(openhref, "", "width:500px,height:700px");
  });
});

hiddensubmit.addEventListener("click", e => {
  e.preventDefault();

  let list = [];
  // console.log(myId.innerHTML);
  // console.log(friendid.value);

  list.push(myId.innerHTML);
  list.push(friendid.value);
  var socket = io();
  socket.emit("friendadd", list);
  console.log("6");
  socket.on("friendaddresult", function(msg) {
    console.log("heyhey");

    location.href = "/main?id=" + msg;
  });
});

// window.addEventListener("load", () => {
//   let phrase = "친구 " + friendcount;
//   friendsnumber.innerHTML = phrase;
// });
