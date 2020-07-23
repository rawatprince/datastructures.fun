function init() {

    var canvas = document.getElementById("mycanvas");
    W = canvas.width = 1000;
    H = canvas.height = 710;
    cellSize = 65;
    game_over = false;
    score = 5;

    pen = canvas.getContext('2d');

    food = getRandomFood();

    food_image = new Image();
    food_image.src = "assets/apple.png";

    trophy = new Image();
    trophy.src = "assets/trophy.png";


    snake = {
        initial_length : 5,
        color : "blue",
        cells : [],
        direction : "right", //default direction

        createSnake : function () {
            for (var i=this.initial_length;i>0;i--)
                this.cells.push({x:i,y:0});
        },

        drawSnake : function () {
            for (var i=0;i<this.cells.length;i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cellSize, this.cells[i].y * cellSize, cellSize - 2, cellSize - 2);
            }
        },

        updateSnake : function(){

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if (headX == food.x && headY == food.y){
                food = getRandomFood();
                score++;
            }else{
                this.cells.pop();
            }



            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            var nextX,nextY;
            if (this.direction=="right"){
                nextX = headX + 1;
                nextY = headY;
            }

            else if(this.direction=="left"){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY + 1;
            }
            else if(this.direction=="up"){
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({x:nextX,y:nextY});

            var last_x = Math.round(W/cellSize);
            var last_y = Math.round(H/cellSize);

            if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
                game_over = true;
            }


        }

    };

    snake.createSnake();

    //Event listener on document object

    function keyPressed(e){
        //console.log(e.key);
        if (e.key=="ArrowRight")
            snake.direction = "right";
        else if (e.key=="ArrowLeft")
            snake.direction = "left";
        else if (e.key=="ArrowUp")
            snake.direction = "up";
        else
            snake.direction = "down";

    }

    document.addEventListener('keydown',keyPressed);


}

function draw() {
    //erase old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_image,food.x*cellSize,food.y*cellSize,cellSize,cellSize);

    pen.drawImage(trophy,22,20,cellSize,cellSize);
    pen.fillStyle = "blue";
    pen.font = "25px Roboto";
    pen.fillText(score,50,50,);
}

function update() {

    snake.updateSnake();

}

function getRandomFood() {
    var foodX = Math.round(Math.random() * (W-cellSize)/cellSize);
    var foodY = Math.round(Math.random() * (H-cellSize)/cellSize);

    var food = {
        x : foodX,
        y : foodY,
        color : "red",
    }

    return food;
}

function gameloop() {
    if(game_over==true){
        clearInterval(track);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();
var track = setInterval(gameloop,100);