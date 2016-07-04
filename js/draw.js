var drawFlag = false;
var oldX = 0;
var oldY = 0;
var colorList = {
    "black": "rgba(0,0,0,1)",
    "blue": "rgba(0,0,255,1)",
    "red": "rgba(255,0,0,1)",
    "magenta": "rgba(255,0,255,1)",
    "green": "rgba(0,255,0,1)",
    "cyan": "rgba(0,255,255,1)",
    "yellow": "rgba(255,255,0,1)",
    "white": "rgba(255,255,255,1)"
}
var penColor = "rgba(255,0,0,1)";
window.addEventListener("load", function() {
    var can = document.getElementById("myCanvas");
    can.addEventListener("mousemove", draw, true);
    can.addEventListener("mousedown", function(e) {
        drawFlag = true;
        oldX = e.clientX;
        oldY = e.clientY;
    }, true);
    can.addEventListener("mouseup", function() {
        drawFlag = false;
    }, true);
    // カラーパレット初期化
    $("#colorPalet div").click(function(e) {
        penColor = colorList[this.id];
    });
}, true);
// 描画処理
function draw(e) {
    if (!drawFlag) return;
    var x = e.clientX;
    var y = e.clientY;
    var can = document.getElementById("myCanvas");
    var context = can.getContext("2d");
    context.strokeStyle = penColor;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(oldX, oldY);
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
    oldX = x;
    oldY = y;
}
// 保存処理　(Canvas2Image)
//　http://www.nihilogic.dk/labs/canvas2image/
function saveData() {
    var can = document.getElementById("myCanvas");
    Canvas2Image.saveAsPNG(can); // PNG形式で保存
}