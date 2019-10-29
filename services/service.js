const hangmanService = (() => {
  const getWords = fetch('http://127.0.1.1:5000/assets/constants/words.json')
    .then(response => {
      return response.json();
    })
    .then(response => {
      return response[Math.round(Math.random() * response.length)];
    });

  const checkLyric = (word, lyric) => {
    console.log(lyric, word);
    const lyrics = [];
    let index = word.indexOf(lyric.toLowerCase());
    while (index != -1) {
      lyrics.push(index);
      index = word.indexOf(lyric.toLowerCase(), index + 1);
    }
    return lyrics;
  };
  function isDead(number) {
    if (number >= 8) {
      return true;
    }
    return false;
  }

  function isWin(word) {
    if (word.every(lyric => LYRICS.includes(lyric))) {
      return true;
    }
    return false;
  }

  return {
    getWords: getWords,
    checkLyric: checkLyric,
    isDead: isDead,
    isWin: isWin
  };
})();
