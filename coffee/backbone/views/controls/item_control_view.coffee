class @ItemControl extends Backbone.View

    initialize: () ->
        @manager = @options.manager
        @position_control  = new PositionControl(
            get_item: @getItem)

        @scale_control_set = new ScaleControlSet(
            selectView: @,
            el: @_appendElement('g'),
            get_item: @getItem)

        @rotate_control    = new RotateControl({
            el: @_appendElement('circle'),
            get_item: @getItem})

        @rotate_axis_control    = new RotateAxisControl({
            el: @_appendElement('circle'),
            rotate_point_el: @_appendElement('circle'),
            get_item: @getItem})

        @line_position_control1 = new LinePositionControl({
            el: @_appendElement('rect'),
            type: "1",
            get_item: @getItem})
        @line_position_control2 = new LinePositionControl({
            el: @_appendElement('rect'),
            type: "2",
            get_item: @getItem})

        for control in _.union([@position_control, @rotate_control, @rotate_axis_control],
                                @scale_control_set.scale_controls)
            control.bind("onMouseDown", (obj, e) =>
                @manager.onEvent("onMouseDown", obj, e)
            )

        @position_control.bind("onDragging", (obj, e)=>
            @manager.onEvent("onDragging", obj, e)
        )

        @render()

    _appendElement:(tag_name) =>
        element = SVGUtil.createTag(tag_name)
        @$el.append(element)
        element

    getItem:() =>
        @selectitem

    isSelected:() =>
        @selectitem?

    onModelChange:() => @render()

    _createLineView:(item)=>
        wrapper = $("#select-line-views")
        rect_path = SVGUtil.createTag('path')
        $(wrapper).append(rect_path)
        new SelectLineView(el:rect_path, model:item)

    _removeLineView:() =>
        @select_line_view.remove() if @select_line_view
        @select_line_view = undefined

    setItem: (item) =>
        @selectitem.unbind("change", @onModelChange, @) if @selectitem
        @selectitem = item
        @_removeLineView()
        @select_line_view = @_createLineView(item)
        @select_line_view.stopListening() #prevent double render on item change
        @selectitem.bind("change", @onModelChange, @)

    clear:() =>
        @_removeLineView()
        @selectitem.unbind("change", @onModelChange, @) if @selectitem
        @selectitem = undefined
        @render()

    hide:() =>
        @$el.hide()
        @select_line_view.$el.hide() if @select_line_view

    show:() =>
        @$el.show()
        @select_line_view.$el.show() if @select_line_view

    render: () ->
        if @selectitem
            @show()
        else
            @hide()

        return unless @selectitem

        @select_line_view.render()
        @position_control.render()
        @rotate_control.render()
        @rotate_axis_control.render()
        @scale_control_set.render()

        if @selectitem.el instanceof SVGLineElement
            @line_position_control1.show()
            @line_position_control2.show()
            @line_position_control1.render()
            @line_position_control2.render()
            @scale_control_set.hide()
        else
            @line_position_control1.hide()
            @line_position_control2.hide()
            @scale_control_set.show()

        @trigger("render", @)
