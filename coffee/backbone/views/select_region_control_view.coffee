class @SelectRegionControlView extends Backbone.View

    initialize:() =>
        @canvas = @options.canvas
        @region_el = SVGUtil.createTag('rect')
        $(@el).append(@region_el)
        @_setStyle()

    _setStyle:()=>
        $(@region_el).attr("fill", "none")
        $(@region_el).attr("stroke", "black")
        $(@region_el).attr("stroke-width", "1")
        $(@region_el).attr("stroke-dasharray", "5")
        $(@region_el).attr("stroke-dashoffset", "10")

    setStart:(pos) => @start = pos

    setEnd:(pos) => @end = pos

    _getLeftTopPoint:() =>
        x: Math.min(@start.x, @end.x)
        y: Math.min(@start.y, @end.y)

    _getButtomRightPoint:() =>
        x: Math.max(@start.x, @end.x)
        y: Math.max(@start.y, @end.y)

    _size: (start, end) =>
        width:  (end.x - start.x)
        height: (end.y - start.y)

    clear: () =>
        @start = null
        @end = null
        $(@region_el).attr("width",  0)
        $(@region_el).attr("height",  0)
        @hide()

    hide:() => @$el.attr("display", "none")

    show:() => @$el.attr("display", "")

    render:() =>
        if not (@start and @end)
            return
        left_top = @_getLeftTopPoint()
        buttom_right = @_getButtomRightPoint()
        size = @_size(left_top, buttom_right)
        $(@region_el).attr("width",  size.width)
        $(@region_el).attr("height",  size.height)
        $(@el).attr("transform", "translate(" + left_top.x + ", " + left_top.y + ")")

    isContainPoint:(p) =>
        start = @_getLeftTopPoint()
        end = @_getButtomRightPoint()
        (start.x <  p.x and p.x < end.x) and  (start.y <  p.y and p.y < end.y)

    startSelectRegion:(e) =>
        @clear()
        @show()
        @setStart(@_getPosition(e))
        $(document).mousemove(@regionDragging)
        $(document).mouseup(@regionDrop)

    regionDragging:(e) =>
        @setEnd(@_getPosition(e))
        @render()

    _getPosition:(e) =>
        offset = $(@canvas.el).offset()
        x: (e.pageX - offset.left)
        y: (e.pageY - offset.top)

    regionDrop:(e) =>
        $(document).unbind('mousemove', @regionDragging)
        $(document).unbind('mouseup', @regionDrop)
        @setEnd(@_getPosition(e))
        @trigger("onRegionDrop", @)
        @clear()
