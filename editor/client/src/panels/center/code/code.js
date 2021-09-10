import beautify from 'js-beautify'
//import UglifyJS from '../../../stuffs/singles/uglifyjs'
import { toCSS, toJSON } from 'cssjson'
//import { CodeEditor } from '../../../stuffs/component-editor/code-editor'

export function code (editor, base) {
    editor.runCommand('open-code')
    document.querySelector('.gjs-pn-views-container').style.display = 'none'

    let cmd = editor.Commands
    let cssc = editor.CssComposer
    let cssSet = []

    let currentTab = 'html'

    let codeSelectors = base.newEl('div.codeSelectors')

    let html_cssUpdateBtn = codeSelectors.newEl('div.CodeUpdateBtn')
    html_cssUpdateBtn.innerHTML = 'update HTML/CSS'
    html_cssUpdateBtn.onclick = function () {
        cssSet = []
        parseCSS()

        editor.trigger('codeEditor:html:update', {
            code: htmlCodeEditor.getValue()
        })

        cssSet.forEach(ruleSet => {
            let selector = ruleSet[0]

            cssc.setRule(ruleSet[0], ruleSet[1], ruleSet[2])
        })
    }

    function parseCSS () {
        let cssLines = cssCodeEditor.getValue().split('\n')

        let inSelector = false
        let inMedia = false

        let mediaParams = {}
        let selector = ''
        let selectorParams = {}

        cssLines.forEach(line => {
            let part = line.trim()
            if (part != '') {
                part = part.substring(0, part.length - 1)
                part = part.trim()

                if (inSelector) {
                    if (part != '') {
                        //selector value
                        let property = part.substring(0, part.indexOf(':'))
                        let value = part.replace(property + ':', '').trim()
                        selectorParams[property] = value
                    } else {
                        //end of selector
                        cssSet.push([selector, selectorParams, mediaParams])
                        selectorParams = {}
                        inSelector = false
                    }
                } else {
                    if (part.includes('@media')) {
                        //new media rule
                        mediaParams = {
                            atRuleType: 'media',
                            atRuleParams: part.replace('@media ', '')
                        } 
                        inMedia = true
                    } else if (inMedia & part == '') {
                        //end of media rule
                        mediaParams = {}
                        inMedia = false
                    } else {
                        //new selector
                        selector = part
                        inSelector = true
                    }
                }
            }
        })
    }

    let htmlCodeSelector = codeSelectors.newEl('div.codeSelectorsTab.selected')
    htmlCodeSelector.innerHTML = 'HTML'
    htmlCodeSelector.onclick = function () {
        htmlCodeSelector.classList.add('selected')
        cssCodeSelector.classList.remove('selected')
        jsCodeSelector.classList.remove('selected')

        htmlCodeWrapper.style.zIndex = 1
        cssCodeWrapper.style.zIndex = 0
        jsCodeWrapper.style.zIndex = 0

        html_cssUpdateBtn.style.display = 'flex'
        jsUpdateBtn.style.display = 'none'
        //jsTestRunBtn.style.display = 'none'

        currentTab = 'html'
    }

    let cssCodeSelector = codeSelectors.newEl('div.codeSelectorsTab')
    cssCodeSelector.innerHTML = 'CSS'
    cssCodeSelector.onclick = function () {
        htmlCodeSelector.classList.remove('selected')
        cssCodeSelector.classList.add('selected')
        jsCodeSelector.classList.remove('selected')

        htmlCodeWrapper.style.zIndex = 0
        cssCodeWrapper.style.zIndex = 1
        jsCodeWrapper.style.zIndex = 0

        html_cssUpdateBtn.style.display = 'flex'
        jsUpdateBtn.style.display = 'none'
        //jsTestRunBtn.style.display = 'none'

        currentTab = 'css'
    }

    let jsUpdateBtn = codeSelectors.newEl('div.CodeUpdateBtn')
    jsUpdateBtn.innerHTML = 'update JS'
    jsUpdateBtn.style.display = 'none'
    jsUpdateBtn.onclick = function () {
        let originalCode = jsCodeEditor.getValue()
        let target = editor.getSelected()

        target.jsCodeEditorContents = originalCode

        editor.getSelected().set('script', UglifyJS.minify(originalCode).code, {
            mangle: false,
        })

        //editor.runCommand('codeEditor:js:setScript')
        setScriptData()
    }
    
    /*let jsTestRunBtn = codeSelectors.newEl('i.CodeTestBtn.fas.fa-bug')
    jsTestRunBtn.style.display = 'none'
    jsTestRunBtn.onclick = function () {
        try {
            Function('"use strict";' + UglifyJS.minify(jsCodeEditor.getValue()).code)()
            alert('no immediate error')
        } catch (err) {
            alert('err>> ' + err)
        }
    }*/

    let jsCodeSelector = codeSelectors.newEl('div.codeSelectorsTab')
    jsCodeSelector.innerHTML = 'JS'
    jsCodeSelector.onclick = function () {
        htmlCodeSelector.classList.remove('selected')
        cssCodeSelector.classList.remove('selected')
        jsCodeSelector.classList.add('selected')

        htmlCodeWrapper.style.zIndex = 0
        cssCodeWrapper.style.zIndex = 0
        jsCodeWrapper.style.zIndex = 1

        html_cssUpdateBtn.style.display = 'none'
        jsUpdateBtn.style.display = 'flex'
        //jsTestRunBtn.style.display = 'flex'

        currentTab = 'js'
    }

    let beautify_html = beautify.html
    let beautify_css = beautify.css
    let beautify_js = beautify.js

    ace.require('ace/ext/language_tools')

    let codeAreaWrapper = base.newEl('div.codeAreaWrapper')

    let htmlMode = ace.require('ace/mode/html').Mode
    let htmlCodeWrapper = codeAreaWrapper.newEl('div.codeAreaContent')
    let htmlCodeEditor = ace.edit(htmlCodeWrapper)
    htmlCodeEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    })

    htmlCodeEditor.setTheme("ace/theme/solarized_dark")
    htmlCodeEditor.session.setMode(new htmlMode())
    htmlCodeEditor.setShowPrintMargin(false)

    editor.on('component:selected', function () {
        //editor.runCommand('codeEditor:js:setScript')
        setScriptData()
    })

    function setScriptData () {
        let target = editor.getSelected()

        if (target.jsCodeEditorContents) {
            jsCodeEditor.setValue(target.jsCodeEditorContents)
        } else {
            jsCodeEditor.setValue('let el = this')
        }

        jsCodeEditor.clearSelection()
    }

    editor.on('component:clone', model => {
        model.set('script', '')
    })

    cmd.add('codeEditor:html:set', function (editor, sender, options) {
        let text = beautify_html(options.code)
        htmlCodeEditor.session.setValue(text)
        htmlCodeEditor.clearSelection()
    })

    let cssMode = ace.require('ace/mode/css').Mode
    let cssCodeWrapper = codeAreaWrapper.newEl('div.codeAreaContent')
    let cssCodeEditor = ace.edit(cssCodeWrapper)
    cssCodeEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    })

    cssCodeEditor.setTheme("ace/theme/solarized_dark")
    cssCodeEditor.session.setMode(new cssMode())
    cssCodeEditor.setShowPrintMargin(false)

    cmd.add('codeEditor:css:set', function (editor, sender, options) {
        let text = beautify_css(options.code)
        cssCodeEditor.session.setValue(text)
        cssCodeEditor.clearSelection()
    })

    cmd.add('codeEditor:js:set', function (editor, sender, options) {
        let text = beautify_js(options.code)
        jsCodeEditor.session.setValue(text)
        jsCodeEditor.clearSelection()
    })

    let jsMode = ace.require('ace/mode/javascript').Mode
    let jsCodeWrapper = codeAreaWrapper.newEl('div.codeAreaContent')
    let jsCodeEditor = ace.edit(jsCodeWrapper)
    jsCodeEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    })

    jsCodeEditor.setTheme("ace/theme/solarized_dark")
    jsCodeEditor.session.setMode(new jsMode())
    jsCodeEditor.setShowPrintMargin(false)

    htmlCodeWrapper.style.zIndex = 1
    cssCodeWrapper.style.zIndex = 0
    jsCodeWrapper.style.zIndex = 0

    let codeErrorOverlay = base.newEl('div.codeErrorOverlay')
    codeErrorOverlay.innerHTML = 'No Component Selected! Please Select a Component'

    editor.on('component:selected', modal => {
        if (modal.attributes.type == 'wrapper') {
            codeErrorOverlay.style.display = 'flex'
            codeErrorOverlay.innerHTML = 'Wrapper/Base Component Cannot Be Edited! Please Select a Different Component'
        } else {
            codeErrorOverlay.style.display = 'none'
        }
    })

    editor.on('component:deselected', modal => {
        codeErrorOverlay.style.display = 'flex'
        codeErrorOverlay.innerHTML = 'No Component Selected! Please Select a Component'
    })
}