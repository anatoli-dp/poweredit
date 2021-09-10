import loadComponents from './components';
import loadBlocks from './blocks';
import {btnStyle, progressBarStyle} from './consts';

export default (editor, opts = {}) => {
    const options = {...{
                blocks: ['grid-items', 'list-items', 'header', 'section', 'footer', 'iframe', 'link-block', 'quote', 'text-basic', 'button', 'progress-bar'],
                
                prefixName: 'avance',

                gridsCategory: `Marketing`,

                containerCategory: `Containers`,

                avanceCategory: `Advanced`,

                btnStyles: btnStyle,
                
                progressBarStyle: progressBarStyle
        }, ...opts};

    // Add components
    loadComponents(editor, options);

    // Add blocks
    loadBlocks(editor, options);
};
