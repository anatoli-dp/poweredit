export default (editor, config = {}) => {

    const blockManager = editor.BlockManager;

    var isActive = opt => config.blocks.indexOf(opt) >= 0;

    isActive('link-block') && blockManager.add(`${config.prefixName}-link-block`, {
        category: 'basic',
        label: 'Link Block',
        attributes: {class: 'fa fa-th-large'},
        content: {
            type: 'link',
            editable: false,
            droppable: true,
            style: {
                display: 'inline-block',
                'min-height': '100px',
                'width': '100%'
            }
        }
    });

    isActive('quote') && blockManager.add(`${config.prefixName}-quote`, {
        label: 'Quote',
        category: 'typography',
        attributes: {class: 'fa fa-quote-right'},
        content: `<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>`
    });

    isActive('text-basic') && blockManager.add(`${config.prefixName}-text-basic`, {
        category: config.avanceCategory,
        label: 'Text section',
        attributes: {class: 'gjs-fonts gjs-f-h1p'},
        content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>`
    });

    isActive('iframe') && blockManager.add(`${config.prefixName}-iframe`, {
        label: `
        <svg class="gjs-block-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 470" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 470 470">
          <g>
            <path d="m462.5,22.5h-455c-4.142,0-7.5,3.357-7.5,7.5v410c0,4.143 3.358,7.5 7.5,7.5h455c4.142,0 7.5-3.357 7.5-7.5v-80c0-4.143-3.358-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v72.5h-440v-335h440v232.5c0,4.143 3.358,7.5 7.5,7.5s7.5-3.357 7.5-7.5v-300c0-4.143-3.358-7.5-7.5-7.5zm-447.5,15h277.5v45h-277.5v-45zm292.5,45v-45h147.5v45h-147.5z"/>
            <path d="m381.5,52c-4.411,0-8,3.589-8,8s3.589,8 8,8 8-3.589 8-8-3.589-8-8-8z"/>
            <path d="m340.5,52c-4.411,0-8,3.589-8,8s3.589,8 8,8 8-3.589 8-8-3.589-8-8-8z"/>
            <path d="m422.5,52c-4.411,0-8,3.589-8,8s3.589,8 8,8 8-3.589 8-8-3.589-8-8-8z"/>
            <path d="m148.714,225.989c2.949-0.369 5.402-2.443 6.254-5.29l17.253-57.594c1.188-3.968-1.064-8.148-5.032-9.337-3.966-1.188-8.148,1.064-9.337,5.032l-12.374,41.306-11.928-19.908c-1.355-2.262-3.797-3.646-6.434-3.646s-5.079,1.384-6.434,3.646l-11.928,19.908-12.372-41.298c-1.188-3.968-5.369-6.221-9.337-5.032-3.968,1.188-6.221,5.369-5.032,9.337l17.251,57.586c0.853,2.847 3.306,4.921 6.254,5.29 0.312,0.039 0.623,0.058 0.932,0.058 2.612,0 5.066-1.366 6.432-3.646l14.233-23.756 14.233,23.756c1.53,2.549 4.42,3.959 7.366,3.588z"/>
            <path d="m206.358,225.982c0.312,0.039 0.623,0.058 0.932,0.058 2.612,0 5.066-1.366 6.432-3.646l14.233-23.756 14.233,23.756c1.527,2.549 4.416,3.957 7.364,3.588 2.949-0.369 5.402-2.443 6.254-5.29l17.253-57.594c1.188-3.968-1.064-8.148-5.032-9.337-3.968-1.189-8.148,1.063-9.337,5.032l-12.374,41.307-11.928-19.908c-1.355-2.262-3.797-3.646-6.434-3.646s-5.079,1.384-6.434,3.646l-11.926,19.908-12.372-41.299c-1.188-3.968-5.367-6.222-9.337-5.032-3.968,1.188-6.221,5.369-5.032,9.337l17.251,57.587c0.853,2.846 3.306,4.92 6.254,5.289z"/>
            <path d="m368.865,153.755c-3.967-1.188-8.148,1.064-9.337,5.032l-12.374,41.305-11.928-19.908c-1.355-2.262-3.797-3.646-6.434-3.646s-5.079,1.384-6.434,3.646l-11.928,19.908-12.372-41.298c-1.189-3.967-5.367-6.22-9.337-5.032-3.968,1.188-6.221,5.369-5.032,9.337l17.251,57.586c0.853,2.847 3.306,4.921 6.254,5.29 2.949,0.369 5.836-1.038 7.364-3.588l14.233-23.756 14.233,23.756c1.366,2.279 3.819,3.646 6.432,3.646 0.309,0 0.621-0.019 0.932-0.058 2.949-0.369 5.402-2.443 6.254-5.29l17.253-57.593c1.19-3.968-1.062-8.149-5.03-9.337z"/>
            <path d="m136.7,268.547c0-4.143-3.358-7.5-7.5-7.5h-40c-4.142,0-7.5,3.357-7.5,7.5v40c0,4.143 3.358,7.5 7.5,7.5h40c4.142,0 7.5-3.357 7.5-7.5v-40zm-15,32.5h-25v-25h25v25z"/>
            <path d="m129.2,331.047h-40c-4.142,0-7.5,3.357-7.5,7.5v40c0,4.143 3.358,7.5 7.5,7.5h40c4.142,0 7.5-3.357 7.5-7.5v-40c0-4.143-3.358-7.5-7.5-7.5zm-7.5,40h-25v-25h25v25z"/>
            <path d="m366.712,281.047h-30c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h30c4.142,0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
            <path d="m306.712,281.047h-147.512c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h147.513c4.142,0 7.5-3.357 7.5-7.5s-3.359-7.5-7.501-7.5z"/>
            <path d="m366.712,351.047h-30c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h30c4.142,0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z"/>
            <path d="m306.712,351.047h-147.512c-4.142,0-7.5,3.357-7.5,7.5s3.358,7.5 7.5,7.5h147.513c4.142,0 7.5-3.357 7.5-7.5s-3.359-7.5-7.501-7.5z"/>
          </g>
        </svg>
        <div class="gjs-block-label">Iframe</div>`,
        category: 'basic',
        content: `
                <style>
                    div.iframe-container{
                        position:relative;
                        height:0;
                        padding-bottom:56.25%;
                    }
                    div.iframe-container > div{
                        position:relative;
                        height:0;
                        padding-bottom:56.25%;
                    }
                    div.iframe-container > iframe{
                        position:absolute;
                        height:100%;
                        width:100%;
                        top:0;
                        left:0;
                    }
                    div.iframe-container > div > iframe{
                        position:absolute;
                        height:100%;
                        width:100%;
                        top:0;
                        left:0;
                    }
                </style>
                    <div class="iframe-container"><iframe class="iframe" src=""></iframe></div>`,
        attributes: {
            title: 'Insert a new Iframe'
        }
    });

    // Containers
    // Header
    isActive('header') && blockManager.add(`${config.prefixName}-header`, {
        label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
            <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
          </svg>
          </svg>
          <div class="gjs-block-label">Header</div>
        `,
        attributes: {},
        category: 'structure',
        content: `<header style="padding: 100px 0px;"></header>`
    });
    // Sections
    isActive('section') && blockManager.add(`${config.prefixName}-section`, {
        label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,7.5 C22,6.6 21.5,6 20.75,6 L3.25,6 C2.5,6 2,6.6 2,7.5 L2,16.5 C2,17.4 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.4 22,16.5 L22,7.5 Z M21,17 L3,17 L3,7 L21,7 L21,17 Z"></path>
            <polygon class="gjs-block-svg-path" points="4 8 5 8 5 12 4 12"></polygon>
            <polygon class="gjs-block-svg-path" points="19 7 20 7 20 17 19 17"></polygon>
            <polygon class="gjs-block-svg-path" points="20 8 21 8 21 9 20 9"></polygon>
            <polygon class="gjs-block-svg-path" points="20 15 21 15 21 16 20 16"></polygon>
          </svg>
          <div class="gjs-block-label">Section</div>
        `,
        attributes: {},
        category: 'structure',
        content: `<section style="padding: 100px 0px;"></section>`
    });
    // Footer
    isActive('footer') && blockManager.add(`${config.prefixName}-footer`, {
        label: `
        <svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
            <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
          </svg>
          <div class="gjs-block-label">Footer</div>
        `,
        attributes: {},
        category: 'structure',
        content: `<footer style="padding: 100px 0px;"></footer>`
    });

    // Marketing
    var style = `style="border-collapse: collapse;border-spacing: 0;width: 100%;"`;

    let gridItem =
            `
        <table class="grid-item-card" ${style}>
        <tr>
          <td class="grid-item-card-cell">
            <img class="grid-item-image" style="width: 100%;" src="http://placehold.it/250x150/78c5d6/fff/" alt="Image"/>
            <table class="grid-item-card-body">
              <tr>
                <td class="grid-item-card-content">
                  <h1 class="card-title">Title here</h1>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>`;

    isActive('grid-items') && blockManager.add(`${config.prefixName}-grid-items`, {
        label: `Grid Items`,
        category: 'extra',
        content: `<div style="overflow-x:auto;"><table class="grid-item-row" ${style}>
        <tr>
          <td class="grid-item-cell2-l">${gridItem}</td>
          <td class="grid-item-cell2-r">${gridItem}</td>
        </tr>
      </table>`,
        attributes: {class: 'fa fa-th'}
    });

    let listItem =
            `
            <div style="overflow-x:auto;">
            <table class="list-item" ${style}>
        <tr>
          <td class="list-item-cell">
            <table class="list-item-content">
              <tr class="list-item-row">
                <td class="list-cell-left">
                  <img class="list-item-image" style="width: 100%;" src="http://placehold.it/150x150/78c5d6/fff/" alt="Image"/>
                </td>
                <td class="list-cell-right">
                  <h1 class="card-title">Title here</h1>
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table></div>`;

    isActive('list-items') && blockManager.add(`${config.prefixName}-list-items`, {
        label: `List Items`,
        category: 'extra',
        content: listItem + listItem,
        attributes: {class: 'fa fa-th-list'}
    });
    
    // Progress bar.
    
    isActive('progress-bar') && blockManager.add(`${config.prefixName}-progress-bar`, {
        label: `Progress Bar`,
        category: 'extra',
        content: `
            <div class="progress"></div>
            ${config.progressBarStyle}
            `,
        attributes: {class: 'fa fa-battery-half'}
    });
}
