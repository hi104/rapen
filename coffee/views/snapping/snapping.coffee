class @Snapping
    @getNearPoints:(points, snap_points) =>
        near_points = []
        for p in points
            _.each(snap_points, (obj) =>
                dist_x = Math.abs(p.x - obj.point.x)
                dist_y = Math.abs(p.y - obj.point.y)
                if dist_x < 5
                    near_points.push({type:"x", p:p, snap_point:obj.point, dist_x:dist_x, dist_y:dist_y,  obj:obj})
                if dist_y < 5
                    near_points.push({type:"y", p:p, snap_point:obj.point, dist_x:dist_x, dist_y:dist_y, obj:obj})
            )
        near_points

    @getSnap:(snap_target_points, none_filter = true) =>
        canvas_base = SvgCanvasBase
        snap_points = []
        canvas_matrix = canvas_base.mainCanvas.getCTM()

        # if grid_view.isVisible()
        #     for obj in grid_view.snapPoints()
        #         point = SVGUtil.createPoint(obj.x, obj.y)
        #         point = point.matrixTransform(canvas_matrix)
        #         snap_points.push({type:"grid", point:point})

        item_list = canvas_base.getItems()
        item_list = item_list.filter((item) -> item.constructor == SvgElement)

        if none_filter
            #TODO global object
            clone_origin_list = cloneControlView.item_list.map((item) => item.get("origin_model"))
            snap_item_list = item_list.filter((item) => not _.contains(clone_origin_list, item))
        else
            snap_item_list = item_list

        for item in snap_item_list
            do(item) =>
                _.each(item.getSnapPoints(), (point) =>
                    snap_points.push({type:"item", item:item, point:point})
                )

        near_points = []
        near_points = Snapping.getNearPoints(snap_target_points, snap_points)

        #TODO min
        near_point_x = _.first(_.sortBy(_.filter(near_points, (e) => e.type =="x"), (e) => e.dist_x))
        near_point_y = _.first(_.sortBy(_.filter(near_points, (e) => e.type =="y"), (e) => e.dist_y))

        snap_line_view.clear()
        snap_item_view.clear()

        movep = SVGUtil.createPoint(0, 0)
        if near_point_x
            x = near_point_x.snap_point.x
            movep.x = near_point_x.p.x - near_point_x.snap_point.x
            snap_line_view.addLineUsePoint({x:x, y:near_point_x.p.y}, {x:x, y:near_point_x.snap_point.y})
        if near_point_y
            y = near_point_y.snap_point.y
            movep.y = near_point_y.p.y - near_point_y.snap_point.y
            snap_line_view.addLineUsePoint({x:near_point_y.p.x, y:y}, {x:near_point_y.snap_point.x, y:y})

        for near_point in [near_point_x, near_point_y]
            if near_point and near_point.obj.type == "item"
                snap_item_view.addItem(near_point.obj.item)

        snap_line_view.render()
        snap_item_view.render()
        ondrop = (e) =>
            snap_line_view.clear()
            snap_item_view.clear()
            $(document).unbind('mouseup', ondrop)
        $(document).on('mouseup', ondrop)

        movep
