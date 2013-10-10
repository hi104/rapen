# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(document).ready(() =>
    @event_manager = new EventManager()
    @cloneControlView = new CloneControlView({
        el:$("#clone-control-view"),
        line_wrapper: $("#clone-select-line-views"),
        select_el: $("#clone-selected-view"),
        manager:@event_manager
    })
    @event_manager.setControl(@cloneControlView)
    @SvgCanvasBase    = new SvgCanvas({
        el:$("#svg-canvas-base"),
        control:@cloneControlView,
        mainCanvas:$("#svg-canvas")[0],
        regionView:new SelectRegionControlView({el:$("#select-region-view")}),
        manager:@event_manager
    })

    @cloneControlView.setCanvas(@SvgCanvasBase)

    @svgPathControl = new SvgPathControlView(el:$("#path-control-panel"))
    cloneControlView.bind("onChangeList", (control) =>
        if cloneControlView.isOneItem()
            @event_manager.selected_item = null
        if not cloneControlView.isOneItem()
            svgPathControl.unbindItem()
    )

    @inspectorListView = new InspectorListView({
        control:@cloneControlView,
        item_list:SvgCanvasBase.item_list
    })
    $("#inspector-list").append(@inspectorListView.el)
    @event_manager.setCanvas(@SvgCanvasBase)

    @SvgCanvasBase.bind("onChangeZoomPos", (e) =>

        canvas_transform = $(@SvgCanvasBase.mainCanvas).attr("transform")

        $(grid_view.el).attr("stroke-width", 0.5 * (1 / SvgCanvasBase.zoomValue))
        $(grid_view.el).attr("transform", canvas_transform)

        $("#clone-control-view-wapper").attr("transform", canvas_transform)
        cloneControlView.render()

        svgPathControl.render()
    )

    @SvgItems = new SvgItemList
    @SvgItemToolView = new SvgItemToolView({model:@SvgItems, el:$("#svg-item-list"), canvas:SvgCanvasBase})

    for svg in SvgSample
        do (svg) ->
            SvgItems.add(new SvgItem(name:"item", contents:svg))

    @patternItemsView = new PatternPanelView({
        model:new SvgItemList,
        el:$("#pattern-items"),
        control:cloneControlView,
        defs_id:"#pattern-defs",
        element_key:"pattern_id"})

    @gradientItemsView = new GradientPanelView({
        model:new SvgItemList,
        el:$("#gradient-items"),
        control:cloneControlView,
        defs_id:"#gradient-defs",
        element_key:"gradient_id"})

    @filterItemsView = new FilterPanelView({
        model:new SvgItemList,
        el:$("#filter-items"),
        control:cloneControlView,
        defs_id:"#filter-defs",
        element_key:"filter_id"})

    @filterItemsView.setTemplate(_.template('<rect x="10" y="10" filter="url(#{{element_id}})" fill="white" width="30" height="30"></rect>'))

    @gradientItemsView.loadFile("partial/gradient_defs.html")
    @patternItemsView.loadFile("partial/pattern_defs.html")
    @filterItemsView.loadFile("partial/filter_defs.html")

    @orderControl = new ZOrderControl(canvas:@SvgCanvasBase)
    @orderControl.bind("onMove", () => inspectorListView.sortByIndex())

    $("#export-button").click((e)-> SvgExport())

    @grid_view = new SvgGridView(el:$("#svg-canvas-grid"), width:800, height:600)
    @grid_view.render()

    @snap_line_view =  new SnapLineView(el:$("#snap-line-view"))
    @snap_item_view =  new SnapItemView(el:$("#snap-item-view"))

    $('#panel-tabs a').click((e)->
      e.preventDefault();
      $(this).tab('show');
    )

    for i in _.map(_.range(1, 30), (e) -> 0.1 * e )
        temp = _.template('<option value="{{val}}" {{option}}> {{name}}</option>')
        option = ""
        e = Math.round(i*100)
        if(e == 100)
             option = "selected"
        $("#zoom-control").append temp(option:option, name: e + "%", val: i)

    $("#zoom-control").change((e) =>
        SvgCanvasBase.zoom($("#zoom-control").val(), { x: 400, y:300}, false)
    )

    key("backspace, delete", (e) =>
        e.preventDefault();
        SvgCanvasBase.deleteSelectdItem()
    )

    move_item_position = (pos) =>
        if cloneControlView.item_list.length > 0
            cloneControlView.getControlItem().move(pos)

    move_keys =
        [{key:"up", x:0, y:-1},
        {key:"down", x:0, y:1},
        {key:"right", x:1, y:0},
        {key:"left", x:-1, y:0}]

    for move in move_keys
        do (move) =>
            key(move.key, (e) =>
                move_item_position({x:move.x, y:move.y})
                e.preventDefault()
            )

    $("#gradient-rotate").knob({
        "change": (v) =>
            el = cloneControlView.firstOriginalItem().el
            bbox = el.getBBox()
            id = $(el).attr("id") + "-grad"
            cx = bbox.width/2
            cy = bbox.height/2
            attr = "rotate(" + v + ")"
            $("#" + id)[0].setAttributeNS(null, "gradientTransform", attr)
    });

    update_pattern = () =>
        el = cloneControlView.firstOriginalItem().el
        bbox = el.getBBox()
        id = $(el).attr("id") + "-pattern"
        cx = bbox.width/2
        cy = bbox.height/2
        v = $("#pattern-rotate").val()
        scale = Math.pow($( "#pattern-slider" ).slider( "value" )/25, 2)
        attr = "rotate(#{v}, #{cx}, #{cy}) scale(#{scale})"
        $("#" + id)[0].setAttributeNS(null, "patternTransform", attr)

    $("#pattern-rotate").knob({
        "change": (v) =>
            update_pattern()
    });

    $("#pattern-slider").slider({
        slide: ( event, ui ) =>
            update_pattern()

    });
    $('#grid-check').click((e) =>
        if $('#grid-check')[0].checked then grid_view.show() else grid_view.hide()
    );

    $(".navbar-fixed-top").hide();
    $(".container-fluid").css("padding-top", "0px");

    $.contextMenu({
        selector: "#svg-canvas-base",
        items: {
            forward:   {  name: "forward",   callback: ((key, opt) =>  orderControl.bringForward()) },
            back:      {  name: "back",      callback: ((key, opt) =>  orderControl.bringBack()) },
            top:       {  name: "top",       callback: ((key, opt) =>  orderControl.toTop()) },
            bottom:    {  name: "bottom",    callback: ((key, opt) =>  orderControl.toBottom()) },
            group:     {  name: "group",     callback: ((key, opt) =>  SvgCanvasBase.groupSelectedItem())},
            un_group:  {  name: "ungroup",   callback: ((key, opt) =>  SvgCanvasBase.unGroupSelectedItem())},
            unite:     {  name: "unite",     callback: ((key, opt) =>  excutePathBoolean("unite"))},
            intersect: {  name: "intersect", callback: ((key, opt) =>  excutePathBoolean("intersect"))},
            subtract:  {  name: "subtract",  callback: ((key, opt) =>  excutePathBoolean("subtract"))},
            divide:    {  name: "divide",    callback: ((key, opt) =>  excutePathBoolean("divide"))},
            exclude:   {  name: "exclude",   callback: ((key, opt) =>  excutePathBoolean("exclude"))}
        }
    });

    initPropertyEdit()

)

