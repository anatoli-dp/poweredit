export default (editor, config = {}) => {

    const bm = editor.BlockManager;

    bm.add('modal', {
        label: 'modal',
        content: `${config.modalStyle}<modal data-toggle="modal"></modal>`,
        category: 'extra',
        attributes: {
            class: 'fa fa-keyboard-o'
        }
    });
}
