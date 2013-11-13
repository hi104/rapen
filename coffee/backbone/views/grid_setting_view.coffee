class @GridSettingView extends Backbone.View

    events:
        "change #grid-visible-checkbox"  : "onVisibleChange"
        "change #grid-size"   : "onSizeChange"
        "change #grid-width"  : "onWidthChange"
        "change #grid-height" : "onHeightChange"

    initialize:() =>
        @grid_visible_el = $("#grid-visible-checkbox")
        @grid_size_el    = $("#grid-size")
        @grid_height_el  = $("#grid-height")
        @grid_width_el   = $("#grid-width")
        @listenTo(@model, "change", @render)

    onVisibleChange:() =>
        @model.set("visible", @grid_visible_el.prop("checked"))

    onSizeChange:() =>
        @model.set("grid_size", Number(@grid_size_el.val()))

    onWidthChange:() =>
        @model.set("width", Number(@grid_width_el.val()))

    onHeightChange:() =>
        @model.set("height", Number(@grid_height_el.val()))

    render:() =>
        @grid_visible_el.prop({"checked": @model.visible()})
        @grid_size_el.val(@model.gridSize())
        @grid_height_el.val(@model.height())
        @grid_width_el.val(@model.width())
