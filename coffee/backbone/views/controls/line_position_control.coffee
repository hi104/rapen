class @LinePositionControl extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"

    initialize: () ->
        @getItem = @options.get_item
        @setStyle()
        @type = @options.type

    setStyle:()->
        $(@el).attr({
            "stroke" : "black",
            "stroke-width" : "1",
            "fill" : "lightblue",
            "opacity" : 0.8,
            "width" : 16,
            "height" : 16,
            "x":0,
            "y":0
        })

    hide:() => @$el.hide()

    show:() => @$el.show()

    isVisible:() => @$el.css("display") != "none"

    onMouseDown:(e) =>
        @pre_position = e
        console.log("onMouseDown LinePositionControl")
        $(document).mousemove(@onDragging)
        $(document).mouseup(@onDrop)
        e.preventDefault()
        e.stopPropagation()

    onDragging:(e) =>
        point = SVGUtil.createPoint(e.offsetX, e.offsetY)
        point = point.matrixTransform(@getItem().getCTM().inverse())

        attr = {}
        attr["x" + @type] = point.x
        attr["y" + @type] = point.y
        @getItem().attr(attr)

    onDrop:(e) =>
        @trigger("onDrop", @)
        $(document).unbind("mousemove", @onDragging)
        $(document).unbind("mouseup", @onDrop)

    render:(e) =>
        if @isVisible()
            item = @getItem()
            ctm = item.el.getCTM()
            @x = parseInt($(item.el).attr("x" + @type))
            @y = parseInt($(item.el).attr("y" + @type))
            point =  SVGUtil.createPoint(@x, @y)
            point = point.matrixTransform(ctm)

            @$el.attr({
                "x" : point.x - 8,
                "y" : point.y - 8
            })
