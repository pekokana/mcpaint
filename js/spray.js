'use strict';

// http://stackoverflow.com/questions/14168457/how-to-implement-a-spray-paint-tool-for-html5-canvas

/**
 * スプレーツール
 * 
 * @returns
 */
var sprayTool = (function() {
    //キャンバスエレメント
    var _displayLayer;
    var _drawingLayer;
    // 描画コンテキスト
    var _ctxDisplayLayer;
    // 破線用
    // var _ctxDrawingLayer;

    // キャンバスサイズ
    var _canvasY;
    var _canvasX;

    var _intervalId, // used to track the current interval ID
        _center; // the current center to spray
    var radius = 100;
    var density = 100;

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
        // _ctxDrawingLayer = _drawing.getContext("2d");
        // 破線
        var dashList = [1, 1]; // Create 3x3 dots and spaces
        // _ctxDrawingLayer.setLineDash(dashList);
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
     * スプレー選択時のみに行うため
     * 
     * @returns
     */
    function getSpray() {
        var res = $('#spray').is(':checked');
        return res;
    }

    /**
     * ランダムオフセット
     * 
     * @returns
     */
    function getRandomOffset() {
        var randomAngle = Math.random() * 360;
        var randomRadius = Math.random() * radius;

        return {
            x: Math.cos(randomAngle) * randomRadius,
            y: Math.sin(randomAngle) * randomRadius
        };
    }

    /**
     * マウス位置
     * 
     * @param {any} event
     * @returns
     */
    function getPointFromEvent(event) {
        var boundingRect = event.target.getBoundingClientRect();

        return {
            x: event.clientX - boundingRect.left | 0,
            y: event.clientY - boundingRect.top | 0
        }
    }


    /**
     * 
     * 
     * @param {any} e
     */
    function onMouseDown(e) {
        if (getSpray()) {
            var position = getPointFromEvent(e);
            // this.startDrawing(position);
            startDrawing(position);
            // _rectangle.startY = e.clientY;
            // var offsetX = parseInt($('canvas').css("left").replace("px", ""), 10);
            // // _rectangle.startX = e.clientX;
            // // console.log(offsetX);
            // _rectangle.startX = e.clientX - offsetX;
            // _drawingLayer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    // this.spray = function() {
    var spray = function() {
        var centerX = _center.X,
            centerY = _center.Y,
            i;

        for (i = 0; i < density; i++) {
            var offset = getRandomOffset();
            var x = centerX + offset.x,
                y = centerY + offset.y;

            // drawingCxt.fillRect(x, y, 1, 1);
            _ctxDisplayLayer.fillRect(x, y, 1, 1);
            console.log(x);
            console.log(y);
        }
    };

    // this.startDrawing = function(position) {
    var startDrawing = function(position) {
        _center = position;
        // spray once every 200 milliseconds
        // _intervalId = setInterval(this.spray, 10);
        _intervalId = setInterval(spray, 10);
    };

    // this.finishDrawing = function(position) {
    var finishDrawing = function(position) {
        clearInterval(_intervalId);
    };

    /**
     * 選択の破線
     * 
     * @param {any} e
     */
    function onMouseMove(e) {
        if (getSpray()) {
            var position = getPointFromEvent(e);
            _center = position;
            // _ctxDrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            // _rectangle.endY = e.layerY - _rectangle.startY;
            // _rectangle.endX = e.layerX - _rectangle.startX;

            // var brush_color = picker.color;
            // _ctxDrawingLayer.strokeStyle = brush_color;
            // _ctxDrawingLayer.strokeRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);
        }
    };

    /**
     * 選択する
     * 
     * @param {any} e
     */
    function onMouseUp(e) {
        if (getSpray()) {
            var position = getPointFromEvent(e);
            // this.finishDrawin(position);
            finishDrawing(position);
            // 塗りつぶしの色を決める
            // var brush_color = picker.color;
            // _ctxDisplayLayer.fillStyle = brush_color;
            // _ctxDisplayLayer.fillRect(_rectangle.startX, _rectangle.startY, _rectangle.endX, _rectangle.endY);

            // _rectangle.clear();
            // _ctxDrawingLayer.clearRect(0, 0, _canvasX, _canvasY);
            // _drawingLayer.removeEventListener("mousemove", onMouseMove, false);
        }
    };

    return app;
})();