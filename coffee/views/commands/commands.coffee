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

class @GroupCommand extends CommandBase
    constructor: (@group_item_id, @group_item_ids) ->

    execute: () ->
        @group()

    undo: () ->
        @unGroup()

    group:() ->
        items = @group_item_ids.map((id) ->
            SvgCanvasBase.getItemById(id)
        )
        grouped_item = SvgCanvasBase.group(items)
        grouped_item.attr('id', @group_item_id)

    unGroup:() ->
        grouped_item = SvgCanvasBase.getItemById(@group_item_id)
        SvgCanvasBase.unGroup(grouped_item)

class @UnGroupCommand extends GroupCommand
    execute: () ->
        @unGroup()

    undo: () ->
        @group()
#
# TODO:
# - z-order change command
#
