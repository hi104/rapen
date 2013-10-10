#
# TODO refactor
#
class @SvgItemToolView extends SvgItemListView
    initialize:() ->
        @_canvas = @options.canvas
        @_mainCanvas = @_canvas.mainCanvas

        super()
        @bind("mouseDown.item", @mouseDownItem)
        @bind("mouseDragging.item", @mouseDraggingItem)
        @bind("mouseUp.item", @mouseUpItem)

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

        g_elm = $(sender.el).find("svg g").children()[0]
        clone_node = g_elm.cloneNode(true)
        $("#svg-item-tool").show();
        screen_ctm = @_mainCanvas.getScreenCTM()
        point =  SVGUtil.createPoint(e.pageX, e.pageY)
        matrix = screen_ctm.inverse()
        point = point.matrixTransform(matrix)
        SVGUtil.setMatrixTransform(@_getDraggingItemElement()[0], screen_ctm.translate(point.x, point.y))
        @_getDraggingItemElement().append(clone_node)

        e.preventDefault()
        e.stopPropagation()

    mouseUpItem:(sender, e) =>
        canvas = @_canvas.$el
        pos = canvas.position()
        isContain = () => pos.left < e.pageX and e.pageX < (canvas.width() +  pos.left) and pos.top < e.pageY and e.pageY < (canvas.height() +  pos.top)

        screen_ctm = @_getDraggingItemElement().children()[0].getScreenCTM()
        @_getDraggingItemElement().empty()
        $("#svg-item-tool").hide();

        if isContain()
            g_elm = $(sender.el).find("svg g").children()[0]
            clone_node = g_elm.cloneNode(true)
            $(@_mainCanvas).append(clone_node)
            canvas_matrix = @_mainCanvas.getScreenCTM()
            SVGUtil.setMatrixTransform(clone_node, canvas_matrix.inverse().multiply(screen_ctm))
            @_canvas.addElement(clone_node)

    mouseDraggingItem:(sender, e) =>
        point = SVGUtil.createPoint(e.pageX, e.pageY)
        ctm = @_mainCanvas.getScreenCTM()
        matrix = ctm.inverse()
        point = point.matrixTransform(matrix)
        SVGUtil.setMatrixTransform(@_getDraggingItemElement()[0], ctm.translate(point.x, point.y))
