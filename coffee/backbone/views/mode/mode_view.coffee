class @ModeView extends Backbone.View

    events:
        "click svg" : "onClick"

    initialize:() =>
        @manager = @options.manager
        @listenTo(@manager, "onModeChange", @_onModeChange)

    onClick:(e) =>
        mode = $(e.currentTarget).data("mode")
        @manager.setMode(mode)

    _onModeChange:(mode) =>
        @render()

    render:() =>
        return if not @manager.current_mode

        mode = @manager.current_mode.name
        btns = @$el.find("svg").get()
        btns.forEach((svg) =>
            $svg = $(svg)
            if $svg.data("mode") == mode
                color = "blue"
            else
                color = "black"
            $svg.find("g").attr("fill", color)
        )
