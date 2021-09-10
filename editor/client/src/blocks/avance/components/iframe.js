export default (editor, config = {}) => {
    const domc = editor.DomComponents;

    const defaultType = domc.getType('default');
    const defaultModel = defaultType.model;
    const defaultView = defaultType.view;

    const videoType = domc.getType('video');
    const videoView = videoType.view;
    const videoModel = videoType.model;

    var traits = [];
    traits.push({
        type: 'text',
        placeholder: '//url.to.page.com',
        label: 'Source',
        changeProp: 1,
        name: 'src'
    });

    var randomID = function () {
        return Math.random().toString(36).substr(2, 9);
    };

    let model = videoModel.extend({
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
                minDim: 50,

                // Maximum dimension
                maxDim: 100,

                // Handlers
                tl: 0, // Top left
                tc: 0, // Top center
                tr: 0, // Top right
                cl: 1, // Center left
                cr: 1, // Center right
                bl: 0, // Bottom left
                bc: 0, // Bottom center
                br: 0 // Bottom right
            },
            // Traits (Settings)
            traits: traits
        }),

        initialize: function (o, opt) {
            videoModel.prototype.initialize.apply(this, arguments);
        },

        updateTraits: function () {
            var traits = this.getSourceTraits();
            this.loadTraits(traits);
            this.em.trigger('change:selectedComponent');
        },

        getSourceTraits: function () {
            return traits;
        },

        init: function () {
            this.set('attributes', {
                id: randomID(),
                src: '',
                frameborder: 0,
                allowfullscreen: true,
            });
        }
    }, {
        isComponent: function (el) {
            var result = '';
            if (el.tagName === 'IFRAME' && el.className === 'iframe') {
                result = {type: 'iframe'};
                result.src = el.src;
            }
            return result;
        }
    });

    let view = videoView.extend({
        initialize: function (opts) {
            videoView.prototype.initialize.apply(this, [opts])

            const model = this.model;
            let ele = this.el;

            this.listenTo(model, 'change', function () {
                ele.setAttribute('style', 'position: relative; height:0; padding-bottom:56.25%;')
            });
        },

        openModal: function (e) {
            videoView.prototype.initialize.apply(this, [model]);
        },

        renderSource: function () {
            var el = document.createElement('iframe');
            el.src = this.model.get('src') === window.location.href ? '' : this.model.get('src');
            el.frameBorder = 0;
            el.setAttribute('allowfullscreen', false);
            this.initVideoEl(el);
            el.style.position = 'absolute';
            setTimeout(function () {
                el.parentElement.setAttribute('style', 'position: relative; height:0; padding-bottom:56.25%;')
            }, 10);
            return el;
        }
    });

    domc.addType('iframe', {
        // Define the Model
        model: model,

        // Define the View
        view: view
    });
}
