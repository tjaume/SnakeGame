# SnakeGame
JS版贪吃蛇组件
1.1 初级示例
简单示例如下：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>贪吃蛇组件</title>
    
</head>
<body>
    <canvas width="600" height="600" id="gameScense"></canvas>
</body>
<script src="SnakeGame.js"></script>
<script>
    var snakeGame = new SnakeGame("gameScense",{
    });
    snakeGame.startGame();
</script>
</html>
```
示例代码2：
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>贪吃蛇组件</title>

</head>
<body>
    <canvas width="600" height="600" id="gameScense"></canvas>
</body>
<script src="SnakeGame.js"></script>
<script>
    var snakeGame = new SnakeGame("gameScense",{
        snakeColor:"red",
        foodColor:"green",
        scenseColor:"blue",
        directionKey:[68,83,65,87],
    });
    snakeGame.startGame();
</script>
</html>
```
下面介绍游戏配置参数 
#### 1.2 公有方法
- startGame() ： 开始游戏。在该方法内，会初始化各种设置。如，重置分数，蛇身，速度等。
- changeGameStatus()：改变游戏状态，即暂停和开始，SnakeGame对象里面有一个私有变量，作为游戏的状态变量。

#### 1.3 配置游戏参数的对象gameConfigObj属性、
gameConfigObj 对象一共该有10个属性，3个回调函数

**属性**
- size : 蛇块和食物的大小，默认20
- rowCount ： 行，默认30行
- colCount : 列，默认30列
- snakeColor : 蛇身颜色，默认green
- foodColor : 食物颜色，默认yellow
- scenseColor : 游戏场景背景色， 默black
- directionKey : 方向键， 默认[39, 40, 37, 38] 上下左右
- pasueKey : 暂停键， 默认32，空格键
- levelCount : 速度等级控制，默认10.
- curSpeed  ： 初始速度，默认200毫秒

**回调函数**
- onCountChange : 事件，每一个食物，分数改变，并调用该方法，带有一个参数（count)
- onGamePause : 事件，游戏状态改变时，调用该方法，带有一个参数  1，代表暂停，0 ，代表游戏在进行。
- onGameOver : 事件，游戏结束时，调用该方法。带有有一个参数（count),游戏结束时的分数。

更多例子参看：http://www.cnblogs.com/mingjiatang/p/7397803.html




