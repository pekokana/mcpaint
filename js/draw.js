'use strict';

// main.jsから受信用
const ipcRenderer = require('electron').ipcRenderer;
window.addEventListener("load", function() {
    // キャンバス
    var canvas = document.getElementById("canvas");

    // ペースト
    enablePasteForCanvas(canvas);
}, true);

// 保存処理　(Canvas2Image)
//　http://www.nihilogic.dk/labs/canvas2image/
function saveData() {
    var canvas = document.getElementById("canvas");
    Canvas2Image.saveAsPNG(canvas); // PNG形式で保存
}

ipcRenderer.on('file-save', function() {
    saveData();
});

// TODO: リサイズ
function resizeCanvas() {

    // 虫眼鏡
    var w = 110;
    var h = 110;
    $('#canvas').attr('width', w);
    $('#canvas').attr('height', h);

    $("#canvas").width(w);
    $("#canvas").height(h);
}