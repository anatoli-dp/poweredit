import './index.css'

import './stuffs/domHelper'

import styleSetup from './stuffs/singles/styleSetup.js'

import grapesjs from '../../grapesjs/dist/grapes.min.js'

import styleGradient from './stuffs/styleGradient'
import backgroundStack from './stuffs/backgroundStack'
import postcss from './stuffs/postcss/index.js'

import toolbox from './stuffs/toolbox/index.js'
import rulersDesigner from './stuffs/rulers-designer'
import rte from './stuffs/rte/index.js'
import componentEditor from './stuffs/component-editor'

//blocks
import basic_blocks from './blocks/basic/index.js'
import forms_blocks from './blocks/blocks-forms/index.js'
import avance_blocks from './blocks/avance/index.js'
import flex_blocks from './blocks/flex/index.js'
import nav_extra_block from './blocks/nav/index.js'
import tabs_extra_block from './blocks/tabs/index.js'
import slider_extra_block from './blocks/slider/index.js'
import video_background_block from './stuffs/videoBackground'
//

import powereditStore from './stuffs/singles/powereditStore'

import { panels } from './panels/panels'

import { html } from 'js-beautify'

import { defaultImage } from './stuffs/singles/defaultImage'

const Panels = new panels(document.querySelector('.ed-body'))

document.addEventListener('contextmenu', function (e) {
    e.preventDefault()
})

const editor = grapesjs.init({
    plugins: [
        styleGradient,
        backgroundStack,
        postcss,
        toolbox,
        rulersDesigner,
        rte,
        componentEditor,
        //blocks
        basic_blocks,
        forms_blocks,
        avance_blocks,
        flex_blocks,
        nav_extra_block,
        tabs_extra_block,
        slider_extra_block,
        powereditStore,
        video_background_block,
    ],
    pluginsOpts: {
        [styleGradient]: {},
        [backgroundStack]: {},
        [postcss]: {},
        [toolbox]: {
            panels: false,
            traitsInSm: false,
            resizer: false,
            hideOnZoom: true,
            breadcrumbs: true,
        },
        [rulersDesigner]: {},
        [rte]: {},
        [componentEditor]: {
            openState: {
                pn: '100%',
                cv: '100%'
            },
            preserveWidth: true,
            clearData: true,
        },
        //blocks
        [basic_blocks]: {},
        [forms_blocks]: {},
        [avance_blocks]: {},
        [flex_blocks]: {},
        [nav_extra_block]: {},
        [tabs_extra_block]: {},
        [slider_extra_block]: {},
        [powereditStore]: {},
        [video_background_block]: {},
    },

    container: Panels.Center.canvas,
    fromElement: false,
    height: '',
    width: 'auto',
    storageManager: true,
    pageManager: false,
    cssIcons: '',
    allowScripts: true,
    showOffsets: true,
    panels: { defaults: [] },
    allowScripts: 1,
    
    blockManager: {
        appendTo: '.ed-gjs-block',
    },

    layerManager: {
        appendTo: '.ed-gjs-layer',
    },

    selectorManager: {
        appendTo: '.ed-gjs-selector',
    },

    styleManager: {
        appendTo: '.ed-gjs-style',
        sectors: styleSetup,
    },

    traitManager: {
        appendTo: '.ed-gjs-trait',
    },

    colorPicker: {
        appendTo: 'body',
        showInput: true,
        chooseText: 'SELECT',
        containerClassName: 'wbColorPicker',
    },

    storageManager: {
        type: 'powereditStore',
        stepsBeforeSave: 1,
        autosave: true,
        autoload: true,
    },

    assetManager: {
        //
    }
})

editor.on('loader:start', function () {
    document.querySelector('.loader_wrapper').style.display = 'flex'
})

editor.on('loader:stop', function () {
    document.querySelector('.loader_wrapper').style.display = 'none'
})

defaultImage(editor)

editor.generateID = function () {
    while (true) {
        let id = 'c' + 'xxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })

        if (!document.querySelector('#' + id)) return id
    }
}

//editor.StyleManager.removeSector('style_options')

/*const resize_ob = new ResizeObserver(function(entries) {
    editor.trigger('change:device')
})
resize_ob.observe(document.querySelector(".ed-body"))*/

Panels.init(editor)

editor.runCommand('panel:left:close')
editor.runCommand('panel:right:close')

editor.on('modal:open', function () {
    let modalContainer = document.querySelector('.gjs-mdl-container')
    modalContainer.parentElement.removeChild(modalContainer)
    document.querySelector('.ed-body').appendChild(modalContainer)
})

editor.Keymaps.remove('core:component-delete')
editor.Keymaps.add('core:component-delete', 'delete', 'core:component-delete')

editor.refresh()

editor.trigger('loader:stop')