class @PathEditMode
    constructor:(maneger)->
        @maneger = maneger

    onEvent:(event, sender, e, options) =>
        if sender instanceof SvgElementView
            if event  ==  "onClick"
                if sender.model.el instanceof SVGPathElement
                    svgPathControl.setItem(sender.model)

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
