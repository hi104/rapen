class @TextEditMode

    constructor:(maneger)->
        @maneger = maneger
        @text_editor = new SvgTextEditor($("#text-editor-view")[0], undefined)

    onEvent:(event, sender, e, options) =>
        if sender instanceof SvgElementView
            @cancelEvent(e)
            if event  ==  "onClick"
                if sender.model.el instanceof SVGTextElement
                    @text_editor.unbindClickEvent()
                    @text_editor.setTextElement(sender.model.el)
                    @text_editor.bindEvent();
                    @text_editor.onClickEvent(e);
        else if sender instanceof SvgCanvas
            if event  ==  "onMouseDown"
                @disable()
                @maneger.setMode("control")

    onStart:() =>

    onStop:() => @disable()

    disable:()=>
        @text_editor.unbindEvent()
        @text_editor.unbindClickEvent()

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()

    _unbindTextEditor: () =>
        @text_editor.unbindClickEvent()
