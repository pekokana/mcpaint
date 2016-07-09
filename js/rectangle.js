'use strict';

/**
 * 矩形描画ツール
 * 
 * @returns
 */
var rectangleTool = (function() {
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
    var _rectangle = {
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
     * 矩形時のみに行うため
     * 
     * @returns
     */
    function getRectangle() {
        var res = $('#rectangle').is(':checked');
        return res;
    }

    /**
     * 矩形開始
     * 
     * @param {any} e
     */
    function onMouseDown(e) {
        if (getRectangle()) {
            _rectangle.start_y = e.clientY;
            var offsetX = parseInt($('canvas').css("left").replace("px", ""), 10);
            // _rectangle.startX = e.clientX;
            // console.log(offsetX);
            _rectangle.start_x = e.clientX - offsetX;
            _drawing_layer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    /**
     * 
     * 
     * @param {any} e
     */
    function onMouseMove(e) {
        if (getRectangle()) {
            _ctx_drawing_layer.clearRect(0, 0, _canvas_x, _canvas_y);
            _rectangle.end_y = e.layerY - _rectangle.start_y;
            _rectangle.end_x = e.layerX - _rectangle.start_x;

            var brush_color = picker.color;
            _ctx_drawing_layer.strokeStyle = brush_color;
            _ctx_drawing_layer.strokeRect(_rectangle.start_x, _rectangle.start_y, _rectangle.end_x, _rectangle.end_y);
        }
    };

    /**
     * 塗りつぶし
     * 
     * @param {any} e
     */
    function onMouseUp(e) {
        if (getRectangle()) {
            // 塗りつぶしの色を決める
            var brush_color = picker.color;
            _ctx_display_layer.fillStyle = brush_color;
            _ctx_display_layer.fillRect(_rectangle.start_x, _rectangle.start_y, _rectangle.end_x, _rectangle.end_y);

            _rectangle.clear();
            _ctx_drawing_layer.clearRect(0, 0, _canvas_x, _canvas_y);
            _drawing_layer.removeEventListener("mousemove", onMouseMove, false);
        }
    };

    return app;
})();