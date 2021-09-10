export function toi_6 (editor) {
    editor.DomComponents.addType('toi_6', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="c41a96"><div id="cc4e88"><div id="c1885f">Sample Headline</div><div id="c8bf61">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div><button type="button" id="c646cb">CLICK ME</button></div></div><style>#c41a96{display:flex;min-height:100vh;flex-direction:column;justify-content:center;align-items:flex-start;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;padding:0 50px 0 50px;}#cc4e88{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;background-image:linear-gradient(#ffffff, #ffffff);background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;padding:50px 50px 50px 50px;max-width:500px;}#c1885f{padding:10px;text-align:left;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:10px 10px 10px 10px;color:black;}#c8bf61{padding:10px;max-width:900px;color:black;text-align:left;margin:10px 10px 10px 10px;}#c646cb{background-image:linear-gradient(#507ff4,#507ff4);background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;color:#ffffff;padding:5px 15px 5px 15px;margin:0 0 10px 20px;border:0 outset rgb(118, 118, 118);}@media (max-width: 480px){#c41a96{padding:0 0 0 0;}#cc4e88{padding:50px 0 50px 0;}#c1885f{margin:10px 0 10px 0;}#c8bf61{margin:10px 0 10px 0;}#c646cb{margin:10px 0 10px 10px;}}</style>'
                    let idSet = ["c41a96","cc4e88","c1885f","c8bf61","c646cb"]

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