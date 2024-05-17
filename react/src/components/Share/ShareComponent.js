
export function ShareTestUrl({tid, nickname}) {
  ShareNavigator('SHIFT', nickname + '님의 MZ 자기객관화 테스트', 'https://shift2me.com/guest/' + tid);
}

export function ShareNavigator(title, text, url) {
  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url,
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(title + '\n' + text + '\n' + url).then(() => {
      alert('클립보드에 복사되었습니다.');
    })
  } else {
    alert('공유하기 기능을 지원하지 않는 브라우저입니다.');
  }

  return null;
}
