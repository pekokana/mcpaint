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

// リサイズ画面
function showResize() {
    const windowManager = require('electron-window-manager');
    var new_win = 'file://' + __dirname + '/page/window_size.html'
    windowManager.open('Resize', 'キャンバスサイズ変更', new_win);
    var win = windowManager.get('Resize');

    // 大きさ変更
    win.resize(300, 200).restore();
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
        submenu: [
            /*{
                        label: 'Reload',
                        accelerator: 'Command+R',
                        click: function() {
                            mainWindow.restart();
                        }
                    }, */
            {
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
            },
        ]
    }, {
        label: 'Edit',
        submenu: [{
            label: 'Resize',
            accelerator: 'Command+E',
            click: function() {
                showResize();
            }
        }, {
            label: "Copy",
            accelerator: "CmdOrCtrl+C",
            selector: "copy:"
        }, {
            label: "Paste",
            accelerator: "CmdOrCtrl+V",
            selector: "paste:"
        }]
    }];
    // https://pracucci.com/atom-electron-enable-copy-and-paste.html
    // これをするとメニューが上書きされてくれる
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu);

    // 小さいウィンドウ
    if (false) {
        const windowManager = require('electron-window-manager');
        var window_size = 'file://' + __dirname + '/page/hpme.html'
        windowManager.open('home', 'キャンバスサイズ変更', window_size);
    }
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});