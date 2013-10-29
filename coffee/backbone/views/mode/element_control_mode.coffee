class @ElementControlMode

    constructor:(maneger)->
        _.extend @, Backbone.Events
        @maneger = maneger
        @regionView = new SelectRegionControlView({
            el:$("#select-control-region-view"),
            canvas:@maneger.canvas
        })

    getControl:() =>
        @maneger.getControl()

    onEvent:(event, sender, e, options) =>
        if sender instanceof SvgElementView
            @_onSvgElementView.apply(@, arguments)
        else if sender instanceof SvgCanvas
            @_onSvgCanvas.apply(@, arguments)

    _onSvgCanvas:(event, sender, e, options) =>
        if event  == "onMouseDown" and not e.altKey
            @regionView.canvas = @maneger.getCanvas()
            @listenToOnce(@regionView, "onRegionDrop", @_onRegionDrop)
            @regionView.startSelectRegion(e)

    _onRegionDrop:(region) =>
        contain_items = @_getRegionContainItems(@maneger.canvas.getItems(), @regionView)
        control = @getControl()
        control.clear()
        if contain_items.length > 0
            control.initControls(contain_items)

    _getRegionContainItems:(_items, region)=>
        items = _items.filter((item) => not item.isLocked())
        items.filter((item) =>
            _.any(item.getBBoxPoints(), (p) => region.isContainPoint(p))
        )

    _onSvgElementView:(event, sender, e, options) =>
        control = @getControl()
        if event  == "onMouseDown"
            @cancelEvent(e)
            if e.shiftKey
                if not control.exists(sender.model)
                    control.addItem(sender.model)
            else
                if not control.exists(sender.model)
                    control.clear()
                    control.addItem(sender.model)
                control.getControl().position_control.onMouseDown(e)

        else if event == "onClick"
                @cancelEvent(e)


    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
