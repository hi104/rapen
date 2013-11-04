class @GridSettingView extends Backbone.View

    events:
        "change #grid-visible-checkbox"  : "onVisibleChange"

    initialize:() =>
        @grid_visible_el = $("#grid-visible-checkbox")
        @listenTo(@model, "change", @render)

    grid_size:() =>
        @model.get("grid_size")

    width:() =>
        @model.get("width")

    height:() =>
        @model.get("height")

    visible:() =>
        @model.get("visible")

    onVisibleChange:() =>
        @model.set("visible", @grid_visible_el.prop("checked"))

    render:() =>
        @grid_visible_el.prop({"checked": @visible()})
