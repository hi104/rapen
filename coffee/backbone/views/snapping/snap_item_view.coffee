class @SnapItemView extends Backbone.View
    initialize:() =>
        @items =[]
        @setStyle()

    addItem:(item) =>
        @items.push(@createSvgRect(item))

    setStyle:()=>
        @$el.attr({
            "fill"       : "blue",
            "fill-opacity"      : "0.4"
            })

    createSvgRect:(svg_element) =>
        el = SVGUtil.createTag("path")
        points = svg_element.getBBoxPoints()
        property_path = "M "  +  points[0].x  + " " +  points[0].y  +
        " L "  +  points[1].x  + " " +  points[1].y  +
        " L "  +  points[3].x  + " " +  points[3].y +
        " L "  +  points[2].x  + " " +  points[2].y + "z";
        $(el).attr("d", property_path)
        el

    clear:() =>
        @items = []
        @$el.empty()

    render:() =>
        @$el.empty()
        for item in @items
            do (item) =>
                @$el.append(item)
