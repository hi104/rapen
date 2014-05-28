class @LinearGradientModel extends Backbone.Model
    toAttr:() =>
        attrs = {}
        attrs["x1"] = @get("x1")+ "%"
        attrs["y1"] = @get("y1")+ "%"
        attrs["x2"] = @get("x2")+ "%"
        attrs["y2"] = @get("y2")+ "%"
        attrs["spreadMethod"] = @get("spreadMethod")
        attrs["gradientUnits"] = @get("gradientUnits")
        attrs

class @RadialGradientModel extends Backbone.Model
    toAttr:() =>
        attrs = {}
        attrs["cx"] = @get("cx")+ "%"
        attrs["cy"] = @get("cy")+ "%"
        attrs["r"] = @get("r")+ "%"
        attrs["fx"] = @get("fx")+ "%"
        attrs["fy"] = @get("fy")+ "%"
        attrs["spreadMethod"] = @get("spreadMethod")
        attrs["gradientUnits"] = @get("gradientUnits")
        attrs

class @GradientStopModel extends Backbone.Model
    toAttr:() =>
        attrs = {}
        attrs["offset"] = @get("offset")
        attrs["stop-color"] = @get("color")
        attrs["stop-opacity"] = @get("opacity")
        attrs

class @GradientStopCollection extends Backbone.Collection
    model:GradientStopModel

class @GradientPointControl extends Backbone.View

    events: () ->
        "mousedown": "onMouseDown"

    initialize:() =>
        @type = @options.type
        @x_attr = @options.x_attr
        @y_attr = @options.y_attr
        @setStyle()

    setStyle:()->
        $(@el).attr({
            "stroke" : "black",
            "stroke-width" : "1",
            "fill" : "white",
            "opacity" : 0.5,
            "width" : 16,
            "height" : 16,
            "x" : 0,
            "y" : 0
        })

    onMouseDown:(e) =>
        @pre_position = e
        e.preventDefault()
        e.stopPropagation()
        $(document).mousemove(@mouseMove)
        $(document).mouseup(@mouseUp)

    mouseMove:(e) =>

        e.preventDefault()
        e.stopPropagation()
        mouse_pos = SVGUtil.createPoint(e.pageX, e.pageY)
        points = @itemBBoxPoints()
        point = SVGUtil.createPoint(
            mouse_pos.x - points[0].x,
            mouse_pos.y - points[0].y)

        matrix = @_getItemCoordinateMatrix()
        scale_per = point.matrixTransform(matrix.inverse())

        @model.set(@x_attr, scale_per.x * 100)
        @model.set(@y_attr, scale_per.y * 100)

    itemBBoxPoints:() =>
        item = @model.get("item")
        #TODO private method
        item._getMatrixBBoxPoints(item.getScreenCTM())

    mouseUp:(e) =>
        $(document).unbind('mousemove', @mouseMove)
        $(document).unbind('mouseup', @mouseUp)

    _getItemCoordinateMatrix:() =>
        points = @itemBBoxPoints()
        m = SVGUtil.SVG.createSVGMatrix()
        m.a = points[2].x - points[0].x
        m.b = points[2].y - points[0].y
        m.c = points[1].x - points[0].x
        m.d = points[1].y - points[0].y
        m

    getRenderPosition:() =>
        points = @model.get("item").getBBoxPoints()

        x = @model.get(@x_attr) / 100
        y = @model.get(@y_attr) / 100

        point = SVGUtil.createPoint(x, y)
        matrix = @_getItemCoordinateMatrix()
        point = point.matrixTransform(matrix)

        x = points[0].x + point.x
        y = points[0].y + point.y

        SVGUtil.createPoint(x, y)

    render:() =>
        point = @getRenderPosition()
        @$el.attr({
            "x" : point.x - 8,
            "y" : point.y - 8
        })

class @GradientControlBase extends Backbone.View

    _getGradientStops:(model) =>
        model.get("stops").map((stop) =>
            stop_el = SVGUtil.createTag("stop")
            $(stop_el).attr(stop.toAttr())
            stop_el
        )
    _toNumber:(str, instead = 0) =>
        if str
            Number(str.replace(/[^0-9.]/, ""))
        else
            instead

    _createStopModels:(grad_el) =>
        stops_el = $(grad_el).find("stop").get()
        stops = stops_el.map((elm) =>
            elm = $(elm)
            new GradientStopModel({
                offset: elm.attr("offset"),
                color: elm.attr("stop-color"),
                opacity: elm.attr("stop-opacity")
            })
        )
        new GradientStopCollection(stops)

    _appendElement:(tag_name) =>
        element = SVGUtil.createTag(tag_name)
        @$el.append(element)
        element

    #need override
    _getGradientElement:(model, element) =>
        gradient = SVGUtil.createTag(element)
        attr = model.toAttr()
        $(gradient).attr(_.omit(attr, ["spreadMethod", "gradientUnits"]))
        #TODO not work safari 7.0
        gradient.setAttributeNS(null, "spreadMethod", attr["spreadMethod"])
        gradient.setAttributeNS(null, "gradientUnits", attr["gradientUnits"])
        gradient

    _applyGradientToItem:(model, item, element) =>
        unless item
            return
        grad_id = $(item.el).attr("id") + "-grad"
        grad_el = $("#" + grad_id)
        grad_el.attr(model.toAttr())
        grad = @_getGradientElement(model, element)
        stops = @_getGradientStops(model)
        if(grad_el.length > 0)
            grad_el.remove()
        $("#item-defs").append(grad)
        stops.forEach((stop) =>
            $(grad).append(stop)
        )
        $(grad).attr("id", grad_id)

