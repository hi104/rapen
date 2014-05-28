class @SvgSegmentHandleControl extends SvgSegmentPointControl
    initialize:() =>
        @_init()

    onClick:(e) =>
        if(e.altKey)
            @getPoint().setPoint(0, 0)

    onMouseMove:(e) =>
        pos = @_getMovedPosition(e)
        point = @getPoint()
        pos = @_itemMatrixPos(pos)
        x = point.getX() + pos.x
        y = point.getY() + pos.y
        @setHandlePoint({x: x, y: y}, e.shiftKey)

        @pre_position = e

    setHandlePoint:(pos, sync) ->
        x = pos.x
        y = pos.y
        point = @getPoint()
        point.setPoint(x, y)
        if(sync)
            if(point == @segment.getHandleIn())
                @segment.getHandleOut().setPoint(-x, -y)
            else if (point == @segment.getHandleOut())
                @segment.getHandleIn().setPoint(-x, -y)

    setStyle:() =>
        $(@el).attr({
            "stroke"       : "blue",
            "stroke-width" : "1",
            "fill"         : "white",
            "r"            : "5"
        })

    render:() =>
        seg_x = @segment.getPoint().getX()
        seg_y = @segment.getPoint().getY()
        point = @getPoint()
        seg_point = SVGUtil.createPoint(
            seg_x + point.getX(),
            seg_y + point.getY())
        seg_point = seg_point.matrixTransform(@item.getCTM())
        @$el.attr({
            "cx": seg_point.x - 1,
            "cy": seg_point.y - 1
        })
