class @ContextMenuView extends Backbone.View

    events:
        "contextmenu": "onContextMenu"

    actions         :
        "flipX"     : () -> cloneControlView.getControlItem().flipX() ,
        "flipY"     : () -> cloneControlView.getControlItem().flipY()

        "forward"   : () -> orderControl.bringForward(),
        "back"      : () -> orderControl.bringBack(),
        "top"       : () -> orderControl.toTop(),
        "bottom"    : () -> orderControl.toBottom()

        "group"     : () -> SvgCanvasBase.groupSelectedItem(),
        "ungroup"   : () -> SvgCanvasBase.unGroupSelectedItem(),
        "addFolder" : () -> SvgCanvasBase.addFolderSelectedItem(),

        "unite"     : () -> excutePathBoolean("unite"),
        "intersect" : () -> excutePathBoolean("intersect"),
        "subtract"  : () -> excutePathBoolean("subtract"),
        "divide"    : () -> excutePathBoolean("divide"),
        "exclude"   : () -> excutePathBoolean("exclude")


    initialize:() =>
        @$contextMenu = $("#contextMenu")
        @$contextMenu.on("click a", @onItemMenuClick)
        $(document).click(() =>
            $("#contextMenu").css("visibility", "hidden")
        )

    #
    # reference to https://github.com/sydcanem/bootstrap-contextmenu
    # thank you
    #
    getPosition:(e)->
        $menu = @$contextMenu
        mouseX = e.clientX
        mouseY = e.clientY
        boundsX = $(window).width()
        boundsY = $(window).height()
        menuWidth = $menu.find('.dropdown-menu').outerWidth()
        menuHeight = $menu.find('.dropdown-menu').outerHeight()

        if (mouseY + menuHeight > boundsY)
            y = mouseY - menuHeight + $(window).scrollTop()
        else
            y = mouseY + $(window).scrollTop()

        if ((mouseX + menuWidth > boundsX) and ((mouseX - menuWidth) > 0))
            x = mouseX - menuWidth + $(window).scrollLeft()
        else
            x = mouseX + $(window).scrollLeft()

        return {x: x, y: y}

    onContextMenu:(e)=>
        pos = @getPosition(e)
        @$contextMenu.css({
            visibility: "visible",
            left: pos.x,
            top: pos.y
        })
        e.preventDefault()
        false

    onItemMenuClick:(e) =>
        $a = $(e.target)
        action = $a.data("action")
        @actions[action]()
