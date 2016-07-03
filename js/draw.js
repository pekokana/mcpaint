window.addEventListener("load", function(){
    var can = document.getElementById("myCanvas");
    can.addEventListener("mousemove", draw, true);
}, true);
// 描画処理
function draw(e){
    var x = e.clientX;
    var y = e.clientY;
    var can = document.getElementById("myCanvas");
    var context = can.getContext("2d");
    context.fillStyle = "rgba(255,0,0,1)";
    context.fillRect(x,y,1,1);
}