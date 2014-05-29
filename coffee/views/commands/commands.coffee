class @UpdateAttrCommand extends CommandBase
    constructor:(@element_id, @value, @prevalue) ->

    execute:() -> @_getElement()?.attr(@value)

    undo: () -> @_getElement()?.attr(@prevalue)

    _getElement:() ->
        # TODO global variable
        _(SvgCanvasBase.getItems()).find((item) =>
            @element_id == item.getElementId()
        )

# class @addItemCommand extends CommandBase
#     constructor:(folder_id, element_id, element_svg_text)


# class @removeItemCommand extends CommandBase
