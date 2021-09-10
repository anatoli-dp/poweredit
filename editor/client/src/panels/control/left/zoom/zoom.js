export function zoom (editor, base) {
    let zoomWrapper = base.newEl('div.ed-sC-left-menu.ed-sC-panelButton-left.ed-sC-item.zoomWrapper')

    let zoomDecreaseWrapper = zoomWrapper.newEl('div.edsC-left-menu-item.zoomDecreaseWrapper.hoverState')
    let zoomStatusWrapper = zoomWrapper.newEl('div.edsC-left-menu-item.zoomStatusWrapper')
    let zoomIncreaseWrapper = zoomWrapper.newEl('div.edsC-left-menu-item.zoomIncreaseWrapper.hoverState')

    zoomIncreaseWrapper.innerHTML = '<i class="fas fa-search-plus"></i>'
    zoomIncreaseWrapper.addEventListener('click', function () {
        editor.trigger('CanvasZoom:In')
    })

    zoomDecreaseWrapper.innerHTML = '<i class="fas fa-search-minus"></i>'
    zoomDecreaseWrapper.addEventListener('click', function () {
        editor.trigger('CanvasZoom:Out')
    })

    zoomStatusWrapper.innerHTML = editor.Canvas.getZoom() + '%'

    editor.on('CanvasZoom:In', function () {
        editor.Canvas.setZoom(editor.Canvas.getZoom() + 5)
        zoomStatusWrapper.innerHTML = editor.Canvas.getZoom() + '%'
    })

    editor.on('CanvasZoom:Out', function () {
        editor.Canvas.setZoom(editor.Canvas.getZoom() - 5)
        zoomStatusWrapper.innerHTML = editor.Canvas.getZoom() + '%'
    })

    editor.on('ResetCanvas', function () {
        document.querySelector('.gjs-cv-canvas__frames').removeAttribute('style')
        editor.Canvas.setZoom(100)
        //editor.Canvas.clearOff()

        zoomStatusWrapper.innerHTML = editor.Canvas.getZoom() + '%'
    })
}