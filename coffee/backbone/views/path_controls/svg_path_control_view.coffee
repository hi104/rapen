class @SvgPathControlView extends Backbone.View

    initialize:()=>
        container = document.getElementById('paper-js-container')
        canvas = document.createElement('canvas')
        $(canvas).hide()
        container.appendChild(canvas)
        @paper_score = new paper.PaperScope()
        @paper_score.setup(canvas)
        @path = new paper.CompoundPath()
        @path.strokeColor = "#268BD2"
        @path.strokeWidth = 2
        @path.fillColor = "#B5E1FF"
        @path.opacity = 0.75
        @path.fullySelected = true;
        @_control_views = []
        @_segments = []

    getSegmentControls:() =>
        _(@_control_views).filter((view) =>
            view.constructor == SvgSegmentPointControl
        )

    createViews:() =>
        @clearView()

        for child in @path._children
            controls = []
            @_pre_curve_control = null
            for seg in child._segments
                control_view = @createView(seg)
                controls.push(control_view)
                @_segments.push(control_view.segment)

            last_control = _(controls).last()
            for control in [last_control]
                do(control) =>
                    controls[0].segment.on("change", () =>
                        control.curveControl.render()
                    )

        @_setupControlView()

    _setupControlView:() =>
        line_group = SVGUtil.createTag("g")
        curve_group = SVGUtil.createTag("g")
        control_group = SVGUtil.createTag("g")
        handle_group = SVGUtil.createTag("g")
        @_control_views.forEach((view) =>
            if view instanceof SvgSegmentHandleControl
                $(handle_group).append(view.el)
            else if view instanceof SvgSegmentPointControl
                $(control_group).append(view.el)
            else if view instanceof SvgCurveView
                $(curve_group).append(view.el)
            else
                $(group).append(view.el)
        )
        @_control_views.forEach((view) =>
            if view instanceof SvgSegmentPointControl
                view.createHandleLine(line_group)
            view.render()
        )
        @$el.append(line_group)
        @$el.append(curve_group)
        @$el.append(handle_group)
        @$el.append(control_group)

    createView:(seg) ->
        segment_model = new PathSegmentAdapeter()
        segment_model.init(seg)
        curve = seg.getCurve()
        curve_control = null
        pre_curve_control = @_pre_curve_control
        if curve
            el = SVGUtil.createTag("path")
            curve_control = new SvgCurveView(pathControl:@, el:el, item:@item, curve:curve)
            @_pre_curve_control = curve_control
            @_control_views.push(curve_control)

        el = @createRect(0, 0)
        control = new SvgSegmentPointControl({
            pathControl:@, el:el, item:@item,
            curveControl:curve_control,
            segment:segment_model, getPoint:(() => segment_model.getPoint() )
        })
        @_control_views.push(control)

        el = @createPoint(0, 0)
        handleOutcontrol = new SvgSegmentHandleControl(pathControl:@, el:el, item:@item, segment:segment_model, getPoint:(() => segment_model.getHandleOut()))
        @_control_views.push(handleOutcontrol)

        el = @createPoint(0, 0)
        handleIncontrol = new SvgSegmentHandleControl(pathControl:@, el:el, item:@item, segment:segment_model, getPoint:(() => segment_model.getHandleIn()))
        @_control_views.push(handleIncontrol)

        segment_model.on("change", () =>
            @.updateItemPath()
            handleIncontrol.render()
            handleOutcontrol.render()
            control.render()
            curve_control.render() if curve_control
            pre_curve_control.render() if pre_curve_control
        )
        control

    #for set point before move position
    savePoint:() =>
        for seg in @_segments
            seg.getPoint().savePoint()

    moveSelectSegments:(pos) =>
        for seg in @_segments
            if seg.isSelected()
                point = seg.getPoint()
                pre_point = point.getSavePoint()
                x = pre_point.x + pos.x
                y = pre_point.y + pos.y
                point.setPoint(x, y)

    clearView:() =>
        @_control_views.forEach((e) => e.remove())
        @_control_views = []
        @_segments = []
        @clear()

    render:() =>
        @_control_views.forEach((view) => view.render())

    clear:() =>
        @$el.empty()

    updateItemPath:() =>
        @item.attr("d", @path.getPathData())

    refresh:() =>
        @updateItemPath()
        @createViews()

    unbindItem:() =>
        @item = null
        @stopListening()
        @clearView()

    isSelected:() => @item

    setItem:(item) =>
        @unbindItem()
        @item = item
        @path.setPathData($(@item.el).attr("d"))
        @listenTo(item, "change:matrix", @render)
        @createViews()

    createPoint:(x, y)=>
        el = SVGUtil.createTag("circle")
        $(el).attr({
            "cx":x,
            "cy":y,
            "stroke" : "black",
            "stroke-width" : "1",
            "fill" : "lightgreen",
            "r" : "8"
        })
        el

    createRect:(x, y)=>
        el = SVGUtil.createTag("rect")
        $(el).attr({
            "x":x - 8,
            "y":y - 8,
            "stroke" : "black",
            "stroke-width" : "1",
            "fill" : "lightblue",
            "width" : "16",
            "height" : "16"
        })
