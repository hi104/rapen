class @CommandService
    constructor:() ->
        @creator = new CommandCreator()
        @invoker = new CommandInvoker()
        @stack = []
        @stack_index = 0

    getCreator:() -> @creator

    getInvoker:() -> @invoker

    redo:() ->
        next = @stack_index + 1
        if @stack[next]
            @stack[next].execute()
            @stack_index = next

        console.log @stack_index, @stack.length

    undo:() ->
        if @stack_index >= @stack.length
            @stack_index = @stack.length-1

        if @stack[@stack_index]
            @stack[@stack_index].undo()
            @stack_index -= 1

        console.log @stack_index, @stack.length

    executeCommand:(command) ->
        if @stack_index != @stack.length

            @stack = @stack.slice(0, @stack_index+1)
            console.log @stack, 0, @stack_index+1

        @stack.push command
        @stack_index = @stack.length
        @getInvoker().execute(command)
