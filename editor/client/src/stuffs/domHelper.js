document.newEl = function (selector) {
    let el
    let selectors = selector.split('.')

    if (selectors[0].includes('#')) {
        let split = selectors[0].split('#')
        
        el = document.createElement(split[0])
        el.id = split[1]
    } else {
        el = document.createElement(selectors[0])
    }

    for (let i = 1; i < selectors.length; i++) {
        el.classList.add(selectors[i])
    }

    return el
}

Element.prototype.newEl = function (selector) {
    let el = document.newEl(selector)
    this.appendChild(el)

    return el
}

Element.prototype.add = function (el) {
    this.appendChild(el)
}