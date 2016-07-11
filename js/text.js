'use strict';

// TODO: テキスト
// http://goldfirestudios.com/blog/108/CanvasInput-HTML5-Canvas-Text-Input
// http://www.html5.jp/canvas/ref/method/fillText.html
window.addEventListener("load", function() {
    var start_x;
    var start_y;
    var offset = 5;
    var flag = false;
    var get_image;
    var undo_image;
    var brush_size = 1;
    var alpha_size = 1;
    var brush_color = '#000000';

    var drawing = document.getElementById('drawing');

    // テキスト入力のツール
    var input;

    /**
     * テキスト入力のツールを作る
     * 
     * @param {any} x
     * @param {any} y
     */
    function createInput(x, y) {
        input = new CanvasInput({
            x: x,
            y: y,
            canvas: drawing,
            fontSize: 18,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter message here...'
        });
    }

    // 一旦隠す
    // drawing.style.display = "none";
    // input.destroy();

    // キャンバス
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
    }

    $('canvas').mousedown(function(e) {
        if(flag) return;

        // undoImage = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = true;
        start_x = e.pageX - $(this).offset().left - offset;
        start_y = e.pageY - $(this).offset().top - offset;
        // context.strokeText("text", start_x, start_y)
        createInput(start_x, start_y);
        // drawing.style.display = "block";
        return false; // for chrome
    });

    $('canvas').mousemove(function(e) {
        if (!flag) {
            return;
        }

        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;

        var is_text = $('#text').is(':checked');

        if (is_text == true) {
        }
    });

    window.addEventListener("mouseup", function(e) { // キャンバスでなくウィンドウに
        var is_text = $('#text').is(':checked');

        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;

        if (is_text == true) {
        }

        // get_image = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        // flag = false;
    });
})