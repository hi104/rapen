class @SvgCanvas extends Backbone.View
    events: () ->
        "mousedown": "mousedown"
        "mousewheel": "onMouseWheel"

    initialize: () ->
        @regionView   = @options.regionView
        @mainCanvas   = @options.mainCanvas
        @manager      = @options.manager
        @control      = @options.control
        @zoomValue    = 1.0
        @unique_index = 0
        @item_list    = new SvgElementList()
        @item_list.bind('add', @onAddItem)

    generateId: () => #better use uuid ?
        id = @unique_index++
        "item-" + id

    removeItem:(item) =>
        @item_list.remove(item)

    onAddItem:(item) =>
        view = new SvgElementView({model:item, el:item.el })
        @setControlViewEvent(view)
        view.render()

    addElement:(elm) =>
        $(elm).attr("id", @generateId())
        $(elm).attr("class", "svg-control-item")
        $(@mainCanvas).append(elm)
        item = new SvgElement()
        item.setElement(elm)
        @item_list.add(item)
        item

    setControlViewEvent:(view) =>
        view.bind("onMouseDown", (obj, e) =>
            @manager.onEvent("onMouseDown", obj, e)
        )
        view.bind("onDblClick", (obj, e) =>
            @manager.onEvent("onDblClick", obj, e)
        )
        view.bind("onClick", (obj, e) =>
            @manager.onEvent("onClick", obj, e)
        )

    onMouseWheel: (e)->

        if(e.altKey)
            offset = @$el.offset()
            wheelEvent = e.originalEvent
            pos = {x: wheelEvent.pageX - offset.left, y: wheelEvent.pageY - offset.top}
            val = Math.pow(1.02, wheelEvent.wheelDelta/10)
            @zoom(val * @zoomValue, pos)
            e.preventDefault()


    addZoomCenter:(val) =>
        @zoom(@zoomValue + val, {x: $(@el).width()/2, y: $(@el).height()/2})

    #
    # inspire svgpan.js thank you!
    # https://code.google.com/p/svgpan/
    #
    zoom:(val, pos, add=true) =>
        if val < 0.05
            return
        if val > 100
            return

        canvas_el = @mainCanvas
        point = SVGUtil.createPoint(pos.x, pos.y)

        canvas_matrix = canvas_el.getCTM()
        point = point.matrixTransform(canvas_matrix.inverse())
        transform = SVGUtil.toD3Transform(canvas_matrix)

        @zoomValue = val
        x = point.x
        y = point.y
        matrix = undefined

        if add
            val = val/transform.scale[0]
            matrix = SVGUtil.SVG.createSVGMatrix().translate(x, y).scale(val).translate(-x, -y)
            matrix = canvas_matrix.multiply(matrix)
        else
            matrix = SVGUtil.SVG.createSVGMatrix().translate(x, y).scale(val).translate(-x, -y)

        SVGUtil.setMatrixTransform(canvas_el, matrix)
        @trigger("onZoom", {sender:@, pos:point, scale:val})

    groupSelectedItem:() =>
        if @control.item_list.length > 0
            clone_origin_list = @control.item_list.map((item) => item.get("origin_model"))
            group =  @group(clone_origin_list)
            @control.initControls([group])

    unGroupSelectedItem:() =>
        if @control.isOneItem()
            @unGroup(@control.firstOriginalItem())
            @control.clear()

    unGroup:(item) =>
        group_matrix = SVGUtil.localMatrix(item.el)
        _.each($(item.el).children(), (el) =>
            matrix = group_matrix.multiply(SVGUtil.localMatrix(el))
            SVGUtil.setMatrixTransform(el, matrix)
            @addElement(el)
            )
        @item_list.remove(item)

    group:(items) =>
        canvas = @mainCanvas
        group_el = SVGUtil.createTag("g")
        $(canvas).append(group_el)
        items = items.sort((a, b) => a.$el.index() - b.$el.index() )

        items.forEach((item) =>
            item.group()
            $(group_el).append(item.el)
            @item_list.remove(item)
        )
        @addElement(group_el)

    mousedown: (e) =>

        @pre_position = e
        @regionView.clear()
        @manager.reset()

        if(e.altKey)
            $(document).mousemove(@moveDragging)
            $(document).mouseup(@moveDrop)
        else
            @regionView.setStart(@_getPosition(e))
            @regionView.setVisible(true)
            $(document).mousemove(@regionDragging)
            $(document).mouseup(@regionDrop)

    moveDragging:(e) =>
        pos = @_getMovedPosition(e)
        point = SVGUtil.createPoint(pos.x, pos.y)
        matrix = @mainCanvas.getCTM();
        matrix_inverse = matrix.inverse();
        matrix_inverse.e = 0;
        matrix_inverse.f = 0;
        point = point.matrixTransform(matrix_inverse)
        SVGUtil.setMatrixTransform(@mainCanvas, matrix.translate(point.x, point.y))
        @pre_position = e
        @trigger("onChangeZoomPos", @)

    moveDrop:(e) =>
        $(document).unbind('mousemove', @moveDragging)
        $(document).unbind('mouseup', @moveDrop)


    _getMovedPosition:(e) =>
        dx = e.pageX - @pre_position.pageX
        dy = e.pageY - @pre_position.pageY
        {x:dx, y:dy}

    _getPosition:(e) =>
        offset = $(@el).offset()
        x: (e.pageX - offset.left)
        y: (e.pageY - offset.top)

    regionDragging:(e) =>
        @regionView.setEnd(@_getPosition(e))
        @regionView.render()

    regionDrop:(e) =>
        $(document).unbind('mousemove', @regionDragging)
        $(document).unbind('mouseup', @regionDrop)
        @regionView.setEnd(@_getPosition(e))
        @regionView.setContainItems(@item_list.filter((item) => not item.isLocked()))

        @control.clear()
        if @regionView.containItems().length > 0
            @control.initControls(@regionView.containItems())
        @trigger("onDrop", @)

        @regionView.setVisible(false)
        @regionView.render()

    deleteSelectdItem:() =>
        @control.item_list.each((e) =>
             @removeItem(e.get("origin_model"))
        )
        @control.clear()
