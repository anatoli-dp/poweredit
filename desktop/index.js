const {app, BrowserWindow} = require('electron')
const path = require('path')

function displayWindow () {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        frame: false,
        titleBarStyle: 'hidden',
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true,
            zoomFactor: 1,
            javascript: true,
            allowRunningInsecureContent: true,
            contextIsolation: false,
            //preload: path.join(__dirname, 'preload.js'),
        }
    })
  
    mainWindow.setMenuBarVisibility(false)
    mainWindow.maximize()
    mainWindow.webContents.openDevTools()
  
    mainWindow.loadFile(path.join(__dirname, './pages/wrapper/wrapper.html'))
}

app.whenReady().then(() => {
    displayWindow()
    
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            displayWindow()
        }
    })
})
  
app.on('window-all-closed', function () {
    app.quit()
})