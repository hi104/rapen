class @SvgCanvas extends Backbone.View
    events: () ->
        "mousedown": "mousedown"
        "mousewheel": "onMouseWheel"

    initialize: () ->
        @mainCanvas   = @options.mainCanvas
        @manager      = @options.manager
        @control      = @options.control
        @zoomValue    = 1.0
        @unique_index = 0
        @rootFolder = new SvgFolder()
        @rootFolder.setElement(@mainCanvas)
        @rootFolder.setManager(@manager)
        @item_list    = @rootFolder.items
        # @item_list.bind('add', @onAddItem)

    generateId: () => #better use uuid ?
        # id = @unique_index++
        "item-" + UUID.generate()

    getItemById:(id) ->
        _(@getItems()).find((item) =>
            id == item.getElementId()
        )

    getItems:() ->
        _.flatten(@_getItems(@rootFolder))

    _getItems:(folder) ->
        folder.items.map((item) =>
            if item.constructor ==  SvgFolder
                @_getItems(item)
            else
                item
        )

    removeItem:(item) =>
        item.folder.remove(item)

    removeItemById:(id) ->
        @removeItem(@getItemById(id))

    addItem:(item) =>
        elm = item.el
        unless $(elm).attr("id")
            $(elm).attr("id", @generateId())
        $(elm).attr("class", "svg-control-item")
        @rootFolder.$el.append(elm)
        @rootFolder.add(item)
        item

    addElement:(elm) =>
        item = new SvgElement()
        item.setElement(elm)
        @addItem(item)

    addFolder:(targetFolder = @rootFolder) =>
        folder = new SvgFolder()
        folder.setManager(@manager)
        folder.setElement(SVGUtil.createTag("g"))
        folder.setFolder(targetFolder)

        elm = folder.el
        unless $(elm).attr("id")
            $(elm).attr("id", @generateId())
        $(targetFolder.el).append(elm)
        targetFolder.add(folder)
        $(folder.el).attr("class", "svg-folder-item")
        folder

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
            @control.setItems([group])

    addFolderSelectedItem:() =>
        if @control.item_list.length > 0

            clone_origin_list = @getItems().filter((item) => item.isSelected())
            console.log(@_getItems(@rootFolder))
            console.log(clone_origin_list)
            folder = @addFolder()
            clone_origin_list.forEach((item) ->
                InspectorDragAndDrop.moveToElement(item, folder)
            )

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
            item.removeFromFolder()
        )
        @addElement(group_el)

    mousedown: (e) =>
        if(e.altKey)
            @pre_position = e
            $(document).mousemove(@moveDragging)
            $(document).mouseup(@moveDrop)
        @manager.onEvent("onMouseDown", @, e)

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
        @trigger("onZoom", @)

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

    deleteSelectedItem:() =>
        service = GLOBAL.commandService
        creator = service.getCreator()

        commands = @control.item_list.map((e) =>
            # @removeItem()
            item = e.get("origin_model")
            id = item.getElementId()
            new RemoveItemCommand(0, id, item.toXML())
        )

        service.executeCommand(
            creator.createMultiCommand(commands)
        )
        @control.clear()
