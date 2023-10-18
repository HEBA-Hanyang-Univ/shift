var activeButtons = [];
var mbtiButtons = document.querySelectorAll('.mbti');

const radioContainer = document.getElementById('radioContainer');

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

function handleRadioChange(event) {
  const label = event.target.closest('label');
  const labels = radioContainer.querySelectorAll('label');
  labels.forEach((l) => {
    l.style.backgroundColor = '';
  });

  label.style.backgroundColor = '#ccafd9'
}

const radioButtons = radioContainer.querySelectorAll('input[type="radio"]');
radioButtons.forEach((radio) => {
  radio.addEventListener('change', handleRadioChange);
})