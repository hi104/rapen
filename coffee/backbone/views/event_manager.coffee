class @EventManager

    constructor:() ->
        _.extend @, Backbone.Events

        @modes = {
            "control" : new ElementControlMode(@),
            "text" : new TextEditMode(@),
            "path" : new PathEditMode(@)
        }

        @mode = null
        @selected_item = null
        @setMode("control")

    getCanvas:() => @canvas

    setControl:(control) =>
        @_control = control

    setMode:(mode_name) =>
        _mode = @modes[mode_name]
        if _mode
            $("#mode-control").val(mode_name)
            @mode = _mode

    getControl:() =>
        @_control

    onEvent:(event, sender, e, options) =>
        @mode.onEvent(event, sender, e, options)

    reset:() =>

    #call when init
    setCanvas:(canvas) =>
        @canvas = canvas

    cancelEvent:(e)->
        e.preventDefault()
        e.stopPropagation()
