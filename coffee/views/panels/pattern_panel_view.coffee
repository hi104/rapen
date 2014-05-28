class @PatternPanelView extends PanelBaseView
    initialize:()=>
        super()
        @bind("clicked.item", (item) ->
            pattern_id = item.model.get("pattern_id")
            if @control.isOneItem()
                id = @control.firstOriginalItem().$el.attr("id") + "-pattern"
            @svgApplyFill(pattern_id, id, "item-defs")
        )
