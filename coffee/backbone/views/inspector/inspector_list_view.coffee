class @InspectorListView extends Backbone.View

    tagName:  "ul"

    initialize:() =>
        @$el.addClass("list-unstyled")
        @item_list = @options.item_list
        @control = @options.control
        @listenTo(@item_list, "add", @addItem)
        @listenTo(@item_list, "remove", @removeItem)
        @_inspector_views = []

    addItem:(item) =>
        if item.constructor == SvgElement
            klass = InspectorView

        if item.constructor == SvgFolder
            klass = InspectorFolderView

        view = new klass(model:item, control:@control)
        @_inspector_views.push(view)
        @$el.prepend(view.el)
        @sortElementByIndex()

    removeItem:(item) =>
        view = _(@_inspector_views).find((e) => e.model == item)
        index = @_inspector_views.indexOf(view)
        @_inspector_views.splice(index, 1);
        @sortElementByIndex()

    sortElementByIndex:() =>
        sorted_views = _(@_inspector_views).sortBy((e) => $(e.model.el).index())
        sorted_views.forEach((e) => @$el.prepend(e.el))

    remove: () ->
        @_inspector_views.forEach((view ) -> view.remove())
        super()
