'use strict';

/**
 * 楕円ツール
 * 
 * @returns
 */
var elipseTool = (function() {
    //キャンバスエレメント
    var _display_layer;
    var _drawing_layer;
    // 描画コンテキスト
    var _ctx_display_layer;
    // 破線用
    var _ctx_drawing_layer;

    // キャンバスサイズ
    var _canvas_y;
    var _canvas_x;

    var app = function(_display, _drawing) {
        _display_layer = _display;
        _drawing_layer = _drawing;
        _canvas_y = _drawing_layer.clientHeight;
        _canvas_x = _drawing_layer.clientWidth;
        _ctx_display_layer = _display.getContext("2d");
        _ctx_drawing_layer = _drawing.getContext("2d");
        // 破線
        var dashList = [1, 1]; // Create 3x3 dots and spaces
        _ctx_drawing_layer.setLineDash(dashList);
        _drawing_layer.addEventListener("mousedown", onMouseDown, false);
        _drawing_layer.addEventListener("mouseup", onMouseUp, false);
    };

    // 矩形オブジェクト
    var _elipse = {
        start_y: 0,
        start_x: 0,
        end_y: 0,
        end_x: 0,
        clear: function() {
            this.start_y = 0;
            this.start_x = 0;
            this.end_y = 0;
            this.end_x = 0;
        }
    };

    /**
     * 円時のみに行うため
     * 
     * @returns
     */
    function getElipse() {
        var res = $('#elipse1').is(':checked');
        return res;
    }

    /**
     * 円形開始
     * 
     * @param {any} e
     */
    function onMouseDown(e) {
        if (getElipse()) {
            _elipse.start_y = e.clientY;
            var offset_x = parseInt($('canvas').css("left").replace("px", ""), 10);
            // _rectangle.startX = e.clientX;
            // console.log(offsetX);
            _elipse.start_x = e.clientX - offset_x;
            _drawing_layer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    /**
     * 
     * 
     * @param {any} e
     */
    function onMouseMove(e) {
        if (getElipse()) {
            document.body.style.cursor = "crosshair";

            _ctx_drawing_layer.clearRect(0, 0, _canvas_x, _canvas_y);
            // _elipse.end_y = e.layerY - _elipse.start_y;
            // _elipse.end_x = e.layerX - _elipse.start_x;
            var end_y = e.layerY;
            var end_x = e.layerX;

            var brush_color = picker.color;
            _ctx_drawing_layer.strokeStyle = brush_color;
           _ctx_drawing_layer.beginPath();
            //    座標 (70, 70) が中心で半径60ピクセルの円を基準に、0°の位置から時計回りに360°回転
            // _ctx_drawing_layer.arc(70, 70, 60, 0, Math.PI*2, false);
            var a = end_x - _elipse.start_x;
            var b = end_y - _elipse.start_y;
            var center_x  = (end_x + _elipse.start_x) / 2;
            var center_y =  (end_y + _elipse.start_y) / 2;

            // 距離は直径
             var diameter = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
             // 半径
             var r = diameter / 2;

             _ctx_drawing_layer.arc(center_x, center_y, r, 0, Math.PI*2, false);
             _ctx_drawing_layer.stroke();
        }
    };

    /**
     * 塗りつぶし
     * 
     * @param {any} e
     */
    function onMouseUp(e) {
        if (getElipse()) {
            document.body.style.cursor = "auto";
            var end_y = e.layerY;
            var end_x = e.layerX;

            // 塗りつぶしの色を決める
            var brush_color = picker.color;
            _ctx_display_layer.fillStyle = brush_color;
            // _ctx_display_layer.fillRect(_rectangle.start_x, _rectangle.start_y, _rectangle.end_x, _rectangle.end_y);
            _ctx_display_layer.beginPath();
            // _ctx_display_layer.arc(70, 70, 60, 0, Math.PI*2, false);
            var a = end_x - _elipse.start_x;
            var b = end_y - _elipse.start_y;
            var center_x  = (end_x + _elipse.start_x) / 2;
            var center_y =  (end_y + _elipse.start_y) / 2;

             // 距離は直径
             var diameter = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
             // 半径
             var r = diameter / 2;
            _ctx_display_layer.arc(center_x, center_y, r, 0, Math.PI*2, false);
           _ctx_display_layer.stroke();
  
            _elipse.clear();
            _drawing_layer.removeEventListener("mousemove", onMouseMove, false);
        }
    };

    return app;
})();