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
    var brush_size = 1;
    var alpha_size = 1;

    // キャンバス
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
    }

    var drawing = document.getElementById('drawing');

    // テキスト入力のツール
    var input;

    /**
     * Enterキー入れた時の処理
     * 
     * @param {any} e
     */
    function onEnter(e) {
        console.log(e);
        // 中のテキスト
        var input_text = input.value();
        // context.font = "18px 'ＭＳ Ｐゴシック'";
        context.font = "18px 'Arial'";
        // 色を変える
        var brush_color = picker.color;
        context.strokeStyle = brush_color;
        context.strokeText(input_text, start_x, start_y);
        // drawing.style.display = "none";
        console.log(input);
        // $("input").remove();
        flag = false;
    }

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
            // fontFamily: 'ＭＳ Ｐゴシック',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 300,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter message here...',
            onsubmit: onEnter
        });
        // フォーカスする
        input.focus();
    }

    $('canvas').mousedown(function(e) {
        var is_text = $('#text').is(':checked');
        if (!is_text || flag) return;

        flag = true;
        start_x = e.pageX - $(this).offset().left - offset;
        start_y = e.pageY - $(this).offset().top - offset;

        // テキストボックス生成
        createInput(start_x, start_y);
        return false; // for chrome
    });

    $('canvas').mousemove(function(e) {
        if (!flag) {
            return;
        }

        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;

        var is_text = $('#text').is(':checked');

        if (is_text == true) {}
    });

    window.addEventListener("mouseup", function(e) { // キャンバスでなくウィンドウに
        var is_text = $('#text').is(':checked');

        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;

        if (is_text == true) {}

        // get_image = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        // flag = false;
    });
})