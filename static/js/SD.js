var activeButtons = [];

function clickButtonHandler() {
  if (activeButtons.includes(this)) {
    // 이미 활성화된 버튼을 다시 클릭하면 해제
    this.classList.remove('button-active');
    var index = activeButtons.indexOf(this);
    activeButtons.splice(index, 1);
  } else if (activeButtons.length < 2) {
    // 아직 2개의 버튼을 선택하지 않았다면 버튼을 활성화
    this.classList.add('button-active');
    activeButtons.push(this);
  } else {
    alert('2개의 버튼만 클릭할 수 있습니다');
  }
}

var mbtiButtons = document.querySelectorAll('.mbti');

for(var i = 0; i< mbtiButtons.length; i++) {
  mbtiButtons[i].addEventListener('click', clickButtonHandler);
}