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

    template : _.template('
        <div style="padding:5px;border-bottom:1px solid #ccc">
            <div style="border:1px solid black;margin:0px 5px;float:left;height:15px;width:15px;background-color:{{color}}" class="select-element"></div>
            lock: <input class="lock-element" type="checkbox" {{locked}}/>
            visible: <input class="visible-element" type="checkbox" {{visible}}/>
            {{element_type}}
        </div>
    ')

    onClickSelect:() =>
        if @model.isSelected()
            @control.removeItem(@model)
        else
            @control.addItem(@model)

    onClickLock: () =>
        @model.toggleLock()

    onClickVisible: () =>
        if @model.isVisibled()
            @model.hide()
        else
            @model.show()

    render:() =>
        @$el.empty()
        locked  = if @model.isLocked()   then "checked" else ""
        color   = if @model.isSelected() then "skyblue" else "white"
        visible = if @model.isVisibled() then "checked" else ""
        @$el.html(@template({
            element_type:@model.el.constructor.name,
            locked:locked,
            color:color,
            visible:visible
            }))
        @
