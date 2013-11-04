class @InspectorListView extends Backbone.View

    tagName:  "ul"

    initialize:() =>
        @$el.attr("class", "list-unstyled")
        @item_list = @options.item_list
        @control = @options.control
        @listenTo(@item_list, "add", @addItem)
        @listenTo(@item_list, "remove", @removeItem)
        @inspector_views = []

    addItem:(item) =>
        view = new InspectorView(model:item, control:@control)
        @inspector_views.push(view)
        @$el.prepend(view.el)

    removeItem:(item) =>
        v = _(@inspector_views).find((e) => e.model == item)
        index = @inspector_views.indexOf(v)
        @inspector_views.splice(index, 1);

    sortByIndex:() =>
        sorted_views = _(@inspector_views).sortBy((e) => $(e.model.el).index())
        sorted_views.forEach((e) => @$el.prepend(e.el))
