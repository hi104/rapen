class @SvgCurveView extends Backbone.View

    initialize:() =>
        @curve       = @options.curve
        @item        = @options.item
        @pathControl = @options.pathControl
        @setStyle()
        @setDefalutStyle()
        @render()

    events: () ->
        "click"      : "onClick"
        "mousedown"  : "onMouseDown"
        "mouseover"  : "onMouseOver"
        "mouseleave" : "onMouseLeave"

    setSegment:(segment) ->
        @segment = segment

    setStyle:() =>
        $(@el).attr({
            "fill"         : "none",
            "stroke-width" : "3",
        })

    setDefalutStyle:() =>
        $(@el).attr({
            "stroke" : "blue",
            "stroke-opacity": "0"
        })

    onClick:(e) =>
        if e.shiftKey
            matrix = @item.getScreenCTM()
            point = SVGUtil.createPoint(e.pageX, e.pageY)
            point = point.matrixTransform(matrix.inverse())
            curve_location = @curve.getNearestLocation(point)
            if e.altKey
                curve_location.split()
            else
                curve_location.divide()
            @pathControl.refresh()
            @_cancelEvent(e)

    _cancelEvent:(e) =>
        e.preventDefault()
        e.stopPropagation()

    onMouseDown:(e)=>
        @_cancelEvent(e)
        $(document).mousemove(@onMouseMove)
        $(document).mouseup(@onMouseDrop)

    pointAdd:(p, p2) ->
        {  x: p.x + p2.x, y: p.y + p2.y }

    pointSub:(p, p2) ->
        {  x: p.x - p2.x, y: p.y - p2.y }

    pointMultiply:(p, val) ->
        {  x: p.x * val, y: p.y * val }


    onMouseMove:(e) =>
        seg = @segment
        next = @segment.nextSegment

        seg_p = seg.getPoint()
        seg_p =  { x:seg_p.getX() ,y:seg_p.getY()}
        next_p = next.getPoint()
        next_p = { x:next_p.getX() ,y:next_p.getY()}

        center_x = (seg_p.x + next_p.x) /2
        center_y = (seg_p.y + next_p.y) /2
        center = {x:center_x, y: center_y}

        matrix = @item.getScreenCTM()
        point = SVGUtil.createPoint(e.pageX, e.pageY)
        point = point.matrixTransform(matrix.inverse())

        point_vec = @pointSub(point, center)
        point_vec2 = @pointMultiply(point_vec, 2)

        point_vec2 = @pointAdd(point_vec2, center)

        seg_vec  = @pointSub(point_vec2, seg_p)
        next_vec  = @pointSub(point_vec2, next_p)

        div = 2/3
        seg_vec = @pointMultiply(seg_vec, div)
        next_vec = @pointMultiply(next_vec, div)
        seg.handleOut.getPoint().setPoint(seg_vec.x, seg_vec.y)
        next.handleIn.getPoint().setPoint(next_vec.x, next_vec.y)

    onMouseDrop:(e) =>
        $(document).unbind('mousemove', @onMouseMove)
        $(document).unbind('mouseup', @onMouseDrop)

    onMouseOver:(e)=>
        $(@el).attr({
            "stroke" : "red",
            "stroke-opacity": "1"
        })
        matrix = @item.getScreenCTM()
        point = SVGUtil.createPoint(e.pageX, e.pageY)
        point = point.matrixTransform(matrix.inverse())

    onMouseLeave:(e)=>
        @setDefalutStyle()

    #copied from paper.js Path, Formatter thank you
    toPathData:() =>
        parts = []
        precision = false
        multiplier = Math.pow(10, 5)
        ctm = @item.el.getCTM()
        matrix = @item.el.getCTM()
        matrix.e = 0
        matrix.f = 0
        number = (val) => Math.round(val * multiplier) / multiplier
        point  = (val) => number(val.x) + ',' + number(val.y)
        getPoint = (val) =>
            p = SVGUtil.createPoint(val.x, val.y)
            p.matrixTransform(ctm)

        getPoint2 = (val) =>
            p = SVGUtil.createPoint(val.x, val.y)
            p.matrixTransform(matrix)

        addCurve = (seg1, seg2, skipLine) =>
            point1 = getPoint(seg1._point)
            point2 = getPoint(seg2._point)
            point1 = new paper.Point(point1.x, point1.y)
            point2 = new paper.Point(point2.x, point2.y)
            handle1 = getPoint2(seg1._handleOut)
            handle2 = getPoint2(seg2._handleIn)
            handle1 = new paper.Point(handle1.x, handle1.y)
            handle2 = new paper.Point(handle2.x, handle2.y)

            if (handle1.isZero() && handle2.isZero())
                parts.push('L' + point(point2))
            else
                end = point2.subtract(point1)
                parts.push("c#{point(handle1)} #{point(end.add(handle2))} #{point(end)}")

        seg_control_point = getPoint(@curve.getSegment1()._point)
        parts.push("M" + seg_control_point.x  + ", " + seg_control_point.y)

        addCurve(@curve.getSegment1(), @curve.getSegment2(), false)
        parts.join('')

    render:() =>
        @$el.attr("d", @toPathData())
