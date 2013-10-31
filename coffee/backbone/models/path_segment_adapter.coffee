class @PathSegmentAdapeter extends Backbone.Model

    #
    #type paper.Segment
    #

    init:(segment) =>
        @segment = segment
        @_setSegment(@segment)

    _setSegment:(segment)=>
        @point = new PathSegmentPointAdapeter()
        @point.init(segment.getPoint())
        @handleInPoint = new PathSegmentPointAdapeter()
        @handleInPoint.init(segment.getHandleIn())
        @handleOutPoint = new PathSegmentPointAdapeter()
        @handleOutPoint.init(segment.getHandleOut())

        for p in [@point, @handleInPoint, @handleOutPoint]
            p.on("change", @onChange)

    getHandleOut:() => @handleOutPoint
    getHandleIn:() => @handleInPoint
    getPoint:() => @point
    isSelected:() => @segment.isSelected()
    setSelected:(val) =>
        @segment.setSelected(val)
        @onChange(@)

    setLinear:() =>
        @segment.setLinear()
        @onChange(@)

    remove:() => @segment.remove()

    onChange:() =>
        args = Array::slice.call(arguments)
        args.unshift(@)
        args.unshift("change")
        @trigger.apply(@, args)
