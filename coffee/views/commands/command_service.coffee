class @CommandService
    constructor:() ->
        @creator = new CommandCreator()
        @invoker = new CommandInvoker()
        @command_stack = new CommandStack()
        @command_stack.on('change', (stack) ->
            console.log 'change stack', stack
        )

    getCreator:() -> @creator

    getInvoker:() -> @invoker

    redo:() ->
        @command_stack.redo()

    undo:() ->
        @command_stack.undo()

    executeCommand:(command) ->
        @command_stack.push(command)
        @getInvoker().execute(command)
