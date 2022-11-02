const socketIo = require('socket.io');
const express = require('express');
const Http = require('http');
const { Router } = require('express');

//express는 http를 기반으로 만ㄷ르어 진 것이기때문에 , express 는 http 모듈을 상속받는다. express 가 http의 자식같은 개념

const app = express();
const http = Http.createServer(app); // 다른 http서버를 받아서 확장할 수 있게 만드는 것

const io = socketIo(http, {
  // socket 은 자동으로 서버를 열어줬는데, http는 그렇지 않기때문에 listen으로 서버를 실행시켜줘야 한다.
  cors: {
    origin: '*', // 여기에서 지정해주는 도메인만 내 서버로 연결을 해줄거다 완벽하게 같은 도메인이면 똑같이 접속 가능
    methods: ['GET', 'POST'],
  },
});

app.get('/test', (req, res) => {
  // 익스프레스가 켜져있는지 .get으로 확인
  res.send('익스프레스는 잘 켜져 있습니다.');
});

http.listen(3000, () => {
  console.log('서버가 실행되었습니다.');
});

io.on('connection', (socket) => {
  console.log(' 연결이 되었습니다.');

  socket.send('너 연결 잘 됐어'); // socket.send를 사용하면 무조건 프론트 측에서 message로 받는곳으로 보내게 되는것.

  socket.emit('customEventName', '새로운 이벤트 인가? '); // socket.emit을 사용하면 뒤쪽 첫번째 인자로 들어오는 값의 이름으로 이벤트를 생성 할 수 있다.
});
