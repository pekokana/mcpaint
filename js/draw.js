'use strict';

var picker;
// main.jsから受信用
const ipcRenderer = require('electron').ipcRenderer;
window.addEventListener("load", function() {
    // キャンバス
    var canvas = document.getElementById("canvas");

    var offset = 5;
    var start_x;
    var start_y;
    var brush_size = 1;
    var alpha_size = 1;
    var brush_color = '#000000';
    var flag = false;
    var canvas = $('canvas').get(0);
    var get_image;
    var undo_image;

    if (canvas.getContext) {
        var context = canvas.getContext('2d');
    }

    // var picker = $.farbtastic('#colorpicker');
    picker = $.farbtastic('#colorpicker');
    picker.linkTo($("#color"));

    // 背景色系
    $('#back1').click(function(e) {
        $('canvas').css({
            'background-color': '#FFFFFF',
            'background-image': 'none'
        });
    });
    $('#back2').click(function(e) {
        $('canvas').css({
            'background-color': '#000000',
            'background-image': 'none'
        });
    });
    $('#back3').click(function(e) {
        $('canvas').css('background-image', 'url(back.gif)');
    });

    $("#slider").slider({
        min: 1,
        max: 100, // ブラシの最大サイズ
        value: 1, // 最初のブラシサイズ
        slide: function(evt, ui) {
            brush_size = ui.value; // ブラシサイズを設定
            $("#bw").val(brush_size);
        }
    });
    // 消す
    $("#slider").hide();

    $('#slider2').slider({
        min: 1,
        max: 100,
        value: 100, // 初期値（不透明）
        slide: function(evt, ui) {
            alpha = ui.value;
            $('#alpha').val(alpha);
            if (alpha == 100) {
                alpha_size = 1;
            } else if (alpha <= 9) {
                alpha_size = '0.0' + alpha;
            } else if (alpha >= 10) {
                alpha_size = '0.' + alpha;
            }
        }
    });

    $('#bw').val($('#slider').slider('value'));
    $('#alpha').val($('#slider2').slider('value'));
    $('#slider2').css({
        'background-image': 'url(alpha.gif)',
        'background-position': '0px -2px'
    });

    $('li').addClass('ofclic');
    $('li').click(function() {
        var clic_color = new RGBColor($(this).css('background-color'));
        picker.setColor(clic_color.toHex());
        $('li').removeClass('clic');
        $(this).addClass('clic');
    });

    // スポイト or バケツ
    $('canvas').click(function(e) {
        var is_spuit = $('#spuit').is(':checked');
        var is_bucket = $('#bucket').is(':checked');

        if (is_spuit == true) {
            // スポイト
            spuitImage = context.getImageData(start_x, start_y, 1, 1);
            r = spuitImage.data[0];
            g = spuitImage.data[1];
            b = spuitImage.data[2];
            var spuit_color = new RGBColor('rgb(' + r + ',' + g + ',' + b + ')');
            picker.setColor(spuit_color.toHex());
        } else if (is_bucket == true) {
            // バケツ
            var point = getPointFromEvent(event);
            var cfa = new CanvasFillAlgorithm(canvas);
            // cfa.setColorDistance(document.getElementById('rgbdistance').valueAsNumber);
            // cfa.setAlphaDistance(document.getElementById('alphadistance').valueAsNumber);
            cfa.paint(point.x, point.y, getFillColor());
        }
    });

    $('canvas').mousedown(function(e) {
        undo_image = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = true;
        start_x = e.pageX - $(this).offset().left - offset;
        start_y = e.pageY - $(this).offset().top - offset;
        return false; // for chrome
    });

    // バケツの色取得
    function getFillColor() {
        // #DFB73Aからの変換
        var color = new RGBColor(picker.color);
        var red = color.r;
        var green = color.g;
        var blue = color.b;
        // TODO: 今はアルファはない
        var alpha = 255;

        return (
            (red << 24) |
            (green << 16) |
            (blue << 8) |
            (alpha)
        ) >>> 0;
    }

    $('canvas').mousemove(function(e) {
        if (!flag) {
            return;
        }
        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;

        var brush_color = picker.color;

        // それぞれの切り替え
        var getBrush1 = $('#brush1').is(':checked');
        var getBrush2 = $('#brush2').is(':checked');
        var getBrush3 = $('#brush3').is(':checked');
        var getBrush4 = $('#brush4').is(':checked');
        var getBrushm = $('#miter').is(':checked');
        var getEeraser = $('#eraser').is(':checked');

        if (getBrush1 == true) {
            //ブラシ（通常）
            context.globalAlpha = alpha_size;
            context.beginPath();
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = brush_color;
            context.lineWidth = brush_size;
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.shadowBlur = 0;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.moveTo(start_x, start_y);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
        } else if (getBrush2 == true) {
            //ブラシ（ぼかし１）
            context.globalAlpha = alpha_size;
            context.beginPath();
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = brush_color;
            context.lineWidth = brush_size;
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.shadowBlur = brush_size;
            context.shadowColor = brush_color;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.moveTo(start_x, start_y);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
        } else if (getBrush3 == true) {
            //ブラシ（ぼかし２）
            brush_sizex2 = brush_size + brush_size;
            context.globalAlpha = alpha_size;
            context.beginPath();
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = brush_color;
            context.lineWidth = brush_size;
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.shadowBlur = brush_sizex2;
            context.shadowColor = brush_color;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.moveTo(start_x, start_y);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
        } else if (getBrush4 == true) {
            //ブラシ（パステル）
            context.globalAlpha = 0.1;
            context.beginPath();
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = '#ffffff';
            context.lineWidth = brush_size;
            context.lineJoin = 'miter';
            context.lineCap = 'butt';
            context.shadowBlur = brush_size;
            context.shadowColor = brush_color;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.moveTo(start_x, start_y);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();

        } else if (getBrushm == true) {
            //ブラシ（四角）
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
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
        } else if (getEeraser == true) {
            //消しゴム
            context.globalAlpha = 1;
            context.beginPath();
            context.globalCompositeOperation = 'destination-out';
            context.strokeStyle = '#000000';
            context.lineWidth = brush_size;
            context.lineJoin = 'round';
            context.lineCap = 'round';
            context.shadowBlur = 0;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.moveTo(start_x, start_y);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
        }

        start_x = endX;
        start_y = endY;
    });

    // $('canvas').on('mouseup', function() {
    window.addEventListener("mouseup", function() { // キャンバスでなくウィンドウに
        get_image = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = false;
    });

    // ペースト
    enablePasteForCanvas(canvas);
}, true);

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