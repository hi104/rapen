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
        point.setPoint(x, y)

        if(e.shiftKey)
            if(point == @segment.getHandleIn())
                @segment.getHandleOut().setPoint(-x, -y)
            else if (point == @segment.getHandleOut())
                @segment.getHandleIn().setPoint(-x, -y)
        @pre_position = e

    setStyle:() =>
        $(@el).attr({
            "stroke"       : "blue",
            "stroke-width" : "1",
            "fill"         : "white",
            "r"            : "6"
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
            "cx": seg_point.x,
            "cy": seg_point.y
        })
