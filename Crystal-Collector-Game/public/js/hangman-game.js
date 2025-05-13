$(document).ready(function () {
    const words = ['computer', 'hangman', 'coffee', 'laptop', 'coding', 'cave', 'runes', 'ruins'];
    const totalLives = 10;
  
    let selectedWord;
    let guessed;
    let wrongLetters;
    let lives;
  
    function startGame() {
      selectedWord = words[Math.floor(Math.random() * words.length)];
      guessed = [];
      wrongLetters = [];
      lives = totalLives;
  
      $('#letters').empty();
      $('#wordDisplay').empty();
      $('#wrongLetters').empty();
      $('#message').empty();
      $('#restartBtn').hide();
  
      displayWord();
      updateLives();
      updateWrongLetters();
      createButtons();
  
      $(document).on('keydown', keyHandler);
    }
  
    function displayWord() {
      const display = selectedWord
        .split('')
        .map(letter => (guessed.includes(letter) ? letter : '_'))
        .join(' ');
      $('#wordDisplay').text(display);
    }
  
    function updateLives() {
      $('#livesCount').text(lives);
    }
  
    function updateWrongLetters() {
      $('#wrongLetters').text(wrongLetters.join(', '));
    }
  
    function showMessage(text, color) {
      $('#message').text(text).css('color', color);
      $('#restartBtn').show();
    }
  
    function handleGuess(letter) {
      letter = letter.toLowerCase();
      if (!/^[a-z]$/.test(letter)) return;
      if (guessed.includes(letter) || wrongLetters.includes(letter)) return;
  
      const button = $(`.letter-btn[data-letter="${letter}"]`);
      button.prop('disabled', true);
  
      if (selectedWord.includes(letter)) {
        guessed.push(letter);
      } else {
        wrongLetters.push(letter);
        lives--;
        updateWrongLetters();
        updateLives();
      }
  
      displayWord();
      checkGameStatus();
    }
  
    function checkGameStatus() {
      if (!$('#wordDisplay').text().includes('_')) {
        showMessage('🎉 You win!', 'green');
        endGame();
      } else if (lives <= 0) {
        showMessage(`💀 You lose! The word was "${selectedWord}"`, 'red');
        endGame();
      }
    }
  
    function createButtons() {
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i).toLowerCase();
        $('#letters').append(
          `<button class="letter-btn" data-letter="${letter}">${letter}</button>`
        );
      }
  
      $('.letter-btn').click(function () {
        const letter = $(this).data('letter');
        handleGuess(letter);
      });
    }
  
    function keyHandler(e) {
      handleGuess(e.key);
    }
  
    function endGame() {
      $('.letter-btn').prop('disabled', true);
      $(document).off('keydown', keyHandler);
    }
  
    $('#restartBtn').click(function () {
      startGame();
    });
  
    startGame();
  });
  