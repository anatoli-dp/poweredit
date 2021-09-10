export function toi_2 (editor) {
    editor.DomComponents.addType('toi_2', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="cb3a0c"><div id="cae338">Sample Headline</div><div id="cac3c7">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div></div><style>#cb3a0c{display:flex;min-height:100vh;flex-direction:column;justify-content:center;align-items:flex-start;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;padding:0 50px 0 50px;}#cae338{padding:10px;text-align:left;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:10px 10px 10px 10px;color:#ffffff;}#cac3c7{padding:10px;max-width:900px;text-align:left;margin:10px 10px 10px 10px;color:#ffffff;}@media (max-width: 992px){#cb3a0c{padding:0 0 0 0;}}</style>'
                    let idSet = ["cb3a0c","cae338","cac3c7"]

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