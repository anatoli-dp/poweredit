export function toi_8 (editor) {
    editor.DomComponents.addType('toi_8', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="izdz"><div id="iyvu"><div id="iw0d"><div id="c19823">Sample Headline</div><div id="c9bdb8">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec.Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec.</div></div><div id="i5zi"><div id="i0ts"><form method="get" id="i7ece"><input type="text" placeholder="Placeholder Text" id="i13ve"><input type="text" placeholder="Placeholder Text" id="i0kb3"><input type="text" placeholder="Placeholder Text" id="i1mb6"><button type="button" id="i9cmq">Send</button></form></div></div></div></div><style>#izdz{display:flex;min-height:100vh;flex-direction:column;justify-content:center;align-items:center;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;}#i5zi{display:inline-block;min-width:300px;max-width:600px;padding:10px 10px 10px 10px;width:600px;}#iyvu{display:flex;flex-wrap:wrap;flex-direction:row;justify-content:center;align-items:center;width:100%;}#iw0d{display:flex;min-width:300px;max-width:600px;flex-wrap:nowrap;flex-direction:column;justify-content:center;align-items:flex-start;padding:10px 0 10px 10px;margin:0 10px 0 0;}#c19823{padding:10px;color:#ffffff;text-align:left;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:0 0;}#c9bdb8{padding:10px;max-width:900px;color:#ffffff;text-align:left;margin:0 0;}#i0ts{display:flex;width:100%;height:500px;background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5));background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;flex-direction:row;flex-wrap:nowrap;justify-content:center;align-items:center;padding:10px 10px 10px 10px;}#i13ve{width:100%;height:35px;margin:5px 0 5px 0;}#i9cmq{margin:5px 0 5px 0;padding:5px 15px 5px 15px;font-weight:600;color:#ffffff;background-image:linear-gradient(red,red);background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;border:0 outset rgb(118, 118, 118);}#i1mb6{width:100%;height:300px;margin:5px 0 5px 0;}#i0kb3{width:100%;height:35px;margin:5px 0 5px 0;}#i7ece{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;width:100%;}@media (max-width: 768px){#iw0d{padding:10px 0 10px 0;}#i5zi{padding:10px 10px 10px 0;}}</style>'
                    let idSet = ["izdz","iyvu","iw0d","c19823","c9bdb8","i5zi","i0ts","i7ece","i13ve","i0kb3","i1mb6","i9cmq"]

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