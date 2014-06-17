class @PositionControl extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"

    initialize: () ->
        @getItem = @options.get_item

    onMouseDown:(e) =>
        @trigger("onMouseDown", @, e)
        @pre_position = e
        @pre_matrix = @getItem().getLocalMatrix()
        @pre_ctm = @getItem().getCTM()

        @storeAttrs(['transform'])

    onDragging:(e) =>
        pos = @_getMovedControlPosition(e)

        if e.altKey
            snap_line_view.clear() #TODO global
            snap_line_view.render()
            @movePosition(@_getMoveMatrix(pos))
        else
            @_snappingItem(e)

        @trigger("onDragging", @, e)

    _getMovedControlPosition:(e) =>
        pos = @._getMovedPosition(e)
        if e.shiftKey
            if Math.abs(pos.x) > Math.abs(pos.y)
                pos.y = 0
            else
                pos.x = 0
        pos

    _snapPoints:(pos) =>
        points = @getItem()._getMatrixBBoxPoints(@_getMoveCtmMatrix(pos))
        center_point = SVGUtil.createPoint((points[0].x + points[3].x)/2, (points[0].y + points[3].y)/2)
        points.push(center_point)
        points

    _getSnapedPoint:(e) =>
        pos = @_getMovedControlPosition(e)
        movep = Snapping.getSnap( @_snapPoints(pos))
        pos.x = pos.x - movep.x
        pos.y = pos.y - movep.y
        pos

    _snappingItem:(e) =>
        @movePosition(@getMoveMatrix(e))

    onDrop:(e) =>
        @trigger("onDrop", @)

    _getItemCoordPos:(pos) =>
        item = @getItem()
        move = SVGUtil.createPoint(pos.x, pos.y)
        matrix_inverse = item.getCTM().inverse()
        matrix_inverse.e = 0
        matrix_inverse.f = 0
        move = move.matrixTransform(matrix_inverse)

    _getMoveCtmMatrix:(pos) =>
        move = @_getItemCoordPos(pos)
        @pre_ctm.translate(move.x, move.y)

    _getMoveMatrix:(pos) =>
        move = @_getItemCoordPos(pos)
        @pre_matrix.translate(move.x, move.y)

    getMoveMatrix:(e) ->
        @_getMoveMatrix(@_getSnapedPoint(e))

    movePosition:(matrix) =>
        @getItem().attr('transform', SVGUtil.toD3Transform(matrix).toString())
        # @getItem().setMatrix(matrix)

    _getMovedPosition:(e) =>
        dx = e.pageX - @pre_position.pageX
        dy = e.pageY - @pre_position.pageY
        {x:dx, y:dy}

_.extend @PositionControl::, StoreAttrsMixin
