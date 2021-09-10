export function toi_1 (editor) {
    editor.DomComponents.addType('toi_1', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="is5p"><div id="c1bd89">Sample Headline</div><div id="c9e02e">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div></div><style>#is5p{display:flex;min-height:100vh;flex-direction:column;justify-content:center;align-items:center;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;}#c1bd89{padding:10px;text-align:center;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:10px 10px 10px 10px;color:#ffffff;}#c9e02e{padding:10px;max-width:900px;text-align:center;margin:10px 10px 10px 10px;color:#ffffff;}</style>'
                    let idSet = ["is5p","c1bd89","c9e02e"]

                    idSet.forEach(id => {
                        code = code.replaceAll(id, editor.generateID())
                    })

                    code = code.replaceAll('DefaultImage', editor.defaultImage)

                    return code
                }
            }
        }
    })
}