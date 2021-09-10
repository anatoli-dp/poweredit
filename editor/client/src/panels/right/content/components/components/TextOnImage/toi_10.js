export function toi_10 (editor) {
    editor.DomComponents.addType('toi_10', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="ixm4"><div id="iwko"><div id="cf9e6e">Sample Headline</div><div id="c2f5a7">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div></div><div id="ihip"><div id="iacl"><img id="imy0j" src="DefaultImage"></div><div id="ig2dg"><img id="i9mjv" src="DefaultImage"></div></div></div><style>#ixm4{display:flex;min-height:100vh;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;flex-direction:column;justify-content:center;align-items:flex-start;}#iwko{display:block;}#ihip{display:flex;flex-direction:row;justify-content:center;align-items:center;margin:10px 10px 10px 10px;padding:10px 10px 10px 10px;flex-wrap:nowrap;}#cf9e6e{padding:10px;text-align:left;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:10px 10px 10px 10px;color:#ffffff;}#c2f5a7{padding:10px;max-width:900px;text-align:left;margin:10px 10px 10px 10px;color:#ffffff;}#iacl{display:inline-block;max-width:500px;padding:5px 5px 5px 5px;}#imy0j{color:black;width:100%;}#i9mjv{color:black;width:100%;}#ig2dg{display:inline-block;max-width:500px;padding:5px 5px 5px 5px;}@media (max-width: 992px){#iacl{flex-basis:350px;}#ig2dg{flex-basis:350px;}}@media (max-width: 768px){#ihip{flex-wrap:wrap;}#c2f5a7{margin:10px 0 10px 0;}#cf9e6e{margin:10px 0 10px 0;}#ig2dg{max-width:90%;}#imy0j{max-width:100%;}#iacl{max-width:90%;}#i9mjv{max-width:100%;}}@media (max-width: 480px){#ihip{margin:10px 0 10px 0;}#ig2dg{max-width:100%;}#iacl{max-width:100%;}}</style>'
                    let idSet = ["ixm4","iwko","cf9e6e","c2f5a7","ihip","iacl","imy0j","ig2dg","i9mjv"]

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