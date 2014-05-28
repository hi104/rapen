class @SvgItemListView extends Backbone.View

    initialize: () ->
        @model.bind('add',     @addOne)

    addOne: (svgitem) =>
        view = new SvgItemView({model: svgitem })
        view.bind("clicked", @clickedItem)
        view.bind("onMouseDown", @mouseDownItem)
        view.bind("onMouseUp", @mouseUpItem)
        view.bind("onMouseDragging", @mouseDraggingItem)
        $(@el).append(view.render().el)
        setTimeout( #for firefox
            () => view.fit(),
            0)
        $(view.el).attr("class", "svg-item")

    mouseDownItem:(svgitem, e) =>
        @trigger("mouseDown.item", svgitem, e)

    mouseUpItem:(svgitem, e) =>
        @trigger("mouseUp.item", svgitem, e)

    mouseDraggingItem:(svgitem, e) =>
        @trigger("mouseDragging.item", svgitem, e)

    clickedItem:(svgitem) =>
        @trigger("clicked.item", svgitem)
