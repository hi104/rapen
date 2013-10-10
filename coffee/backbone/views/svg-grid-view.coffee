class @SvgGridView extends Backbone.View
    initialize:() =>
        @lines = []
        @width = @options.width
        @height= @options.height
        @gridsize = 10
        @createXLine()
        @createYLine()
        @setStyle()

    createXLine:()=>
        index = 0
        poss = (i for i in [0..@width] by @gridsize)
        for i in poss
            do (i) =>
                # stroke_width = if ((index % 5 ) == 0) then "1" else "0.5"
                @lines.push(@createSvgLine( {x:i, y:0}, {x:i, y:@height }))# ,  {"stroke-width":stroke_width}))
                index++


    createYLine:()=>
        index = 0
        poss = (i for i in [0..@height] by @gridsize)
        for i in poss
            do (i) =>
                # stroke_width = if ((index % 5 ) == 0) then "1" else "0.5"
                @lines.push(@createSvgLine( {y:i, x:0}, {y:i, x:@width }))# , {"stroke-width":stroke_width}))
                index++


    snapPoints:() =>
        points = []
        w_poss = (i for i in [0..@width] by @gridsize)
        for i in w_poss
            points.push({x:i, y:0})
        h_poss = (i for i in [0..@height] by @gridsize)
        for i in h_poss
            points.push({x:0, y:i})
        points

    # snapPoints:() =>
    #     []

    setStyle:()=>
        @$el.attr({
            "stroke-width" : "0.5"
            "stroke"       : "gray",
            "opacity"      : "1"
            })

    createSvgLine:(beg, end, _options) =>
        options = _options || {}
        line = $(SVGUtil.createTag("line"))
        line.attr(_.extend({
            "x1" : beg.x,
            "y1" : beg.y,
            "x2" : end.x,
            "y2" : end.y}, options))
        line

    isVisible:() => @$el.css("display") != "none"

    hide:() => @$el.hide();

    show:() => @$el.show();

    clear:() =>
        @lines = []

    render:() =>
        @$el.empty()
        for line in @lines
            do (line) =>
                @$el.append(line)
