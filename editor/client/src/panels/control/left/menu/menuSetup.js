export function menuSetup (editor) {
    editor.menuSetup = [
        {
            label: 'PowerEdit',
            submenu: [
                /*{
                    label: 'Save',
                    action: 'main:store',
                    active: true,
                },{
                    label: 'Publish',
                    action: 'main:publish',
                    active: true,
                },*/{
                    label: 'Dashboard',
                    action: 'main:dashboard',
                    active: true,
                }
            ]
        },{
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    action: 'core:undo',
                    active: true,
                },{
                    label: 'Redo',
                    action: 'core:redo',
                    active: true,
                }/*,{
                    type: 'break'
                },{
                    label: 'Cut',
                    active: true,
                },{
                    label: 'Copy',
                    active: true,
                },{
                    label: 'Paste',
                    active: true,
                },{
                    type: 'break'
                },{
                    label: 'Code',
                    active: false,
                }*/
            ]
        },{
            label: 'View',
            submenu: [
                {
                    label: 'Zoom In Canvas',
                    action: 'CanvasZoom:In',
                    active: true,
                },{
                    label: 'Zoom Out Canvas',
                    action: 'CanvasZoom:Out',
                    active: true,
                },/*{
                    label: 'Reset Canvas',
                    active: false,
                },*/{
                    type: 'break'
                }/*,{
                    label: 'Zoom In Document',
                    active: false,
                },{
                    label: 'Zoom Out Document',
                    active: false,
                },{
                    type: 'break'
                }*/,{
                    label: 'Preview',
                    action: '|run|core:preview',
                    active: true
                },{
                    type: 'break'
                },{
                    label: 'Toggle Outline',
                    action: '|toggle|core:component-outline',
                    active: true
                }/*,{
                    label: 'Toggle Offset',
                    action: '|toggle|core:component-offset',
                    active: false
                }*/,{
                    type: 'break'
                },{
                    label: 'Toggle Rulers',
                    action: '|toggle|ruler-visibility',
                    active: true,
                    selected: false
                },{
                    type: 'break'
                },{
                    label: 'Toggle Guides',
                    action: '|toggle|guides-visibility',
                    active: false,
                    selected: true
                },{
                    label: 'Clear Guides',
                    action: 'clear-guides',
                    active: false,
                }
            ]
        },{
            label: 'Devices',
            submenu: [
                {
                    label: 'Desktop',
                    //shortcut: 'Button1+Button2',
                    action: 'Desktop',
                    active: true,
                    ignoreActive: true
                },{
                    label: 'Tablet',
                    action: 'Tablet',
                    active: true,
                    ignoreActive: true
                },{
                    label: 'Mobile Portrait',
                    action: 'Mobile Portrait',
                    active: true,
                    ignoreActive: true
                },{
                    label: 'Mobile Landscape',
                    action: 'Mobile Landscape',
                    active: true,
                    ignoreActive: true
                }/*,{
                    type: 'break'
                },{
                    label: 'Manage Breakpoints',
                    active: false,
                },{
                    type: 'break'
                },{
                    label: 'Manage Devices',
                    active: false
                }*/
            ]
        },{
            label: 'Mode',
            submenu: [
                {
                    label: 'Flow',
                    action: 'changeEditorMode:flow',
                    active: false,
                    selected: true,
                    ignoreActive: true
                },{
                    label: 'Absolute',
                    action: 'changeEditorMode:absolute',
                    active: true,
                    ignoreActive: true
                },{
                    label: 'Hybrid',
                    action: 'changeEditorMode:hybrid',
                    active: true,
                    ignoreActive: true
                }
            ]
        }
    ]
}