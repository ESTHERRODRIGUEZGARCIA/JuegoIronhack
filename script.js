
function rand(max) {
    return Math.floor(Math.random() * max);
  }
  
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  function loadImage(image) {
      return new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
    }
  
  function mensajeBienvenida() {
      toggleVisibility("Message-Container");
      var e = document.getElementById("message-container");
      difficulty = e.options[e.selectedIndex].value;
      cellSize = mazeCanvas.width / difficulty;
      maze = new Maze(difficulty, difficulty);
      draw = new DrawMaze(maze, ctx, cellSize, finishImage);
      player = new Player(maze, mazeCanvas, cellSize, onComplete, playerImage);
  
    // Asegurarse de que ambas imágenes estén cargadas antes de iniciar el juego
    Promise.all([
      loadImage(playerImage),
      loadImage(finishImage)
    ]).then(() => {
      initGame();
    });
  
  }
  
  function toggleVisibility(id) {
    const element = document.getElementById(id);
    element.style.visibility = (element.style.visibility === "visible") ? "hidden" : "visible";
  }
  
  function Maze(Width, Height) {
    var mazeMap;
    var width = Width;
    var height = Height;
    var startCoord, endCoord;
    var dirs = ["n", "s", "e", "w"];
    var modDir = {
        n: { y: -1, x: 0, o: "s" },
        s: { y: 1, x: 0, o: "n" },
        e: { y: 0, x: 1, o: "w" },
        w: { y: 0, x: -1, o: "e" }
    };
  
    this.map = function () {
        return mazeMap;
    };
    this.startCoord = function () {
        return startCoord;
    };
    this.endCoord = function () {
        return endCoord;
    };
  
    function genMap() {
        mazeMap = new Array(height);
        for (let y = 0; y < height; y++) {
            mazeMap[y] = new Array(width);
            for (let x = 0; x < width; ++x) {
                mazeMap[y][x] = {
                    n: false,
                    s: false,
                    e: false,
                    w: false,
                    visited: false,
                    priorPos: null
                };
            }
        }
    }
  
    function defineMaze() {
        var isComp = false;
        var move = false;
        var cellsVisited = 1;
        var numLoops = 0;
        var maxLoops = 0;
        var pos = { x: 0, y: 0 };
        var numCells = width * height;
        while (!isComp) {
            move = false;
            mazeMap[pos.x][pos.y].visited = true;
  
            if (numLoops >= maxLoops) {
                shuffle(dirs);
                maxLoops = Math.round(rand(height / 8));
                numLoops = 0;
            }
            numLoops++;
            for (let index = 0; index < dirs.length; index++) {
                var direction = dirs[index];
                var nx = pos.x + modDir[direction].x;
                var ny = pos.y + modDir[direction].y;
  
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    if (!mazeMap[nx][ny].visited) {
                        mazeMap[pos.x][pos.y][direction] = true;
                        mazeMap[nx][ny][modDir[direction].o] = true;
                        mazeMap[nx][ny].priorPos = pos;
                        pos = { x: nx, y: ny };
                        cellsVisited++;
                        move = true;
                        break;
                    }
                }
            }
  
            if (!move) {
                pos = mazeMap[pos.x][pos.y].priorPos;
            }
            if (numCells == cellsVisited) {
                isComp = true;
            }
        }
    }
  
    function defineStartEnd() {
        switch (rand(4)) {
            case 0:
                startCoord = { x: 0, y: 0 };
                endCoord = { x: height - 1, y: width - 1 };
                break;
            case 1:
                startCoord = { x: 0, y: width - 1 };
                endCoord = { x: height - 1, y: 0 };
                break;
            case 2:
                startCoord = { x: height - 1, y: 0 };
                endCoord = { x: 0, y: width - 1 };
                break;
            case 3:
                startCoord = { x: height - 1, y: width - 1 };
                endCoord = { x: 0, y: 0 };
                break;
        }
    }
  
    genMap();
    defineStartEnd();
    defineMaze();
  }
  
  function DrawMaze(Maze, ctx, cellsize, endSprite = null) {
      var map = Maze.map();
      var cellSize = cellsize;
      var drawEndMethod;
      ctx.lineWidth = cellSize / 40;
  
      this.redrawMaze = function (size) {
          cellSize = size;
          ctx.lineWidth = cellSize / 50;
          drawMap();
          drawEndMethod();
      };
  
      function drawCell(xCord, yCord, cell) {
          var x = xCord * cellSize;
          var y = yCord * cellSize;
  
          if (cell.n === false) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x + cellSize, y);
              ctx.stroke();
          }
          if (cell.s === false) {
              ctx.beginPath();
              ctx.moveTo(x, y + cellSize);
              ctx.lineTo(x + cellSize, y + cellSize);
              ctx.stroke();
          }
          if (cell.e === false) {
              ctx.beginPath();
              ctx.moveTo(x + cellSize, y);
              ctx.lineTo(x + cellSize, y + cellSize);
              ctx.stroke();
          }
          if (cell.w === false) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + cellSize);
              ctx.stroke();
          }
      }
  
      function drawMap() {
          for (let x = 0; x < map.length; x++) {
              for (let y = 0; y < map[x].length; y++) {
                  drawCell(x, y, map[x][y]);
              }
          }
      }
  
      function drawEndFlag() {
          var coord = Maze.endCoord();
          var gridSize = 4;
          var fraction = cellSize / gridSize - 2;
          var colorSwap = true;
          for (let y = 0; y < gridSize; y++) {
              if (gridSize % 2 === 0) {
                  colorSwap = !colorSwap;
              }
              for (let x = 0; x < gridSize; x++) {
                  ctx.beginPath();
                  ctx.rect(
                      coord.x * cellSize + x * fraction + 4.5,
                      coord.y * cellSize + y * fraction + 4.5,
                      fraction,
                      fraction
                  );
                  if (colorSwap) {
                      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                  } else {
                      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                  }
                  ctx.fill();
                  colorSwap = !colorSwap;
              }
          }
      }
      function drawEndSprite() {
          var offsetLeft = cellSize / 50;
          var offsetRight = cellSize / 25;
          var coord = Maze.endCoord();
          ctx.drawImage(
            endSprite,
            2,
            2,
            endSprite.width,
            endSprite.height,
            coord.x * cellSize + offsetLeft,
            coord.y * cellSize + offsetLeft,
            cellSize - offsetRight,
            cellSize - offsetRight
          );
        }
      
        function clear() {
          var canvasSize = cellSize * map.length;
          ctx.clearRect(0, 0, canvasSize, canvasSize);
        }
      
        if (endSprite != null) {
          drawEndMethod = drawEndSprite;
        } else {
          drawEndMethod = drawEndFlag;
        }
        clear();
        drawMap();
        drawEndMethod();
      }
  
  
  function Player(maze, c, _cellsize, onComplete, sprite = null) {
    var ctx = c.getContext("2d");
    var drawSprite;
    var moves = 0;
    drawSprite = drawSpriteCircle;
    if (sprite != null) {
        drawSprite = drawSpriteImg;
    }
    var player = this;
    var map = maze.map();
    var cellCoords = {
        x: maze.startCoord().x,
        y: maze.startCoord().y
    };
    var cellSize = _cellsize;
    var halfCellSize = cellSize / 2;
  
    this.redrawPlayer = function (_cellsize) {
        cellSize = _cellsize;
        drawSpriteImg(cellCoords);
    };
  
    function drawSpriteCircle(coord) {
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(
            (coord.x + 1) * cellSize - halfCellSize,
            (coord.y + 1) * cellSize - halfCellSize,
            halfCellSize - 2,
            0,
            2 * Math.PI
        );
        ctx.fill();
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }
  
    function drawSpriteImg(coord) {
        var offsetLeft = cellSize / 50;
        var offsetRight = cellSize / 25;
        ctx.drawImage(
            sprite,
            0,
            0,
            sprite.width,
            sprite.height,
            coord.x * cellSize + offsetLeft,
            coord.y * cellSize + offsetLeft,
            cellSize - offsetRight,
            cellSize - offsetRight
        );
        if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
            onComplete(moves);
            player.unbindKeyDown();
        }
    }
  
    function removeSprite(coord) {
        var offsetLeft = cellSize / 50;
        var offsetRight = cellSize / 25;
        ctx.clearRect(
            coord.x * cellSize + offsetLeft,
            coord.y * cellSize + offsetLeft,
            cellSize - offsetRight,
            cellSize - offsetRight
        );
    }
  
    function check(e) {
        var cell = map[cellCoords.x][cellCoords.y];
        moves++;
        switch (e.keyCode) {
            case 65:
            case 37: // west
                if (cell.w == true) {
                    removeSprite(cellCoords);
                    cellCoords = {
                        x: cellCoords.x - 1,
                        y: cellCoords.y
                    };
                    drawSprite(cellCoords);
                }
                break;
            case 87:
            case 38: // north
                if (cell.n == true) {
                    removeSprite(cellCoords);
                    cellCoords = {
                        x: cellCoords.x,
                        y: cellCoords.y - 1
                    };
                    drawSprite(cellCoords);
                }
                break;
            case 68:
            case 39: // east
                if (cell.e == true) {
                    removeSprite(cellCoords);
                    cellCoords = {
                        x: cellCoords.x + 1,
                        y: cellCoords.y
                    };
                    drawSprite(cellCoords);
                }
                break;
            case 83:
            case 40: // south
                if (cell.s == true) {
                    removeSprite(cellCoords);
                    cellCoords = {
                        x: cellCoords.x,
                        y: cellCoords.y + 1
                    };
                    drawSprite(cellCoords);
                }
                break;
        }
    }
  
    this.bindKeyDown = function () {
        window.addEventListener("keydown", check, false);
  
        $("#view").swipe({
            swipe: function (
                event,
                direction,
                distance,
                duration,
                fingerCount,
                fingerData
            ) {
                console.log(direction);
                switch (direction) {
                    case "up":
                        check({
                            keyCode: 38
                        });
                        break;
                    case "down":
                        check({
                            keyCode: 40
                        });
                        break;
                    case "left":
                        check({
                            keyCode: 37
                        });
                        break;
                    case "right":
                        check({
                            keyCode: 39
                        });
                        break;
                }
            },
            threshold: 0
        });
    };
  
    this.unbindKeyDown = function () {
        window.removeEventListener("keydown", check, false);
        $("#view").swipe("destroy");
    };
  
    drawSprite(maze.startCoord());
  
    this.bindKeyDown();
  }
  
  var mazeCanvas = document.getElementById("mazeCanvas");
  var ctx = mazeCanvas.getContext("2d");
  let sprite, finishSprite, maze, draw, player, cellSize, difficulty;
  
  window.onload = function () {
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewHeight < viewWidth) {
        ctx.canvas.width = viewHeight - viewHeight / 100;
        ctx.canvas.height = viewHeight - viewHeight / 100;
    } else {
        ctx.canvas.width = viewWidth - viewWidth / 100;
        ctx.canvas.height = viewWidth - viewWidth / 100;
    }
    mensajeBienvenida();
  
    var completeOne = false;
    var completeTwo = false;
    var isComplete = () => {
        if (completeOne === true && completeTwo === true) {
            console.log("Runs");
            setTimeout(function () {
                makeMaze();
            }, 500);
        }
    }
  
    sprite = new Image();
    sprite.src = "./key.png" + "?" + new Date().getTime();
    sprite.setAttribute("crossOrigin", " ");
    sprite.onload = function () {
        sprite = changeBrightness(1.2, sprite);
        completeOne = true;
        console.log(completeOne);
        isComplete();
    };
  
    finishSprite = new Image();
    finishSprite.src = "./home.png" + "?" + new Date().getTime();
    finishSprite.setAttribute("crossOrigin", " ");
    finishSprite.onload = function () {
        finishSprite = changeBrightness(1.1, finishSprite);
        completeTwo = true;
        console.log(completeTwo);
        isComplete();
    };
  }
  
  window.onresize = function () {
    let viewWidth = $("#view").width();
    let viewHeight = $("#view").height();
    if (viewHeight < viewWidth) {
        ctx.canvas.width = viewHeight - viewHeight / 100;
        ctx.canvas.height = viewHeight - viewHeight / 100;
    } else {
        ctx.canvas.width = viewWidth - viewWidth / 100;
        ctx.canvas.height = viewWidth - viewWidth / 100;
    }
    mazeCanvas.width = ctx.canvas.width;
    mazeCanvas.height = ctx.canvas.height;
  
    cellSize = mazeCanvas.width / difficulty;
    if (player != null) {
        draw.redrawMaze(cellSize);
        player.redrawPlayer(cellSize);
    }
  }
  
  function makeMaze() {
      if (player !== undefined) {
        player.unbindKeyDown();
        player = undefined;
      }
      var e = document.getElementById("diffSelect");
      difficulty = e.options[e.selectedIndex].value;
      cellSize = mazeCanvas.width / difficulty;
    
      // Asegurarse de que el contenedor del laberinto esté visible
      document.getElementById("mazeContainer").style.opacity = "100";
    
      // Inicializar el juego
      initGame();
    }
    
    function startGame() {
      toggleVisibility("Message-Container");
    
      // Mostrar el mensaje y luego hacer el laberinto
      setTimeout(function () {
        makeMaze();
      }, 500);
    }
    
    function initGame() {
      var e = document.getElementById("diffSelect");
      difficulty = e.options[e.selectedIndex].value;
      cellSize = mazeCanvas.width / difficulty;
      maze = new Maze(difficulty, difficulty);
      draw = new DrawMaze(maze, ctx, cellSize, finishSprite); // Utilizar finishSprite en lugar de finishImage
      player = new Player(maze, mazeCanvas, cellSize, sprite); // Utilizar sprite en lugar de playerImage
    
      // Asegurarse de que ambas imágenes estén cargadas antes de iniciar el juego
      Promise.all([loadImage(sprite), loadImage(finishSprite)]).then(() => {
        draw.redrawMaze(cellSize);
        player.bindKeyDown();
      });
    }
    function onComplete() {
      var messageContainer = document.getElementById("message");
      var congratulationsMessage = document.getElementById("congratulations-message");
    
      // Ocultar el contenido original y mostrar el mensaje de felicitaciones
      messageContainer.style.display = "none";
      congratulationsMessage.style.display = "block";
    
      setTimeout(function () {
        // Ocultar el mensaje después de 5 segundos y reiniciar el juego
        messageContainer.style.display = "block";
        congratulationsMessage.style.display = "none";
        makeMaze();
      }, 500); // Espera 5 segundos (ajusta según sea necesario)
    }
    