class @PositionControl extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"

    initialize: () ->
        @selectView = @options.selectView
        # @bind('mousedown', @onMouseDown)
        @setStyle()
        @getItem = @options.get_item

    setStyle:() ->
        $(@el).attr("fill", "none")

    render:()=>
        bbox = @getItem().getBBox();
        @$el.attr({
            "width": bbox.width,
            "height": bbox.height,
            "x": bbox.x,
            "y": bbox.y})
        SVGUtil.setMatrixTransform(@el,  @getItem().getCTM())

    onMouseDown:(e) =>
        @trigger("onMouseDown", @, e)
        @pre_position = e
        @pre_matrix = @getItem().getLocalMatrix()

    onDragging:(e) =>
        pos = @_getMovedControlPosition(e)

        @movePosition(pos)
        if e.altKey
            snap_line_view.clear() #TODO global
            snap_line_view.render()
        else
            @_snappingItem(@, e)

        @trigger("onDragging", @, e)

    _getMovedControlPosition:(e) =>
        pos = @._getMovedPosition(e)
        if e.shiftKey
            if Math.abs(pos.x) > Math.abs(pos.y)
                pos.y = 0
            else
                pos.x = 0
        pos

    _snappingItem:(pos_ctl, e) =>
        pos = @_getMovedControlPosition(e)
        selectView = pos_ctl.selectView
        snap_target_points = selectView.selectitem.getSnapPoints()
        movep = Snapping.getSnap(snap_target_points)
        pos.x = pos.x - movep.x
        pos.y = pos.y - movep.y

        pos_ctl.movePosition(pos)
        pos_ctl.selectView.render()        #


    onDrop:(e) =>
        @trigger("onDrop", @)

    movePosition:(pos) =>
        item = @getItem()
        move = SVGUtil.createPoint(pos.x, pos.y)
        matrix_inverse = item.getCTM().inverse()
        matrix_inverse.e = 0
        matrix_inverse.f = 0
        move = move.matrixTransform(matrix_inverse)
        item.setMatrix(@pre_matrix.translate(move.x, move.y))

    _getMovedPosition:(e) =>
        dx = e.pageX - @pre_position.pageX
        dy = e.pageY - @pre_position.pageY
        {x:dx, y:dy}
