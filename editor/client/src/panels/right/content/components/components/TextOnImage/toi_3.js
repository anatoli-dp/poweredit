export function toi_3 (editor) {
    editor.DomComponents.addType('toi_3', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="c50e14"><div id="c44324">Sample Headline</div><div id="c9c7cc">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div><button type="button" id="i1v8">CLICK ME</button></div><style>#c50e14{display:flex;min-height:100vh;flex-direction:column;justify-content:center;align-items:center;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;}#c44324{padding:10px;text-align:center;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:10px 10px 10px 10px;color:#ffffff;}#c9c7cc{padding:10px;max-width:900px;text-align:center;margin:10px 10px 10px 10px;color:#ffffff;}#i1v8{color:#ffffff;font-weight:600;background-image:linear-gradient(red,red);background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;border:0 outset rgb(118, 118, 118);padding:5px 15px 5px 15px;}</style>'
                    let idSet = ["c50e14","c44324","c9c7cc","i1v8"]

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