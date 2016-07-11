'use strict';

// http://stackoverflow.com/questions/14168457/how-to-implement-a-spray-paint-tool-for-html5-canvas

/**
 * スプレーツール
 * 
 * @returns
 */
var sprayTool = (function() {
    //キャンバスエレメント
    // var _displayLayer;
    var _drawingLayer;
    // 描画コンテキスト
    var _ctxDisplayLayer;

    // キャンバスサイズ
    // var _canvasY;
    // var _canvasX;

    var _intervalId, // used to track the current interval ID
        _center; // the current center to spray
    var radius = 10;
    var density = 10;

    /**
     * コンストラクタ
     * 
     * @param {any} _display
     * @param {any} _drawing
     */
    var app = function(_display, _drawing) {
        // _displayLayer = _display;
        _drawingLayer = _drawing;
        // _canvasY = _drawingLayer.clientHeight;
        // _canvasX = _drawingLayer.clientWidth;
        _ctxDisplayLayer = _display.getContext("2d");
        // _ctxDrawingLayer = _drawing.getContext("2d");
        // 破線
        var dashList = [1, 1]; // Create 3x3 dots and spaces
        // _ctxDrawingLayer.setLineDash(dashList);
        _drawingLayer.addEventListener("mousedown", onMouseDown, false);
        _drawingLayer.addEventListener("mouseup", onMouseUp, false);
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
     * マウス押下
     * 
     * @param {any} e
     */
    function onMouseDown(e) {
        if (getSpray()) {
            var position = getPointFromEvent(e);
            // this.startDrawing(position);
            startDrawing(position);
            _drawingLayer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    // this.spray = function() {
    var spray = function() {
        var centerX = _center.x,
            centerY = _center.y,
            i;

        for (i = 0; i < density; i++) {
            var offset = getRandomOffset();
            var x = centerX + offset.x,
                y = centerY + offset.y;

            // drawingCxt.fillRect(x, y, 1, 1);
            _ctxDisplayLayer.fillRect(x, y, 1, 1);
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
        }
    };

    return app;
})();