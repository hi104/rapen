class @SvgFolder extends SvgElement

    initialize: () ->
        @items = new SvgElementList()
        @items.comparator = (e) => e.$el.index()
        @listenTo(@items, 'add', @onAddItem)
        @listenTo(@, "remove", @onRemove)
        @open()
        super()

    setManager:(manager) ->
        @manager = manager

    add:(item, options) ->
        item.setFolder(@)
        @items.add(item, options)

    remove:(item) ->
        item.setFolder(null)
        @items.remove(item)

    onRemove: () ->
        return if @isSuspendRemove()

        items =  @items.toArray()
        items.forEach((item) => @items.remove(item))

    onAddItem:(item) => #NOTE view in model
        view = new SvgElementView({model:item, el:item.el })
        @setControlViewEvent(view)
        view.render()

        if @$el.get(0) != view.$el.parent().get(0)
            @$el.append(view.$el)

    setControlViewEvent:(view) =>
        ["onMouseDown", "onDblClick", "onClick"].forEach((event) =>
            view.bind(event, (obj, e) =>
                @manager.onEvent(event, obj, e)
            )
        )

    open:() =>
        @set("_open", true)

    isOpen:() =>
        @get("_open")

    close:() =>
        @set("_open", false)
