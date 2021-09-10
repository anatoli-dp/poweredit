export function redo (editor, base) {
    let redoWrapper = base.newEl('div.ed-sC-left-menu.ed-sC-panelButton-left.ed-sC-item.redoWrapper')

    editor.Panels.addPanel({
        id: 'ed-sC-left-menu.redoWrapper',
        el: '.ed-sC-left-menu.redoWrapper',
        buttons: [
            {
                id: 'undo',
                active: false,
                className: 'fas fa-undo-alt',
                command: 'core:undo'
            },{
                id: 'redo',
                active: false,
                className: 'fas fa-redo-alt',
                command: 'core:redo'
            }
        ]
    })
}