export function rulesGuides (editor) {
    let viewMenu = editor.menuSetup[2].submenu

    editor.Commands.stop('guides-visibility')
    editor.Commands.run('guides-visibility')

    editor.on('run:ruler-visibility', function () {
        viewMenu[15].active = true
        viewMenu[16].active = true
    })

    editor.on('stop:ruler-visibility', function () {
        viewMenu[15].active = false
        viewMenu[16].active = false
    })
}