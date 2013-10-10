class @SVGUtil

    @SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg")

    @toD3Transform:(svg_matrix)=>
        d3.transform("matrix(" + SVGUtil.toStringMatrix(svg_matrix) + ")")

    @toStringMatrix:(svg_matrix) =>
        props = (svg_matrix[prop].toString() for prop in ["a", "b", "c", "d", "e", "f"])
        props.join()

    @TransformMatrix:(transform) =>
        @Transform(transform).matrix

    @Transform:(string) =>      #TODO not work firefox
        g = document.createElementNS("http://www.w3.org/2000/svg", "g")
        g.setAttribute("transform", string.toString())
        g.transform.baseVal.consolidate()

    @createPoint:(x, y) =>
        point = @SVG.createSVGPoint()
        point.x = x
        point.y = y
        point

    @createTag:(tag) =>
        document.createElementNS('http://www.w3.org/2000/svg', tag)

    @setMatrixTransform:(el, matrix) =>
        transform = SVGUtil.SVG.createSVGTransform()
        transform.setMatrix(matrix)
        @setTransform(el, transform)

    @setTransform:(el, transform) =>
        el.transform.baseVal.initialize(transform)

    @localMatrix:(el) =>
        consolidate = el.transform.baseVal.consolidate()
        if consolidate
            consolidate.matrix
        else
            SVGUtil.SVG.createSVGMatrix()
