export function toi_5 (editor) {
    editor.DomComponents.addType('toi_5', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="ipsg"><div id="ivrt"><div id="ccb829">Sample Headline</div><div id="c473c7">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div><button type="button" id="in4k">CLICK ME</button></div></div><style>#ipsg{display:flex;min-height:100vh;flex-direction:column;justify-content:center;align-items:center;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;padding:0 50px 0 50px;}#ivrt{display:flex;min-height:100px;min-width:100px;flex-direction:column;justify-content:center;align-items:center;background-image:linear-gradient(#ffffff, #ffffff);background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;padding:5px 5px 5px 5px;}#ccb829{padding:10px;text-align:center;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:10px 10px 10px 10px;color:black;}#c473c7{padding:10px;max-width:900px;color:black;text-align:center;margin:10px 10px 10px 10px;}#in4k{background-image:linear-gradient(#507ff4,#507ff4);background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;color:#ffffff;padding:5px 15px 5px 15px;margin:0 0 10px 0;border:0 outset rgb(118, 118, 118);}</style>'
                    let idSet = ["ipsg","ivrt","ccb829","c473c7","in4k"]

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