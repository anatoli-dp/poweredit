import tippy from 'tippy.js'

import { main } from './menuOptions/main.js'
import { resize } from './menuOptions/resize.js'
import { menuSetup } from './menuSetup.js'
import { rulesGuides } from './menuOptions/rules-guides.js'
import { mode } from './menuOptions/mode.js'

export function menu (editor, base) {
    menuSetup(editor)

    let menuWrapper = base.newEl('div.ed-sC-left-menu.ed-sC-panelButton-left.ed-sC-item')

    let tippyInstances = []
    let waitingInstance = false

    editor.Panels.addPanel({
        id: 'ed-sC-left-menu',
        el: '.ed-sC-left-menu'
    })

    editor.on('menu:refresh', buildMenu)

    function buildMenu () {
        tippyInstances.forEach(tip => {
            tip.destroy()
        })
        tippyInstances.length = 0
        
        menuWrapper.innerHTML = ''

        editor.menuSetup.forEach(item => {
            let menuButtonWrapper = menuWrapper.newEl('div.ed-sC-left-menu-item')
    
            if (item.label) {
                menuButtonWrapper.innerHTML = item.label
    
                if (item.submenu) {
                    let tip = tippy(menuButtonWrapper, {
                        content: '',
                        arrow: false,
                        trigger: 'click',
                        interactive: true,
                        appendTo: document.body,
                        placement: 'bottom-start',
                        offset: [0, 0],
                        duration: 0,
    
                        onShow(instance) {
                            menuButtonWrapper.style.color = 'white'

                            waitingInstance = true
                            tippyInstances.forEach(tip => {
                                tip.setProps({
                                    trigger: 'mouseenter focus'
                                })

                                if (tip != instance) tip.hide()
                            })
                            waitingInstance = false
                        },
    
                        onHide() {
                            menuButtonWrapper.style.color = ''

                            if (!waitingInstance) {
                                tippyInstances.forEach(tip => {
                                    tip.setProps({
                                        trigger: 'click'
                                    })
                                })
                            }
                        },
                    })
                    tippyInstances.push(tip)

                    tip.setContent(generateSubMenu(menuButtonWrapper, item.submenu, tip))
                }
            }
        })
    }
    
    function generateSubMenu (parent, menu, tip) {
        let subMenuWrapper = parent.newEl('div.subMenu')
    
        menu.forEach(item => {
            let subMenuItem = subMenuWrapper.newEl('div.subMenuItem')
    
            if (item.label) {
                let subMenuLabel = subMenuItem.newEl('div.subMenuLabel')
                subMenuLabel.innerHTML = item.label
    
                if (item.shortcut) {
                    let subMenuShortcut = subMenuItem.newEl('div.subMenuShortcut')
                    subMenuShortcut.innerHTML = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + item.shortcut
                }
    
                if (item.active) {
                    subMenuLabel.style.color = 'white'
                    subMenuItem.classList.add('active')

                    if (item.action) {
                        subMenuItem.addEventListener('click', function () {
                            tip.hide()

                            if (item.action.includes('|run|')) {
                                editor.Commands.run(item.action.replace('|run|', ''))
                            } else if (item.action.includes('|toggle|')) {
                                let action = item.action.replace('|toggle|', '')

                                if (editor.Commands.isActive(action)) {
                                    editor.Commands.stop(action)
                                    item.selected = false
                                } else {
                                    editor.Commands.run(action)
                                    item.selected = true
                                }
                            } else {
                                editor.Commands.has(item.action) ? editor.runCommand(item.action) : editor.trigger(item.action)
                            }

                            buildMenu()
                        })
                    }

                    if (item.selected) {
                        subMenuLabel.style.color = '#4eb8ff'
                    }
                } else {
                    subMenuLabel.style.color = 'rgba(255, 255, 255, 0.25)'

                    if (item.selected) {
                        subMenuLabel.style.color = '#3282b8b8'
                    }
                }

                if (item.selected  & item.ignoreActive) {
                    subMenuLabel.style.color = '#4eb8ff'
                }
            } else if (item.title) {
                let subMenuTitle = subMenuItem.newEl('div.subMenuTitle')
                subMenuTitle.innerHTML = item.title
            } else if (item.type == 'break') {
                let subMenuBreak = subMenuItem.newEl('hr.subMenuBreak')
            }
        })
    
        return subMenuWrapper
    }
    
    function generateID () {
        return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

    main(editor)
    mode(editor)
    rulesGuides(editor)
    resize(editor)

    buildMenu()
}