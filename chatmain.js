const express = require(`express`);
const app = express();
const fs = require(`fs`);
const url = require(`url`);
const qs = require(`querystring`);
const template = require("./chat.js");
const bodyparser = require(`body-parser`);
const http = require("http").Server(app);
const io = require(`socket.io`)(http);
const db = require(`oracledb`);
const events = require(`events`);

const eventEmitter = new events.EventEmitter();

let id = "";
friendlist = [];
let pw = "";
idcheckresult = false;

let html;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(`.`));
app.use(express.static(__dirname + `fontello-4a737754/css/`));

app.get(`/`, function(req, res) {
  html = template.Loginform();
  res.send(html);
});

app.post(`/loginresult`, (req, res) => {
  loginAsk(req, res);
});

app.get(`/join`, (req, res) => {
  html = template.joinform();
  res.send(html);
});

app.get(`/joinresult`, (req, res) => {
  let reqid = req.query.id;
  console.log(reqid);
  let reqpw = req.query.pw;
  let reqemail = req.query.email + "@" + req.query.domain;
  let reqphone = req.query.phone1 + req.query.phone2 + req.query.phone3;
  // qs.parse(id);
  let info = [];
  info.push(reqid);
  info.push(reqpw);
  info.push(reqemail);
  info.push(reqphone);
  console.log(info);
  memberInsert(info);
  res.redirect("http://localhost:3010/");
});

app.get(`/main`, (req, res) => {
  var _url = req.url;
  // console.log(req.body.id);
  let id = url.parse(_url, true).query.id;
  friendSelect(id);
  // fs.readFileSync("friendlist.txt", "utf-8", (err, friendlist) => {
  //   console.log(friendlist);
  //   html = template.mainform(id, friendlist);
  //   res.send(html);
  // });
  let friendslist = [];
  fs.readFileSync(`friendlist.txt`, "utf-8")
    .split(",")
    .forEach(friend => {
      friendlist.push(friend);
    });

  console.log(friendlist);

  html = template.mainform(id, friendlist);
  res.send(html);
});

app.get(`/chat`, function(req, res) {
  let _url = req.url;
  myid = req.query.id;
  friendid = req.query.friendid;
  console.log("myid = " + myid);
  console.log("friendid = " + friendid);
  html = template.chatSite(myid, friendid);
  res.send(html);
});

const memberInsert = info => {
  db.getConnection(
    {
      user: "scorpionchat",
      password: "scorpionchat",
      connectString: "192.168.30.112:1521/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return;
      }
      let id = info[0];
      let pw = info[1];
      let email = info[2];
      let phone = info[3];

      let sql = "insert into member values(:id, :pw, :email, :phone)";

      var binddata = [id, pw, email, phone];

      // console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        // if (result.rows == reqpw) {
        //   result = true;
        // } else {
        //   result = false;
        // }

        connection.close(err => {
          if (err) {
            console.error(err.message);
          }
          // if (result) {
          //   id = reqid;
          //   res.redirect("/main");
          // } else {
          //   id = "";
          //   res.redirect("/");
          // }
          console.log(info[0]);

          fs.copyFile(
            "./images/kakao.png",
            "./images/" + info[0] + "_image.jpg",
            err => {
              if (err) {
                console.log(err);
              }
              console.log("default profile image copyed");
            }
          );
        });
      });
    }
  );
};

const loginAsk = (req, res) => {
  reqid = req.body.id;
  reqpw = req.body.pw;

  let result;
  db.getConnection(
    {
      user: "scorpionchat",
      password: "scorpionchat",
      connectString: "192.168.30.112:1521/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return;
      }
      var sql = "select pw from member where id=:id";

      var binddata = [reqid];

      // console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        if (result.rows == reqpw) {
          result = true;
        } else {
          result = false;
        }

        connection.close(err => {
          if (err) {
            console.error(err.message);
          }
          if (result) {
            id = reqid;
            // sessionStorage.setItem("myId", id);
            res.redirect("/main?id=" + id);
          } else {
            id = "";
            res.redirect("/");
          }
        });
      });
    }
  );
};

const chatInsert = msg => {
  let info = msg.split("|");
  let result;

  db.getConnection(
    {
      user: "scorpionchat",
      password: "scorpionchat",
      connectString: "192.168.30.112:1521/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return;
      }
      // var sql = "select pw from member where id=:id";
      let sql = "insert into conversation values(:info[0], :info[1], :info[2])";

      var binddata = [info[0], info[1], info[2]];

      // console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        // if (result.rows == reqpw) {
        //   result = true;
        // } else {
        //   result = false;
        // }

        connection.close(err => {
          if (err) {
            console.error(err.message);
          }
          // if (result) {
          //   id = reqid;
          //   res.redirect("/main");
          // } else {
          //   id = "";
          //   res.redirect("/");
          // }
        });
      });
    }
  );
};

