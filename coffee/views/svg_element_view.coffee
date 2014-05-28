#
# for event svg_element
#
class @SvgElementView extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"
        "click": "onClick"
        "dblclick": "onDblClick"

    initialize: () ->
        @listenTo(@model, 'remove', @remove)

    onClick:(e) =>
        @trigger("onClick", @, e)

    onDblClick: (e) =>
        @trigger("onDblClick", @, e)
        e.stopPropagation()

    onMouseDown:(e) =>
        if not @model.isLocked()
            @trigger("onMouseDown", @, e)

    remove:() =>

        if @model.isSuspendRemove()
            @stopListening()
            @undelegateEvents()
        else if @model.isGrouped() #for grouped item
            @stopListening()
            @undelegateEvents()
        else
            super()
