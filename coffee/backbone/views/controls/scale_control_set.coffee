#
#       left-top      center-top    right-top
#       +-------------+-------------+
#       |                           |
#       |                           |
#       |                           |
#       |                           |
#       +left-center                + right-center
#       |                           |
#       |                           |
#       |                           |
#       |                           |
#       +-------------+-------------+
#       left-bottom  center-bottom  right-bottom
#
class @ScaleControlSet extends Backbone.View
    initialize:() ->
        @selectView = @options.selectView
        @getItem = @options.get_item
        @scale_controls = []
        width_pos  = left:-1, center:0, right:1
        height_pos = top:-1 , center:0, bottom:1

        @positions = {}
        for w, idx2 of width_pos
            for h, idx of height_pos
                position = {
                 name: w + "-" + h,
                 pos:{x:idx2, y:idx}
                }
                @positions[position.name] = position

        for w, idx2 of width_pos
            for h, idx of height_pos
                if(w == "center" and h == "center")
                    continue
                if(w == "center" or h == "center")
                    @scale_controls.push(@createScaleOneAxixControl(w + "-" + h))
                else
                    @scale_controls.push(@createScaleControl(w + "-" + h))

        for obj , idex in @scale_controls
            $(@el).append(obj.el)

    hide:() => @$el.hide()

    show:() => @$el.show()

    render:()->
        _.each(@scale_controls, (control) => control.render())

    createScaleOneAxixControl:(pos_name) =>
        control = @positions[pos_name]
        type = if (control.pos.x == 0) then "y" else "x"
        new ScaleOneAxisControl(
            selectView: @selectView
            el: SVGUtil.createTag("rect"),
            pos: control.pos,
            axis_type: type,
            get_item: @getItem
        )

    createScaleControl:(pos_name) =>
        control = @positions[pos_name]
        new ScaleControl(
            selectView: @selectView
            el: SVGUtil.createTag("rect"),
            pos: control.pos,
            get_item: @getItem
        )
