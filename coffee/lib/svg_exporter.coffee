class @SvgExporter
    toSvg: (element, filename, options) ->
        svg_clone = element.cloneNode(true)
        serializer = new XMLSerializer();
        $(svg_clone).attr("id", "")
        $(svg_clone).attr("style", "")
        svg_xml =  serializer.serializeToString(svg_clone)
        url_prefix ="data:image/svg+xml, "
        url = url_prefix  +  svg_xml
        window.open(url, filename, options)

    # clearNoneUseDefs:()=>
