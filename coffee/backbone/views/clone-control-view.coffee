class @CloneControlView extends Backbone.View

    initialize:() =>
        @manager = @options.manager
        @canvas = @options.canvas
        @item_list      = new SvgElementList()
        @line_list_view = new SelectLineListView({
            el: @options.line_wrapper,
            line_view_class: CloneSelectLineView
            })
        @item_list.bind('add', @_onAddItem)
        @item_list.bind('add', @_onChangeList)

        @item_list.bind('remove', @_onRemoveItem)
        @item_list.bind('remove', @_onChangeList)

        item = new SvgElement()
        item.setElement(@el)
        view = new SvgElementView({model:item, el:item.el})
        @item = item

        @_setControlViewEvent(view)
        @itemControl = new ItemControl({
            el:@options.select_el,
            manager:@
        })
        @mode = ""

    getControl:() => @itemControl

    setCanvas:(canvas) =>
        @canvas = canvas

    _onAddItem:(item) =>
        view = new SvgElementView({model:item, el:item.el})
        item.set("view", view)
        @_setChildControlEvent(view)
        @line_list_view.item_list.add(item)
        view.render()
        item.get("origin_model").select()

    _onRemoveItem:(item) =>
        item.get("origin_model").unSelect()

    _onChangeList:() =>
        @itemControl.clear()
        @stopListening()

        if @isOneItem()
            item = @firstOriginalItem()
            @listenTo(item,"change", @_updateForOneItem)
            @itemControl.setItem(item)
            @line_list_view.$el.hide()
            @$el.hide()
            @lazyShow()
        else if @item_list.length > 0
            @listenTo(@item,"change", @update)
            @itemControl.setItem(@item)
            @line_list_view.$el.show()
            @$el.show()
            @lazyShow()
        else
            @clear()
            @hide()

        @trigger("onChangeList", @)

    getControlItem:() =>
        @itemControl.getItem()

    isOneItem:() =>
        @item_list.length == 1

    firstItem:() =>
        @item_list.at(0)

    firstOriginalItem:() =>
        if @item_list.length > 0
            @item_list.at(0).get("origin_model")
        else
            null

    _updateForOneItem:() =>
        item = @firstItem()
        @_viewUpdate(item) if item
        @line_list_view.render()

    _viewUpdate:(item) =>
        view = item.get("view")
        el = view.$el
        elm = item.get("origin_model").el.cloneNode(true)
        item.el = elm
        @$el.append(elm)
        view.setElement(elm)
        el.remove()

    update:() =>
        return if @mode == "copy"
        matrix = @item.getLocalMatrix()
        @item_list.each((item) =>
            origin_model = item.get("origin_model")
            local = item.getLocalMatrix()
            origin_model.setMatrix(matrix.multiply(local))
        )
        @line_list_view.render()

    setItems:(models) =>
        @clear()
        for model in models
            @addItem(model)

    removeItem:(model)=>
        item = @item_list.find((e) => e.get("origin_model") == model)
        @item_list.remove(item)
        @lazyRender()

    addItem:(model)=>
        elm = model.el.cloneNode(true)
        matrix = @item.getLocalMatrix().inverse().multiply(model.getLocalMatrix())
        SVGUtil.setMatrixTransform(elm, matrix)
        @$el.append(elm)
        item = new SvgElement() #SvgElemenを継承した別のクラスをつくるべきかも
        item.setElement(elm)
        item.set("origin_model", model)
        @item_list.add(item)
        @lazyRender()
        item

    clear:() =>
        @$el.attr("transform", "")
        @$el.empty()
        @line_list_view.clear()
        while @item_list.length > 0
            @item_list.remove(@item_list.first())

    exists:(model) =>
        @item_list.find((e) => e.get("origin_model") == model)

    hide:() =>
        @$el.hide()
        @itemControl.hide()
        @line_list_view.$el.hide()

    show:() =>
        @$el.show()
        @itemControl.show()
        @line_list_view.$el.show()

    render:() =>
        if @mode == "copy"
            @$el.attr("opacity", 0.5)
        else
            @$el.attr("opacity", 0)
        @itemControl.render()
        @line_list_view.render()

    @::lazyRender = _.debounce(@::render, 50)
    @::lazyShow = _.debounce(@::show, 10)

    _setChildControlEvent:(view) =>
        view.bind("onClick", (obj, e) =>
            if e.shiftKey
                @item_list.remove(obj.model)
                @cancelEvent(e)
                @render()
        )

    _setControlViewEvent:(view) =>
        view.bind("onMouseDown", (obj, e) =>
            @onEvent("onMouseDown", obj, e)
        )

    onEvent:(event, sender, e, options) =>
        if (sender instanceof PositionControl) or
           (sender instanceof ScaleControl) or
           (sender instanceof RotateControl) or
           (sender instanceof RotateAxisControl)
            if event == "onMouseDown"
                if e.altKey
                    @_copyMode(sender, e)
                else
                    @cancelEvent(e)
                    @attachDragEvent(sender, e)
        else if sender instanceof SvgElementView
            if event  == "onMouseDown"
                @cancelEvent(e)
                @itemControl.position_control.onMouseDown(e)

    attachDragEvent:(sender, e) =>
        $(document).mousemove(sender.onDragging)
        ondrop = (e) =>
            sender.onDrop(e) if sender.onDrop
            $(document).unbind('mousemove', sender.onDragging)
            $(document).unbind('mouseup', ondrop)
            @cancelEvent(e)
        $(document).mouseup(ondrop)

    attachCopyDragEvent:(sender, e) =>
        @mode = "copy"
        @$el.show()
        @$el.attr("opacity", 0.5) #for copy object visible
        $(document).mousemove(sender.onDragging)
        ondrop = (e) =>
            @mode = ""
            sender.onDrop(e) if sender.onDrop
            $(document).unbind('mousemove', sender.onDragging)
            $(document).unbind('mouseup', ondrop)
            @$el.attr("opacity", 0)
            @setItems(@_createCopyItems())
            @cancelEvent(e)
        $(document).mouseup(ondrop)

    _copyMode:(sender, e) =>

        @line_list_view.$el.show()
        @line_list_view.render()
        @itemControl.clear()
        @stopListening()
        @listenTo(@item,"change", @update)
        @itemControl.show()
        @itemControl.setItem(@item)
        @itemControl.render()

        @cancelEvent(e)
        @attachCopyDragEvent(sender, e)

    _createCopyItems:() =>
        matrix = @item.getLocalMatrix()
        copy_items = []
        orderd_list = @item_list.sortBy((item) =>
            el = item.get("origin_model").el
            $(el).index()
        )

        _(orderd_list).each((item) =>
            local = item.getLocalMatrix()
            item.setMatrix(matrix.multiply(local))
            copy_items.push(@canvas.addElement(item.el.cloneNode(true)))
        )
        copy_items

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
