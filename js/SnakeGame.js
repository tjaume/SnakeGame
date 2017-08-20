/**
 * Created by tjm on 8/18/2017.
 * email:minggis@foxmial.com
 */
var SnakeGame = function () {

    /**/
    function SnakeBlock(row,col){
        this.row=row;
        this.col=col;
    }

    SnakeBlock.prototype.draw = function(graphic,color,size){
        graphic.fillStyle=color;
        graphic.fillRect(size*this.col,size*this.row,size-2,size-2);
    }

    SnakeBlock.prototype.clearDraw = function(graphic,color,size){
        graphic.fillStyle=color;
        graphic.fillRect(size*this.col,size*this.row,size,size);
    }

    SnakeBlock.prototype.equal = function(snakeBlock){
        if(snakeBlock.row==this.row && snakeBlock.col==this.col){
            return true;
        }else{
            return false;
        }
    }

    function SnakeGame(gameScenseId, gameConfigObj) {
        // 私有属性
        var gameScense = document.getElementById(gameScenseId);
        var graphic = gameScense.getContext("2d");
        var count = 0;
        var snake;
        var curFood;
        var runId;
        var isMoved = false;//方向改变后，如果没有移动则方向键暂时失效。
        var gameStatus = false;
        var curDirection = 1;

        var size = gameConfigObj.size || 20;
        var rowCount = gameConfigObj.rowCount || 30;
        var colCount = gameConfigObj.colCount || 30;
        var snakeColor = gameConfigObj.snakeColor || "green";
        var foodColor = gameConfigObj.foodColor || "yellow";
        var scenseColor = gameConfigObj.scenseColor || "black";
        var directionKey = gameConfigObj.directionKey || [39, 40, 37, 38];
        var pauseKey = gameConfigObj.pauseKey || 32;
        var levelCount = gameConfigObj.levelCount || 10;
        var curSpeed = gameConfigObj.curSpeed || 200;
        //公开事件
        var onCountChange = gameConfigObj.onCountChange || null; //带有一个参数
        var onGamePause = gameConfigObj.onGamePause || null; //带有一个参数
        var onGameOver = gameConfigObj.onGameOver || null;

        //判断
        if(gameScense.width != size*rowCount || gameScense.height != size*colCount){
            throw "场景大小不等于行列大小*蛇块大小";
        }
        //特权方法
        this.startGame = startGame;
        this.changeGameStatus = changeGameStatus;

        //注册 dom 键盘事件

        var preFunc = document.onkeydown;
        document.onkeydown = function (e) {
            var key = (e || event).keyCode;
            handleKeyInput(key);
            if (typeof preFunc == "function") {
                preFunc(e);
            }
        }

        //私有方法

        /*初始化蛇身*/
        function initSnake(){
            snake=[];
            snake.push(new SnakeBlock(15,1));
            snake.push(new SnakeBlock(15,2));
            snake.push(new SnakeBlock(15,3));
            snake.push(new SnakeBlock(15,4));
            snake.push(new SnakeBlock(15,5));
            for(var i=0;i<snake.length;i++){
                snake[i].draw(graphic,snakeColor,size);
            }
        }

        /*绘制场景背景色*/
        function initScense(){
            graphic.fillStyle = scenseColor;
            graphic.fillRect(0,0,colCount * size,rowCount * size);
        }

        /*产生食物*/
        function genFood(){
            var generated;
            do{
                var foodCol = Math.floor(Math.random() * colCount);
                var foodRow = Math.floor(Math.random() * rowCount);
                generated=false;
                for (var i = 0; i < snake.length; i++) {
                    if (snake[i].row == foodRow && snake[i].col == foodCol) {
                        generated = true;
                        break;
                    }
                }
            }while(generated);
            curFood = new SnakeBlock(foodRow, foodCol);
            curFood.draw(graphic,foodColor,size);
        }

        /*吃食物*/
        function eatFood(snakeHead){
            if(snakeHead instanceof SnakeBlock) {
                if (snakeHead.equal(curFood)) {
                    return true;
                } else {
                    return false;
                }
            }else {
                return false;
            }
        }

        /*判断游戏是否结束*/
        function gameOver(){
            var isGameOver = false;
            var snakeHead=snake[snake.length-1];//头部
            if(snakeHead.row<0||snakeHead.row>=rowCount||snakeHead.col<0||snakeHead.col>=colCount){
                isGameOver=true;
            }
            for(var i=0;i<snake.length-3;i++){//头部需要和尾部的snake.lenth-4个进行判断即可
                if(snakeHead.equal(snake[i])){
                    isGameOver=true;
                }
            }
            return isGameOver;
        }

        /*蛇移动*/
        function snakeMove(){
            var snakeBlock2=snake[snake.length-1];//头部
            var newBlock;
            switch (curDirection){
                case 1:
                    newBlock=new SnakeBlock(snakeBlock2.row,snakeBlock2.col+1);
                    break;
                case 2:
                    newBlock=new SnakeBlock(snakeBlock2.row+1,snakeBlock2.col);
                    break;
                case 3:
                    newBlock=new SnakeBlock(snakeBlock2.row,snakeBlock2.col-1);
                    break;
                case 4:
                    newBlock=new SnakeBlock(snakeBlock2.row-1,snakeBlock2.col);
                    break;
            }
            snake.push(newBlock);
            newBlock.draw(graphic,snakeColor,size);
            if(gameOver()){//游戏是否结束
                gameStatus = false;
            }else {
                if (eatFood(newBlock)) {//是否吃到了食物
                    genFood();
                    count++;
                    changeSpeed();
                    triggerEvent(onCountChange, count);
                } else {
                    snake.shift().clearDraw(graphic,scenseColor, size);
                }
                isMoved = 1;//可以更改方向了
            }
        }

        function changeSpeed(){
            if(!(count % levelCount)){
                if(curSpeed>150){
                    curSpeed-=50
                }else if(curSpeed<=150&&curSpeed>=100){
                    curSpeed-=15;
                }else{
                    curSpeed-=5;
                }
            }
        }

        function handleKeyInput(key){
            var inputDirection=curDirection;
            switch (key) {
                case directionKey[0]:
                    inputDirection = 1
                    break;
                case directionKey[1]:
                    inputDirection = 2;
                    break;
                case directionKey[2]:
                    inputDirection = 3;
                    break;
                case directionKey[3]:
                    inputDirection = 4;
                    break;
                case pauseKey:
                    changeGameStatus();
                    break;
            }
            if(isMoved || (typeof runId!="number")) {//只有上一次方向移动或者暂停，才能更改方向
                if (inputDirection + 2 == curDirection || inputDirection - 2 == curDirection || inputDirection == curDirection) {
                    //不需要变动方向
                } else {
                    curDirection = inputDirection;
                }
                isMoved=0;
            }
        }

        function initGame(){
            if(typeof runId == "number"){
                clearTimeout(runId);
            }
            curDirection = 1;
            count = 0;
            curSpeed = gameConfigObj.curSpeed || 200;
            triggerEvent(onCountChange,count);
            initScense();
            initSnake();
            genFood();
        }

        function triggerEvent(callback,argument){
            if(typeof callback =="function"){
                callback(argument);
            }
        }

        function runGame(){
            if(gameStatus){
                snakeMove();
                runId = setTimeout(arguments.callee,curSpeed);
            }else {
                triggerEvent(onGameOver, count);
                return;
            }
        }

        function pauseGame() {
            if (typeof runId == "number") {//暂停
                clearTimeout(runId);
                runId = "";
                triggerEvent(onGamePause, 1);//暂停为1
            } else {
                runGame();
                triggerEvent(onGamePause, 0);//开始为0；
            }
        }

        function changeGameStatus(){
            if(gameStatus) {
                if(typeof runId == "number") {//暂停
                    clearTimeout(runId);
                    runId = "";
                    triggerEvent(onGamePause, 1);//暂停为1
                }else{
                    runGame();
                    triggerEvent(onGamePause, 0);//开始为0；
                }
            }
        }

        function startGame(){
            initGame();
            gameStatus = true;
            runGame();
            triggerEvent(onGamePause,0);//游戏开始了
        }
    }
    return SnakeGame;
}();

