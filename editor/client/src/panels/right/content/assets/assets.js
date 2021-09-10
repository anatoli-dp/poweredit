export function assets (editor, base) {
    let assetsContainer = base.newEl('div.ed-sR-content-assets')

    assetsContainer.style.display = 'none'
    editor.Commands.add('panel:right:content:assets', {
        run() {
            assetsContainer.style.display = 'block'
        },

        stop() {
            assetsContainer.style.display = 'none'
        }
    })
}