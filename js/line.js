'use strict';

// ラインの準備
window.addEventListener("load", function() {
    var start_x;
    var start_y;
    var flag = false;

    // キャンバス
    var canvas = document.getElementById("canvas");

    $('canvas').mousedown(function(e) {
        undoImage = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = true;
        start_x = e.pageX - $(this).offset().left - offset;
        start_y = e.pageY - $(this).offset().top - offset;
        return false; // for chrome
    });

    $('canvas').mousemove(function(e) {
        if (!flag) {
            return;
        }

        var is_line = $('#line').is(':checked');
        var is_wave_line = $('#wave-line').is(':checked');

        if (is_line == true) {

        } else if (is_wave_line == true) {

        }
    });

    window.addEventListener("mouseup", function() { // キャンバスでなくウィンドウに
        getImage = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = false;
    });
})