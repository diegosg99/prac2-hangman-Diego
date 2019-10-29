const hangmanController = (() => {
  const init = async (view, service) => {
    this.view = view;
    this.service = service;
    this.word = await this.service.getWords;
    this.fails = 0;
    this.correct = new Array(this.word.length);
    this.correct.fill('   ');
    this.view.bindAlphabet();
    this.view.writeLetterSpaces(this.word);
  };

  const check = lyric => {
    this.presseds.push(lyric);
    const asserts = this.service.checkLyric(this.word, lyric);
    for (assert of asserts) {
      this.correct[assert] = lyric;
    }
    this.view.assert(
      this.correct.reduce((prev, curr) => (prev += '   ' + curr))
    );
    this.view.unbindLyric(lyric);
    if (asserts.length <= 0) {
      this.fails += 1;
      this.view.fail(this.fails);
    }
  };
  const checkWin = () => {
    if (this.service.isWin(this.correct)) {
      return true;
    }
    return false;
  };
  const checkDead = () => {
    if (this.service.isDead(this.fails)) {
      return true;
    }
    return false;
  };

  return {
    init: init,
    check: check,
    checkWin: checkWin,
    checkDead: checkDead
  };
})();
