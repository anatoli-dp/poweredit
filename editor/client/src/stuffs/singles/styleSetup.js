export default [
    {
        name: 'Layout',
        open: false,
        properties: [
            {
                name: 'Display',
                property: 'display',
                type: 'radio',
                list: [
                    {name: 'Block', value: 'block'},
                    {name: 'Flex', value: 'flex'},
                    {name: 'Inline-Block', value: 'inline-block'},
                    {name: 'Inline', value: 'inline'},
                    {name: 'None', value: 'none'},
                ]
            }
        ]
    },{
        name: 'Flex',
        open: false,
        buildProps: ['flex-direction','flex-wrap','justify-content','align-items','align-content','order','flex-basis','flex-grow','flex-shrink','align-self']
    },{
        name: 'Spacing',
        open: false,
        buildProps:['margin', 'padding'],
        properties: [
            {
                property: 'margin',
                properties:[
                    { name: 'Top', property: 'margin-top'},
                    { name: 'Right', property: 'margin-right'},
                    { name: 'Bottom', property: 'margin-bottom'},
                    { name: 'Left', property: 'margin-left'}
                ]
            },{
                property  : 'padding',
                properties:[
                    { name: 'Top', property: 'padding-top'},
                    { name: 'Right', property: 'padding-right'},
                    { name: 'Bottom', property: 'padding-bottom'},
                    { name: 'Left', property: 'padding-left'}
                ],
            }
        ]
    },{
        name: 'Size',
        open: false,
        buildProps: ['width','height','min-width','min-height','max-width','max-height'],
        properties: [
            {
                name: 'Overflow',
                property: 'overflow',
                type: 'radio',
                list: [
                    {name: 'Visible', value: 'visible'},
                    {name: 'Hidden', value: 'hidden'},
                    {name: 'Scroll', value: 'scroll'},
                    {name: 'Auto', value: 'auto'},
                ]
            },{
                name: 'Fit',
                property: 'object-fit',
                type: 'select',
                list: [
                    {name: 'Fill', value: 'fill'},
                    {name: 'Contain', value: 'contain'},
                    {name: 'Cover', value: 'cover'},
                    {name: 'None', value: 'none'},
                    {name: 'Scale-Down', value: 'scale-down'}
                ]
            }
        ]
    },{
        name: 'Position',
        open: false,
        properties: [
            {
                name: 'Position',
                property: 'position',
                type: 'radio',
                list: [
                    {name: 'Static', value: 'static'},
                    {name: 'Absolute', value: 'absolute'},
                    {name: 'Fixed', value: 'fixed'},
                    {name: 'Relative', value: 'relative'},
                    {name: 'Sticky', value: 'sticky'}
                ]
            },{
                name: 'Top',
                property: 'top',
                type: 'integer',
                units: ['px','%','em'],
                default: 'auto'
            },{
                name: 'Right',
                property: 'right',
                type: 'integer',
                units: ['px','%','em'],
                default: 'auto'
            },{
                name: 'Left',
                property: 'left',
                type: 'integer',
                units: ['px','%','em'],
                default: 'auto'
            },{
                name: 'Bottom',
                property: 'bottom',
                type: 'integer',
                units: ['px','%','em'],
                default: 'auto'
            },{
                name: 'Z-Index',
                property: 'z-index',
                type: 'integer',
                default: 'auto'
            },{
                name: 'Float',
                property: 'float',
                type: 'radio',
                list: [
                    {name: 'None', value: 'none'},
                    {name: 'Left', value: 'left'},
                    {name: 'Right', value: 'right'}
                ]
            },{
                name: 'Clear',
                property: 'clear',
                type: 'radio',
                list: [
                    {name: 'None', value: 'none'},
                    {name: 'Left', value: 'left'},
                    {name: 'Right', value: 'right'},
                    {name: 'Both', value: 'both'}
                ]
            }
        ]
    },{
        name: 'Typography',
        open: false,
        buildProps: ['font-family','font-size','font-weight','letter-spacing','color','line-height','text-align','text-shadow'],
    },{
        name: 'Background',
        open: false,
        buildProps: ['background-bg'],
        properties: [
            {
                id: 'background-bg',
                property: 'background',
                type: 'bg',
            }
        ]
    },{
        name: 'Borders',
        open: false,
        buildProps: ['border-radius', 'border']
    },{
        name: 'Effects',
        open: false,
        buildProps: ['opacity','box-shadow','transition', 'perspective', 'transform'],
        properties: [
            {
                type: 'slider',
                property: 'opacity',
                defaults: 1,
                step: 0.01,
                max: 1,
                min:0,
            },{
                property: 'box-shadow',
                properties: [
                    { name: 'X position', property: 'box-shadow-h'},
                    { name: 'Y position', property: 'box-shadow-v'},
                    { name: 'Blur', property: 'box-shadow-blur'},
                    { name: 'Spread', property: 'box-shadow-spread'},
                    { name: 'Color', property: 'box-shadow-color'},
                    { name: 'Shadow type', property: 'box-shadow-type'}
                ],
            }
        ],
    }
]