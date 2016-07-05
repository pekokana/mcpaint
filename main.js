'use strict';

const electron = require("electron");
const Menu = electron.Menu;
const {
    crashReporter
} = require('electron');
crashReporter.start({
    productName: 'YourName',
    companyName: 'YourCompany',
    submitURL: 'https://your-domain.com/url-to-submit',
    autoSubmit: true
});

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin')
        app.quit();
});

function setupMenu(template) {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}
app.on('ready', function() {

    // ブラウザ(Chromium)の起動, 初期画面のロード
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "MCペイント",
        // frame: false,
        // resizable: false,
        // transparent: true,
    });

    // デバッグするためのDevToolsを表示
    // mainWindow.webContents.openDevTools();
    var template = [{
        label: 'Electron',
        submenu: [{
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() {
                app.quit();
            }
        }, ]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() {
                mainWindow.restart();
            }
        }, {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+Command+F',
            click: function() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+Command+I',
            click: function() {
                mainWindow.toggleDevTools();
            }
        }, ]
    }];
    // これをするとメニューが上書きされてくれる
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);

    // 小さいウィンドウ
    if (false) {
        const windowManager = require('electron-window-manager');
        var window_size = 'file://' + __dirname + '/page/window_size.html'
        windowManager.open('home', 'キャンバスサイズ変更', window_size);
    }
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});