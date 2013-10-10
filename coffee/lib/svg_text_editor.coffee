class @SvgTextEditor
    constructor:(_parent_el, _text_el) ->
        @parent_el = _parent_el
        @text_el = _text_el
        @cursor_el = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        $(@cursor_el).css("fill", "black")
        $(@cursor_el).css("stroke", "white")
        $(@cursor_el).attr("width", "2")
        $(@cursor_el).attr("stroke-width", "0.4")
        $(@parent_el).append(@cursor_el)
        @input_el = document.createElement("input")
        $(@input_el).attr("size", "100")
        $(@input_el).attr("type", "text")
        $(@input_el).attr("style", "z-index:1000;position:absolute;left:0;top:0;display:none;")

        $("body").prepend(@input_el)
        @edit_cursor = new EditCursor(@cursor_el, @text_el)

    setOnDisable:(fn) =>
        @onDisable = fn

    getCaretPositionFromPoint:(el, point) =>
        svg_text_input_chars = el.getNumberOfChars()
        if (svg_text_input_chars > 0)
            first_point = el.getStartPositionOfChar(0)
            for i in [0..svg_text_input_chars]
                end_point = el.getEndPositionOfChar(i)
                start_point = el.getStartPositionOfChar(i)
                dist = (p1, p2) =>
                    x = (p1.x - p2.x)
                    y = (p1.y - p2.y)
                    Math.sqrt(x*x  +  y*y)

                start_dist = dist(start_point, first_point)
                end_dist= dist(end_point, first_point)
                point_dist = dist(point, first_point)

                if (start_dist <= point_dist && end_dist >= point_dist)
                    if(Math.abs(start_dist-point_dist) > Math.abs(end_dist-point_dist))
                        return i + 1
                    else
                        return i
            return i
        else
            return -1

    getCaretPosition: (el, x) =>
        svg_text_input_chars = el.getNumberOfChars()
        if (svg_text_input_chars > 0)
            for i in [0..svg_text_input_chars]
                end_point = el.getEndPositionOfChar(i)
                point = el.getStartPositionOfChar(i)
                if (point.x <= x && end_point.x >= x)
                    if(Math.abs(point.x - x) > Math.abs(end_point.x - x))
                        return i + 1
                    else
                        return i
            return i
        else
            return -1

    unbindEvent:() =>
        $(@input_el).unbind("blur", @unbindEvent)
        $(@input_el).unbind("keydown", @keyDown)
        $(@input_el).unbind("keyup", @keyPress)
        @edit_cursor.disable()
        $(@input_el).hide()
        @onDisable && @onDisable()

    setTextElement:(el) =>
        @text_el = el
        @edit_cursor.text_element = el

    updateTextValue:()=>
        text_value = @input_el.value
        $(@text_el).text(text_value)

    keyPress:(e)=>
        @updateTextValue()
        @edit_cursor.updateCharPos(@input_el.selectionStart)

    remove:()=>
        $(@cursor_el).remove()
        $(@input_el).remove()

    disable:()=>
        $(@input_el).blur()

    keyDown:(e)=>
        if(e.keyCode == 13)
            @disable()
        else
            @updateTextValue(e)

    showInput:(char_at)=>
        input = $(@input_el)
        input.show()
        input.val(@text_el.textContent)
        input.focus()
        input[0].setSelectionRange(char_at, char_at)

    unbindClickEvent:()=>
        $(@text_el).unbind("click", @onClickEvent)

    onClickEvent:(e)=>
        point = SVGUtil.createPoint(e.pageX, e.pageY)
        ctm = @text_el.getScreenCTM()
        point = point.matrixTransform(ctm.inverse())
        char_at = @getCaretPositionFromPoint(@text_el, point)

        @edit_cursor.updateCharPos(char_at)
        @showInput(char_at)
        input = $(@input_el)

        bbox = @text_el.getBBox()
        ctm = @text_el.getScreenCTM()
        input.css("left", ctm.e + bbox.x)
        input.css("top", ctm.f + bbox.y + bbox.height + 10)

        input.on("blur",  @unbindEvent)
        input.on("keydown", @keyDown)
        input.on("keyup", @keyPress)

    bindEvent:()=>
        $(@text_el).on("click", @onClickEvent)


class @EditCursor
    constructor:(el, text_el) ->
        @pos = 0
        @el= el
        @text_element = text_el
        @interval_blink
        @disable()

    disable:() =>
        @clearBlink()
        $(@el).hide()

    setCursor:(char_at) =>
        chars = @text_element.getNumberOfChars()

        if(char_at >= chars)
            point = @text_element.getEndPositionOfChar(char_at)
        else
            point = @text_element.getStartPositionOfChar(char_at)

        SVGUtil.setMatrixTransform(@el, @text_element.getCTM())

        $el = $(@el)

        if(char_at >= chars)
            extent = @text_element.getExtentOfChar(char_at-1)
            $el.attr("x", extent.x + extent.width)
        else
            extent = @text_element.getExtentOfChar(char_at)
            $el.attr("x", extent.x)
            $el.attr("y", extent.y)

        bbox = @text_element.getBBox()
        $el.attr("height", bbox.height)
        $el.attr("width", 1)

    updateCharPos:(_pos) =>
        @pos = _pos
        @setCursor(@pos)
        $(@el).show()
        @startBlink()
    clearBlink:() =>
        @interval_blink && clearInterval(@interval_blink)

    startBlink:()=>
        @clearBlink()
        @interval_blink = setInterval(@blink, 500)

    blink:()=>
        $(@el).toggle()
