class @FilterPanelView extends PanelBaseView
    initialize:()=>
        super()
        @bind("clicked.item", (item) ->
            filter_id = item.model.get("filter_id")
            if @control.isOneItem()
                @control .firstOriginalItem().attr("filter", "url(##{filter_id})")
        )
