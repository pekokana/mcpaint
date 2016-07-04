//指定したCanvasがペーストを受け付けるようにする。
function enablePasteForCanvas(canvas) {
  var pasteEvent = function(e) {
    (function() {
      var i;
      //クリップボードに含まれる画像データを検索
      var items = e.clipboardData.items;
      var imageItem = null;
      for(i = 0; i < items.length; i++) {
        if(items[i].type.indexOf("image/") != -1) {
          imageItem = items[i];
          break;
        }
      }
      if(! imageItem) {
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
        context.drawImage(img, 0, 0);
      };
      img.src = blobURL;
    }());
    e.preventDefault();
  };
  
  // Canvasにフォーカスが当たったらペーストイベントにコールバックを追加
  //   canvas.addEventListener("focus", function(e){
  canvas.addEventListener("mousedow", function(e){
    document.addEventListener("paste", pasteEvent, false);
  }, false);
  // フォーカスが外れたらイベントからコールバックを削除
  //   canvas.addEventListener("blur", function(e){
  canvas.addEventListener("mouseup", function(e){
    document.removeEventListener("paste", pasteEvent, false);
  }, false);
}