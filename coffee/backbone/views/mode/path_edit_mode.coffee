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

        @position_control  = new PositionControl(
            get_item: null)
        #
        # override for none snapping item
        #
        @position_control.onDragging = (e) =>
            pos = @position_control._getMovedControlPosition(e)
            @position_control.movePosition(pos)

        @position_control.bind("onMouseDown", (obj, e) =>
            $(document).mousemove(@position_control.onDragging)
            ondrop = (e) =>
                @position_control.onDrop(e)
                $(document).unbind('mousemove', @position_control.onDragging)
                $(document).unbind('mouseup', ondrop)
                @cancelEvent(e)
            $(document).mouseup(ondrop)
        )


    onEvent:(event, sender, e, options) =>
        if sender instanceof SvgElementView
            if event  ==  "onClick"
                if sender.model.el instanceof SVGPathElement
                    svgPathControl.setItem(sender.model)

            if event  == "onMouseDown"
                @cancelEvent(e)
                @position_control.getItem = () => sender.model
                @position_control.onMouseDown(e)
                # @maneger.getControl().itemControl.position_control.onMouseDown(e)

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
        selected_item = @maneger.getControl().firstOriginalItem()
        svgPathControl.setItem(selected_item) if selected_item

    onStop:() => @disable()

    disable:()=>
        svgPathControl.clear()

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
