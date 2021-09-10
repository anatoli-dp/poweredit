export function blocks (editor) {
    let bm = editor.BlockManager

    return [
        //basic
        {
            label: '<div class="gjs-block-label">Block</div>',
            category: 'basic',
            attributes: {class: 'far fa-square  gjs-block fa'},
            content: {
                content: '<div></div>',
                style: {
                    'display': 'inline-block',
                    'min-height': '100px',
                    'min-width': '100px',
                }
            }
        },
        bm.get('avance-link-block'),
        bm.get('avance-iframe'),
        //structure
        bm.get('avance-section'),
        bm.get('css-grid'),
        bm.get('flexbox'),
        bm.get('column2'),
        //typography
        bm.get('text'),
        bm.get('link'),
        //forms
        bm.get('form'),
        bm.get('input'),
        bm.get('textarea'),
        bm.get('select'),
        bm.get('button'),
        bm.get('label'),
        bm.get('checkbox'),
        bm.get('radio'),
        //media
        bm.get('image'),
        bm.get('video'),
        bm.get('video-bg'),
        //social
        //extra
        bm.get('map'),
        //bm.get('h-navbar'),
        //bm.get('tabs'),
        //bm.get('loryslider'),
        //
    ]
}