class @CommandStack

    constructor:() ->
        @_max_stack_size = 20
        @stack = []
        @stack_index = 0

    _setIndex:(value) ->
        @stack_index = value
        @trigger('change', @)

    redo:() ->
        next = @stack_index + 1
        if @stack[next]
            @stack[next].execute()
            @_setIndex(next)

    undo:() ->
        if @stack_index > @stack.length-1
            @stack_index = @stack.length-1

        if @stack[@stack_index]
            @stack[@stack_index].undo()
            @_setIndex(@stack_index-1)

    avaiableStack:() ->
        @stack.length > 0

    avaiableRedo:() ->
        @avaiableStack() and (@stack_index+1) < @stack.length

    avaiableUndo:() ->
        @avaiableStack() and @stack_index > -1

    push:(command) ->
        if @stack_index != @stack.length
            @stack = @stack.slice(0, @stack_index+1)

        if @stack.length > @_max_stack_size
            @stack.shift()

        @stack.push command
        @_setIndex(@stack.length)

_.extend @CommandStack::, Backbone.Events
