import iFrame from './components/iframe';
import ProgressBar from './components/progressBar';

export default (editor, config = {}) => {
    iFrame(editor, config);
    
    ProgressBar(editor, config);
}
