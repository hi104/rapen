#
# for event svg_element
#
class @SvgElementView extends Backbone.View
    events: () ->
        "mousedown": "onMouseDown"
        "click": "onClick"
        "dblclick": "onDblClick"
        # "contextmenu": "onContextmenu"

    initialize: () ->
        @model.on('remove', @remove)

    onContextmenu:(e) =>
        false

    onClick:(e) =>
        @trigger("onClick", @, e)

    onDblClick: (e) =>
        @trigger("onDblClick", @, e)
        e.stopPropagation()

    onMouseDown:(e) =>
        if not @model.isLocked()
            @trigger("onMouseDown", @, e)

    remove:() =>
        if @model.isGrouped() #for group item
            @stopListening()
            @undelegateEvents()
        else
            super()
