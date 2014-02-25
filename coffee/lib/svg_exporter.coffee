class @SvgExporter
    toSvg: (element, filename, options) ->
        svg_clone = element.cloneNode(true)
        $svg_clone = $(svg_clone)
        canvas = $svg_clone.find("#svg-canvas")
        for elem in canvas.children()
            $svg_clone.append(elem)
        canvas.remove()
        serializer = new XMLSerializer();
        $(svg_clone).attr("id", "")
        $(svg_clone).attr("style", "")
        svg_xml =  serializer.serializeToString(svg_clone)
        url_prefix ="data:image/svg+xml, "
        url = url_prefix  +  svg_xml
        window.open(url, filename, options)

    # clearNoneUseDefs:()=>
