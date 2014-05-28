class @DrawPathMode
    constructor:(maneger)->
        _.extend @, Backbone.Events
        @maneger = maneger
        @path_control = new SvgPathControlView(el:$("#draw-path-control-panel"))

    onEvent:(event, sender, e, options) =>
        return unless sender instanceof SvgCanvas

        pos = {x:e.pageX, y: e.pageY}

        if event  ==  "onMouseDown"
            unless @path_control.item
                @begin(pos)
                @attachOnMouseMove()
                @last_segment_control.handleOut.pre_position = e
            else
                @cancelEvent(e)
                pos = @getMousePositionOfItem(pos, @path_control.item)
                @path_control.path._children[0].add(pos)
                @path_control.refresh()
                @setPathCloseAction()
                @attachOnMouseMove()
                @last_segment_control.handleOut.pre_position = e

    attachOnMouseMove:() =>

        $(document).mousemove(@onMouseMove)
        $(document).mouseup(@onMouseUp)

    onMouseMove: (e) =>
        @last_segment_control.handleOut.onMouseMove(e)

    onMouseUp: (e) =>
        $(document).unbind('mousemove', @onMouseMove)
        $(document).unbind('mouseup', @onMouseUp)

    setPathCloseAction:() =>
        segment_controls = @path_control.getSegmentControls()
        first_segment_control =_(segment_controls).first()
        @last_segment_control =_(segment_controls).last()
        origin = first_segment_control._onClick
        path_control = @path_control
        self = @
        first_segment_control._onClick = (e) ->
            path_control.path._children[0].closePath()
            path_control.refresh()
            self.disable()


    begin:(pos) =>
        added_item = SvgCanvasBase.addElement(SVGUtil.createTag("path"))
        pos = @getMousePositionOfItem(pos, added_item)
        added_item.attr({
            "d": "M #{pos.x}, #{pos.y}",
            "stroke": "black",
            "stroke-width": "2",
            # "fill" : "none"
            "fill-opacity": "0"
        })
        @path_control.setItem(added_item)

    getMousePositionOfItem:(pos, item) =>
        pos = SVGUtil.createPoint(pos.x, pos.y)
        matrix = item.getScreenCTM()
        pos.matrixTransform(matrix.inverse())


    onStart:() =>

    onStop:() => @disable()

    disable:()=>
        @path_control.clear()

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
