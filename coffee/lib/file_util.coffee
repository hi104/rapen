class @FileUtil
    load:(file, callback) ->
        reader = new FileReader
        reader.onload = (e) =>
            svg = e.target.result
            parsed = @parse($(svg))
            callback(parsed)

        reader.readAsText file

    loadImageAsURL:(file, callback) ->
        reader = new FileReader
        reader.onload = (e) =>
            callback(e.target.result)

        reader.readAsDataURL file

    parse:(container) ->
        defs = []
        items = []
        for elem in container.children()
            if elem.nodeName is "defs"
                defs.push elem
            else
                items.push elem

        defs:  defs,
        items: items
