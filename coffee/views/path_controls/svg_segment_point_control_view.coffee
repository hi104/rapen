class @SvgSegmentPointControl extends Backbone.View

    events: () ->
        "mousedown": "onMouseDown"
        "click":"onClick"
        "mouseover"  : "onMouseOver"
        "mouseleave" : "onMouseLeave"

    initialize:() =>
        @_init()

    _init:() =>
        @segment     = @options.segment
        @item        = @options.item
        @getPoint    = @options.getPoint
        @pathControl = @options.pathControl
        @curveControl = @options.curveControl
        @setStyle()

    setHandleOut:(handle) ->
        @handleOut = handle

    setHandleIn:(handle) ->
        @handleIn = handle

    setNextSegment:(segment) ->
        @nextSegment = segment

    setPreSegment:(segment) ->
        @preSegment = segment

    createHandleLine:(wrap) =>
        @handleInLine = @_createLine(wrap)
        @handleOutLine = @_createLine(wrap)

    _createLine:(wrap) =>
        element = SVGUtil.createTag("line")
        $(wrap).append(element)
        $(element).attr({
            "stroke-width" : "1"
            "stroke"       : "blue"
        });

    onMouseOver:(e)->
        $(@el).attr({
           "stroke-width" : "3",
        })

    onMouseLeave:(e)=>
        $(@el).attr({
           "stroke-width" : "1",
        })

    setStyle:() =>
        $(@el).attr({
            "stroke" : "black",
            "stroke-width" : "1",
            "fill" : "white",
            "width" : "10",
            "height" : "10"
        })

    onClick:(e) =>
        @_onClick(e)

    _onClick:(e) ->

        if(e.shiftKey)
            @setSelected(not @segment.isSelected())

        if(e.altKey)
            if(e.shiftKey)
                @segment.remove()
                @pathControl.refresh()
            else
                @segment.setLinear()

    setSelected:(val) =>
            @segment.setSelected(val)

    onMouseDown:(e) =>
        @pre_position = e
        @pathControl.savePoint()
        if(e.altKey)
            $(document).mousemove(@onMouseMoveHandle)
            $(document).mouseup(@onMouseDropHandle)
        else
            $(document).mousemove(@onMouseMove)
            $(document).mouseup(@onMouseDrop)
        e.preventDefault()
        e.stopPropagation()

    _itemMatrixPos:(pos) =>
        move_point = SVGUtil.createPoint(pos.x, pos.y)
        matrix = @item.getCTM()
        matrix.e = 0
        matrix.f = 0
        move_point.matrixTransform(matrix.inverse())


    onMouseMoveHandle:(e) =>
        pos = @_getMovedPosition(e)
        pos = @_itemMatrixPos(pos)
        x = pos.x
        y = pos.y
        @segment.getHandleOut().setPoint(x, y)
        @segment.getHandleIn().setPoint(-x, -y)

    onMouseMove:(e) =>
        pos = @_getMovedPosition(e)
        if e.shiftKey
            if Math.abs(pos.x) > Math.abs(pos.y)
                pos.y = 0
            else
                pos.x = 0

        point = @getPoint()
        pos = @_itemMatrixPos(pos)
        x = pos.x
        y = pos.y
        if (@segment.isSelected())
        else
            point = @segment.getPoint()
            pre_point = point.getSavePoint()
            x = pre_point.x + pos.x
            y = pre_point.y + pos.y
            point.setPoint(x, y)
        @pathControl.moveSelectSegments(pos)

    _getMovedPosition:(e) =>
        dx = e.pageX - @pre_position.pageX
        dy = e.pageY - @pre_position.pageY
        {x:dx, y:dy}

    onMouseDrop:(e) =>
        $(document).unbind('mousemove', @onMouseMove)
        $(document).unbind('mouseup', @onMouseDrop)

    onMouseDropHandle:(e) =>
        $(document).unbind('mousemove', @onMouseMoveHandle)
        $(document).unbind('mouseup', @onMouseDropHandle)

    getPointAtCanvas:() =>
        point = @getPoint()
        seg_point = SVGUtil.createPoint(point.getX(), point.getY())
        seg_point.matrixTransform(@item.getCTM())

    render:() =>

        point = @getPointAtCanvas()

        if @segment.isSelected()
            @$el.attr({"fill":"blue"})
        else
            @$el.attr({"fill":"white"})

        @$el.attr({
            "x": point.x - 6,
            "y": point.y - 6
        })
        @renderHandleLine(@segment.getHandleOut(), @handleOutLine)
        @renderHandleLine(@segment.getHandleIn(), @handleInLine)

    renderHandleLine:(handle, line_el) =>

        seg_x = @segment.getPoint().getX()
        seg_y = @segment.getPoint().getY()
        seg_point = SVGUtil.createPoint(
            seg_x + handle.getX(),
            seg_y + handle.getY())
        seg_point = seg_point.matrixTransform(@item.getCTM())

        seg_control_point = SVGUtil.createPoint(
            seg_x,
            seg_y
            )
        seg_control_point = seg_control_point.matrixTransform(@item.getCTM())

        $(line_el).attr({
            "x1": seg_point.x,
            "y1": seg_point.y,
            "x2": seg_control_point.x,
            "y2": seg_control_point.y

        });
    remove:() =>
        super()
        @handleInLine.remove()
        @handleOutLine.remove()
