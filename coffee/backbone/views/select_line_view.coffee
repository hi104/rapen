#TODO rename @ItemLineView
class @SelectLineView extends Backbone.View
    initialize: () ->
        @_setProperty()
        @listenTo(@model, "change", @render)
        @listenTo(@model, 'remove', @remove)

    _setProperty:()=>
        $(@el).attr({
            "fill"              : "none",
            "stroke"            : "gray",
            "stroke-width"      : "1",
            "stroke-dasharray"  : "5",
            "stroke-dashoffset" : "10"
            })

    render: () ->
        points = @model.getBBoxPoints()
        property_path = "M "  +  points[0].x  + " " +  points[0].y  +
        " L "  +  points[1].x  + " " +  points[1].y  +
        " L "  +  points[3].x  + " " +  points[3].y +
        " L "  +  points[2].x  + " " +  points[2].y + "z";
        $(@el).attr("d", property_path)

class @CloneSelectLineView extends SelectLineView
    _setProperty:()=>
        $(@el).attr({
            "pointer-events"    : "none",
            "fill"              : "blue",
            "fill-opacity"      : "0.5",
            "stroke"            : "gray",
            "stroke-width"      : "1",
            "stroke-dasharray"  : "5",
            "stroke-dashoffset" : "10"
            })
