class @ScaleControl extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"

    initialize: () ->
        @pos = @options.pos
        @selectView = @options.selectView
        @getItem = @options.get_item
        @setStyle()

    setStyle:() ->
        $(@el).attr("stroke-width", "1")
        $(@el).attr("fill", "lightblue")
        # @setStyleForCircle()
        @setStyleForRect()

    setStyleForCircle:() =>
        @mark_size = 8
        $(@el).attr("stroke", "black")
        $(@el).attr("fill-opacity", "0.5")
        $(@el).attr("r", @mark_size)

    setStyleForRect:() =>
        @mark_size = 10
        $(@el).attr("stroke", "blue")
        $(@el).attr("stroke-width", "0.5")
        $(@el).attr("fill-opacity", "0.7")
        $(@el).attr("stroke", "blue")
        $(@el).attr("x", 0)
        $(@el).attr("y", 0)
        $(@el).attr("width", @mark_size)
        $(@el).attr("height", @mark_size)

#
#       y_axis           control point (el)
#       +---------------@
#       |               |
#       |               |
#       |               |
#       +---------------+
#       fixed_point     x_axis
#
#
# x_axis, y_axis for calculate scale

    xAxis:() =>
        @getItem().getPosition({x:@pos.x, y:@pos.y*-1})

    yAxis:() =>
        @getItem().getPosition({x:@pos.x*-1, y:@pos.y})

    fixedPosition:() =>
        @getItem().getPosition({x:@pos.x*-1, y:@pos.y*-1})

    controlPosition:() =>
        @getItem().getPosition(@pos)

    _saveOriginValue:() =>

        @_pre_vec_x = @_getVecPoint(@controlPosition(), @xAxis())
        @_pre_vec_y = @_getVecPoint(@controlPosition(), @yAxis())

        item = @getItem()
        @pre_fixed_point = @fixedPosition()
        @pre_control_point = @controlPosition()
        @pre_center_point = item.getCentorPoint()
        @_pre_vec = @_getVecPoint(@fixedPosition(), @controlPosition())
        @origin_ctm = item.getLocalMatrix()
        @origin_bbox = item.getBBox()
        @origin_attribute = {
            width :$(item.el).attr("width"),
            height : $(item.el).attr("height"),
            r : $(item.el).attr("r"),
            rx :$(item.el).attr("rx"),
            ry : $(item.el).attr("ry")}

        @storeAttrs([
            'width',
            'height',
            'r',
            'rx',
            'ry',
            'transform'
        ])

    onMouseDown:(e) =>
        @trigger("onMouseDown", @, e)
        @_saveOriginValue()

    _getVecPoint:(p1, p2) ->
        SVGUtil.createPoint(p2.x - p1.x, p2.y - p1.y)

    _getScaleMatrix:() =>
        m = SVGUtil.SVG.createSVGMatrix()
        m.a = @_pre_vec_y.x
        m.b = @_pre_vec_y.y
        m.c = @_pre_vec_x.x
        m.d = @_pre_vec_x.y
        m

    onDragging:(e)=>

        snap_point = @getSnapPoint(e)
        control_vec = @_getVecPoint(@pre_fixed_point, snap_point)
        m = @_getScaleMatrix()

        scale = control_vec.matrixTransform(m.inverse())

        x_scale = -scale.x
        y_scale = -scale.y
        if e.shiftKey
            if Math.abs(x_scale) > Math.abs(y_scale)
                y_scale = x_scale
            else
                x_scale = y_scale

        if e.altKey
            matrix = @setCenterScale((x_scale*2)-1, (y_scale*2)-1)
        else
            matrix = @setScale(x_scale, y_scale)

        @getItem().setMatrix(matrix)

    getSnapPoint:(e) =>
        snap_points = []
        mouse_p = SVGUtil.createPoint(e.offsetX, e.offsetY)
        movep = Snapping.getSnap([mouse_p])
        SVGUtil.createPoint(mouse_p.x - movep.x, mouse_p.y - movep.y)

    #
    # TODO refactor
    #
    setScale:(x_scale, y_scale) =>
        item = @getItem()

        if(item.el.tagName == "rect")
            x_value = Math.abs(@origin_attribute.width * x_scale)
            y_value = Math.abs(@origin_attribute.height * y_scale)
            move_width = x_value - @origin_attribute.width
            move_height = y_value - @origin_attribute.height
            item.attr({"width":x_value, "height":y_value})
            move_width  = 0 if @pos.x != -1
            move_height = 0 if @pos.y != -1
            matrix = @origin_ctm.translate(-move_width, -move_height)
        else if(item.el.tagName == "circle")
            x_value = Math.abs(@origin_attribute.r * x_scale)
            y_value = Math.abs(@origin_attribute.r * y_scale)

            if(not (@ instanceof ScaleOneAxisControl))
                y_value = x_value

            set_rx =  x_value - @origin_attribute.r
            set_ry =  y_value - @origin_attribute.r

            if(@ instanceof ScaleOneAxisControl and @axis_type == "y")
                item.attr({"r":y_value})
            else
                item.attr({"r":x_value})

            set_rx = -set_rx if @pos.x != -1
            set_ry = -set_ry if @pos.y != -1
            matrix = @origin_ctm.translate(-set_rx, -set_ry)
        else if(item.el.tagName == "ellipse")
            x_value = Math.abs(@origin_attribute.rx * x_scale)
            y_value = Math.abs(@origin_attribute.ry * y_scale)
            set_rx =  x_value - @origin_attribute.rx
            set_ry =  y_value - @origin_attribute.ry
            item.attr({"rx":x_value, "ry":y_value})
            set_rx = -set_rx if @pos.x != -1
            set_ry = -set_ry if @pos.y != -1
            matrix = @origin_ctm.translate(-set_rx, -set_ry)
        else
            move_bbox_x = @origin_bbox.x * (x_scale-1)
            move_bbox_y = @origin_bbox.y * (y_scale-1)

            move_bbox_width = @origin_bbox.width * (x_scale-1)
            move_bbox_height = @origin_bbox.height * (y_scale-1)

            if @pos.x != -1
                move_x = move_bbox_x
            else
                move_x = move_bbox_width + move_bbox_x

            if @pos.y != -1
                move_y = move_bbox_y
            else
                move_y = move_bbox_height + move_bbox_y

            matrix = @origin_ctm.translate(-move_x, -move_y)
            matrix = matrix.scaleNonUniform(x_scale, y_scale)

        matrix

    setCenterScale:(x_scale, y_scale) =>
        item = @getItem()

        if(item.el.tagName == "rect")
            x_value = Math.abs(@origin_attribute.width * x_scale)
            y_value = Math.abs(@origin_attribute.height * y_scale)
            move_width = x_value - @origin_attribute.width
            move_height = y_value - @origin_attribute.height
            item.attr({"width":x_value, "height":y_value})
            matrix = @origin_ctm.translate(-move_width/2, -move_height/2)

        else if(item.el.tagName == "circle")
            x_value = Math.abs(@origin_attribute.r * x_scale)
            y_value = Math.abs(@origin_attribute.r * y_scale)
            set_rx =  x_value - @origin_attribute.r
            set_ry =  y_value - @origin_attribute.r
            item.attr({"r":x_value})
            matrix = @origin_ctm
        else if(item.el.tagName == "ellipse")
            x_value = Math.abs(@origin_attribute.rx * x_scale)
            y_value = Math.abs(@origin_attribute.ry * y_scale)
            set_rx =  x_value - @origin_attribute.rx
            set_ry =  y_value - @origin_attribute.ry
            item.attr({"rx":x_value, "ry":y_value})
            matrix = @origin_ctm
        else
            move_bbox_x = @origin_bbox.x * (x_scale-1)
            move_bbox_y = @origin_bbox.y * (y_scale-1)

            move_bbox_width = @origin_bbox.width * (x_scale-1)
            move_bbox_height = @origin_bbox.height * (y_scale-1)

            move_y = move_bbox_height/2 + move_bbox_y
            move_x = move_bbox_width/2 + move_bbox_x

            matrix = @origin_ctm.translate(-move_x, -move_y)
            matrix = matrix.scaleNonUniform(x_scale, y_scale)

        matrix

    onDrop:() =>
        console.log("ScaleControl onDrop")

    render:() =>
        @renderForRect()

    renderForCircle:() =>
        $(@el).attr("cx", @controlPosition().x)
        $(@el).attr("cy", @controlPosition().y)

    renderForRect:() =>
        cx = @controlPosition().x
        cy = @controlPosition().y
        $(@el).attr("x", cx-@mark_size/2)
        $(@el).attr("y", cy-@mark_size/2)

_.extend @ScaleControl::, StoreAttrsMixin
