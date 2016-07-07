'use strict';

// マウス位置
function getPointFromEvent(event) {
    var boundingRect = event.target.getBoundingClientRect();

    return {
        x: event.clientX - boundingRect.left | 0,
        y: event.clientY - boundingRect.top | 0
    }
}

$(function() {
    $('#undo').click(function(e) {
        context.putImageData(undoImage, 0, 0);
    });

    $('#restore').click(function(e) {
        context.putImageData(getImage, 0, 0);
    });

    $('#clear').click(function(e) {
        e.preventDefault();
        context.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    });

    $('#save').click(function() {
        var d = canvas.toDataURL('image/png');
        d = d.replace('image/png', 'image/octet-stream');
        window.open(d, 'save');
    });
});