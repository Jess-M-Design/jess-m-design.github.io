$(document).ready(function () {
  let user = {
    char_name: "Our Hero",
    hp: 100,
    attack: 20,
    coins: 5,
    sprite: "https://i.redd.it/ob52245zficy.gif"
  };

  let boss = {
    char_name: "Evil Wizard",
    hp: 200,
    attack: 15,
    sprite: "images/evil-wizard3.gif"
  };


  // DOM elements
  const $bossHP = $("#boss-hp");
  const $userHP = $("#user-hp");
  const $userPotions = $("#user-potions");
  const $userImg = $("#user-img");
  const $bossImg = $("#boss-img");
  const $userName = $("#char-name");

  function renderGame() {
    $bossHP.text(boss.hp);
    $userHP.text(user.hp);
    $userPotions.text(user.coins);
    $userImg.attr("src", user.sprite);
    $bossImg.attr("src", boss.sprite);
    $userName.text(user.char_name);
  }

  function showResult(message, won) {
    $("#modalMessage").text(message);
    $("#modalNextBtn").toggle(won); // Show only on win
    $("#resultModal").fadeIn();
  }

  function restartGame() {
    user.hp = 100;
    user.coins = 5;
    boss.hp = 200;
    renderGame();
    $("#resultModal").fadeOut();
  }

  function updateHPBars() {
    const userPercent = Math.max(0, (user.hp / 100) * 100);
    const bossPercent = Math.max(0, (boss.hp / 200) * 100);
  
    $("#user-hp-bar").css({
      width: userPercent + "%",
      backgroundColor: getHPColor(userPercent)
    });
  
    $("#boss-hp-bar").css({
      width: bossPercent + "%",
      backgroundColor: getHPColor(bossPercent)
    });
  }
  
  function getHPColor(percent) {
    if (percent > 60) return "#00cc00"; // green
    if (percent > 30) return "#ffcc00"; // yellow
    return "#cc0000"; // red
  }
  
  function bossAttack() {
    user.hp -= boss.attack;
    if (user.hp <= 0) {
      showResult("You lost!", false);
    } else {
      renderGame();
    }
  }

  $("#attack").click(function () {
    boss.hp -= user.attack;
    if (boss.hp <= 0) {
      showResult("You win!", true);
    } else {
      renderGame();
      setTimeout(bossAttack, 1000);
    }
  });

  $("#potion").click(function () {
    if (user.coins > 0) {
      user.hp += 10;
      user.coins -= 1;
      renderGame();
    }
  });

  $("#special").click(function () {
    boss.hp -= user.attack * 2;
    user.hp -= 10; // cost
    renderGame();
    if (boss.hp <= 0) {
      showResult("You win with a special move!", true);
    } else {
      setTimeout(bossAttack, 1000);
    }
  });

  $("#modalNextBtn").click(restartGame);

  // Init
  renderGame();
  function renderGame() {
    $bossHP.text(boss.hp);
    $userHP.text(user.hp);
    $userPotions.text(user.coins);
    $userImg.attr("src", user.sprite);
    $bossImg.attr("src", boss.sprite);
    $userName.text(user.char_name);
    updateHPBars(); // new
  }
  
});
