class @SelectLineListView extends Backbone.View
    initialize: () ->
        @item_list = new SvgElementList()
        @item_list.bind('add', @addItem)
        @line_view_class = @options.line_view_class
        @views = []

    addItem:(item) =>
        rect_path = SVGUtil.createTag('path')
        $(@el).append(rect_path)
        if @line_view_class
            @views.push(new @line_view_class(el:rect_path, model:item))
        else
            @views.push(new SelectLineView(el:rect_path, model:item))

    render:() =>
        for view in @views
            view.render()
    clear:() =>
        @views.forEach((view) => view.remove())
        @views = []
        @item_list.reset()

    remove:() =>
        @clear()
        super()
