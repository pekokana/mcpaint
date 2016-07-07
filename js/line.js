'use strict';

// ラインの準備
window.addEventListener("load", function() {
    // キャンバス
    var canvas = document.getElementById("canvas");
    $('canvas').mousemove(function(e) {
        var is_line = $('#line').is(':checked');
        var is_wave_line = $('#wave-line').is(':checked');

        if (is_line == true) {

        } else if (is_wave_line == true) {

        }
    });
})