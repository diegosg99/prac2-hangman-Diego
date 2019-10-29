const hangmanView = (() => {
  const GUI = {
    lifes: document.getElementById('vidas'),
    canvas: document.getElementById('canvas'),
    alphabet: document.getElementById('alphabet')
  };

  const bindAlphabet = () => {
    const keys = Object.keys(GUI.alphabet.children);
    for (key of keys) {
      bindLyric(key);
    }
  };
  const bindLyric = key => {
    GUI.alphabet.children[key].addEventListener('click', press);
  };
  const unbindLyric = lyric => {
    GUI.alphabet.children[lyric].removeEventListener('click', press);
    GUI.alphabet.children[lyric].setAttribute('class', 'pressed');
  };

  const press = event => {
    const element = event.target;
    const lyric = element.innerHTML;
    unbindLyric(lyric);
    hangmanController.check(lyric);
  };

  const assert = word => {
    drawWord(word);
    if (hangmanController.checkWin()) {
      win();
    }
  };

  const fail = fail => {
    drawNext(HANGMAN[fail]);
    GUI.lifes.innerHTML = 8 - fail;
    if (hangmanController.checkDead(fail)) {
      dead();
    }
  };
  const drawWord = word => {
    const ctx = GUI.canvas.getContext('2d');
    ctx.font = '11px Arial';
    ctx.clearRect(100, 50, 290, 50);
    ctx.fillText(word, 121, 100);
  };
  const drawNext = coors => {
    const ctx = GUI.canvas.getContext('2d');

    if (coors[0] > 0) {
      ctx.font = '22px Arial';
      ctx.moveTo(coors[0], coors[1]);
      ctx.lineTo(coors[2], coors[3]);
      ctx.stroke();
      return;
    }
    ctx.font = '22px Arial';
    ctx.arc(coors[1], coors[2], coors[3], 0, 2 * Math.PI);
    ctx.stroke();
    return;
  };

  const writeLetterSpaces = word => {
    const ctx = GUI.canvas.getContext('2d');
    ctx.font = '19px Arial';
    let string = '';
    while (string.length / 2 < word.length) {
      string += '_ ';
    }
    ctx.fillText(string, 120, 100);
  };
  const win = () => {
    alert('has ganado');
    LYRICS.forEach(lyric => {
      GUI.alphabet.children[lyric].setAttribute('class', 'pressed');
    });
  };
  const dead = () => {
    alert('has perdido');

    LYRICS.forEach(lyric => {
      GUI.alphabet.children[lyric].setAttribute('class', 'pressed');
    });
  };

  return {
    GUI: GUI,
    bindAlphabet: bindAlphabet,
    press: press,
    assert: assert,
    fail: fail,
    unbindLyric: unbindLyric,
    writeLetterSpaces: writeLetterSpaces
  };
})();
