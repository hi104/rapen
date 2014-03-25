class @InspectorListView extends Backbone.View

    tagName:  "ul"

    initialize:() =>
        @$el.addClass("list-unstyled")
        @item_list = @options.item_list
        @control = @options.control
        @listenTo(@item_list, "add", @addItem)
        @listenTo(@item_list, "remove", @removeItem)
        @inspector_views = []

    addItem:(item) =>
        if item.constructor == SvgElement
            klass = InspectorView

        if item.constructor == SvgFolder
            klass = InspectorFolderView

        view = new klass(model:item, control:@control)
        @inspector_views.push(view)
        @$el.prepend(view.el)
        @sortElementByIndex()

    removeItem:(item) =>
        view = _(@inspector_views).find((e) => e.model == item)
        index = @inspector_views.indexOf(view)
        @inspector_views.splice(index, 1);
        @sortElementByIndex()

    sortElementByIndex:() =>
        sorted_views = _(@inspector_views).sortBy((e) => $(e.model.el).index())
        sorted_views.forEach((e) => @$el.prepend(e.el))

    remove: () ->
        @inspector_views.forEach((view ) -> view.remove())
        super()
