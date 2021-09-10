export function resize (editor) {
    let deviceSet = editor.menuSetup[3].submenu

    let devices = [
        'Desktop',
        'Tablet',
        'Mobile Portrait',
        'Mobile Landscape'
    ]

    let activeState = 0

    editor.on('Desktop', function () {
        editor.setDevice('Desktop')

        deviceSet[activeState].selected = false
        deviceSet[activeState].active = true

        activeState = 0

        deviceSet[activeState].selected = true
        deviceSet[activeState].active = false

        editor.trigger('menu:refresh')
    })

    editor.on('Tablet', function () {
        editor.setDevice('Tablet')

        deviceSet[activeState].selected = false
        deviceSet[activeState].active = true

        activeState = 1

        deviceSet[activeState].selected = true
        deviceSet[activeState].active = false

        editor.trigger('menu:refresh')
    })

    editor.on('Mobile Portrait', function () {
        editor.setDevice('Mobile portrait')

        deviceSet[activeState].selected = false
        deviceSet[activeState].active = true

        activeState = 2

        deviceSet[activeState].selected = true
        deviceSet[activeState].active = false

        editor.trigger('menu:refresh')
    })

    editor.on('Mobile Landscape', function () {
        editor.setDevice('Mobile landscape')

        deviceSet[activeState].selected = false
        deviceSet[activeState].active = true

        activeState = 3

        deviceSet[activeState].selected = true
        deviceSet[activeState].active = false

        editor.trigger('menu:refresh')
    })

    editor.on('devices:setActive', function () {
        editor.trigger(devices[activeState])
    })

    document.querySelector('.ed-structCanvas').addEventListener('transitionend', function () {
        editor.refresh()
    })

    editor.trigger('Desktop')
}