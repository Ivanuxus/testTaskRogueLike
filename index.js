class Game {
  constructor() {
    this.offset = 5;
    this.gameBoard = new Array(40);
    for (let i = 0; i < 40; i++) {
      this.gameBoard[i] = new Array(24).fill(0);
    }
    this.PlayerHealth = 70;
    this.PlayerAttack = 10;
    this.enemyMoveDelay = 3000;
  }
  init() {
    $("body").append("<h1>Игровое поле</h1>");
    $("body").append(
      '<div class="field-box"><div class="field"></div></div><div class="cl"></div>'
    );
    this.field = $(".field");
    this.fieldbox = $(".field-box");
    this.cl = $(".cl");

    this.fieldWidth = parseInt($(".field").css("width"));
    this.fieldHeight = parseInt($(".field").css("height"));

    let playerExist = false;

    for (let j = 0; j < 40; j += 1) {
      for (let i = 0; i < 24; i += 1) {
        this.gameBoard[j][i] = 6;
      }
    }

    let countOfVert = Math.floor(Math.random() * 3) + 3;
    let countOfHorizont = Math.floor(Math.random() * 3) + 3;

    let counter = 0;
    const filled = [];
    while (counter < countOfHorizont) {
      let ran = Math.floor(Math.random() * 24);
      let fill = true;
      for (let i = 0; i <= filled.length; i++) {
        if (filled[i] == ran || filled[i] + 1 == ran || filled[i] - 1 == ran) {
          fill = false;
        }
      }
      if (fill) {
        filled.push(ran);
        counter++;
      }
    }
    for (let i = 0; i < countOfHorizont; i += 1) {
      let ran = filled[i];
      for (let j = 0; j < 40; j += 1) {
        this.gameBoard[j][ran] = 1;
      }
    }

    counter = 0;
    filled.length = 0;
    while (counter < countOfVert) {
      let ran = Math.floor(Math.random() * 40);
      let fill = true;
      for (let i = 0; i <= filled.length; i++) {
        if (filled[i] == ran || filled[i] + 1 == ran || filled[i] - 1 == ran) {
          fill = false;
        }
      }
      if (fill) {
        filled.push(ran);
        counter++;
      }
    }
    for (let i = 0; i < countOfVert; i += 1) {
      let ran = filled[i];
      for (let j = 0; j < 24; j += 1) {
        this.gameBoard[ran][j] = 1;
      }
    }

    for (let j = 0; j < 40; j += 1) {
      for (let i = 0; i < 24; i += 1) {
        if (
          Math.floor(Math.random() * 50) == 2 &&
          !playerExist &&
          this.gameBoard[j][i] == 1
        ) {
          this.playerj = j;
          this.playeri = i;
          playerExist = true;
        }
      }
    }

    let counterOfEnemies = 0;
    this.coordXOfEnemies = new Array(10);
    this.coordYOfEnemies = new Array(10);
    this.HpOfEnemies = new Array(10);
    this.HpOfEnemies.fill(100, 0, 10);
    for (let j = 0; j < 40; j += 1) {
      for (let i = 0; i < 24; i += 1) {
        if (
          Math.floor(Math.random() * 25) == 2 &&
          counterOfEnemies < 10 &&
          this.gameBoard[j][i] == 1
        ) {
          this.coordXOfEnemies[counterOfEnemies] = j;
          this.coordYOfEnemies[counterOfEnemies] = i;
          counterOfEnemies += 1;
        }
      }
    }

    let counterOfHP = 0;
    const coordXOfHP = [10];
    const coordYOfHP = [10];
    for (let j = 0; j < 40; j += 1) {
      for (let i = 0; i < 24; i += 1) {
        if (
          Math.floor(Math.random() * 25) == 2 &&
          counterOfHP < 10 &&
          this.gameBoard[j][i] == 1
        ) {
          this.gameBoard[j][i] = 3;
          coordXOfHP[counterOfHP] = j;
          coordYOfHP[counterOfHP] = i;
          counterOfHP += 1;
        }
      }
    }

    let counterOfSw = 0;
    const coordXOfSw = [10];
    const coordYOfSw = [10];
    for (let j = 0; j < 40; j += 1) {
      for (let i = 0; i < 24; i += 1) {
        if (
          Math.floor(Math.random() * 25) == 2 &&
          counterOfSw < 2 &&
          this.gameBoard[j][i] == 1
        ) {
          this.gameBoard[j][i] = 5;
          coordXOfSw[counterOfSw] = j;
          coordYOfSw[counterOfSw] = i;
          counterOfSw += 1;
        }
      }
    }

    let numberOfRooms = Math.floor(Math.random() * 5) + 5;
    let counterOfRooms = 0;
    while (counterOfRooms < numberOfRooms) {
      let widthOfRoom = Math.floor(Math.random() * 5) + 3;
      let heigthOfRoom = Math.floor(Math.random() * 5) + 3;
      let XOfRoom = Math.floor(Math.random() * 32);
      let YOfRoom = Math.floor(Math.random() * 16);
      for (let x = XOfRoom; x < XOfRoom + widthOfRoom; x += 1) {
        for (let y = YOfRoom; y < YOfRoom + heigthOfRoom; y += 1) {
          if (true) {
            this.gameBoard[x][y] = 1;
          }
        }
      }
      counterOfRooms++;
    }
    this.startEnemyMovement();
    this.redraw();
  }
  //Meaning the number in matrice
  //tile- 1
  //tile-E 2
  //ttile-HP 3
  //tile-P 4
  //tile-SW 5
  //tile-W 6
  draw() {
    let offsetLeft = 0;
    let offsetTop = 0;

    for (let j = 0; j < 40; j += 1) {
      offsetTop = 0;
      for (let i = 0; i < 24; i += 1) {
        if (this.gameBoard[j][i] == 1) {
          $(".field").append(
            `<div class="tile" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
          );
        }

        for (let enemy = 0; enemy < 10; enemy++) {
          if (
            this.coordXOfEnemies[enemy] == j &&
            this.coordYOfEnemies[enemy] == i
          ) {
            $(".field").append(
              `<div class="tileE" style="left:${offsetLeft}px;top:${offsetTop}px"><div class="health" style="width:${this.HpOfEnemies[enemy]}%;"></div></div>`
            );
          }
        }

        if (this.gameBoard[j][i] == 3) {
          $(".field").append(
            `<div class="tileHP" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
          );
        }
        if (this.playerj == j && this.playeri == i) {
          $(".field").append(
            `<div class="tileP" style="left:${offsetLeft}px;top:${offsetTop}px"><div class="health" style="width:${this.PlayerHealth}%;"></div></div>`
          );
        }
        if (this.gameBoard[j][i] == 5) {
          $(".field").append(
            `<div class="tileSW" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
          );
        }
        if (this.gameBoard[j][i] == 6) {
          $(".field").append(
            `<div class="tileW" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
          );
        }

        offsetTop += 25;
      }
      offsetLeft += 25;
    }
  }

  redraw() {
    $(".field").empty();
    this.draw();

    for (let enemy = 0; enemy < 10; enemy++) {
      if (
        (this.coordXOfEnemies[enemy] == this.playerj + 1 &&
          this.coordYOfEnemies[enemy] == this.playeri) ||
        (this.coordXOfEnemies[enemy] == this.playerj - 1 &&
          this.coordYOfEnemies[enemy] == this.playeri) ||
        (this.coordXOfEnemies[enemy] == this.playerj &&
          this.coordYOfEnemies[enemy] == this.playeri + 1) ||
        (this.coordXOfEnemies[enemy] == this.playerj &&
          this.coordYOfEnemies[enemy] == this.playeri - 1) ||
        (this.coordXOfEnemies[enemy] == this.playerj + 1 &&
          this.coordYOfEnemies[enemy] == this.playeri + 1) ||
        (this.coordXOfEnemies[enemy] == this.playerj + 1 &&
          this.coordYOfEnemies[enemy] == this.playeri - 1) ||
        (this.coordXOfEnemies[enemy] == this.playerj - 1 &&
          this.coordYOfEnemies[enemy] == this.playeri - 1) ||
        (this.coordXOfEnemies[enemy] == this.playerj - 1 &&
          this.coordYOfEnemies[enemy] == this.playeri + 1)
      ) {
        this.PlayerHealth -= 25;
      }
    }
  }

  LogicOfEnemy(typeOfEvent, directionConsidered) {
    if (typeOfEvent == 0) {
      for (let enemy = 0; enemy < 10; enemy++) {
        let direction = Math.floor(Math.random() * 4);
        if (direction == 0) {
          if (
            this.coordXOfEnemies[enemy] + 1 < 40 &&
            this.gameBoard[this.coordXOfEnemies[enemy] + 1][
              this.coordYOfEnemies[enemy]
            ] == 1
          ) {
            this.coordXOfEnemies[enemy] += 1;
          }
        }
        if (direction == 1) {
          if (
            this.coordXOfEnemies[enemy] - 1 > 0 &&
            this.gameBoard[this.coordXOfEnemies[enemy] - 1][
              this.coordYOfEnemies[enemy]
            ] == 1
          ) {
            this.coordXOfEnemies[enemy] -= 1;
          }
        }
        if (direction == 2) {
          if (
            this.coordYOfEnemies[enemy] + 1 < 24 &&
            this.gameBoard[this.coordXOfEnemies[enemy]][
              this.coordYOfEnemies[enemy] + 1
            ] == 1
          ) {
            this.coordYOfEnemies[enemy] += 1;
          }
        }
        if (direction == 3) {
          if (
            this.coordYOfEnemies[enemy] - 1 > 0 &&
            this.gameBoard[this.coordXOfEnemies[enemy]][
              this.coordYOfEnemies[enemy] - 1
            ] == 1
          ) {
            this.coordYOfEnemies[enemy] -= 1;
          }
        }
      }
    } else if (typeOfEvent == 1) {
      for (let enemy = 0; enemy < 10; enemy++) {
        if (directionConsidered == 0) {
          if (
            this.coordXOfEnemies[enemy] + 1 < 40 &&
            this.gameBoard[this.coordXOfEnemies[enemy] + 1][
              this.coordYOfEnemies[enemy]
            ] == 1
          ) {
            this.coordXOfEnemies[enemy] += 1;
          }
        }
        if (directionConsidered == 1) {
          if (
            this.coordXOfEnemies[enemy] - 1 > 0 &&
            this.gameBoard[this.coordXOfEnemies[enemy] - 1][
              this.coordYOfEnemies[enemy]
            ] == 1
          ) {
            this.coordXOfEnemies[enemy] -= 1;
          }
        }
        if (directionConsidered == 2) {
          if (
            this.coordYOfEnemies[enemy] + 1 < 24 &&
            this.gameBoard[this.coordXOfEnemies[enemy]][
              this.coordYOfEnemies[enemy] + 1
            ] == 1
          ) {
            this.coordYOfEnemies[enemy] += 1;
          }
        }
        if (directionConsidered == 3) {
          if (
            this.coordYOfEnemies[enemy] - 1 > 0 &&
            this.gameBoard[this.coordXOfEnemies[enemy]][
              this.coordYOfEnemies[enemy] - 1
            ] == 1
          ) {
            this.coordYOfEnemies[enemy] -= 1;
          }
        }
      }
    } else if (typeOfEvent == 2) {
      for (let enemy = 0; enemy < 10; enemy++) {
        let direction = [100];
        if (this.coordXOfEnemies[enemy] < this.playerj) {
          direction.push(0);
        }
        if (this.coordXOfEnemies[enemy] > this.playerj) {
          direction.push(1);
        }
        if (this.coordYOfEnemies[enemy] < this.playeri) {
          direction.push(2);
        }
        if (this.coordYOfEnemies[enemy] > this.playeri) {
          direction.push(3);
        }
        for (let directionn = 0; directionn < direction.length; directionn++) {
          if (direction[directionn] == 0) {
            if (
              this.coordXOfEnemies[enemy] + 1 < 40 &&
              this.gameBoard[this.coordXOfEnemies[enemy] + 1][
                this.coordYOfEnemies[enemy]
              ] == 1
            ) {
              this.coordXOfEnemies[enemy] += 1;
            }
          }
          if (direction[directionn] == 1) {
            if (
              this.coordXOfEnemies[enemy] - 1 > 0 &&
              this.gameBoard[this.coordXOfEnemies[enemy] - 1][
                this.coordYOfEnemies[enemy]
              ] == 1
            ) {
              this.coordXOfEnemies[enemy] -= 1;
            }
          }
          if (direction[directionn] == 2) {
            if (
              this.coordYOfEnemies[enemy] + 1 < 24 &&
              this.gameBoard[this.coordXOfEnemies[enemy]][
                this.coordYOfEnemies[enemy] + 1
              ] == 1
            ) {
              this.coordYOfEnemies[enemy] += 1;
            }
          }
          if (direction[directionn] == 3) {
            if (
              this.coordYOfEnemies[enemy] - 1 > 0 &&
              this.gameBoard[this.coordXOfEnemies[enemy]][
                this.coordYOfEnemies[enemy] - 1
              ] == 1
            ) {
              this.coordYOfEnemies[enemy] -= 1;
            }
          }
        }
      }
    }
  }

  startEnemyMovement() {
    this.enemyMoveInterval = setInterval(() => {
      this.LogicOfEnemy(2, 1);
      this.redraw();
    }, this.enemyMoveDelay);
  }
  stopEnemyMovement() {
    if (this.enemyMoveInterval) {
      clearInterval(this.enemyMoveInterval);
      this.enemyMoveInterval = null;
    }
  }
  move() {
    let player = $(".field .tileP");
    let movePlayer = 10;
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          if (
            this.playerj - 1 >= 0 &&
            (this.gameBoard[this.playerj - 1][this.playeri] == 1 ||
              this.gameBoard[this.playerj - 1][this.playeri] == 3 ||
              this.gameBoard[this.playerj - 1][this.playeri] == 5)
          ) {
            this.playerj -= 1;
            if (this.gameBoard[this.playerj][this.playeri] == 3) {
              this.PlayerHealth += 50;
            }
            if (this.gameBoard[this.playerj][this.playeri] == 5) {
              this.PlayerAttack += 20;
            }
            this.gameBoard[this.playerj][this.playeri] = 1;
          }
          break;
        case "d":
          if (
            this.playerj + 1 < 40 &&
            (this.gameBoard[this.playerj + 1][this.playeri] == 1 ||
              this.gameBoard[this.playerj + 1][this.playeri] == 3 ||
              this.gameBoard[this.playerj + 1][this.playeri] == 5)
          ) {
            this.playerj += 1;
            if (this.gameBoard[this.playerj][this.playeri] == 3) {
              this.PlayerHealth += 50;
            }
            if (this.gameBoard[this.playerj][this.playeri] == 5) {
              this.PlayerAttack += 20;
            }
            this.gameBoard[this.playerj][this.playeri] = 1;
          }
          break;
        case "w":
          if (
            this.playeri - 1 >= 0 &&
            (this.gameBoard[this.playerj][this.playeri - 1] == 1 ||
              this.gameBoard[this.playerj][this.playeri - 1] == 3 ||
              this.gameBoard[this.playerj][this.playeri - 1] == 5)
          ) {
            this.playeri -= 1;
            if (this.gameBoard[this.playerj][this.playeri] == 3) {
              this.PlayerHealth += 50;
            }
            if (this.gameBoard[this.playerj][this.playeri] == 5) {
              this.PlayerAttack += 20;
            }
            this.gameBoard[this.playerj][this.playeri] = 1;
          }
          break;
        case "s":
          if (
            this.playeri + 1 < 24 &&
            (this.gameBoard[this.playerj][this.playeri + 1] == 1 ||
              this.gameBoard[this.playerj][this.playeri + 1] == 3 ||
              this.gameBoard[this.playerj][this.playeri + 1] == 5)
          ) {
            this.playeri += 1;
            if (this.gameBoard[this.playerj][this.playeri] == 3) {
              this.PlayerHealth += 50;
            }
            if (this.gameBoard[this.playerj][this.playeri] == 5) {
              this.PlayerAttack += 20;
            }
            this.gameBoard[this.playerj][this.playeri] = 1;
          }
          break;
      }
      switch (e.code) {
        case "Space":
          for (let enemy = 0; enemy < 10; enemy++) {
            if (
              (this.coordXOfEnemies[enemy] == this.playerj + 1 &&
                this.coordYOfEnemies[enemy] == this.playeri) ||
              (this.coordXOfEnemies[enemy] == this.playerj - 1 &&
                this.coordYOfEnemies[enemy] == this.playeri) ||
              (this.coordXOfEnemies[enemy] == this.playerj &&
                this.coordYOfEnemies[enemy] == this.playeri + 1) ||
              (this.coordXOfEnemies[enemy] == this.playerj &&
                this.coordYOfEnemies[enemy] == this.playeri - 1) ||
              (this.coordXOfEnemies[enemy] == this.playerj + 1 &&
                this.coordYOfEnemies[enemy] == this.playeri + 1) ||
              (this.coordXOfEnemies[enemy] == this.playerj + 1 &&
                this.coordYOfEnemies[enemy] == this.playeri - 1) ||
              (this.coordXOfEnemies[enemy] == this.playerj - 1 &&
                this.coordYOfEnemies[enemy] == this.playeri - 1) ||
              (this.coordXOfEnemies[enemy] == this.playerj - 1 &&
                this.coordYOfEnemies[enemy] == this.playeri + 1)
            ) {
              this.HpOfEnemies[enemy] -= 25;
            }
          }

          break;
      }
      this.redraw();
    });
  }
}
