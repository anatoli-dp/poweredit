export function titlebar (editor, base) {
    const titlebar = base.newEl('div.ed-sR-titlebar')

    editor.Commands.add('panel:right:titlebar:set', function (editor, sender, options) {
        titlebar.innerHTML = options.title
    })
}