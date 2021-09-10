import {pbPrimaryClass, pbSuccessClass, pbDangerClass, pbInfoClass, pbWarningClass, pbStripedClass, pbAnimateClass} from '../consts';

export default (editor, config = {}) => {
    const domc = editor.DomComponents;

    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    let traits = defaultModel.prototype.defaults.traits.slice(0);

    traits.push({
        type: 'number',
        label: 'Value',
        name: 'pbValue',
        changeProp: 1,
        min: 0,
        max: 100
    });

    traits.push({
        type: 'select',
        label: 'Type',
        name: 'pbStyle',
        changeProp: 1,
        options: [
            {value: pbPrimaryClass, name: 'Primary'},
            {value: pbSuccessClass, name: 'Success'},
            {value: pbInfoClass, name: 'Info'},
            {value: pbWarningClass, name: 'Warning'},
            {value: pbDangerClass, name: 'Danger'}
        ]
    });

    traits.push({
        type: 'checkbox',
        label: 'Striped',
        name: 'pbStriped',
        changeProp: 1
    });

    traits.push({
        type: 'checkbox',
        label: 'Show %',
        name: 'pbPercent',
        changeProp: 1
    });

    traits.push({
        type: 'checkbox',
        label: 'Animation',
        name: 'pbAnimation',
        changeProp: 1
    });

    let model = defaultModel.extend({
        init: function () {
        },

        toHTML() {
            return this.get('pbHtml');
        },

        // Extend default properties
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
            // Can't drop other elements inside it
            droppable: false,
            resizable: {
                // Unit used for height resizing
                unitHeight: 'px',

                // Unit used for width resizing
                unitWidth: '%',

                currentUnit: 0,

                // Minimum dimension
                minDim: 5,

                // Maximum dimension
                maxDim: 100,

                // Handlers
                tl: 0, // Top left
                tc: 1, // Top center
                tr: 0, // Top right
                cl: 1, // Center left
                cr: 1, // Center right
                bl: 0, // Bottom left
                bc: 1, // Bottom center
                br: 0 // Bottom right
            },

            type: 'progress-bar',
            tagName: 'div',

            pbStyle: '',
            pbValue: 40,
            pbStriped: false,
            pbPercent: false,
            pbAnimation: false,

            pbHtml: '',

            // Traits (Settings)
            traits: traits
        })
    }, {
        isComponent: function (el) {
            var result = '';

            if (el.tagName === 'DIV' && el.className.includes('progress')) {
                result = {type: 'marketing-progress-bar'};
            }

            return result;
        }
    });

    let view = defaultView.extend({

        init: function (...args) {
            let model = this.model;

            this.listenTo(model, 'change:pbStyle change:pbStriped change:pbPercent change:pbAnimation change:pbValue', this.updateProgress);

            defaultView.prototype.init.apply(this, args);
        },

        updateProgress: function () {
            this.el.innerHTML = ``;
            this.el.appendChild(this.getProgressEle());

            this.model.set('pbHtml', this.el.outerHTML);

            if (!this.el.className.includes('pg-')) {
                let id = Date.now()
                this.el.classList.add('pg-' + id);
            }

            let split = this.el.className.split(' ').filter(w => !w.includes('gjs'));
            this.model.setClass(split.join(' '));
        },

        getProgressEle() {
            const style = this.model.get('pbStyle');
            const striped = this.model.get('pbStriped') === true ? pbStripedClass : '';
            const animation = this.model.get('pbAnimation') === true ? pbAnimateClass : '';
            const value = this.model.get('pbValue');
            const percent = this.model.get('pbPercent') === true ? `${value}%` : '';

            const _class = `progress-bar ${style} ${striped} ${animation}`;

            var ele = document.createElement('div');
            ele.setAttribute('role', 'progressbar');
            ele.setAttribute('aria-valuenow', value);
            ele.setAttribute('aria-valuemin', '0');
            ele.setAttribute('aria-valuemax', '100');
            ele.setAttribute('style', `width: ${value}%;`);
            ele.setAttribute('class', _class);
            ele.innerHTML = percent;
            return ele;
        },

        render() {
            defaultView.prototype.render.apply(this);
            this.updateProgress();
            return this;
        }

    });

    domc.addType('marketing-progress-bar', {
        // Define the Model
        model: model,

        // Define the View
        view: view
    });
}

