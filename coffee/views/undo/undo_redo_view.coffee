class @UndoRedoView extends Backbone.View

    events:
        "click #undo-button" : "onClickUndo"
        "click #redo-button" : "onClickRedo"

    initialize:() ->
        # @commandService = global.commandService
        @command_stack = @options.stack
        @undo_button_el = @$el.find('#undo-button')
        @redo_button_el = @$el.find('#redo-button')
        @listenTo(@command_stack, 'change', @render)

    onClickUndo: (e) ->
        GLOBAL.commandService.undo()

    onClickRedo: (e) ->
        GLOBAL.commandService.redo()

    render: () ->
        @redo_button_el.prop('disabled', not @command_stack.avaiableRedo())
        @undo_button_el.prop('disabled', not @command_stack.avaiableUndo())
