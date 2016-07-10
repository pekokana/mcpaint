'use strict';

/**
 * マウス位置
 * 
 * @param {any} event
 * @returns
 */
function getPointFromEvent(event) {
    var boundingRect = event.target.getBoundingClientRect();

    return {
        x: event.clientX - boundingRect.left | 0,
        y: event.clientY - boundingRect.top | 0
    }
}

$(function() {
    $('#undo').click(function(e) {
        context.putImageData(undoImage, 0, 0);
    });

    $('#restore').click(function(e) {
        context.putImageData(getImage, 0, 0);
    });

    $('#clear').click(function(e) {
        e.preventDefault();
        context.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    });

    $('#save').click(function() {
        var d = canvas.toDataURL('image/png');
        d = d.replace('image/png', 'image/octet-stream');
        window.open(d, 'save');
    });

    /* documentにドラッグされた場合 */
    document.ondragover = function(e) {
        e.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする
        return false;
    };

    /* ドロップされた場合 */
    document.ondrop = function(e) {
        // var files = e.dataTransfer.files;
        // var file = files[0];
        // console.log(file);
        // if(file.type === "image/png") {
        //     console.log('png');
        // }
        // console.log(file.type);
        // console.log(file.name);
        // console.log(file.path);
        drag(e);
        e.preventDefault(); // イベントの伝搬を止めて、アプリケーションのHTMLとファイルが差し替わらないようにする
        return false;
    };
});
    
/**
 * 保存処理　(Canvas2Image)
 * http://www.nihilogic.dk/labs/canvas2image/
 */
function saveData() {
    var canvas = document.getElementById("canvas");
    Canvas2Image.saveAsPNG(canvas); // PNG形式で保存
}

ipcRenderer.on('file-save', function() {
    saveData();
});

/**
 * ドロップ時の処理
 */
function drag(e) {
    var i;
    //クリップボードに含まれる画像データを検索
    // var items = e.clipboardData.items;
    var items = e.dataTransfer.items;
    var imageItem = null;
    for (i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image/") != -1) {
            imageItem = items[i];
            break;
        }
    }

    if (!imageItem) {
        console.log("clipboard does not contain an image.");
        return;
    }

    //clipboardData.items -> Blob -> Image の順に変換
    var blob = imageItem.getAsFile();
    var blobURL = window.URL.createObjectURL(blob);
    var img = new Image();
    img.onload = function() {
        //Imageをキャンバスに描画
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
    };
    img.src = blobURL;
}