const friendSelect = id => {
  let friendlist2 = [];
  db.getConnection(
    {
      user: "scorpionchat",
      password: "scorpionchat",
      connectString: "192.168.30.112:1521/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return;
      }
      var sql = "select friends from friends where account=:id";

      var binddata = [id];

      // console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        connection.close(err => {
          if (err) {
            console.error(err.message);
          }
          // result.rows.forEach(row => {
          //   friendlist2.push(row);
          // });
        });

        fs.writeFile("friendlist.txt", result.rows, "utf-8", err => {
          if (err) {
            console.log(err);
          }
        });
        // result.rows.forEach(row => {
        //   friendlist2.push(row);
        //   // console.log(row);
        // });
        // friendlist = result.rows;
        // // console.log("friendlist = " + result.rows);
        // console.log("2");
        // console.log("friendlist2 = " + friendlist2);
        // // console.log("re")
        // friendlist = friendlist2;
        // return friendlist2;
      });
    }
  );
};

function idcheckfunc(id) {
  let checkresult;
  db.getConnection(
    {
      user: "scorpionchat",
      password: "scorpionchat",
      connectString: "192.168.30.112:1521/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return "error";
      }
      var sql = "select count(*) from member where id=:id";

      var binddata = [id];

      // console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return "error";
        }

        // console.log(result.rows);

        if (result.rows == 0) {
          checkresult = true; // 가입 가능
        } else {
          checkresult = false; //가입 불가능
        }
        // idcheckresult = checkresult;

        connection.close(err => {
          if (err) {
            console.error(err.message);
            return "error";
          }
          // idcheckresult = checkresult;
        });

        fs.writeFile("idcheck.txt", result.rows, "utf-8", err => {
          if (err) {
            console.log(err);
          }
        });

        // console.log("1" + checkresult);

        // checkfunction(checkresult);
        // idcheckresult = checkresult;
        // return checkresult;
      });
      // console.log("2" + checkresult);
    }
  );
}

const friendadd = list => {
  db.getConnection(
    {
      user: "scorpionchat",
      password: "scorpionchat",
      connectString: "192.168.30.112:1521/xe"
    },
    (err, connection) => {
      db.autoCommit = true;
      if (err) {
        console.error(err);
        return;
      }

      let account = list[0];
      let friends = list[1];

      let sql = "insert into friends values(:account, :friends)";

      var binddata = [account, friends];

      // console.log(sql);

      connection.execute(sql, binddata, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        connection.close(err => {
          if (err) {
            console.error(err.message);
          }
        });
      });
    }
  );
};

const birth = `19931231`;

io.on("connect", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
    // chatInsert(msg);
  });

  socket.on("idcheck", function(id) {
    idcheckfunc(id);
    fs.readFile("idcheck.txt", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        io.emit("idcheckresult", data);
      }
    });

    // console.log("idcheck2");
    // console.log(idcheckfunc(id));
    // idcheckresult = idcheckfunc(id);
    // console.log("idcheck3");
    // console.log("idcheckresult = " + idcheckresult);
    // io.emit("idcheckresult", idcheckresult);
    // chatInsert();
    // chatSelect();
  });

  socket.on("friendadd", function(list) {
    console.log("2");
    friendadd(list);
    console.log("3");
    friendSelect(list[0]);
    console.log("4");
    io.emit("friendaddresult", list[0]);
    console.log("5");
  });
});

http.listen(birth - 19928221, () => {
  console.log("listening on *:3010");
});

/*
create table member(
id varchar2(20) constraint mem_id_pk primary key,
pw varchar2(20) constraint mem_pw_nn not null,
email varchar2(30) constraint mem_email_uk unique,
phone varchar2(11) constraint mem_phone_uk unique
);

create table friends(
account varchar2(20) constraint friends_account_fk references member(id),
friends varchar2(20) constraint friends_friends_fk references member(id)
);

create table conversation(
sender varchar2(20) constraint conv_sender_fk references member(id),
taker varchar2(20) constraint conv_taker_fk references member(id),
messege varchar2(4000) constraint conv_messege_nn not null
);


*/
