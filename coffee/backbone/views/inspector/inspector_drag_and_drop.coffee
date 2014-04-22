class @InspectorDragAndDrop

    initialize:() ->
        @select_view = null
        @over_view = null

    enable:() ->
        @_enable = true

    disable:() ->
        @select_view.setDefalutStyle()
        @over_view.setDefalutStyle() if @over_view

        @select_view = null
        @over_view = null
        @_enable = false

    isEnable:() ->
        @_enable

    onMouseDown:(e, view) ->
        @enable()
        @select_view = view
        @select_view.setSelectedStyle()
        $(document).mouseup(@onMouseUp)

    onMouseLeave:(e, view) ->
        if view != @select_view
            view.setDefalutStyle()

    onMouseOver:(e, view) ->
        @over_view = view
        if view != @select_view
            view.setOverStyle()

    onMouseUp:(e) =>
        InspectorDragAndDrop.moveToElement(@select_view.model, @over_view?.model)
        @disable()
        e.preventDefault()
        e.stopPropagation()
        $(document).unbind('mouseup', @onMouseUp)

    # NOTE better move to other class ?
    @moveToElement:(from, to) ->

        return unless to
        return unless from != to

        if to.constructor == SvgElement
            to.$el.before(from.$el)
            from.pergeFromFolder()
            to.folder.add(from)
        else
            to.$el.append(from.$el)
            from.pergeFromFolder()
            to.add(from)
