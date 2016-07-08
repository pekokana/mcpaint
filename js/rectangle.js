'use strict';

/**
 * 矩形描画ツール
 * 
 * @returns
 */
var rectangleTool = (function() {
    //キャンバスエレメント
    var _displayLayer;
    var _drawingLayer;
    // 描画コンテキスト
    var _ctxDisplayLayer;
    // 破線用
    var _ctxDrawingLayer;

    // キャンバスサイズ
    var _canvasY;
    var _canvasX;

    var app = function(_display, _drawing) {
        _displayLayer = _display;
        _drawingLayer = _drawing;
        _canvasY = _drawingLayer.clientHeight;
        _canvasX = _drawingLayer.clientWidth;
        _ctxDisplayLayer = _display.getContext("2d");
        _ctxDrawingLayer = _drawing.getContext("2d");
        // 破線
        var dashList = [1, 1]; // Create 3x3 dots and spaces
        _ctxDrawingLayer.setLineDash(dashList);
        _drawingLayer.addEventListener("mousedown", onMouseDown, false);
        _drawingLayer.addEventListener("mouseup", onMouseUp, false);
    };

    // 矩形オブジェクト
    var _rectangle = {
        startY: 0,
        startX: 0,
        endY: 0,
        endX: 0,
        clear: function() {
            this.startY = 0;
            this.startX = 0;
            this.endY = 0;
            this.endX = 0;
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
            _rectangle.startY = e.clientY;
            var offsetX = parseInt($('canvas').css("left").replace("px", ""), 10);
            // _rectangle.startX = e.clientX;
            // console.log(offsetX);
            _rectangle.startX = e.clientX - offsetX;
            _drawingLayer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    /**
     * 
     * 
     * @param {any} e
     */
    function onMouseMove(e) {
        if (getRectangle()) {
            _ctxDrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            _rectangle.endY = e.layerY - _rectangle.startY;
            _rectangle.endX = e.layerX - _rectangle.startX;

            var brush_color = picker.color;
            _ctxDrawingLayer.strokeStyle = brush_color;
            _ctxDrawingLayer.strokeRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);
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
            _ctxDisplayLayer.fillStyle = brush_color;
            _ctxDisplayLayer.fillRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);

            _rectangle.clear();
            _ctxDrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            _drawingLayer.removeEventListener("mousemove", onMouseMove, false);
        }
    };

    return app;
})();