@excutePathBoolean = (operate) =>
    if cloneControlView.item_list.length == 2
        item1 = cloneControlView.item_list.at(0).get("origin_model")
        item2 = cloneControlView.item_list.at(1).get("origin_model")
        path1 = new paper.CompoundPath()
        path2 = new paper.CompoundPath()
        paperMatrix = (sm) => new paper.Matrix(sm.a, sm.b, sm.c, sm.d, sm.e, sm.f)
        path1.setPathData($(item1.el).attr("d"))
        path2.setPathData($(item2.el).attr("d"))

        path1.transform(paperMatrix(item1.getLocalMatrix()))
        path2.transform(paperMatrix(item2.getLocalMatrix()))

        #all path set clockwise
        for path in [path1, path2]
            for child in path._children
                if (not child.isClockwise())
                    child.reverse()

        path = path2[operate](path1)

        if _(["exclude", "divide"]).contains(operate)
            # path type is paper.Group
            path._children.forEach((item) =>
                path_el =  SVGUtil.createTag("path")
                console.log(item)
                $(path_el).attr({
                    "d": item.getPathData(),
                    "fill-rule": "evenodd",
                    "transform": ""
                })

                SvgCanvasBase.addElement(path_el)

            )
            SvgCanvasBase.removeItem(item1)
            SvgCanvasBase.removeItem(item2)
            cloneControlView.clear()
        else
            item1.attr({
                "d": path.getPathData(),
                "fill-rule": "evenodd",
                "transform": ""
                })
            SvgCanvasBase.removeItem(item2)
            cloneControlView.initControls([item1])

@initPropertyEdit = () =>
    propertyEditSet = new PropertyEditSetView(el:$("#property-table"))

    for attr in ["fill-spe", "stroke-spe"]
        do (attr) ->
            prop = attr
            $("#property-edit-#{attr}").spectrum({
                showPalette: true,
                showSelectionPalette: true,
                maxPaletteSize: 10,
                palette:[["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]],
                change: (color) ->
                    propertyEditSet.prop_views[prop.replace("-spe", "")].update(color.toHexString())
            })

    cloneControlView.bind("onChangeList", (control) =>

        if cloneControlView.isOneItem()
            item = cloneControlView.firstOriginalItem()

            propertyEditSet.bindElement(item)

            #set color spectrum
            for attr in ["fill-spe", "stroke-spe"]
                do (attr) ->
                    $("#property-edit-#{attr}").spectrum("set",$(item.el).attr(attr.replace("-spe", "")))

        else
            propertyEditSet.clear()
    )

@SvgExport = () =>
    (new SvgExporter).toSvg($("#svg-canvas-wrap")[0], "svgfile", "width=600, height=400")
