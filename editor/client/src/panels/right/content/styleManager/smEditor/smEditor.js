import csstreeValidator from '../../../../../stuffs/singles/csstree-validator'

export function smEditor (editor) {
    let cssc = editor.CssComposer
    let selectors = ''
    let media = {}
    let baseCopy = null

    let smEditorWrapper = document.querySelector('.ed-sR-contentContainer').newEl('div.ed-sR-content-styleManagerEditor')
    smEditorWrapper.style.display = 'none'

    let closeWrapper = smEditorWrapper.newEl('div.styleManagerEditor-closeWrapper')
    closeWrapper.innerHTML = '<i class="fas fa-times"></i>'
    
    closeWrapper.onclick = function () {
        editor.trigger('styleManagerEditor:close')
    }

    let displayWrapper = smEditorWrapper.newEl('div.styleManagerEditor-displayWrapper')
    let displayContent = displayWrapper.newEl('div.selectorSpacer.styleManagerEditor-displayContent')

    displayWrapper.setAttribute('ss-container', '')

    let inputWrapper = smEditorWrapper.newEl('div.styleManagerEditor-inputWrapper')
    
    let cssError = inputWrapper.newEl('div.cssErrorMsg')

    let inputProperty = inputWrapper.newEl('div.inputDiv.inputProperty')
    inputProperty.setAttribute('contenteditable', 'true')
    inputProperty.setAttribute('spellcheck', 'false')

    let inputSeperator = inputWrapper.newEl('div.inputSeperator')
    inputSeperator.innerHTML = ':'
    inputSeperator.style.color = 'white'

    let inputValue = inputWrapper.newEl('div.inputDiv.inputValue')
    inputValue.setAttribute('contenteditable', 'true')
    inputValue.setAttribute('spellcheck', 'false')

    let inputAccept = inputWrapper.newEl('i.inputAccept.fas.fa-check')
    inputAccept.onclick = function (e) {
        if (validRule()) {
            addRule([inputProperty.innerHTML, inputValue.innerHTML])
            updateRulesViewer()
            updateRulesInput()
        }
    }

    function validRule () {
        let ruleToValidate = selectors + '{' + inputProperty.innerHTML + ':' + inputValue.innerHTML + '}'
        let statement = csstreeValidator.validate(ruleToValidate)

        if (statement.length == 0) {
            cssError.style.display = 'none'
            cssError.innerHTML = ''

            return true
        } else {
            cssError.style.display = ''
            cssError.innerHTML = statement[0].message

            return false
        }
    }

    editor.on('styleManagerEditor:open', function (options) {
        selectors = options.selector

        if (options.media != 'base') {
            media = {
                atRuleType: 'media',
                atRuleParams: '(' + options.media + ')'
            }
        } else {
            media = ''
        }

        smEditorWrapper.style.display = 'block'
        baseCopy = options.copy

        cssError.style.display = 'none'
        cssError.innerHTML = ''

        updateRulesViewer()
    })

    editor.on('styleManagerEditor:close', function () {
        smEditorWrapper.style.display = 'none'
        displayContent.innerHTML = ''
    })

    let selectedRule = null
    let rules = []

    function updateRulesViewer () {
        displayContent.innerHTML = ''
        displayContent.appendChild(baseCopy)

        let rulesString = cssc.getRule(selectors, media).toCSS()//.replace(/\s/g, '')

        if (rulesString != '') {
            if (rulesString.includes('@media')) {
                rulesString = rulesString.slice(0, -1)
                rulesString = rulesString.substring(rulesString.indexOf("{") + 1)
            }

            rules = rulesString.split(/{|}/)[1].split(';')
            //styleModel -> #123{rule1:stuff;rule2:stuff;} -> [#123,rule1:stuff;rule2:stuff,''] -> [rule1:stuff,rule2:stuff,'']
            rules.pop() //remove empty [''] at end
        } else {
            rules = []
        }

        let imageBreak = false
        let imageBeginning = ''

        let skipIteration = false

        rules.forEach(rule => {
            if (!imageBreak) {
                if (rule.includes('background-image:url')) {
                    imageBreak = true
                    imageBeginning = rule
                }
            } else {
                imageBreak = false
                rule = imageBeginning + rule
            }

            if (!imageBreak) {
                let ruleWrapper = displayContent.newEl('div.selectorWrapper.ruleWrapper')
                ruleWrapper.dataset.rule = rule
                ruleWrapper.onclick = function (e) {
                    updateRulesInput(e.target.dataset.rule)
                }

                let ruleName = ruleWrapper.newEl('div.ruleName')
                ruleName.innerHTML = rule

                let ruleDelete = ruleWrapper.newEl('i.ruleDelete.fas.fa-times')
                ruleDelete.onclick = function (e) {
                    e.stopPropagation()

                    let target = e.target.parentElement
                    deleteRule(target.dataset.rule)

                    updateRulesViewer()
                }
            }
        })

        updateRulesInput()
    }

    function updateRulesInput (rule) {
        if (rule) {
            let ruleSet = rule.split(':')

            if (ruleSet[0].includes('background-image')) {
                ruleSet[1] = ruleSet[1] + ':' + ruleSet[2]
            }

            inputProperty.innerHTML = ruleSet[0]
            inputValue.innerHTML = ruleSet[1]
        } else {
            inputProperty.innerHTML = ''
            inputValue.innerHTML = ''
        }
    }

    function deleteRule (ruleToDelete) {
        let finalRules = {}

        rules.forEach(rule => {
            if (rule != ruleToDelete) {
                let ruleSet = rule.split(':')

                if (ruleSet[0].includes('background-image')) {
                    ruleSet[1] = ruleSet[1] + ':' + ruleSet[2]
                }

                finalRules[ruleSet[0]] = ruleSet[1]
            }
        })

        cssc.setRule(selectors, finalRules, media)
        editor.refresh()
    }

    function addRule (ruleToAddSet) {
        let finalRules = {}

        rules.forEach(rule => {
            let ruleSet = rule.split(':')

            if (ruleSet[0].includes('background-image')) {
                ruleSet[1] = ruleSet[1] + ':' + ruleSet[2]
            }

            if (ruleSet[0] != ruleToAddSet[0]) {
                finalRules[ruleSet[0]] = ruleSet[1]
            }
        })

        finalRules[ruleToAddSet[0]] = ruleToAddSet[1]

        cssc.setRule(selectors, finalRules, media)
        editor.refresh()
    }
}