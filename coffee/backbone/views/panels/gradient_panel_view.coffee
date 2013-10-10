class @GradientPanelView extends PanelBaseView
    initialize:()=>
        super()
        @bind("clicked.item", (item) ->
            gradient_id = item.model.get("gradient_id")
            if @control.isOneItem()
                id = @control.firstOriginalItem().$el.attr("id") + "-grad"
            @svgApplyFill(gradient_id, id, "item-defs")
        )
