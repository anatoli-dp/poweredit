export function settings (editor, base, trait) {
    const settings = base.newEl('div.ed-sR-content-settings')
    settings.appendChild(trait)

    settings.style.display = 'none'

    editor.Commands.add('panel:right:content:settings', {
        run() {
            settings.style.display = 'block'
        },

        stop() {
            settings.style.display = 'none'
        }
    })
}