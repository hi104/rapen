class @SvgElement extends Backbone.Model

    initialize: () =>
        @unSelect()
        @unLock()
        @show()
        @unSuspendRemove()

    setFolder:(folder)->
        @folder = folder

    removeFromFolder:() ->
        @folder.remove(@)

    pergeFromFolder:() ->
        @suspendRemove()
        @removeFromFolder()
        @unSuspendRemove()

    setElement:(element) =>
        @el = element
        @$el = $(element)
        @attr("data-name", @$el.data("name"))

    getElementId:() ->
        @$el.attr('id')

    clone:() ->
        newElement = new SvgElement()
        newElement.setElement(@el.cloneNode(true))
        @_updateElementId(newElement.el)
        newElement

    _updateElementId:(element)->
        $(element).attr('id', @generateId())

        $(element).find('*').each((i, el) =>
            $(el).attr('id', @generateId())
        )

    generateId: () =>
        SvgCanvasBase.generateId()

    setMatrix:(matrix) =>
        transform = SVGUtil.toD3Transform(matrix)
        @attr("transform", transform.toString())

        # SVGUtil.setMatrixTransform(@el, matrix)
        # @set({"matrix": matrix})

    attr:(key, val, options) =>
        if (typeof key == 'object')
            attrs = key;
            options = val;
        else
            (attrs = {})[key] = val;
        $(@el).attr(attrs)
        @set(attrs)

    getAttr:(key) ->
        $(@el).attr(key)
#
# select when clone control selected item
#
    select:() => @set("_selected", true)
    unSelect:() => @set("_selected", false)
    isSelected:() => @get("_selected")

    lock:() => @set("_locked", true)
    unLock:() => @set("_locked", false)
    isLocked:() => @get("_locked")
    toggleLock:() =>
        if @isLocked()
            @unLock()
        else
            @lock()

    isVisibled:() =>
        @get('_visible')
        # $(@el).css('display') != "none"

    show:() =>
        @set('_visible', true)
        $(@el).css('display', "inline")

    hide:() =>
        @set('_visible', false)
        $(@el).css('display', "none")


    suspendRemove:()->
        @set("_suspend_remove", true)

    unSuspendRemove:()->
        @set("_suspend_remove", false)

    isSuspendRemove:()->
        @get("_suspend_remove")

    group:() ->
        @set("_grouped", true)

    isGrouped:() ->
        @get("_grouped")

    getBBox:() =>
        @el.getBBox()

    getCTM:() =>
        @el.getCTM()

    getScreenCTM:() =>
        @el.getScreenCTM()

    getSnapPoints:() =>
        points = @getBBoxPoints()
        center_x = (points[0].x + points[3].x)/2
        center_y = (points[0].y + points[3].y)/2
        center_point = SVGUtil.createPoint(center_x, center_y)
        points.push(center_point)
        points

    getLocalMatrix:() =>
        SVGUtil.localMatrix(@el)

    getCentorPoint:() =>
        svg_rect = @getBBox()
        ctm = @el.getScreenCTM()
        point =  SVGUtil.SVG.createSVGPoint()
        point.x = svg_rect.x  + svg_rect.width/2
        point.y = svg_rect.y  + svg_rect.height/2
        point = point.matrixTransform(ctm);

    getBBoxPoints:() =>
        @_getMatrixBBoxPoints(@getCTM())

    _getMatrixBBoxPoints:(matrix) =>
        points = @_getBBoxPoints(@getBBox())
        transed_points = []
        _.each(points, (p) =>
            _origPoint = SVGUtil.createPoint(p[0], p[1])
            origPoint = _origPoint.matrixTransform(matrix)
            transed_points.push(origPoint)
        )
        transed_points

    _getBBoxPoints:(bbox) =>
        ret =[]
        for w  in [bbox.x, bbox.x + bbox.width]
            for h  in [bbox.y, bbox.y + bbox.height]
                ret.push [w, h]
        ret


#
#       -1, -1      0, -1           1, -1
#       +-------------+-------------+
#       |                           |
#       |                           |
#       |                           |
#       |                           |
#       |0, -1                      |
#       |                           |
#       |                           |
#       |                           |
#       |                           |
#       +-------------+-------------+
#
    _getPosition:(pos) =>
        svg_rect = @getBBox()
        point = SVGUtil.SVG.createSVGPoint()
        point.x = svg_rect.x + (svg_rect.width/2)*(1 + pos.x)
        point.y = svg_rect.y + (svg_rect.height/2)*(1 + pos.y)
        point

    getPosition:(pos) =>
        @_getPosition(pos).matrixTransform(@getCTM())

    move:(pos) =>
        point = SVGUtil.createPoint(pos.x, pos.y)
        matrix_inverse = @getCTM().inverse()
        matrix_inverse.e = 0
        matrix_inverse.f = 0
        point = point.matrixTransform(matrix_inverse)
        @setMatrix(@getLocalMatrix().translate(point.x, point.y))

    #copy from scale control center scale
    centerScale:(x_scale, y_scale) =>

        matrix = @getLocalMatrix()
        bbox = @getBBox()

        box_width = bbox.width
        box_height =  bbox.height

        move_bbox_x = (bbox.x * x_scale) - bbox.x
        move_bbox_y = (bbox.y * y_scale) - bbox.y

        move_bbox_width = (box_width * x_scale) - box_width
        move_bbox_height = (box_height * y_scale) - box_height

        move_y = move_bbox_height/2 + move_bbox_y
        move_x = move_bbox_width/2 + move_bbox_x

        matrix = matrix.translate(-move_x, -move_y)

        @setMatrix(matrix.scaleNonUniform(x_scale, y_scale))

    flipX:() =>
        @centerScale(-1, 1)

    flipY:() =>
        @centerScale(1, -1)

    toXML: () ->
        serializer = new XMLSerializer()
        serializer.serializeToString(@el)
