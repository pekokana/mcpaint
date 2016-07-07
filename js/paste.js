'use strict';

//指定したCanvasがペーストを受け付けるようにする。
function enablePasteForCanvas(canvas) {
    var mousePos = {
        x: 0,
        y: 0
    };
    var pasteEvent = function(e) {
        (function() {
            var i;
            //クリップボードに含まれる画像データを検索
            var items = e.clipboardData.items;
            var imageItem = null;
            for (i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image/") != -1) {
                    imageItem = items[i];
                    break;
                }
            }
            if (!imageItem) {
                console.log("clipboard does not contain an image.");
                return;
            }

            //clipboardData.items -> Blob -> Image の順に変換
            var blob = imageItem.getAsFile();
            var blobURL = window.URL.createObjectURL(blob);
            var img = new Image();
            img.onload = function() {
                //Imageをキャンバスに描画
                var context = canvas.getContext("2d");
                // context.drawImage(img, 0, 0);
                // 押下した位置へ
                context.drawImage(img, mousePos.x, mousePos.y);
            };
            img.src = blobURL;
        }());
        e.preventDefault();
    };

    // Canvasにフォーカスが当たったらペーストイベントにコールバックを追加
    //   canvas.addEventListener("focus", function(e){
    canvas.addEventListener("mousedown", function(e) {
        document.addEventListener("paste", pasteEvent, false);
        mousePos = getPointFromEvent(e);
    }, false);
    // フォーカスが外れたらイベントからコールバックを削除
    // canvas.addEventListener("blur", function(e){
    // canvas.addEventListener("mouseup", function(e) {
    document.addEventListener("mousedown", function(e) {
        // ドキュメント上だと外れたことになる
        document.removeEventListener("paste", pasteEvent, false);
    }, false);

    // kineticはドラッグのため
    setupKinetic(canvas);
}

//==========
// TODO: kinetic
function setupKinetic(canvas) {
    function update(activeAnchor) {
        var group = activeAnchor.getParent();

        var topLeft = group.find('.topLeft')[0];
        var topRight = group.find('.topRight')[0];
        var bottomRight = group.find('.bottomRight')[0];
        var bottomLeft = group.find('.bottomLeft')[0];
        var image = group.find('.image')[0];

        var anchorX = activeAnchor.x();
        var anchorY = activeAnchor.y();

        // update anchor positions
        switch (activeAnchor.name()) {
            case 'topLeft':
                topRight.y(anchorY);
                bottomLeft.x(anchorX);
                break;
            case 'topRight':
                topLeft.y(anchorY);
                bottomRight.x(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.y(anchorY);
                topRight.x(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.y(anchorY);
                topLeft.x(anchorX);
                break;
        }

        image.setPosition(topLeft.getPosition());

        var width = topRight.x() - topLeft.x();
        var height = bottomLeft.y() - topLeft.y();
        if (width && height) {
            image.setSize({
                width: width,
                height: height
            });
        }
    }

    function addAnchor(group, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();

        var anchor = new Kinetic.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            strokeWidth: 2,
            radius: 8,
            name: name,
            draggable: true,
            dragOnTop: false
        });

        anchor.on('dragmove', function() {
            update(this);
            layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
            group.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function() {
            group.setDraggable(true);
            layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'pointer';
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on('mouseout', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'default';
            this.strokeWidth(2);
            layer.draw();
        });

        group.add(anchor);
    }

    function loadImages(sources, callback) {
        var images = {};
        var loadedImages = 0;
        var numImages = 0;
        for (var src in sources) {
            numImages++;
        }
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function() {
                if (++loadedImages >= numImages) {
                    callback(images);
                }
            };

            images[src].src = sources[src];
        }
    }

    function initStage(images) {
        var stage = new Kinetic.Stage({
            container: 'container', // divのcontainer
            width: 578,
            height: 400
        });
        var darthVaderGroup = new Kinetic.Group({
            x: 270,
            y: 100,
            draggable: true
        });
        var yodaGroup = new Kinetic.Group({
            x: 100,
            y: 110,
            draggable: true
        });
        var layer = new Kinetic.Layer();

        /*
         * go ahead and add the groups
         * to the layer and the layer to the
         * stage so that the groups have knowledge
         * of its layer and stage
         */
        layer.add(darthVaderGroup);
        layer.add(yodaGroup);
        stage.add(layer);

        // darth vader
        var darthVaderImg = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.darthVader,
            width: 200,
            height: 138,
            name: 'image'
        });

        // darthVaderImg.src = canvas.toDataURL(); //???
        darthVaderGroup.add(darthVaderImg);
        addAnchor(darthVaderGroup, 0, 0, 'topLeft');
        addAnchor(darthVaderGroup, 200, 0, 'topRight');
        addAnchor(darthVaderGroup, 200, 138, 'bottomRight');
        addAnchor(darthVaderGroup, 0, 138, 'bottomLeft');

        darthVaderGroup.on('dragstart', function() {
            this.moveToTop();
        });
        // yoda
        var yodaImg = new Kinetic.Image({
            x: 0,
            y: 0,
            image: images.yoda,
            width: 93,
            height: 104,
            name: 'image'
        });

        // yodaImg.src = canvas.toDataURL(); //???
        yodaGroup.add(yodaImg);
        addAnchor(yodaGroup, 0, 0, 'topLeft');
        addAnchor(yodaGroup, 93, 0, 'topRight');
        addAnchor(yodaGroup, 93, 104, 'bottomRight');
        addAnchor(yodaGroup, 0, 104, 'bottomLeft');

        yodaGroup.on('dragstart', function() {
            this.moveToTop();
        });

        stage.draw();
    }

    var sources = {
        darthVader: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
        yoda: 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg'
    };
    loadImages(sources, initStage);

    // TODO: 消す
     $("#container").hide()
}