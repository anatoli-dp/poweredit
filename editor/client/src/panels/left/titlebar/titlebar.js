export function titlebar (editor, base) {
    const titlebar = base.newEl('div.ed-sL-titlebar')

    editor.Commands.add('panel:left:titlebar:set', function (editor, sender, options) {
        titlebar.innerHTML = options.title
    })
}