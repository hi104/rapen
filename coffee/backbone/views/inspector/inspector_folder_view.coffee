class @InspectorFolderView extends InspectorView
    tagName:  "li"

    initialize:() =>
        @control = @options.control
        @listenTo(@model, 'remove', @remove)
        @listenTo(@model, 'change', @render)
        @render()

    events:() ->
        "click .inspetor-folder .open-element" : "onClickOpen"
        "click .inspetor-folder .select-element": "onClickSelect"
        "click .inspetor-folder .visible-element": "onClickVisible"
        "mousedown .inspetor-folder .move-element": "onMouseDown"
        "mouseover .inspetor-folder": "onMouseOver"
        "mouseleave .inspetor-folder": "onMouseLeave"

    template : _.template('
        <div class="inspetor-folder inspector-row">
        ' + InspectorView._rowTemplate +
        '</div>
        <ul class="inspector-items"></ul>
        <div style="height:1px;background-color:#eee"></div>
    ')

    onClickOpen: (e) =>
        @cancelEvent(e)
        if @model.isOpen()
            @model.close()
        else
            @model.open()

    _initElement:() ->
        @$el.html(@template())

        ul = @$el.find("ul").first()
        list_view = new InspectorListView({
            el: ul,
            control: @control,
            item_list: @model.items
        })

        #for refresh list_view
        list_view.item_list.forEach((item) =>
            item.trigger('add', item, list_view.item_list, {})
        )
        list_view.$el.css("margin-left", "5px")
        @list_view  = list_view

        container   = @$el.children(".inspetor-folder")
        @_select_el  = container.children(".select-element")
        @_open_el    = container.find(".open-element")
        @_visible_el = container.find(".visible-element")

    _render:() ->
        color   = if @model.isSelected() then "skyblue" else "white"
        container = @$el.children(".inspetor-folder")

        @_select_el.css("background-color", color)
        container.find(".name").val(@model.get("data-name"))

        items_el = @$el.find("ul").first()
        if @model.isOpen() then items_el.show() else items_el.hide()

        @toggleClass(@_open_el, "fa-caret-square-o-down", "fa-caret-square-o-right", @model.isOpen())
        @toggleClass(@_visible_el, "fa-eye", "fa-eye-slash", @model.isVisibled())

    render:() =>
        @_initElement() if @$el.children("div").length == 0
        @_render()
        @

    remove: () ->
        @list_view?.remove()
        super()
