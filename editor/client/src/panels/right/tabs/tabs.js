export function tabs (editor, base) {
    const tabs = base.newEl('div.ed-sR-tabs')
    const cmd = editor.Commands

    editor.Panels.addPanel({
        id: 'ed-sR-tabs',
        el: '.ed-sR-tabs',
        buttons: [
            /*{
                id: 'pages',
                className: 'far fa-file',
                command: 'panel:right:tab:select',
            },*/{
                id: 'add',
                className: 'far fa-plus-square',
                command: 'panel:right:tab:select',
            },/*{
                id: 'components',
                className: 'fas fa-box',
                command: 'panel:right:tab:select',
            },*/{
                id: 'assets',
                className: 'far fa-images rpTabAssetButton',
                command: 'panel:right:tab:select',
            },{
                id: 'styles',
                className: 'fas fa-paint-brush',
                command: 'panel:right:tab:select',
            },{
                id: 'style manager',
                className: 'fas fa-palette',
                command: 'panel:right:tab:select',
            },{
                id: 'settings',
                className: 'fas fa-cog',
                command: 'panel:right:tab:select',
            }
        ],
    })

    let pending = false
    let isOpen = false
    let activeTab = ''

    let assetBtn = document.querySelector('.rpTabAssetButton')
    assetBtn.onmouseover = function () {pending = true}
    assetBtn.onmouseout = function () {pending = false}

    let assetBtnChecker = new class {
        constructor() {
            this.observer = null
            this.lastClassState = assetBtn.classList.contains('gjs-pn-active')
    
            this.init()
        }
    
        init() {
            this.observer = new MutationObserver(this.mutationCallback)
            this.observe()
        }
    
        observe() {
            this.observer.observe(assetBtn, { attributes: true })
        }
    
        disconnect() {
            this.observer.disconnect()
        }
    
        mutationCallback = mutationsList => {
            for(let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    let currentClassState = mutation.target.classList.contains('gjs-pn-active')
                    if(this.lastClassState !== currentClassState) {
                        this.lastClassState = currentClassState
                        if(currentClassState) {
                            assetBtn.classList.remove('gjs-pn-active', 'gjs-four-color')
                            editor.runCommand('open-assets')
                        }
                    }
                }
            }
        }
    }

    cmd.add('panel:right:tab:select', {
        run(editor, sender, options = {}) {
            editor.runCommand('panel:right:titlebar:set', { title: sender.attributes.id })
            editor.runCommand('panel:right:content:' + sender.attributes.id)
            editor.runCommand('panel:right:open')

            if (pending) {
                if (sender.attributes.id == 'assets') {
                    if (activeTab != '') {
                        editor.Panels.getButton('ed-sR-tabs', activeTab).set('active', 1)
                    } else {
                        editor.Panels.getButton('ed-sR-tabs', 'assets').set('active', 0)
                    }
                }
            } else {
                activeTab = sender.attributes.id
                isOpen = true
            }
        },

        stop(editor, sender) {
            editor.runCommand('panel:right:titlebar:set', { title: ' ' })
            editor.stopCommand('panel:right:content:' + sender.attributes.id)
            editor.runCommand('panel:right:close')

            if (pending) {
                editor.runCommand('open-assets')
            } else {
                isOpen = false
                activeTab = ''
            }
        }
    })

    const slideLock = tabs.newEl('div.ed-sR-tabs.slideLock')
    slideLock.innerHTML = '<i class="fas fa-unlock"></i>'
    slideLock.addEventListener('click', function () {
        if (slideLock.classList.contains('locked')) {
            slideLock.classList.remove('locked')
            slideLock.innerHTML = '<i class="fas fa-unlock"></i>'
            editor.trigger('panel:right:unlock')
        } else {
            slideLock.classList.add('locked')
            slideLock.innerHTML = '<i class="fas fa-lock"></i>'
            editor.trigger('panel:right:lock')
        }
    })
    editor.trigger('panel:right:unlock')
}