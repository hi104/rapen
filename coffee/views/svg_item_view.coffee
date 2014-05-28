class @SvgItemView extends Backbone.View
    @template  = _.template('
    <svg
        height="40px"
        width="40px"
        viewBox="0 10 100 100"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
      <g>
      {{contents}}
      </g>
    </svg>')

    events: () ->
        "click": "click"
        "mousedown": "onMouseDown"

    render: () ->
        $(@el).css("width", "40px")
        $(@el).css("height", "40px")
        $(@el).css("border", "1px solid #ccc")
        $(@el).css("float", "left")
        $(@el).css("margin", "1px")
        $(@el).html(SvgItemView.template(@model.attributes))
        @
    fit:() =>
        svg_group = $(@el).find("g")[0]
        svg = $(@el).find("svg")[0]
        bbox = svg_group.getBBox()
        view_box = bbox.x + " " + bbox.y + " " + bbox.width + " " + bbox.height
        svg.setAttribute("viewBox", view_box)

    onMouseDown:(e) =>
        @trigger("onMouseDown", @, e)

    onDragging:(e) =>
        @trigger("onMouseDragging", @, e)

    onDrop:(e)=>
        @trigger("onMouseUp", @, e)

    click: () =>
        @trigger("clicked", @)
