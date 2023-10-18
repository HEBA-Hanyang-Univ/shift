var activeButtons = [];
var mbtiButtons = document.querySelectorAll('.mbti');

// 2개의 버튼을 누르고, 그 이상으로 클릭되면 경고창이 뜨게 하는 함수
function clickTwoButtonHandler() {
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
    alert('최대 2개의 버튼만 클릭할 수 있습니다');
  }
}

for(var i = 0; i< mbtiButtons.length; i++) {
  mbtiButtons[i].addEventListener('click', clickTwoButtonHandler);
}

document.getElementById('next').addEventListener('click', (e) => {
  e.preventDefault();
  if (activeButtons.length < 1) {
    alert('최소 1개의 버튼을 선택해주세요.');
    return;
  }
  let selectedButtons = [];
  for(var i = 0; i<activeButtons.length; i++) {
    selectedButtons.push(activeButtons[i].className.split(' ')[1].split('-')[1]);
  }
  fetch('./self-question', {
    method:'POST',
    headers: { "Content-type": "application/json",},
    body: JSON.stringify({
      selected: selectedButtons,
    }),
  })
  .then(href=>{
    alert(selectedButtons + ' submit');
    window.location.href="/";
  })
});
