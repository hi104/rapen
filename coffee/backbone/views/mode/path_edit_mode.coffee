#
# TODO svgPathControl global object
#
class @PathEditMode
    constructor:(maneger)->
        _.extend @, Backbone.Events
        @maneger = maneger
        @regionView = new SelectRegionControlView({
            el:$("#select-path-region-view")
        })

    onEvent:(event, sender, e, options) =>
        if sender instanceof SvgElementView
            if event  ==  "onClick"
                if sender.model.el instanceof SVGPathElement
                    svgPathControl.setItem(sender.model)
        else if sender instanceof SvgCanvas
            if event  ==  "onMouseDown" and not e.altKey
                @regionView.canvas = @maneger.getCanvas()
                @listenToOnce(@regionView, "onRegionDrop", @_onRegionDrop)
                @regionView.startSelectRegion(e)

    _onRegionDrop:(region, e) =>
        _(svgPathControl.getSegmentControls()).forEach((segment) =>
            is_contain = region.isContainPoint(segment.getPointAtCanvas())
            if e.shiftKey
                segment.setSelected(true) if is_contain
            else
                segment.setSelected(is_contain)
        )

    onStart:() =>

    onStop:() => @disable()

    disable:()=>
        svgPathControl.clear()

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
