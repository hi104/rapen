class @ZOrderControl extends Backbone.View

    initialize: () ->
        @canvas = @options.canvas
        @canvas_el = @canvas.mainCanvas

    bringForward:() => @_move(@_bringForward)
    bringBack:()    => @_move(@_bringBack)
    toTop:()        => @_move(@_toTop)
    toBottom:()     => @_move(@_toBottom)

    _getSelectedElement:() =>
        @canvas.control.item_list.map((item) => $(item.get("origin_model").el))

    _move:(fn) =>
        fn(@_getSelectedElement())
        @trigger("onMove", @)

    _sort:(elements) =>
        elements.sort((a, b) =>
            b.index() - a.index()
        )

    _bringForward:(elements)=>
        elements = @_sort(elements).reverse()
        for e in elements
            e.insertAfter(e.next())

    _bringBack:(elements)=>
        elements = @_sort(elements)
        for e in elements
            e.insertBefore(e.prev())

    _toTop:(elements)=>
        elements = @_sort(elements).reverse()
        for e in elements
            $(@canvas_el).append(e)

    _toBottom:(elements)=>
        elements = @_sort(elements)
        for e in elements
            $(@canvas_el).prepend(e)
