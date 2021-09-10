export function pages (editor, base) {
    let pagesContainer = base.newEl('div.ed-sR-content-pages')
    let pagesTop = pagesContainer.newEl('div.top')
    let pagesBottom = pagesContainer.newEl('div.bottom')

    let addPage = pagesTop.newEl('div.topTab.addPage')
    addPage.innerHTML = '<i class="fas fa-file"></i>'

    const pageManager = editor.Pages

    let initialPage = pageManager.getSelected().id
    editor.PageData = {
        pageCount: 1,
        pages: [initialPage],
        structure: {
            [initialPage]: {
                name: 'page 1',
                html: '',
                css: '',
                js: ''
            }
        }
    }
    let selectedPage = initialPage

    addPage.onclick = function () {
        editor.trigger('pages:newPage')
    }

    editor.on('pages:newPage', function () {
        editor.PageData.pageCount++

        let newPage = pageManager.add({})

        editor.PageData.pages.push(newPage.id)
        editor.PageData.structure[newPage.id] = {
            name: 'page ' + editor.PageData.pageCount,
            html: '',
            css: '',
            js: ''
        }

        pageManager.select(newPage)
        selectedPage = newPage.id

        editor.trigger('pages:list:refresh')
    })

    editor.on('pages:list:refresh', function () {
        pagesBottom.innerHTML = ''

        pagesListRefresh()

        function pagesListRefresh () {
            editor.PageData.pages.forEach(page => {
                let pgw = pagesBottom.newEl('div.pgw')
                pgw.dataset.page = page

                let pgwName = pgw.newEl('div.pgwName')
                pgwName.innerHTML = editor.PageData.structure[page].name
                pgwName.contentEditable = 'true'
                pgwName.spellcheck = false

                let pgwDelete = pgw.newEl('div.pgwDelete')
                pgwDelete.innerHTML = '<i class="fas fa-times"></i>'

                if (page == selectedPage) {
                    pgw.dataset.selectedPage = ''
                    pgwDelete.style.display = 'none'
                }

                pgw.onclick = function (e) {
                    let target = e.target

                    if (target.dataset.selectedPage != '') {
                        let sp = document.querySelector('[data-selected-page]')

                        delete sp.dataset.selectedPage
                        sp.querySelector('.pgwDelete').style.display = 'block'

                        target.dataset.selectedPage = ''
                        target.querySelector('.pgwDelete').style.display = 'none'

                        selectedPage = target.dataset.page
                        pageManager.select(selectedPage)

                        editor.trigger('devices:setActive')
                    }
                }

                pgwName.onclick = function (e) {
                    e.stopPropagation()
                }

                pgwName.onfocus = function (e) {
                    e.target.style.padding = '00px 10px 0px 10px'
                }

                pgwName.onblur = function (e) {
                    let target = e.target
                    let id = target.parentElement.dataset.page
                    let newValue = target.innerHTML
                    let oldValue = editor.PageData.structure[id].name

                    if (newValue != oldValue) {
                        if (newValue == '') {
                            target.innerHTML = oldValue
                        } else {
                            editor.PageData.structure[id].name = newValue
                        }
                    }

                    target.style.padding = ''
                }

                pgwName.onkeydown = function(e){
                    if (e.which === 13) {
                        e.preventDefault()
                    }
                }

                pgwDelete.onclick = function (e) {
                    e.stopPropagation()

                    let target = e.target.parentElement
                    let id = target.dataset.page

                    pageManager.remove(id)

                    let idIndex = editor.PageData.pages.indexOf(id)
                    if (idIndex > -1) {
                        editor.PageData.pages.splice(idIndex, 1)
                    }
                    delete editor.PageData.structure[id]

                    editor.trigger('pages:list:refresh')
                }
            })
        }

        editor.trigger('devices:setActive')
    })

    pagesContainer.style.display = 'none'
    editor.Commands.add('panel:right:content:pages', {
        run() {
            pagesContainer.style.display = 'block'
        },

        stop() {
            pagesContainer.style.display = 'none'
        }
    })

    editor.on('update', function () {
        updatePageStructure()
    })

    function updatePageStructure () {
        editor.PageData.structure[selectedPage].html = editor.getHtml()
        editor.PageData.structure[selectedPage].css = editor.getCss()
        editor.PageData.structure[selectedPage].js = editor.getJs()
    }

    updatePageStructure()
    editor.trigger('pages:list:refresh')
}