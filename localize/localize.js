'use strict';

var user_lang = navigator.language || navigator.userLanguage; 

// user_lang のあとに.jsをつけたファイル名が呼ばれる
try{
    var my_localize = require('./localize/' + user_lang + '.js');
} catch(e) {
    // ユーザのが存在してなかったら仕方なくデフォルト
    my_localize = require('./localize/en-US.js');
}