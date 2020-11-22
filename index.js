'use strict'

const box = document.querySelector('section');
const boxRect = box.getBoundingClientRect();
const playBtn = document.querySelector('.btn__play');
const stopBtn = document.querySelector('.btn__stop');
const replayBtns = document.querySelectorAll('.btn__replay');
const count = document.querySelector('.count');
const time = document.querySelector('.time');
const modalReplay = document.querySelector('.replay');
const modalLost = document.querySelector('.lost');
const modalWin = document.querySelector('.win');

const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const windSound = new Audio("sound/game_win.mp3");

const playNow = function (sound) {
  if (sound.currentTime > 0) {
    sound.currentTime = 0;
  }
  sound.play();
}
// pause();를 사용하면 버벅이는 느낌이 있고, if문을 상용할 경우 부드럽게 작동.


function createRandomX() {
  const min = Math.ceil(0);
  const max = Math.floor((boxRect.width-80));
  return Math.floor(Math.random() * (max - min)) + min
}
function createRandomY() {
  const min = Math.ceil(480);
  const max = Math.floor((boxRect.height-80));
  return Math.floor(Math.random() * (max - min)) + min
}

function createCarrot(num) {
  const carrots = document.querySelector('.carrots')
  let contents = '';
  for(let i=0; i < num; i++) {
    contents += '<img src="img/carrot.png" alt="carrot" class="carrot">'
  }
  carrots.innerHTML = `${contents}`
  const carrot = document.querySelectorAll('.carrot');
  carrot.forEach((ele) => {
    ele.style.top = `${createRandomY()}px`
    ele.style.left = `${createRandomX()}px`
  });
}

function createBug(num) {
  const bugs = document.querySelector('.bugs')
  let contents = '';
  for(let i=0; i < num; i++) {
    contents += '<img src="img/bug.png" alt="bug" class="bug">'
  }
  bugs.innerHTML = `${contents}`
  const bug = document.querySelectorAll('.bug')
  bug.forEach((ele) => {
    ele.style.top = `${createRandomY()}px`
    ele.style.left = `${createRandomX()}px`
  });
};

function setWinEvnet(id) {
  const carrot = document.querySelectorAll('.carrot');

  count.innerHTML = `10`
  carrot.forEach((ele) => {
    ele.addEventListener('click', () => {
      playNow(carrotSound);
      ele.classList.add('disappear');
      let activeCarrot = document.querySelectorAll('.carrot:not(.disappear)');
      count.innerHTML = `${activeCarrot.length}`;
      if(activeCarrot.length === 0) {
        clearInterval(id);
        bgSound.pause();
        windSound.play();
        modalWin.classList.add('active');
        stopBtn.classList.remove('active');
      };
    });
  });
};

function setLostEvent(id) {
  const bug = document.querySelectorAll('.bug')
  bug.forEach((ele) => {
    ele.addEventListener('click', () => {
      playNow(bugSound);
      clearInterval(id);
      bgSound.pause();
      modalLost.classList.add('active');
      stopBtn.classList.remove('active');
    })
  })
};

function timer() {
  let second = 9;
  time.innerHTML = `00:10`
  const timerId = setInterval(() => {
    time.innerHTML = `00:0${second}`
    second--;
    if (second == -1) {
      clearInterval(timerId);
      bgSound.pause();
      modalLost.classList.add('active');
      alertSound.play();
      stopBtn.classList.remove('active');
      }
  }, 1000);
  stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    bgSound.pause();
  })
  setLostEvent(timerId);
  setWinEvnet(timerId);
}

playBtn.addEventListener('click', () => {
  playBtn.classList.remove('active');
  stopBtn.classList.add('active');
  createCarrot(10);
  createBug(6);
  timer();
  bgSound.play();
})

stopBtn.addEventListener('click', () => {
  stopBtn.classList.remove('active');
  modalReplay.classList.add('active');
  alertSound.play();
})

function addReplayEvent(btn) {
  btn.addEventListener('click', (event) => {
    switch (event.target.nodeName) {
      case 'BUTTON':
        stopBtn.classList.add('active');
        event.target.parentNode.classList.remove('active');
        createCarrot(10);
        createBug(6);
        timer();
        bgSound.play();
        break;
      
      case 'I':
        stopBtn.classList.add('active');
        event.target.parentNode.parentNode.classList.remove('active');
        createCarrot(10);
        createBug(6);
        timer();
        bgSound.play();
        break;
    }
  });
}
replayBtns.forEach(addReplayEvent);