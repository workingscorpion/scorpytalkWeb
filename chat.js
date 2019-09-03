module.exports = {
  chatSite: function(id, friendid) {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Chatting</title>
    <link rel="stylesheet" href="chatting.css" />
  </head>
  <body>
  <header>
  <img src="images/${friendid}_image.jpg" alt="" id="friendImage" />
  <span id="friendId">${friendid}</span>
</header>
<main>
    <div id="chat-contents">
      <ul id="messages"></ul>
    </div>
</main>
<footer>
<div id="chat-input">
<form action="">
  <span>
    <input
      type="text"
      name="description"
      id="inputtext"
      autocomplete="off"
    />
    <button id="buttonsubmit">전송</button>
  </span>
</form>
</div>
</footer>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    <script>
      $(function() {
        var socket = io();
        $("form").submit(function() {
          socket.emit(
            "chat message",
            "${id}" + " : "+ $("#inputtext").val()
          );
          $("#inputtext").val("");
          return false;
        });
        $("form").submit(function() {
          socket.emit(

            "db message",
            "${id}" + " | " +  "${friendid}" +"|"+ $("#inputtext").val()
          );
          $("#inputtext").val("");
          return false;
        });
        socket.on("chat message", function(msg) {
          $("#messages").append($("<li>").text(msg));
        });
        
      });
    </script>
  </body>
</html>


    
    `;
  },
  Loginform: function() {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link rel="stylesheet" href="loginstyle.css" />
  </head>
  <body>
    <div id="imagediv">
      <img src="images/kakao.png" alt="" />
    </div>
    <div id="inputdiv">
      <form action="/loginresult" method="POST">
        <span
          ><input
            type="text"
            name="id"
            placeholder="아이디"
            id="inputid"/></span
        ><br />
        <span
          ><input
            type="password"
            name="pw"
            placeholder="비밀번호"
            id="inputpw"/></span
        ><br />

        <input type="submit" value="로그인" id="submitbnt" disabled />
        <button id="joinbnt">아직 ID가 없으세요?</button>
      </form>
    </div>

    <script src="login.js"></script>
  </body>
</html>

    
`;
  },
  joinform: () => {
    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>JoinForm</title>
    <link rel="stylesheet" href="joinstyle.css" />
  </head>
  <body>
    <form action="/joinresult" method="POST">
      <span id="titlespan">Welcome to ScorpyTalk</span>
      <span class="outerspan">
        ID
        <span class="innerspan"
          ><input
            type="text"
            name="id"
            class="inputinfo"
            id="inputid"
            placeholder="6자리 이상"
          />
          <button id="idcheck">중복 검사</button>
        </span>
        <span class="alert" id="alertid">6자리 이상 입력해주세요</span>
      </span>

      <span class="outerspan">
        PW
        <span class="innerspan"
          ><input
            type="password"
            name=""
            class="inputinfo"
            id="inputpw"
            placeholder="8자리 이상"
        /></span>
        <span class="alert" id="alertpw">8자리 이상 영문자,숫자, 특수문자</span>
      </span>
      <span class="outerspan">
        check
        <span class="innerspan"
          ><input
            type="password"
            name=""
            class="inputinfo"
            id="inputcheck"
            placeholder="비밀번호 확인"
        /></span>
        <span class="alert" id="alertcheck">두 개의 비밀번호가 다릅니다</span>
      </span>

      <span class="outerspan">
        email
        <span class="innerspan" style="background-color: #ffeb33;border:none;">
          <input type="text" name="" class="inputemail" id="inputemail" />
          @
          <select name="selectemail" id="selectemail">
            <option value="enter">직접 입력</option>
            <option value="naver.com" selected>naver.com</option>
            <option value="hanmail.net">hanmail.net</option>
            <option value="nate.com">nate.com</option>
            <option value="gmail.com">gmail.com</option>
          </select>
          <input type="text" name="domain" id="inputmailaddr" value="@naver.com"/>
          <button id="emailbutton">주소 선택</button>
        </span>
        <span class="alert" id="alertemail"></span>
      </span>
      <span class="outerspan">
        phone<span class="innerspan" id="phonespan">
          <select name="phone1" id="selectphone">
            <option value="010">010</option>
            <option value="010">011</option>
            <option value="010">016</option>
            <option value="010">018</option>
            <option value="010">019</option>
          </select>
          -
          <input
            type="tel"
            name="phone2"
            class="inputtel"
            id="inputphone2"
            maxlength="4"
          />-
          <input
            type="tel"
            name="phone3"
            class="inputtel"
            id="inputphone3"
            maxlength="4"
          />
        </span>
        <span class="alert" id="alertphone"></span>
      </span>

      <span class="outerspan" id="lastspan">
        <input type="submit" value="회원가입" id="submitbtn" />
        <input type="submit" value="취소" id="canclebtn" />
      </span>
    </form>
    <script src="join.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
  </body>
</html>


    `;
  },
  mainform: (id, friendlist) => {
    let form = ``;
    friendlist.forEach(friend => {
      form += `<button class="list">
              <img src="images/${friend}_image.jpg" alt="" class="friendImage" />
              <span class="friendId">${friend}</span>
            </button>`;
    });
    console.log(form);

    return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <link rel="stylesheet" href="fontello-4a737754/css/fontello.css" />
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <div class="every">
      <div class="whole">
        <div class="center">
          <header style="margin-top: 20px;">
            <span id="title"> 친구</span>
            <button class="icon-user-plus" title="친구 추가"></button>
            <!--<button class="icon-menu icon" title="메뉴"></button>-->
            <br />
            <span class="searchbar">
              <i class="icon-search"></i>
              <input type="text" placeholder="이름검색" id="inputsearch" />
            </span>
          </header>
          <main>
            <div id="myProfil">
              <img src="images/${id}_image.jpg" alt="" id="myImage" />
              <span id="myId">${id}</span>
            </div>
            <div id="friendslist">
              <span id="friendsnumber">내 친구</span>
              ${form}
            </div>
          </main>
        </div>
      </div>
      <footer>
        <img id="adimage" src="images/ad1.PNG" alt="hey" />
      </footer>
      <div id="invisible">
        <div id="menu">
          <button id="menubutton1" class="menubutton">친구 추가</button>
          <button id="menubutton2" class="menubutton">스콜피온톡 정보</button>
          <button class="menubutton">로그아웃</button>
          <button class="menubutton">종료</button>
        </div>
      </div>

      <div id="outdiv">
        <div id="addfriend" style="background-color: white">
          <span id="addfriendtitle">
            친구 추가
            <button id="exitbutton">X</button>
          </span>
          <span id="searchtitle">ID 검색</span>
          <div>
            <form action="" id="friendform">
              <span id="idsearchbox">
                <i class="icon-search"></i>

                <input
                  type="text"
                  name=""
                  id="friendid"
                  placeholder="아이디로 친구 찾기"
                />
              </span>
              <input type="submit" value="친구 추가" id="hiddensubmit" />
            </form>
          </div>
        </div>
      </div>
    </div>
    <script src="main.js"></script>
    <script src="/socket.io/socket.io.js"></script>
  </body>
</html>




    `;
  }
};
