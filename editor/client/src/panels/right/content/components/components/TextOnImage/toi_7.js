export function toi_7 (editor) {
    editor.DomComponents.addType('toi_7', {
        model: {
            defaults: {
                draggable: '[data-gjs-type=wrapper]',

                components: model => {
                    let code = '<div id="c72667"><div id="c4b7eb"><div id="c56f08">Sample Headline</div><div id="c3c810">Lorem ipsum dolor sit amet, mutat laudem te est, consul ignota cu eum, in probo nonumy feugait nec. Vero corpora qualisque in mel. Necessitatibus conclusionemque no eos.</div><form method="get" id="c31aa5"><div id="c1d99b"><input type="text" placeholder="Type In Me" required="" id="c5565f"><button type="button" id="c2d8ee">CLICK ME</button></div></form></div></div><style>#c72667{display:flex;min-height:100vh;flex-direction:column;justify-content:center;align-items:center;width:100vw;background-image:url("DefaultImage");background-repeat:no-repeat;background-position:center center;background-attachment:scroll;background-size:cover;}#c4b7eb{display:flex;max-width:950px;flex-direction:column;justify-content:center;align-items:flex-start;padding:50px 50px 50px 50px;}#c56f08{padding:10px;text-align:left;font-family:Arial Black, Gadget, sans-serif;font-weight:400;font-size:60px;margin:0 10px 0 10px;color:#ffffff;}#c3c810{padding:10px;max-width:900px;text-align:left;margin:0 10px 0 10px;color:#ffffff;}#c2d8ee{padding:5px 15px 5px 15px;color:#ffffff;font-weight:600;background-image:linear-gradient(red,red);background-repeat:repeat;background-position:left top;background-attachment:scroll;background-size:auto;border:0 outset rgb(118, 118, 118);margin:0 0 0 5px;}#c31aa5{margin:10px 10px 10px 10px;padding:0 10px 0 10px;}#c5565f{height:26px;width:450px;}@media (max-width: 992px){#c2d8ee{margin:0 0 0 0;}#c5565f{margin:0 5px 0 0;}}@media (max-width: 768px){#c2d8ee{margin:10px 0 0 0;}}@media (max-width: 480px){#c4b7eb{padding:50px 0 50px 0;}#c56f08{margin:10px 0 10px 0;}#c3c810{margin:10px 0 10px 0;}#c5565f{width:250px;}}</style>'
                    let idSet = ["c72667","c4b7eb","c56f08","c3c810","c31aa5","c1d99b","c5565f","c2d8ee"]

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