export function tabs (editor, base) {
    const tabs = base.newEl('div.ed-sL-tabs')
    const cmd = editor.Commands

    editor.Panels.addPanel({
        id: 'ed-sL-tabs',
        el: '.ed-sL-tabs',
        buttons: [
            {
                id: 'navigator',
                className: 'fas fa-stream',
                command: 'panel:left:tab:select',
            }
        ],
    })

    cmd.add('panel:left:tab:select', {
        run(editor, sender, options = {}) {
            editor.runCommand('panel:left:titlebar:set', { title: sender.attributes.id })
            editor.runCommand('panel:left:content:' + sender.attributes.id)
            editor.runCommand('panel:left:open')
        },

        stop(editor, sender) {
            editor.runCommand('panel:left:titlebar:set', { title: ' ' })
            editor.stopCommand('panel:left:content:' + sender.attributes.id)
            editor.runCommand('panel:left:close')
        }
    })

    const slideLock = tabs.newEl('div.ed-sL-tabs.slideLock')
    slideLock.innerHTML = '<i class="fas fa-unlock"></i>'
    slideLock.addEventListener('click', function () {
        if (slideLock.classList.contains('locked')) {
            slideLock.classList.remove('locked')
            slideLock.innerHTML = '<i class="fas fa-unlock"></i>'
            editor.trigger('panel:left:unlock')
        } else {
            slideLock.classList.add('locked')
            slideLock.innerHTML = '<i class="fas fa-lock"></i>'
            editor.trigger('panel:left:lock')
        }
    })
    editor.trigger('panel:left:unlock')
}