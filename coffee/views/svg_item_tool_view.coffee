class @SvgItemToolView extends SvgItemListView
    initialize:() ->
        @_canvas = @options.canvas
        @_mainCanvas = @_canvas.mainCanvas
        @bind("mouseDown.item", @mouseDownItem)
        @bind("mouseDragging.item", @mouseDraggingItem)
        @bind("mouseUp.item", @mouseUpItem)
        super()

    _getDraggingItemElement:() =>
        $("#item-dragging")

    mouseDownItem:(sender, e) =>
        $(document).mousemove(sender.onDragging)
        ondrop = (e) =>
            sender.onDrop(e) if sender.onDrop
            $(document).unbind('mousemove', sender.onDragging)
            $(document).unbind('mouseup', ondrop)
            e.preventDefault()
            e.stopPropagation()

        $(document).mouseup(ondrop)

        $("#svg-item-tool").show();
        clone_node = @getSelectedItemElement(sender).cloneNode(true)
        @_getDraggingItemElement().append(clone_node)
        @_updateDraggingItemPosition(e)

        e.preventDefault()
        e.stopPropagation()

    _updateDraggingItemPosition:(e) =>
        screen_ctm = @_mainCanvas.getScreenCTM()
        point =  SVGUtil.createPoint(e.pageX, e.pageY)
        matrix = screen_ctm.inverse()
        point = point.matrixTransform(matrix)
        SVGUtil.setMatrixTransform(@_getDraggingItemElement()[0], screen_ctm.translate(point.x, point.y))

    getSelectedItemElement:(sender)=>
        $(sender.el).find("svg g").children()[0]

    mouseUpItem:(sender, e) =>
        canvas = @_canvas.$el
        pos = canvas.position()
        isContain = () => pos.left < e.pageX and e.pageX < (canvas.width() +  pos.left) and
                          pos.top < e.pageY and e.pageY < (canvas.height() +  pos.top)
        screen_ctm = @_getDraggingItemElement().children()[0].getScreenCTM()
        @_getDraggingItemElement().empty()
        $("#svg-item-tool").hide();

        if isContain()
            service = GLOBAL.commandService
            creator = service.getCreator()

            clone_node = @getSelectedItemElement(sender).cloneNode(true)
            $(@_mainCanvas).append(clone_node)
            canvas_matrix = @_mainCanvas.getScreenCTM()
            SVGUtil.setMatrixTransform(clone_node, canvas_matrix.inverse().multiply(screen_ctm))
            item = @_canvas.addElement(clone_node)

            com = new AddItemCommand(0,
                item.getElementId(),
                item.toXML()
            )
            console.log com, item
            service.executeCommand(com, false)

    mouseDraggingItem:(sender, e) =>
        @_updateDraggingItemPosition(e)
