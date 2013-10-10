class @SelectRegionControlView extends Backbone.View

    initialize:() =>
        @region_el = SVGUtil.createTag('rect')
        @_setStyle()
        $(@el).append(@region_el)
        @visible = true
        @_containItems = []

    _setStyle:()=>
        $(@region_el).attr("fill", "none")
        $(@region_el).attr("stroke", "black")
        $(@region_el).attr("stroke-width", "1")
        $(@region_el).attr("stroke-dasharray", "5")
        $(@region_el).attr("stroke-dashoffset", "10")

    _getLeftTopPoint:() =>
        x: Math.min(@start.x, @end.x)
        y: Math.min(@start.y, @end.y)

    _getButtomRightPoint:() =>
        x: Math.max(@start.x, @end.x)
        y: Math.max(@start.y, @end.y)

    setStart:(pos) => @start = pos

    setEnd:(pos) => @end = pos

    _size: (start, end) =>
        width:  (end.x - start.x)
        height: (end.y - start.y)

    setVisible:(state) => @visible = state

    clearContainItems:() => @_containItems = []

    clear: () =>
        @clearContainItems()
        @setVisible(false)
        @render()

    render:() =>

        if @visible
            $(@el).attr("display", "")
        else
            $(@el).attr("display", "none")
            return

        start = @_getLeftTopPoint()
        end = @_getButtomRightPoint()
        size = @_size(start, end)
        $(@region_el).attr("width",  size.width)
        $(@region_el).attr("height",  size.height)
        $(@el).attr("transform", "translate(" + start.x + ", " + start.y + ")")

    #TODO check intersectRect
    setContainItems:(items) =>
        test = @region_el
        @_containItems = items.filter((item) =>
            _.any(item.getBBoxPoints(), (p) => @isContainPoint(p))
        )

    containItems:() => @_containItems

    isContainPoint:(p) =>
        start = @_getLeftTopPoint()
        end = @_getButtomRightPoint()
        (start.x <  p.x and p.x < end.x) and  (start.y <  p.y and p.y < end.y)