class @RadialGradientControl extends GradientControlBase
    initialize:() =>

    setItem:(item) =>
        @stopListening()

        unless item
            return

        @item = item
        @grad_model = @_getGradientModel(item)

        @point1.remove() if @point1
        @point2.remove() if @point2

        @point1 = new GradientPointControl({
            el: @_appendElement('rect'),
            model: @grad_model,
            x_attr: "cx"
            y_attr: "cy"
        })

        @point2 = new GradientPointControl({
            el: @_appendElement('rect'),
            model: @grad_model,
            x_attr: "fx",
            y_attr: "fy"
        })

        @render()
        @listenTo(item, "change", @render)
        @listenTo(@grad_model, "change", @render)

        @listenTo(@grad_model, "change", () =>
            @_applyGradientToItem(@grad_model, item, "radialGradient")
        )

    # better move to svg element ?
    _getGradientModel:(item) =>
        grad_id = $(item.el).attr("id") + "-grad"
        grad_el = $("#" + grad_id)

        if grad_el
            cx = @_toNumber(grad_el.attr("cx"), 50)
            cy = @_toNumber(grad_el.attr("cy"), 50)
            fx = @_toNumber(grad_el.attr("fx"), 50)
            fy = @_toNumber(grad_el.attr("fy"), 50)
            r = @_toNumber(grad_el.attr("r"),  50)
            spread = grad_el[0].getAttributeNS(null, "spreadMethod")
            # console.log(@, spread)
            # spread = spread ? "pad"
            spread = "pad" if spread == ""
            unit = grad_el[0].getAttributeNS(null, "gradientUnits")
            console.log("unit", unit)
            unit = "objectBoundingBox" if unit == ""

            stops = @_createStopModels(grad_el)
            gradient = new RadialGradientModel({
                item:item,
                isNew:false,
                cx:cx,
                cy:cy,
                fx:fx,
                fy:fy,
                r:r,
                spreadMethod:spread,
                gradientUnits:unit,
                stops:stops
            })
        else
            gradient = new RadialGradientModel({
                item:item,
                isNew:true,
                cx:50,
                cy:50,
                fx:50,
                fy:50,
                r:50,
                spreadMethod:"pad",
                gradientUnits:"objectBoundingBox",
                stops:new GradientStopCollection([])
            })

        gradient

    render:() =>
        @point1.render()
        @point2.render()

class @LinearGradientControl extends GradientControlBase

    initialize:() =>

    setItem:(item) =>

        @stopListening()

        unless item
            return

        @item = item
        @grad_model = @_getGradientModel(item)

        @point1.remove() if @point1
        @point2.remove() if @point2

        @point1 = new GradientPointControl({
            el: @_appendElement('rect'),
            model:@grad_model,
            x_attr: "x1"
            y_attr: "y1"
        })

        @point2 = new GradientPointControl({
            el: @_appendElement('rect'),
            model:@grad_model,
            x_attr: "x2",
            y_attr: "y2"
        })

        @render()
        @listenTo(item, "change", @render)
        @listenTo(@grad_model, "change", @render)

        @listenTo(@grad_model, "change", () =>
            @_applyGradientToItem(@grad_model, item, "linearGradient")
        )

    # better move to svg element ?
    _getGradientModel:(item) =>
        grad_id = $(item.el).attr("id") + "-grad"
        grad_el = $("#" + grad_id)
        if grad_el
            x1 = @_toNumber(grad_el.attr("x1"), 0)
            y1 = @_toNumber(grad_el.attr("y1"), 0)
            x2 = @_toNumber(grad_el.attr("x2"), 100)
            y2 = @_toNumber(grad_el.attr("y2"), 0)
            stops = @_createStopModels(grad_el)
            spread = grad_el[0].getAttributeNS(null, "spreadMethod")
            spread = "pad" if spread == ""
            unit = grad_el[0].getAttributeNS(null, "gradientUnits")
            console.log("unit", unit)
            unit = "objectBoundingBox" if unit == ""
            gradient = new LinearGradientModel({
                item:item,
                isNew:false,
                x1:x1,
                y1:y1,
                x2:x2,
                y2:y2,
                spreadMethod:spread,
                gradientUnits:unit,
                stops:stops
            })
        else
            gradient = new LinearGradientModel({
                item:item,
                isNew:true,
                x1:0,
                y1:0,
                x2:100,
                y2:0,
                spreadMethod:"pad",
                gradientUnits:"objectBoundingBox",
                stops:new GradientStopCollection([])
            })

        gradient

    render:() =>
        @point1.render()
        @point2.render()
