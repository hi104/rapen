class @PanelBaseView extends SvgItemListView

    initialize:() =>
        super()
        @control  = @options.control
        @_defs_id = @options.defs_id
        @_element_key = @options.element_key
        @_template = _.template('<rect x="0" y="0" fill="url(#{{element_id}})" width="100" height="100"></rect>')

    setTemplate:(template)->
        @_template = template

    loadFile:(path) =>
        PanelViewHelper.loadFile(path, @_defs_id, @render)

    render:()=>
        console.log("PanelBaseView render", @, @model)
        model = @model
        element_key = @_element_key
        temp = @_template
        for element in $(@_defs_id).children()
            do (element) ->
                element_id = $(element).attr("id")
                svg = temp(element_id:element_id)
                params = { contents:svg}
                params[element_key] = element_id
                model.add(new SvgItem(params))

    svgApplyFill:(fill_id, item_fill_id, defs) ->
        if @control.isOneItem()
            id = item_fill_id
            $item_fill = $("#" + id)
            clone = $("#" + fill_id)[0].cloneNode(true);
            if ($item_fill.length > 0 )
               $item_fill.empty()
               $item_fill.append(clone.childNodes)
            else
               $(clone).attr("id", id);
               $("#" + defs).append(clone);
            @control.firstOriginalItem().attr("fill", "url(##{id})")
