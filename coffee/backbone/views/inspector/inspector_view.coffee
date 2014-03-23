class @InspectorView extends Backbone.View

    tagName:  "li"

    initialize:() =>
        @control = @options.control
        @listenTo(@model, 'remove', @remove)
        @listenTo(@model, 'change', @render)
        @render()

    events:() ->
        "click .lock-element" : "onClickLock"
        "click .select-element": "onClickSelect"
        "click .visible-element": "onClickVisible"
        "mousedown .move-element": "onMouseDown"
        "mouseover": "onMouseOver"
        "mouseleave": "onMouseLeave"

    onMouseLeave:(e) =>
        @cancelEvent(e)
        if inspectorDragAndDrop.isEnable()
            inspectorDragAndDrop.onMouseLeave(e, @)

    onMouseOver:(e) =>
        @cancelEvent(e)
        if inspectorDragAndDrop.isEnable()
            inspectorDragAndDrop.onMouseOver(e, @)

    onMouseDown:(e) =>
        @cancelEvent(e)
        inspectorDragAndDrop.onMouseDown(e, @)

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()

    @_rowTemplate:'
        <div class="inspector-xs-block">
            <i class="move-element fa fa-arrows"></i>
        </div>
        <div class="inspector-xs-block">
            <i class="open-element fa fa-caret-square-o-right"></i>
        </div>
        <div class="inspector-xs-block select-element" style="border:1px solid black">
        </div>
        <div style="float:left">
            <input style="width:100px" class="name"/>
        </div>
        <div style="float:right">
            <span style="margin:0px 5px">
                <i class="lock-element fa fa-lock"></i>
            </span>
            <span style="margin:0px 5px">
                <i class="visible-element fa fa-eye"></i>
            </span>
        </div>
        <div style="clear:both"></div>'

    template : _.template('
        <div class="inspector-row">
        ' + InspectorView._rowTemplate +
        '</div>
    ')

    onClickSelect:(e) =>
        @cancelEvent(e)
        if @model.isSelected()
            @control.removeItem(@model)
        else
            @control.addItem(@model)

    onClickLock:(e) =>
        @cancelEvent(e)
        @model.toggleLock()

    onClickVisible: (e) =>
        @cancelEvent(e)
        if @model.isVisibled()
            @model.hide()
        else
            @model.show()

    _initElement:() ->
        name = @model.get("data-name")
        @$el.html(@template())

        container = @$el.find("div")
        container.find(".open-element").hide()
        @select_el  = container.children(".select-element")
        @lock_el    = container.find(".lock-element")
        @visible_el = container.find(".visible-element")

    _render:() ->
        color   = if @model.isSelected() then "skyblue" else "white"
        @select_el.css("background-color", color)

        @$el.find("div").find(".name").val(@model.get("data-name"))
        @toggleClass(@lock_el, "fa-lock", "fa-unlock-alt", @model.isLocked())
        @toggleClass(@visible_el, "fa-eye", "fa-eye-slash", @model.isVisibled())

    rowElement:() ->
        @$el.children("div").first()

    setSelectedStyle:() ->
        @rowElement().css("background-color", "#ccc")

    setDefalutStyle:() ->
        @rowElement().css("background-color", "white")
        @rowElement().css("border-bottom","1px solid #ccc")

    setOverStyle:()->
        @rowElement().css("border-bottom","2px solid blue")

    toggleClass:(el, add_class, remove_class, none_swap = true) ->
        if none_swap
            el.addClass(add_class)
            el.removeClass(remove_class)
        else
            el.addClass(remove_class)
            el.removeClass(add_class)

    render:() =>
        @_initElement() if @$el.find("div").length == 0
        @_render()
        @
