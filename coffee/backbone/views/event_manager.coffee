class @EventManager

    constructor:() ->
        _.extend @, Backbone.Events

        @modes = {
            "control" : new ElementControlMode(@),
            "text" : new TextEditMode(@),
            "path" : new PathEditMode(@)
        }

        for name, mode of @modes
            mode.name = name

        @current_mode = null
        @selected_item = null

    getCanvas:() => @canvas

    setControl:(control) =>
        @_control = control

    setMode:(mode_name) =>
        mode = @modes[mode_name]
        if mode and @current_mode != mode
            pre_mode = @current_mode
            @current_mode = mode
            @current_mode.onStart() if  @current_mode.onStart
            if pre_mode
                pre_mode.onStop() if  pre_mode.onStop

            @trigger("onModeChange", mode_name)

    getControl:() =>
        @_control

    onEvent:(event, sender, e, options) =>
        @current_mode.onEvent(event, sender, e, options)

    #call when init
    setCanvas:(canvas) =>
        @canvas = canvas

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
