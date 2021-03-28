const { app, BrowserWindow } = require('electron')
const path = require('path')

isDev = require('electron-is-dev');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
    }
  })
  if (isDev) {
    const appUrl = "http://localhost:13502";
    mainWindow.loadURL(appUrl);
  } else {
    mainWindow.loadFile('webstudio-build/index.html');
  }

  mainWindow.maximize()
  mainWindow.on('closed', () => delete mainWindow)

  //win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
