class @GradientEditMode
    constructor:(maneger)->
        _.extend @, Backbone.Events
        @maneger = maneger
        @gradient_tool =  new GradientToolView(el:$("#gradient-tool"))
        @gradient_tool.disable()

    onEvent:(event, sender, e, options) =>
        if sender instanceof SvgElementView
            if event == "onClick"
                @gradient_tool.setItem(sender.model)

    onStart:() =>
        @gradient_tool.render()

    onStop:() =>
        @gradient_tool.disable()

    disable:()=>

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
