class @RotateControl extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"

    initialize: () ->
        @rotate_point_el = @options.rotate_point_el
        @getItem = @options.get_item
        @setStyle()

    setStyle:()->
        $(@el).attr({
            "stroke" : "black",
            "stroke-width" : "1",
            "fill" : "lightgreen",
            "r" : "8"
        })

    onMouseDown:(e) =>
        @trigger("onMouseDown", @, e)
        @_origin_matrix = @getItem().getLocalMatrix()
        @_origin_rotate_point = @getItem().getCentorPoint()

    onDragging:(e)=>
        mouse_point =SVGUtil.createPoint(e.pageX, e.pageY)
        degree = @_radianToDegree(@_radian(mouse_point, @_origin_rotate_point))
        rot_degree = degree

        snap_degree = 15
        if e.shiftKey
            div = parseInt(degree / snap_degree)
            for p, idx in [(snap_degree * div), (snap_degree * (div - 1))]
              if(Math.abs(p - degree) < 10)
                rot_degree = p

        @setRotate(rot_degree, @rotatePoint())

    onDrop:(e) =>
        console.log("RotateControl onDrop")

    rotatePoint: () =>
        bbox = @getItem().getBBox()
        point = SVGUtil.createPoint( (bbox.width/2) + bbox.x, (bbox.height/2) + bbox.y)
        point

    setRotate: (angle, point) =>
        transform = d3.transform("matrix(" + SVGUtil.toStringMatrix(@_origin_matrix.translate(point.x, point.y))+ " )")
        transform.rotate = angle
        matrix = SVGUtil.TransformMatrix(transform.toString()).translate(-point.x, -point.y)
        @getItem().setMatrix(matrix)

    setRotate2: (angle) =>
        point = @rotatePoint()
        matrix = @_origin_matrix.translate(point.x, point.y).rotate(angle).translate(-point.x, -point.y)
        @getItem().setMatrix(matrix)

    _radian: (p, origin) ->
        Math.atan2(p.y - origin.y, p.x - origin.x)

    _radianToDegree:(radian) ->
        (radian * (180/Math.PI)) + 90

    render:() =>
        @render_control_point_adove_item()

    # TODO refactor not work
    # bug firefox none render group matrix property is null
    render_control_point_adove_item:() =>
        svg_rect = @getItem().getBBox();
        svg =  SVGUtil.SVG
        group = SVGUtil.createTag("g")
        point =  svg.createSVGPoint()
        point.x = svg_rect.x  +  svg_rect.width/2
        point.y = svg_rect.y  +  svg_rect.height/2

        point2 =  svg.createSVGPoint()
        point2.x = 0
        point2.y = -svg_rect.height/2

        ctm = @getItem().getCTM()

        point = point.matrixTransform(ctm)
        ctm.e = 0
        ctm.f = 0

        # transform = SVGUtil.SVG.createSVGTransformFromMatrix(ctm)
        # transform = SVGUtil.SVG.createSVGTransform()
        # transform.setMatrix(ctm)
        # # console.log(transform)
        # console.log(transform)
        # point2 = point2.matrixTransform(transform.matrix);
        #
        #
        #
        # transform = SVGUtil.SVG.createSVGTransform()
        # console.log(transform)

        # transform.setMatrix(ctm.skewX(1).skewY(1))
        # console.log(transform.matrix)
        # point2 = point2.matrixTransform(transform.matrix)

        transform = SVGUtil.toD3Transform(ctm)

        svg_matrix = SVGUtil.SVG.createSVGMatrix()
        svg_matrix = svg_matrix.translate(transform.translate[0], transform.translate[1])
        svg_matrix = svg_matrix.scaleNonUniform(transform.scale[0], transform.scale[1])
        svg_matrix = svg_matrix.rotate(transform.rotate)

        transform.skew = 0



        group.setAttribute("transform", transform.toString());
        point2 = point2.matrixTransform(group.getCTM());

        point3 =  svg.createSVGPoint()
        point3.x = 0
        point3.y = -30
        transform = SVGUtil.toD3Transform(ctm)
        transform.scale[0] = 1
        transform.scale[1] = 1
        transform.skew = 0
        group.setAttribute("transform", transform.toString());
        point3 = point3.matrixTransform(group.getCTM());

        element = $(@el)
        element.attr("cx", point.x + point2.x + point3.x)
        element.attr("cy", point.y + point2.y + point3.y)
