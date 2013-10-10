class @RotatePointControl extends Backbone.View

    initialize: () ->
        @point = SVGUtil.createPoint(250, 250)
        @setStyle()

    events: () ->
        "mousedown": "onMouseDown"

    setStyle:()->
        $(@el).attr({
            "stroke" : "black",
            "stroke-width" : "3",
            "fill" : "white",
            "fill-opacity": 1,
            "r" : "6"
        })

    setPoint:(x, y) =>
        @point.x = x
        @point.y = y
        @trigger("change", @)

    onMouseDown:(e) =>
        $(document).mousemove(@onMouseMove)
        $(document).mouseup(@onMouseDrop)
        e.preventDefault()
        e.stopPropagation()

    onMouseMove:(e)=>
        mouse_p = SVGUtil.createPoint(e.offsetX, e.offsetY)
        movep = Snapping.getSnap([mouse_p], false)
        mouse_p = SVGUtil.createPoint(e.offsetX - movep.x, e.offsetY - movep.y)
        mouse_p = mouse_p.matrixTransform(SvgCanvasBase.mainCanvas.getCTM().inverse())
        @setPoint(mouse_p.x, mouse_p.y)

    onMouseDrop:(e) =>
        $(document).unbind('mousemove', @onMouseMove)
        $(document).unbind('mouseup', @onMouseDrop)

    render:() =>
        point = @point.matrixTransform(SvgCanvasBase.mainCanvas.getCTM())
        @$el.attr("cx", point.x)
        @$el.attr("cy", point.y)
