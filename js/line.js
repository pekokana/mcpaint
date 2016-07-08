'use strict';

// ラインの準備
window.addEventListener("load", function() {
    var start_x;
    var start_y;
    var offset = 5;
    var flag = false;
    var get_image;
    var undo_image;
    var brush_size = 1;
    var alpha_size = 1;

    // 見せかけ
    var drawing = document.getElementById("drawing");
    var ctx_drawing_layer = drawing.getContext("2d");
    // キャンバスサイズ
    var canvas_width = drawing.clientWidth;
    var canvas_height = drawing.clientHeight;

    // キャンバス
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
    }

    $('canvas').mousedown(function(e) {
        undo_image = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = true;
        start_x = e.pageX - $(this).offset().left - offset;
        start_y = e.pageY - $(this).offset().top - offset;
        return false; // for chrome
    });

    $('canvas').mousemove(function(e) {
        if (!flag) {
            return;
        }

        var end_x = e.pageX - $('canvas').offset().left - offset;
        var end_y = e.pageY - $('canvas').offset().top - offset;

        var is_line = $('#line').is(':checked');
        var is_wave_line = $('#wave-line').is(':checked');

        if (is_line == true) {
            // 全消し
            ctx_drawing_layer.clearRect(0, 0, canvas_width, canvas_height);
            // console.log(canvas_width);
            // console.log(canvas_height);
            // 軌跡がいるかも？
            var brush_color = picker.color;
            ctx_drawing_layer.globalAlpha = alpha_size;
            ctx_drawing_layer.beginPath();
            ctx_drawing_layer.globalCompositeOperation = 'source-over';
            ctx_drawing_layer.strokeStyle = brush_color;
            ctx_drawing_layer.lineWidth = brush_size;
            ctx_drawing_layer.lineJoin = 'miter';
            ctx_drawing_layer.lineCap = 'butt';
            ctx_drawing_layer.shadowBlur = 0;
            ctx_drawing_layer.setTransform(1, 0, 0, 1, 0, 0);
            ctx_drawing_layer.moveTo(start_x, start_y);
            ctx_drawing_layer.lineTo(end_x, end_y);
            ctx_drawing_layer.stroke();
            ctx_drawing_layer.closePath();
        } else if (is_wave_line == true) {

        }
    });

    window.addEventListener("mouseup", function(e) { // キャンバスでなくウィンドウに
        if (!flag) {
            return;
        }

        var is_line = $('#line').is(':checked');
        var is_wave_line = $('#wave-line').is(':checked');

        var end_x = e.pageX - $('canvas').offset().left - offset;
        var end_y = e.pageY - $('canvas').offset().top - offset;

        if (is_line == true) {
            var brush_color = picker.color;
            context.globalAlpha = alpha_size;
            context.beginPath();
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = brush_color;
            context.lineWidth = brush_size;
            context.lineJoin = 'miter';
            context.lineCap = 'butt';
            context.shadowBlur = 0;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.moveTo(start_x, start_y);
            context.lineTo(end_x, end_y);
            context.stroke();
            context.closePath();
        } else if (is_wave_line == true) {

        }

        get_image = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = false;
    });
})