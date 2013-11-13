class @GradientToolView extends Backbone.View

    events:
        "click #linear-gradient-button": "linearMode"
        "click #radial-gradient-button": "radialMode"
        "change #grad-spread": "onChangeSpread"
        "change #grad-r": "onChangeR"
        "change #grad-unit": "onChangeUnit"

    initialize:() =>
        @linear_gradient_control = new LinearGradientControl(el:$("#linear-gradient-control"))
        @radial_gradient_control = new RadialGradientControl(el:$("#radial-gradient-control"))
        @gradient_control = @linear_gradient_control
        @radial_button_el = $("#radial-gradient-button")
        @linear_button_el = $("#linear-gradient-button")
        @grad_r_el = $("#grad-r")
        @grad_spread_el = $("#grad-spread")
        @grad_unit_el = $("#grad-unit")

    changeControl:(control) =>
        console.log("changeControl:(control)", @)
        item =  cloneControlView.firstOriginalItem()
        if @gradient_control != control
            @gradient_control = control
            @setItem(item)

    setItem:(item)=>
        @gradient_control.setItem(item)
        @render()

    onChangeSpread:() =>
        spread = @grad_spread_el.val()
        @gradient_control.grad_model.set("spreadMethod", spread)
        console.log("onChangeSpread", spread)

    onChangeUnit:() =>
        unit = @grad_unit_el.val()
        @gradient_control.grad_model.set("gradientUnits", unit)
        console.log("onChangeUnit", unit)

    onChangeR:() =>
        r = @grad_r_el.val()
        @gradient_control.grad_model.set("r", r)
        console.log("onChangeR", r)

    radialMode:() =>
        @changeControl(@radial_gradient_control)

    linearMode:() =>
        @changeControl(@linear_gradient_control)

    disable:() =>

        @$el.hide()
        @hide_control()

    hide_control:() =>
        @radial_gradient_control.$el.hide()
        @linear_gradient_control.$el.hide()
        @radial_button_el.css("background-color", "")
        @linear_button_el.css("background-color", "")

    render:() =>

        @$el.show()
        @hide_control()

        if @gradient_control and @gradient_control.grad_model
            model = @gradient_control.grad_model

            @grad_r_el.val(model.get("r"))
            @grad_spread_el.val(model.get("spreadMethod"))
            @grad_unit_el.val(model.get("gradientUnits"))
        else
            return

        isLinear = (@gradient_control == @linear_gradient_control)

        if isLinear
            @linear_gradient_control.$el.show()
            @linear_button_el.css("background-color", "#ebebeb")
        else #radial
            @radial_gradient_control.$el.show()
            @radial_button_el.css("background-color", "#ebebeb")
