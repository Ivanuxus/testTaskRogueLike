class Game {
  constructor() {
    this.offset = 5;
    this.gameBoard = new Array(40);
    for (let i = 0; i < 40; i++) {
      this.gameBoard[i] = new Array(24).fill(0);
    }
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

    //Placing walls everywhere
    for (let j = 0; j < 40; j += 1) {
      for (let i = 0; i < 24; i += 1) {
        this.gameBoard[j][i] = 6;
      }
    }

    let countOfVert = Math.floor(Math.random() * 3) + 3;
    let countOfHorizont = Math.floor(Math.random() * 3) + 3;

    //Generating Horizontal Tunnels
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

    //Generating Vertical Tunnels
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

    //Placing a player in random place
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

    //Placing 10 enemies in random place
    let counterOfEnemies = 0;
    const coordXOfEnemies = [10];
    const coordYOfEnemies = [10];
    for (let j = 0; j < 40; j += 1) {
      for (let i = 0; i < 24; i += 1) {
        if (
          Math.floor(Math.random() * 25) == 2 &&
          counterOfEnemies < 10 &&
          this.gameBoard[j][i] == 1
        ) {
          this.gameBoard[j][i] = 2;
          coordXOfEnemies[counterOfEnemies] = j;
          coordYOfEnemies[counterOfEnemies] = i;
          counterOfEnemies += 1;
        }
      }
    }
    //placing 10 HP in radom place
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
    //placing 2 sw in radom place
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
    //placing &numberOfRooms in random place
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
        if (this.gameBoard[j][i] == 2) {
          $(".field").append(
            `<div class="tileE" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
          );
        }
        if (this.gameBoard[j][i] == 3) {
          $(".field").append(
            `<div class="tileHP" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
          );
        }
        if (this.gameBoard[j][i] == 4) {
          $(".field").append(
            `<div class="tileP" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
          );
        }
        if (this.playerj == j && this.playeri == i) {
          $(".field").append(
            `<div class="tileP" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
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
            this.gameBoard[this.playerj][this.playeri] = 1;
          }
          break;
      }
      this.redraw();
    });
  }
  clear() {
    $(".field").append(
      `<div class="tile" style="left:${offsetLeft}px;top:${offsetTop}px"></div>`
    );
  }
}
