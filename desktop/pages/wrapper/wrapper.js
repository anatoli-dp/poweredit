const remote = require('electron').remote
const win = remote.getCurrentWindow()

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls()
    }
};

window.onbeforeunload = (event) => {
    win.removeAllListeners()
}

function handleWindowControls() {
    document.querySelector('.minimizeControl').addEventListener("click", event => {
        win.minimize()
    });

    document.querySelector('.sizeControl').addEventListener("click", event => {
        toggleMaxRestoreButtons()
    })

    document.querySelector('.quitControl').addEventListener("click", event => {
        win.close()
    })

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.querySelector('.sizeControl').innerHTML = '<i class="fas fa-window-maximize"></i>'
            win.unmaximize()
        } else {
            document.querySelector('.sizeControl').innerHTML = '<i class="far fa-window-restore"></i>'
            win.maximize()
        }
    }
}