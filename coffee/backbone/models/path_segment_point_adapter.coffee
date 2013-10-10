class @PathSegmentPointAdapeter extends Backbone.Model

    #
    #type paper.SegmentPoint
    #

    init:(point) ->
        @point = point

    setPoint:(x, y)=>
        @point.set(x, y)
        @trigger("change", @)

    getX:() ->
        @point.getX()

    getY:() ->
        @point.getY()

    savePoint:() =>
        @pre_point = { x:@getX(), y:@getY()}

    getSavePoint:() =>
        @pre_point
