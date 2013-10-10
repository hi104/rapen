class @SnapLineView extends Backbone.View
    initialize:() =>
        @lines =[]
        @setStyle()

    addLine:(line) =>
        @lines.push(line)

    addLineUsePoint:(beg, end) =>
        @addLine(@createSvgLine(beg, end))

    setStyle:()=>
        @$el.attr({
            "stroke-width" : "2"
            "stroke"       : "red",
            "opacity"      : "1"
            })

    createSvgLine:(beg, end) =>
        line = SVGUtil.createTag("line")
        $(line).attr({
            "x1": beg.x,
            "y1": beg.y,
            "x2": end.x,
            "y2": end.y
        })
        line

    clear:() =>
        @lines = []
        @$el.empty()

    render:() =>
        @$el.empty()
        for line in @lines
            do (line) =>
                @$el.append(line)
