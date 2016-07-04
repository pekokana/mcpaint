'use strict';

/* 古い
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
require('crash-reporter').start();
*/
const electron = require("electron");
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

app.on('ready', function() {

    // ブラウザ(Chromium)の起動, 初期画面のロード
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    // mainWindow = new BrowserWindow({
    //     width: 800,
    //     height: 600,
    //     'node-integration': false
    // });
    // デバッグするためのDevToolsを表示
    // mainWindow.webContents.openDevTools();

    // 小さいウィンドウ
    const windowManager = require('electron-window-manager');
    var window_size = 'file://' + __dirname + '/page/window_size.html'
    windowManager.open('home', 'キャンバスサイズ変更', window_size);

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});