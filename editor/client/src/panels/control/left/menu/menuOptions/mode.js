export function mode (editor) {
    const flowMode = 0
    const absoluteMode = 'absolute'
    const hybridMode = 'translate'

    var currentMode = flowMode
    let modeMenu = editor.menuSetup[4].submenu
    let mmActive = 0

    editor.on('changeEditorMode:flow', function () {
        editor.setDragMode(flowMode)
        currentMode = flowMode

        modeMenu[mmActive].selected = false
        modeMenu[mmActive].active = true

        mmActive = 0

        modeMenu[mmActive].selected = true
        modeMenu[mmActive].active = false

        editor.trigger('menu:refresh')
    })

    editor.on('changeEditorMode:absolute', function () {
        editor.setDragMode(absoluteMode)
        currentMode = absoluteMode

        modeMenu[mmActive].selected = false
        modeMenu[mmActive].active = true

        mmActive = 1

        modeMenu[mmActive].selected = true
        modeMenu[mmActive].active = false

        editor.trigger('menu:refresh')
    })

    editor.on('changeEditorMode:hybrid', function () {
        editor.setDragMode(hybridMode)
        currentMode = hybridMode

        modeMenu[mmActive].selected = false
        modeMenu[mmActive].active = true

        mmActive = 2

        modeMenu[mmActive].selected = true
        modeMenu[mmActive].active = false

        editor.trigger('menu:refresh')
    })
}