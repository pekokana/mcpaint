'use strict';

// 矩形描画ツール
var rectangleTool = (function() {
    //キャンバスエレメント
    var _displayLayer;
    var _drawingLayer;
    //描画コンテキスト
    var _ctxDisplayLayer;
    var _ctxdrawingLayer;

    // キャンバスサイズ
    var _canvasY;
    var _canvasX;

    // コンストラクタ
    var app = function(_display, _drawing) {
        _displayLayer = _display;
        _drawingLayer = _drawing;
        _canvasY = _drawingLayer.clientHeight;
        _canvasX = _drawingLayer.clientWidth;
        _ctxDisplayLayer = _display.getContext("2d");
        // 破線 TODO
        var dashList = [3, 3]; // Create 3x3 dots and spaces
        _ctxDisplayLayer.setLineDash(dashList);

        _ctxdrawingLayer = _drawing.getContext("2d");
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

    // 矩形時のみに行うため
    function getRectangle() {
        var res = $('#rectangle').is(':checked');
        return res;
    }

    function onMouseDown(e) {
        if (getRectangle()) {
            _rectangle.startY = e.clientY;
            var offsetX = parseInt($('canvas').css("left").replace("px", ""), 10);
            // _rectangle.startX = e.clientX;
            console.log(offsetX);
            _rectangle.startX = e.clientX - offsetX;
            _drawingLayer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    function onMouseMove(e) {
        if (getRectangle()) {
            _ctxdrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            _rectangle.endY = e.layerY - _rectangle.startY;
            _rectangle.endX = e.layerX - _rectangle.startX;
            _ctxdrawingLayer.strokeRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);
        }
    };

    function onMouseUp(e) {
        if (getRectangle()) {
            _ctxDisplayLayer.fillRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);
            _rectangle.clear();
            _ctxdrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            _drawingLayer.removeEventListener("mousemove", onMouseMove, false);
        }
    };

    return app;
})();