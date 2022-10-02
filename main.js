//electron main
const { app, BrowserWindow } = require('electron')

if (require('electron-squirrel-startup')) return app.quit();

function createWindow () {
  const win = new BrowserWindow({
    width: 1344,
    height: 692,
    icon: __dirname + 'icon.ico',
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    },
  })
  win.setMaximizable(false)
  win.setResizable(false)
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
//electron DOM handler