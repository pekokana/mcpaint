'use strict';

/**
 * 選択ツール
 * 
 * @returns
 */
var selectionTool = (function() {
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

    /**
     * コンストラクタ
     * 
     * @param {any} _display
     * @param {any} _drawing
     */
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
        /**
         * 
         */
        clear: function() {
            this.startY = 0;
            this.startX = 0;
            this.endY = 0;
            this.endX = 0;
        }
    };

    /**
     * 星形選択時のみに行うため
     * 
     * @returns
     */
    function getSelection1() {
        var res = $('#selection1').is(':checked');
        return res;
    }

    /**
     * 選択時のみに行うため
     * 
     * @returns
     */
    function getSelection2() {
        var res = $('#selection2').is(':checked');
        return res;
    }

    /**
     * 
     * 
     * @param {any} e
     */
    function onMouseDown(e) {
        if (getSelection1()) {
            consl.log("まだ");
        } else if (getSelection2()) {
            _rectangle.startY = e.clientY;
            var offsetX = parseInt($('canvas').css("left").replace("px", ""), 10);
            // _rectangle.startX = e.clientX;
            // console.log(offsetX);
            _rectangle.startX = e.clientX - offsetX;
            _drawingLayer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    /**
     * 選択の破線
     * 
     * @param {any} e
     */
    function onMouseMove(e) {
        if (getSelection()) {
            _ctxDrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            _rectangle.endY = e.layerY - _rectangle.startY;
            _rectangle.endX = e.layerX - _rectangle.startX;

            var brush_color = picker.color;
            _ctxDrawingLayer.strokeStyle = brush_color;
            _ctxDrawingLayer.strokeRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);
        }
    };

    /**
     * 選択する
     * 
     * @param {any} e
     */
    function onMouseUp(e) {
        if (getSelection()) {
            // 塗りつぶしの色を決める
            // var brush_color = picker.color;
            // _ctxDisplayLayer.fillStyle = brush_color;
            // _ctxDisplayLayer.fillRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);

            _rectangle.clear();
            _ctxDrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            _drawingLayer.removeEventListener("mousemove", onMouseMove, false);
        }
    };

    return app;
})();