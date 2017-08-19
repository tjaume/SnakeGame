/**
 * Created by tjm on 8/16/2017.
 */

var btnStart=document.getElementById("btnStart");

var gameSnake = new SnakeGame("gameScense",{
    snakeColor:"red",
    directionKey:[68,83,65,87],
    pauseKey:81,
    onCountChange:function(count){
        var txtScore=document.getElementById("txtValue");
        txtScore.innerText=count.toString( );
        txtScore=null;
    },
    onGameOver:function (status) {
        alert("游戏结束");
    }
});

var gameSnake1 = new SnakeGame("gameScense1",{
    snakeColor:"green",
    size:20,
    onCountChange:function(count){
        var txtScore=document.getElementById("txtValue1");
        txtScore.innerText=count.toString();
        txtScore=null;
    },
    onGameOver:function (status) {
        alert("游戏结束");
    }
});


btnStart.onclick=function(event){
        gameSnake.startGame();
        gameSnake1.startGame();
        btnStart.blur();
}
//
// btnStart.onclick=function(event){
//     if(checkUserName()){
//         gameSnake.startGame();
//         gameSnake1.startGame();
//         btnStart.blur();
//     }
// }

// btnPasue.onclick=function(event) {
//     gameSnake.changeGameStatus();
//     btnStart.blur();
// }
// function checkUserName(){
//     var txtUserName = document.getElementById("txtUserName");
//     if(txtUserName.value.length==0){
//         alert("用户名不能为空");
//         return false;
//     }else {
//         return true;
//     }
// }