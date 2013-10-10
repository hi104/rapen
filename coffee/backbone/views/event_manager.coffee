class @EventManager

    constructor:() ->
        @mode = "control"
        @selected_item = null

    setControl:(control) =>
        @_control = control

    onEvent:(event, sender, e, options) =>
        if sender instanceof SvgElementView
            if event  == "onMouseDown"
                @cancelEvent(e)
                if @mode == "control"
                    if e.shiftKey
                        if not @_control.exists(sender.model)
                            @_control.addItem(sender.model)
                    else
                        if not @_control.exists(sender.model)
                            @_control.clear()
                            @_control.addItem(sender.model)
                        @_control.getControl().position_control.onMouseDown(e)
                else if @mode == "text_edit" and @selected_item.el and @selected_item.el != sender.el
                    @text_editor.disable()
                    @_control.clear()
                    @_control.addItem(sender.model)
                    @_control.selectedView.position_control.onMouseDown(e)

            else if event == "onClick" and @mode  == "control"
                if @selected_item
                    if @selected_item.el == @_control.firstOriginalItem().el
                        if @selected_item.el instanceof SVGTextElement
                            @mode = "text_edit"
                            @text_editor.setTextElement(@selected_item.el)
                            @text_editor.bindEvent();
                            @cancelEvent(e)
                        else if @selected_item.el instanceof SVGPathElement
                            svgPathControl.setItem(@selected_item)
                            @_control.hide()
                else
                    @selected_item = @_control.firstOriginalItem()
                    @cancelEvent(e)
            else

    reset:() =>
        @_unbindTextEditor()

    _unbindTextEditor: () =>
        @mode = "control"
        @selected_item = null
        @text_editor.unbindClickEvent();

    #call when init
    setCanvas:(canvas) =>
        @text_editor = new SvgTextEditor($("#text-editor-view")[0], undefined);
        @text_editor.setOnDisable(@_unbindTextEditor);
        @canvas = canvas

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
