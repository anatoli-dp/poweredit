export function toi_9 (editor) {
    editor.DomComponents.addType('toi_9', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="ie5f"><div id="ivez"><img id="io44" src="DefaultImage"></div><div id="ce450b">Sample Headline</div><div id="cb97e7">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div></div><style>#ie5f{display:flex;width:100vw;height:100vh;flex-direction:column;justify-content:center;align-items:center;}#ivez{display:block;width:200px;height:200px;}#io44{color:black;width:100%;height:100%;object-fit:cover;border-radius:100% 100% 100% 100%;}#ce450b{padding:10px;text-align:center;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;color:#000000;}#cb97e7{padding:10px;max-width:900px;color:black;text-align:center;margin:10px 10px 10px 10px;}</style>'
                    let idSet = ["ie5f","ivez","io44","ce450b","cb97e7"]

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