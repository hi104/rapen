class @ScaleOneAxisControl extends ScaleControl
    initialize: () ->
        @pos = @options.pos
        @selectView = @options.selectView
        @axis_type = @options.axis_type
        @getItem = @options.get_item
        @setStyle()

    _getDotVec:(v1, v2) -> VectorUtil.dot(v1, v2)

    _getDist:(v) ->
        Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2))

    onDragging:(e)=>
        snap_point = @getSnapPoint(e)
        @control_vec = @_getVecPoint(@pre_fixed_point, snap_point)
        dist = @_getDist(@_pre_vec)
        scale = @_getDotVec(@_pre_vec, @control_vec) / (dist * dist)

        if(@axis_type == "x")
           x_scale = scale
           y_scale = 1
        else
           x_scale = 1
           y_scale = scale

        if e.altKey
            matrix = @setCenterScale((x_scale*2)-1, (y_scale*2)-1)        #
        else
            matrix = @setScale(x_scale, y_scale)

        @getItem().setMatrix(matrix)
