class @OpenFileView extends Backbone.View

    events:
        "change #file-select"  : "onChange"

    onChange: (e) =>

        $("#fileModal").modal('hide')
        $file_select = $("#file-select")
        file = $file_select.get(0).files[0]
        $file_select.val("")

        util = new FileUtil
        util.load(file, (parsed) ->
            for elem in parsed.items
                SvgCanvasBase.addElement(elem)
            for elem in parsed.defs
                $("#item-defs").append(elem);
        )
