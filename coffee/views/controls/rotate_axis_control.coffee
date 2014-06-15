#
# TODO better class name
#
class @RotateAxisControl extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"

    initialize: () ->
        @rotate_point_el = @options.rotate_point_el
        @getItem = @options.get_item
        @setStyle()
        @rotate_point_view = new RotatePointControl(el:@rotate_point_el)
        @rotate_point_view.bind("change", @render)

    setStyle:()->
        $(@el).attr({
            "stroke" : "black",
            "stroke-width" : "1",
            "fill" : "lightblue",
            "r" : "8"
        })

    getRotateAxisPoint:() =>
        @rotate_point_view.point

    onMouseDown:(e) =>
        @trigger("onMouseDown", @, e)
        @_origin_matrix = @getItem().getLocalMatrix()
        @_origin_rotate_point = @getRotateAxisPoint().matrixTransform(SvgCanvasBase.mainCanvas.getScreenCTM()) #TODO global

        center = @getItem().getCentorPoint()
        @_origin_degree = @_radianToDegree(@_radian(center, @_origin_rotate_point))
        @storeAttrs([
            'transform'
        ])

    onDragging:(e)=>
        mouse_point = SVGUtil.createPoint(e.pageX, e.pageY)
        degree = @_radianToDegree(@_radian(mouse_point, @_origin_rotate_point))
        rot_degree = degree

        snap_degree = 15
        if e.shiftKey
            div = parseInt(degree / snap_degree)
            for p, idx in [(snap_degree * div), (snap_degree * (div - 1))]
              if(Math.abs(p - degree) < 10)
                rot_degree = p

        @setRotate(rot_degree, @rotatePoint())

    rotatePoint: () =>
        @getRotateAxisPoint().matrixTransform(@_origin_matrix.inverse())

    setRotate: (angle, point) =>
        transform = d3.transform("matrix(" + SVGUtil.toStringMatrix(@_origin_matrix.translate(point.x, point.y))+ " )")
        transform.rotate = transform.rotate+angle-@_origin_degree
        matrix = SVGUtil.TransformMatrix(transform.toString()).translate(-point.x, -point.y)
        # matrix = @_origin_matrix.translate(point.x, point.y)
        #          .rotate(angle-@_origin_degree)
        #          .translate(-point.x, -point.y)
        @getItem().setMatrix(matrix)

    _radian: (p, origin) ->
        Math.atan2(p.y - origin.y, p.x - origin.x)

    _radianToDegree:(radian) ->
        (radian * (180/Math.PI)) + 90

    render:() =>
        @render_control_point()
        @render_rotate_point()

    render_control_point:() =>

        canvas = SvgCanvasBase.mainCanvas
        screen_rotate_point = @getRotateAxisPoint().matrixTransform(canvas.getScreenCTM())
        center = @getItem().getCentorPoint()
        r = Math.atan2(center.y - screen_rotate_point.y,
                       center.x - screen_rotate_point.x)

        x = Math.cos(r) * 100
        y = Math.sin(r) * 100

        rotate_point = @getRotateAxisPoint().matrixTransform(canvas.getCTM())
        @$el.attr("cx", rotate_point.x  +  x)
        @$el.attr("cy", rotate_point.y  +  y)

    render_rotate_point:() =>
        @rotate_point_view.render()

_.extend @RotateAxisControl::, StoreAttrsMixin
