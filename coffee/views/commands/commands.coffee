class @UpdateAttrCommand extends CommandBase
    constructor:(@element_id, @value, @prevalue) ->

    execute:() -> @_getElement()?.attr(@value)

    undo: () -> @_getElement()?.attr(@prevalue)

    _getElement:() ->
        # TODO global variable
        SvgCanvasBase.getItemById(@element_id)


class @MultiCommand extends CommandBase
    constructor:(@commands) ->
    execute:() -> _(@commands).invoke('execute')
    undo: () -> _(@commands).invoke('undo')


class @AddItemCommand extends CommandBase

    constructor:(@folder_id, @element_id, @element_svg_text) ->

    execute:() ->
        @addItem()

    undo:() ->
        @removeItem()

    addItem:() ->
        elm = $(@_wrapSvg(@element_svg_text)).children()[0]
        SvgCanvasBase.addElement(elm)

    removeItem:() ->
        SvgCanvasBase.removeItemById(@element_id)

    _wrapSvg:(svg_text) ->
        svg_head = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">'
        svg_footer = '</svg>'
        svg_head + svg_text + svg_footer


class @RemoveItemCommand extends AddItemCommand

    execute:() ->
        @removeItem()

    undo:() ->
        @addItem()

#
#
# z-order change command
#
