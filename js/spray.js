'use strict';

// http://stackoverflow.com/questions/14168457/how-to-implement-a-spray-paint-tool-for-html5-canvas

/**
 * スプレーツール
 * 
 * @returns
 */
var sprayTool = (function() {
    // キャンバスエレメント
    var _drawingLayer;
    // 描画コンテキスト
    var _ctx_display_layer;

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
        _drawingLayer = _drawing;
        _ctx_display_layer = _display.getContext("2d");
        _drawingLayer.addEventListener("mousedown", onMouseDown, false);
        // _drawingLayer.addEventListener("mouseup", onMouseUp, false);
        // これはdocumentにしないとcanvasから離れたときに解除されない
        document.addEventListener("mouseup", onMouseUp, false);
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
            startDrawing(position);
            _drawingLayer.addEventListener("mousemove", onMouseMove, false);
        }
    };

    // インターバルでスプレーする
    var spray = function() {
        // 色を変える
        var brush_color = picker.color;
        _ctx_display_layer.fillStyle = brush_color;

        var centerX = _center.x,
            centerY = _center.y,
            i;

        for (i = 0; i < density; i++) {
            var offset = getRandomOffset();
            var x = centerX + offset.x,
                y = centerY + offset.y;

            _ctx_display_layer.fillRect(x, y, 1, 1);
        }
    };

    var startDrawing = function(position) {
        _center = position;
        // 以前のを消す
        clearInterval(_intervalId);
        // spray once every 200 milliseconds
        _intervalId = setInterval(spray, 10);
    };

    // スプレー終了
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
            finishDrawing(position);
        }
    };

    return app;
})();