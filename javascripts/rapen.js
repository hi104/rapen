(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PropertyEdit = (function(_super) {
    __extends(PropertyEdit, _super);

    function PropertyEdit() {
      this.unbindElement = __bind(this.unbindElement, this);
      this.updateElement = __bind(this.updateElement, this);
      this.setAttr = __bind(this.setAttr, this);
      this.bindElement = __bind(this.bindElement, this);
      _ref = PropertyEdit.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PropertyEdit.prototype.bindElement = function(el) {
      return this._bindingModel = el;
    };

    PropertyEdit.prototype.setAttr = function(values) {
      this.set(values);
      if (this._bindingModel) {
        return this._bindingModel.attr(values);
      }
    };

    PropertyEdit.prototype.updateElement = function() {
      var attrs,
        _this = this;
      attrs = {};
      _.each(this._bindingModel.el.attributes, function(attr) {
        return attrs[attr.nodeName] = attr.nodeValue;
      });
      this.clear();
      this.set(attrs);
      return this.trigger("update");
    };

    PropertyEdit.prototype.unbindElement = function() {
      this._bindingModel = null;
      return this.clear();
    };

    return PropertyEdit;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgElement = (function(_super) {
    __extends(SvgElement, _super);

    function SvgElement() {
      this.flipY = __bind(this.flipY, this);
      this.flipX = __bind(this.flipX, this);
      this.centerScale = __bind(this.centerScale, this);
      this.move = __bind(this.move, this);
      this.getPosition = __bind(this.getPosition, this);
      this._getPosition = __bind(this._getPosition, this);
      this._getBBoxPoints = __bind(this._getBBoxPoints, this);
      this._getMatrixBBoxPoints = __bind(this._getMatrixBBoxPoints, this);
      this.getBBoxPoints = __bind(this.getBBoxPoints, this);
      this.getCentorPoint = __bind(this.getCentorPoint, this);
      this.getLocalMatrix = __bind(this.getLocalMatrix, this);
      this.getSnapPoints = __bind(this.getSnapPoints, this);
      this.getScreenCTM = __bind(this.getScreenCTM, this);
      this.getCTM = __bind(this.getCTM, this);
      this.getBBox = __bind(this.getBBox, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.isVisibled = __bind(this.isVisibled, this);
      this.toggleLock = __bind(this.toggleLock, this);
      this.isLocked = __bind(this.isLocked, this);
      this.unLock = __bind(this.unLock, this);
      this.lock = __bind(this.lock, this);
      this.isSelected = __bind(this.isSelected, this);
      this.unSelect = __bind(this.unSelect, this);
      this.select = __bind(this.select, this);
      this.attr = __bind(this.attr, this);
      this.setMatrix = __bind(this.setMatrix, this);
      this.setElement = __bind(this.setElement, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SvgElement.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgElement.prototype.initialize = function() {
      this.unSelect();
      this.unLock();
      this.show();
      return this.unSuspendRemove();
    };

    SvgElement.prototype.setFolder = function(folder) {
      return this.folder = folder;
    };

    SvgElement.prototype.removeFromFolder = function() {
      return this.folder.remove(this);
    };

    SvgElement.prototype.pergeFromFolder = function() {
      this.suspendRemove();
      this.removeFromFolder();
      return this.unSuspendRemove();
    };

    SvgElement.prototype.setElement = function(element) {
      this.el = element;
      this.$el = $(element);
      return this.attr("data-name", this.$el.data("name"));
    };

    SvgElement.prototype.setMatrix = function(matrix) {
      SVGUtil.setMatrixTransform(this.el, matrix);
      return this.set({
        "matrix": matrix
      });
    };

    SvgElement.prototype.attr = function(key, val, options) {
      var attrs;
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      $(this.el).attr(attrs);
      return this.set(attrs);
    };

    SvgElement.prototype.select = function() {
      return this.set("_selected", true);
    };

    SvgElement.prototype.unSelect = function() {
      return this.set("_selected", false);
    };

    SvgElement.prototype.isSelected = function() {
      return this.get("_selected");
    };

    SvgElement.prototype.lock = function() {
      return this.set("_locked", true);
    };

    SvgElement.prototype.unLock = function() {
      return this.set("_locked", false);
    };

    SvgElement.prototype.isLocked = function() {
      return this.get("_locked");
    };

    SvgElement.prototype.toggleLock = function() {
      if (this.isLocked()) {
        return this.unLock();
      } else {
        return this.lock();
      }
    };

    SvgElement.prototype.isVisibled = function() {
      return this.get('_visible');
    };

    SvgElement.prototype.show = function() {
      this.set('_visible', true);
      return $(this.el).css('display', "inline");
    };

    SvgElement.prototype.hide = function() {
      this.set('_visible', false);
      return $(this.el).css('display', "none");
    };

    SvgElement.prototype.suspendRemove = function() {
      return this.set("_suspend_remove", true);
    };

    SvgElement.prototype.unSuspendRemove = function() {
      return this.set("_suspend_remove", false);
    };

    SvgElement.prototype.isSuspendRemove = function() {
      return this.get("_suspend_remove");
    };

    SvgElement.prototype.group = function() {
      return this.set("_grouped", true);
    };

    SvgElement.prototype.isGrouped = function() {
      return this.get("_grouped");
    };

    SvgElement.prototype.getBBox = function() {
      return this.el.getBBox();
    };

    SvgElement.prototype.getCTM = function() {
      return this.el.getCTM();
    };

    SvgElement.prototype.getScreenCTM = function() {
      return this.el.getScreenCTM();
    };

    SvgElement.prototype.getSnapPoints = function() {
      var center_point, center_x, center_y, points;
      points = this.getBBoxPoints();
      center_x = (points[0].x + points[3].x) / 2;
      center_y = (points[0].y + points[3].y) / 2;
      center_point = SVGUtil.createPoint(center_x, center_y);
      points.push(center_point);
      return points;
    };

    SvgElement.prototype.getLocalMatrix = function() {
      return SVGUtil.localMatrix(this.el);
    };

    SvgElement.prototype.getCentorPoint = function() {
      var ctm, point, svg_rect;
      svg_rect = this.getBBox();
      ctm = this.el.getScreenCTM();
      point = SVGUtil.SVG.createSVGPoint();
      point.x = svg_rect.x + svg_rect.width / 2;
      point.y = svg_rect.y + svg_rect.height / 2;
      return point = point.matrixTransform(ctm);
    };

    SvgElement.prototype.getBBoxPoints = function() {
      return this._getMatrixBBoxPoints(this.getCTM());
    };

    SvgElement.prototype._getMatrixBBoxPoints = function(matrix) {
      var points, transed_points,
        _this = this;
      points = this._getBBoxPoints(this.getBBox());
      transed_points = [];
      _.each(points, function(p) {
        var origPoint, _origPoint;
        _origPoint = SVGUtil.createPoint(p[0], p[1]);
        origPoint = _origPoint.matrixTransform(matrix);
        return transed_points.push(origPoint);
      });
      return transed_points;
    };

    SvgElement.prototype._getBBoxPoints = function(bbox) {
      var h, ret, w, _i, _j, _len, _len1, _ref1, _ref2;
      ret = [];
      _ref1 = [bbox.x, bbox.x + bbox.width];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        w = _ref1[_i];
        _ref2 = [bbox.y, bbox.y + bbox.height];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          h = _ref2[_j];
          ret.push([w, h]);
        }
      }
      return ret;
    };

    SvgElement.prototype._getPosition = function(pos) {
      var point, svg_rect;
      svg_rect = this.getBBox();
      point = SVGUtil.SVG.createSVGPoint();
      point.x = svg_rect.x + (svg_rect.width / 2) * (1 + pos.x);
      point.y = svg_rect.y + (svg_rect.height / 2) * (1 + pos.y);
      return point;
    };

    SvgElement.prototype.getPosition = function(pos) {
      return this._getPosition(pos).matrixTransform(this.getCTM());
    };

    SvgElement.prototype.move = function(pos) {
      var matrix_inverse, point;
      point = SVGUtil.createPoint(pos.x, pos.y);
      matrix_inverse = this.getCTM().inverse();
      matrix_inverse.e = 0;
      matrix_inverse.f = 0;
      point = point.matrixTransform(matrix_inverse);
      return this.setMatrix(this.getLocalMatrix().translate(point.x, point.y));
    };

    SvgElement.prototype.centerScale = function(x_scale, y_scale) {
      var bbox, box_height, box_width, matrix, move_bbox_height, move_bbox_width, move_bbox_x, move_bbox_y, move_x, move_y;
      matrix = this.getLocalMatrix();
      bbox = this.getBBox();
      box_width = bbox.width;
      box_height = bbox.height;
      move_bbox_x = (bbox.x * x_scale) - bbox.x;
      move_bbox_y = (bbox.y * y_scale) - bbox.y;
      move_bbox_width = (box_width * x_scale) - box_width;
      move_bbox_height = (box_height * y_scale) - box_height;
      move_y = move_bbox_height / 2 + move_bbox_y;
      move_x = move_bbox_width / 2 + move_bbox_x;
      matrix = matrix.translate(-move_x, -move_y);
      return this.setMatrix(matrix.scaleNonUniform(x_scale, y_scale));
    };

    SvgElement.prototype.flipX = function() {
      return this.centerScale(-1, 1);
    };

    SvgElement.prototype.flipY = function() {
      return this.centerScale(1, -1);
    };

    return SvgElement;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgElementList = (function(_super) {
    __extends(SvgElementList, _super);

    function SvgElementList() {
      _ref = SvgElementList.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgElementList.prototype.model = SvgElement;

    return SvgElementList;

  })(Backbone.Collection);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgFolder = (function(_super) {
    __extends(SvgFolder, _super);

    function SvgFolder() {
      this.close = __bind(this.close, this);
      this.isOpen = __bind(this.isOpen, this);
      this.open = __bind(this.open, this);
      this.setControlViewEvent = __bind(this.setControlViewEvent, this);
      this.onAddItem = __bind(this.onAddItem, this);
      _ref = SvgFolder.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgFolder.prototype.initialize = function() {
      var _this = this;
      this.items = new SvgElementList();
      this.items.comparator = function(e) {
        return e.$el.index();
      };
      this.listenTo(this.items, 'add', this.onAddItem);
      this.listenTo(this, "remove", this.onRemove);
      this.open();
      return SvgFolder.__super__.initialize.call(this);
    };

    SvgFolder.prototype.setManager = function(manager) {
      return this.manager = manager;
    };

    SvgFolder.prototype.add = function(item, options) {
      item.setFolder(this);
      return this.items.add(item, options);
    };

    SvgFolder.prototype.remove = function(item) {
      item.setFolder(null);
      return this.items.remove(item);
    };

    SvgFolder.prototype.onRemove = function() {
      var items,
        _this = this;
      if (this.isSuspendRemove()) {
        return;
      }
      items = this.items.toArray();
      return items.forEach(function(item) {
        return _this.items.remove(item);
      });
    };

    SvgFolder.prototype.onAddItem = function(item) {
      var view;
      view = new SvgElementView({
        model: item,
        el: item.el
      });
      this.setControlViewEvent(view);
      view.render();
      if (this.$el.get(0) !== view.$el.parent().get(0)) {
        return this.$el.append(view.$el);
      }
    };

    SvgFolder.prototype.setControlViewEvent = function(view) {
      var _this = this;
      return ["onMouseDown", "onDblClick", "onClick"].forEach(function(event) {
        return view.bind(event, function(obj, e) {
          return _this.manager.onEvent(event, obj, e);
        });
      });
    };

    SvgFolder.prototype.open = function() {
      return this.set("_open", true);
    };

    SvgFolder.prototype.isOpen = function() {
      return this.get("_open");
    };

    SvgFolder.prototype.close = function() {
      return this.set("_open", false);
    };

    return SvgFolder;

  })(SvgElement);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgItem = (function(_super) {
    __extends(SvgItem, _super);

    function SvgItem() {
      _ref = SvgItem.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgItem.prototype.initialize = function() {};

    return SvgItem;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgItemList = (function(_super) {
    __extends(SvgItemList, _super);

    function SvgItemList() {
      _ref = SvgItemList.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgItemList.prototype.model = SvgItem;

    return SvgItemList;

  })(Backbone.Collection);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PathSegmentAdapeter = (function(_super) {
    __extends(PathSegmentAdapeter, _super);

    function PathSegmentAdapeter() {
      this.onChange = __bind(this.onChange, this);
      this.remove = __bind(this.remove, this);
      this.setLinear = __bind(this.setLinear, this);
      this.setSelected = __bind(this.setSelected, this);
      this.isSelected = __bind(this.isSelected, this);
      this.getPoint = __bind(this.getPoint, this);
      this.getHandleIn = __bind(this.getHandleIn, this);
      this.getHandleOut = __bind(this.getHandleOut, this);
      this._setSegment = __bind(this._setSegment, this);
      this.init = __bind(this.init, this);
      _ref = PathSegmentAdapeter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PathSegmentAdapeter.prototype.init = function(segment) {
      this.segment = segment;
      return this._setSegment(this.segment);
    };

    PathSegmentAdapeter.prototype._setSegment = function(segment) {
      var p, _i, _len, _ref1, _results;
      this.point = new PathSegmentPointAdapeter();
      this.point.init(segment.getPoint());
      this.handleInPoint = new PathSegmentPointAdapeter();
      this.handleInPoint.init(segment.getHandleIn());
      this.handleOutPoint = new PathSegmentPointAdapeter();
      this.handleOutPoint.init(segment.getHandleOut());
      _ref1 = [this.point, this.handleInPoint, this.handleOutPoint];
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        p = _ref1[_i];
        _results.push(p.on("change", this.onChange));
      }
      return _results;
    };

    PathSegmentAdapeter.prototype.getHandleOut = function() {
      return this.handleOutPoint;
    };

    PathSegmentAdapeter.prototype.getHandleIn = function() {
      return this.handleInPoint;
    };

    PathSegmentAdapeter.prototype.getPoint = function() {
      return this.point;
    };

    PathSegmentAdapeter.prototype.isSelected = function() {
      return this.segment.isSelected();
    };

    PathSegmentAdapeter.prototype.setSelected = function(val) {
      this.segment.setSelected(val);
      return this.onChange(this);
    };

    PathSegmentAdapeter.prototype.setLinear = function() {
      this.segment.setLinear();
      return this.onChange(this);
    };

    PathSegmentAdapeter.prototype.remove = function() {
      return this.segment.remove();
    };

    PathSegmentAdapeter.prototype.onChange = function() {
      var args;
      args = Array.prototype.slice.call(arguments);
      args.unshift(this);
      args.unshift("change");
      return this.trigger.apply(this, args);
    };

    return PathSegmentAdapeter;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PathSegmentPointAdapeter = (function(_super) {
    __extends(PathSegmentPointAdapeter, _super);

    function PathSegmentPointAdapeter() {
      this.getSavePoint = __bind(this.getSavePoint, this);
      this.savePoint = __bind(this.savePoint, this);
      this.setPoint = __bind(this.setPoint, this);
      _ref = PathSegmentPointAdapeter.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PathSegmentPointAdapeter.prototype.init = function(point) {
      return this.point = point;
    };

    PathSegmentPointAdapeter.prototype.setPoint = function(x, y) {
      this.point.set(x, y);
      return this.trigger("change", this);
    };

    PathSegmentPointAdapeter.prototype.getX = function() {
      return this.point.getX();
    };

    PathSegmentPointAdapeter.prototype.getY = function() {
      return this.point.getY();
    };

    PathSegmentPointAdapeter.prototype.savePoint = function() {
      return this.pre_point = {
        x: this.getX(),
        y: this.getY()
      };
    };

    PathSegmentPointAdapeter.prototype.getSavePoint = function() {
      return this.pre_point;
    };

    return PathSegmentPointAdapeter;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GridSetting = (function(_super) {
    __extends(GridSetting, _super);

    function GridSetting() {
      this.visible = __bind(this.visible, this);
      this.height = __bind(this.height, this);
      this.width = __bind(this.width, this);
      this.gridSize = __bind(this.gridSize, this);
      _ref = GridSetting.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GridSetting.prototype.gridSize = function() {
      return this.get("grid_size");
    };

    GridSetting.prototype.width = function() {
      return this.get("width");
    };

    GridSetting.prototype.height = function() {
      return this.get("height");
    };

    GridSetting.prototype.visible = function() {
      return this.get("visible");
    };

    return GridSetting;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.CloneControlView = (function(_super) {
    __extends(CloneControlView, _super);

    function CloneControlView() {
      this._createCopyItems = __bind(this._createCopyItems, this);
      this._copyMode = __bind(this._copyMode, this);
      this.attachCopyDragEvent = __bind(this.attachCopyDragEvent, this);
      this.attachDragEvent = __bind(this.attachDragEvent, this);
      this.onEvent = __bind(this.onEvent, this);
      this._setControlViewEvent = __bind(this._setControlViewEvent, this);
      this.render = __bind(this.render, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.exists = __bind(this.exists, this);
      this.clear = __bind(this.clear, this);
      this.addItem = __bind(this.addItem, this);
      this.removeItem = __bind(this.removeItem, this);
      this.setItems = __bind(this.setItems, this);
      this.update = __bind(this.update, this);
      this._viewUpdate = __bind(this._viewUpdate, this);
      this._updateForOneItem = __bind(this._updateForOneItem, this);
      this.firstOriginalItem = __bind(this.firstOriginalItem, this);
      this.firstItem = __bind(this.firstItem, this);
      this.isOneItem = __bind(this.isOneItem, this);
      this.getControlItem = __bind(this.getControlItem, this);
      this._onChangeList = __bind(this._onChangeList, this);
      this._onRemoveItem = __bind(this._onRemoveItem, this);
      this._onAddItem = __bind(this._onAddItem, this);
      this.setCanvas = __bind(this.setCanvas, this);
      this.getControl = __bind(this.getControl, this);
      this.initialize = __bind(this.initialize, this);
      _ref = CloneControlView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CloneControlView.prototype.initialize = function() {
      var item, view;
      this.manager = this.options.manager;
      this.canvas = this.options.canvas;
      this.item_list = new SvgElementList();
      this.line_list_view = new SelectLineListView({
        el: this.options.line_wrapper,
        line_view_class: CloneSelectLineView
      });
      this.item_list.bind('add', this._onAddItem);
      this.item_list.bind('add', this._onChangeList);
      this.item_list.bind('remove', this._onRemoveItem);
      this.item_list.bind('remove', this._onChangeList);
      item = new SvgElement();
      item.setElement(this.el);
      view = new SvgElementView({
        model: item,
        el: item.el
      });
      this.item = item;
      this._setControlViewEvent(view);
      this.itemControl = new ItemControl({
        el: this.options.select_el,
        manager: this
      });
      return this.mode = "";
    };

    CloneControlView.prototype.getControl = function() {
      return this.itemControl;
    };

    CloneControlView.prototype.setCanvas = function(canvas) {
      return this.canvas = canvas;
    };

    CloneControlView.prototype._onAddItem = function(item) {
      var view;
      view = new SvgElementView({
        model: item,
        el: item.el
      });
      item.set("view", view);
      this.line_list_view.item_list.add(item);
      view.render();
      return item.get("origin_model").select();
    };

    CloneControlView.prototype._onRemoveItem = function(item) {
      return item.get("origin_model").unSelect();
    };

    CloneControlView.prototype._onChangeList = function() {
      var item;
      this.itemControl.clear();
      this.stopListening();
      if (this.isOneItem()) {
        item = this.firstOriginalItem();
        this.listenTo(item, "change", this._updateForOneItem);
        this.itemControl.setItem(item);
        this.line_list_view.$el.hide();
        this.$el.hide();
        this.lazyShow();
      } else if (this.item_list.length > 0) {
        this.listenTo(this.item, "change", this.update);
        this.itemControl.setItem(this.item);
        this.line_list_view.$el.show();
        this.$el.show();
        this.lazyShow();
      } else {
        this.clear();
        this.hide();
      }
      return this.trigger("onChangeList", this);
    };

    CloneControlView.prototype.getControlItem = function() {
      return this.itemControl.getItem();
    };

    CloneControlView.prototype.isOneItem = function() {
      return this.item_list.length === 1;
    };

    CloneControlView.prototype.firstItem = function() {
      return this.item_list.at(0);
    };

    CloneControlView.prototype.firstOriginalItem = function() {
      if (this.item_list.length > 0) {
        return this.item_list.at(0).get("origin_model");
      } else {
        return null;
      }
    };

    CloneControlView.prototype._updateForOneItem = function() {
      var item;
      item = this.firstItem();
      if (item) {
        this._viewUpdate(item);
      }
      return this.line_list_view.render();
    };

    CloneControlView.prototype._viewUpdate = function(item) {
      var el, elm, view;
      view = item.get("view");
      el = view.$el;
      elm = item.get("origin_model").el.cloneNode(true);
      $(elm).attr({
        "pointer-events": "none"
      });
      item.el = elm;
      this.$el.append(elm);
      view.setElement(elm);
      return el.remove();
    };

    CloneControlView.prototype.update = function() {
      var matrix,
        _this = this;
      if (this.mode === "copy") {
        return;
      }
      matrix = this.item.getLocalMatrix();
      this.item_list.each(function(item) {
        var local, origin_model;
        origin_model = item.get("origin_model");
        local = item.getLocalMatrix();
        return origin_model.setMatrix(matrix.multiply(local));
      });
      return this.line_list_view.render();
    };

    CloneControlView.prototype.setItems = function(models) {
      var model, _i, _len, _results;
      this.clear();
      _results = [];
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        model = models[_i];
        _results.push(this.addItem(model));
      }
      return _results;
    };

    CloneControlView.prototype.removeItem = function(model) {
      var item,
        _this = this;
      item = this.item_list.find(function(e) {
        return e.get("origin_model") === model;
      });
      this.item_list.remove(item);
      return this.lazyRender();
    };

    CloneControlView.prototype.addItem = function(model) {
      var elm, item, matrix;
      elm = model.el.cloneNode(true);
      $(elm).attr({
        "pointer-events": "none"
      });
      matrix = this.item.getLocalMatrix().inverse().multiply(model.getLocalMatrix());
      SVGUtil.setMatrixTransform(elm, matrix);
      this.$el.append(elm);
      item = new SvgElement();
      item.setElement(elm);
      item.set("origin_model", model);
      this.item_list.add(item);
      this.lazyRender();
      return item;
    };

    CloneControlView.prototype.clear = function() {
      var _results;
      this.$el.attr("transform", "");
      this.$el.empty();
      this.line_list_view.clear();
      _results = [];
      while (this.item_list.length > 0) {
        _results.push(this.item_list.remove(this.item_list.first()));
      }
      return _results;
    };

    CloneControlView.prototype.exists = function(model) {
      var _this = this;
      return this.item_list.find(function(e) {
        return e.get("origin_model") === model;
      });
    };

    CloneControlView.prototype.hide = function() {
      this.$el.hide();
      this.itemControl.hide();
      return this.line_list_view.$el.hide();
    };

    CloneControlView.prototype.show = function() {
      this.$el.show();
      this.itemControl.show();
      return this.line_list_view.$el.show();
    };

    CloneControlView.prototype.render = function() {
      if (this.mode === "copy") {
        this.$el.attr("opacity", 0.5);
      } else {
        this.$el.attr("opacity", 0);
      }
      this.itemControl.render();
      return this.line_list_view.render();
    };

    CloneControlView.prototype.lazyRender = _.debounce(CloneControlView.prototype.render, 50);

    CloneControlView.prototype.lazyShow = _.debounce(CloneControlView.prototype.show, 10);

    CloneControlView.prototype._setControlViewEvent = function(view) {
      var _this = this;
      return view.bind("onMouseDown", function(obj, e) {
        return _this.onEvent("onMouseDown", obj, e);
      });
    };

    CloneControlView.prototype.onEvent = function(event, sender, e, options) {
      if ((sender instanceof PositionControl) || (sender instanceof ScaleControl) || (sender instanceof RotateControl) || (sender instanceof RotateAxisControl)) {
        if (event === "onMouseDown") {
          if (e.altKey) {
            return this._copyMode(sender, e);
          } else {
            this.cancelEvent(e);
            return this.attachDragEvent(sender, e);
          }
        }
      } else if (sender instanceof SvgElementView) {
        if (event === "onMouseDown") {
          this.cancelEvent(e);
          return this.itemControl.position_control.onMouseDown(e);
        }
      }
    };

    CloneControlView.prototype.attachDragEvent = function(sender, e) {
      var ondrop,
        _this = this;
      $(document).mousemove(sender.onDragging);
      ondrop = function(e) {
        if (sender.onDrop) {
          sender.onDrop(e);
        }
        $(document).unbind('mousemove', sender.onDragging);
        $(document).unbind('mouseup', ondrop);
        return _this.cancelEvent(e);
      };
      return $(document).mouseup(ondrop);
    };

    CloneControlView.prototype.attachCopyDragEvent = function(sender, e) {
      var ondrop,
        _this = this;
      this.mode = "copy";
      this.$el.show();
      this.$el.attr("opacity", 0.5);
      $(document).mousemove(sender.onDragging);
      ondrop = function(e) {
        _this.mode = "";
        if (sender.onDrop) {
          sender.onDrop(e);
        }
        $(document).unbind('mousemove', sender.onDragging);
        $(document).unbind('mouseup', ondrop);
        _this.$el.attr("opacity", 0);
        _this.setItems(_this._createCopyItems());
        return _this.cancelEvent(e);
      };
      return $(document).mouseup(ondrop);
    };

    CloneControlView.prototype._copyMode = function(sender, e) {
      this.line_list_view.$el.show();
      this.line_list_view.render();
      this.itemControl.clear();
      this.stopListening();
      this.listenTo(this.item, "change", this.update);
      this.itemControl.show();
      this.itemControl.setItem(this.item);
      this.itemControl.render();
      this.cancelEvent(e);
      return this.attachCopyDragEvent(sender, e);
    };

    CloneControlView.prototype._createCopyItems = function() {
      var copy_items, matrix, orderd_list,
        _this = this;
      matrix = this.item.getLocalMatrix();
      copy_items = [];
      orderd_list = this.item_list.sortBy(function(item) {
        var el;
        el = item.get("origin_model").el;
        return $(el).index();
      });
      _(orderd_list).each(function(item) {
        var el, local;
        local = item.getLocalMatrix();
        item.setMatrix(matrix.multiply(local));
        el = item.el.cloneNode(true);
        $(el).removeAttr("pointer-events");
        return copy_items.push(_this.canvas.addElement(el));
      });
      return copy_items;
    };

    CloneControlView.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    return CloneControlView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ContextMenuView = (function(_super) {
    __extends(ContextMenuView, _super);

    function ContextMenuView() {
      this.onItemMenuClick = __bind(this.onItemMenuClick, this);
      this.onContextMenu = __bind(this.onContextMenu, this);
      this.initialize = __bind(this.initialize, this);
      _ref = ContextMenuView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ContextMenuView.prototype.events = {
      "contextmenu": "onContextMenu"
    };

    ContextMenuView.prototype.actions = {
      "flipX": function() {
        return cloneControlView.getControlItem().flipX();
      },
      "flipY": function() {
        return cloneControlView.getControlItem().flipY();
      },
      "forward": function() {
        return orderControl.bringForward();
      },
      "back": function() {
        return orderControl.bringBack();
      },
      "top": function() {
        return orderControl.toTop();
      },
      "bottom": function() {
        return orderControl.toBottom();
      },
      "group": function() {
        return SvgCanvasBase.groupSelectedItem();
      },
      "ungroup": function() {
        return SvgCanvasBase.unGroupSelectedItem();
      },
      "addFolder": function() {
        return SvgCanvasBase.addFolderSelectedItem();
      },
      "unite": function() {
        return excutePathBoolean("unite");
      },
      "intersect": function() {
        return excutePathBoolean("intersect");
      },
      "subtract": function() {
        return excutePathBoolean("subtract");
      },
      "divide": function() {
        return excutePathBoolean("divide");
      },
      "exclude": function() {
        return excutePathBoolean("exclude");
      }
    };

    ContextMenuView.prototype.initialize = function() {
      var _this = this;
      this.$contextMenu = $("#contextMenu");
      this.$contextMenu.on("click a", this.onItemMenuClick);
      return $(document).click(function() {
        return $("#contextMenu").css("visibility", "hidden");
      });
    };

    ContextMenuView.prototype.getPosition = function(e) {
      var $menu, boundsX, boundsY, menuHeight, menuWidth, mouseX, mouseY, x, y;
      $menu = this.$contextMenu;
      mouseX = e.clientX;
      mouseY = e.clientY;
      boundsX = $(window).width();
      boundsY = $(window).height();
      menuWidth = $menu.find('.dropdown-menu').outerWidth();
      menuHeight = $menu.find('.dropdown-menu').outerHeight();
      if (mouseY + menuHeight > boundsY) {
        y = mouseY - menuHeight + $(window).scrollTop();
      } else {
        y = mouseY + $(window).scrollTop();
      }
      if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
        x = mouseX - menuWidth + $(window).scrollLeft();
      } else {
        x = mouseX + $(window).scrollLeft();
      }
      return {
        x: x,
        y: y
      };
    };

    ContextMenuView.prototype.onContextMenu = function(e) {
      var pos;
      pos = this.getPosition(e);
      this.$contextMenu.css({
        visibility: "visible",
        left: pos.x,
        top: pos.y
      });
      e.preventDefault();
      return false;
    };

    ContextMenuView.prototype.onItemMenuClick = function(e) {
      var $a, action;
      $a = $(e.target);
      action = $a.data("action");
      return this.actions[action]();
    };

    return ContextMenuView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.LinePositionControl = (function(_super) {
    __extends(LinePositionControl, _super);

    function LinePositionControl() {
      this.render = __bind(this.render, this);
      this.onDrop = __bind(this.onDrop, this);
      this.onDragging = __bind(this.onDragging, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.isVisible = __bind(this.isVisible, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      _ref = LinePositionControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    LinePositionControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown"
      };
    };

    LinePositionControl.prototype.initialize = function() {
      this.getItem = this.options.get_item;
      this.setStyle();
      return this.type = this.options.type;
    };

    LinePositionControl.prototype.setStyle = function() {
      return $(this.el).attr({
        "stroke": "black",
        "stroke-width": "1",
        "fill": "lightblue",
        "opacity": 0.8,
        "width": 16,
        "height": 16,
        "x": 0,
        "y": 0
      });
    };

    LinePositionControl.prototype.hide = function() {
      return this.$el.hide();
    };

    LinePositionControl.prototype.show = function() {
      return this.$el.show();
    };

    LinePositionControl.prototype.isVisible = function() {
      return this.$el.css("display") !== "none";
    };

    LinePositionControl.prototype.onMouseDown = function(e) {
      this.pre_position = e;
      console.log("onMouseDown LinePositionControl");
      $(document).mousemove(this.onDragging);
      $(document).mouseup(this.onDrop);
      e.preventDefault();
      return e.stopPropagation();
    };

    LinePositionControl.prototype.onDragging = function(e) {
      var attr, point;
      point = SVGUtil.createPoint(e.offsetX, e.offsetY);
      point = point.matrixTransform(this.getItem().getCTM().inverse());
      attr = {};
      attr["x" + this.type] = point.x;
      attr["y" + this.type] = point.y;
      return this.getItem().attr(attr);
    };

    LinePositionControl.prototype.onDrop = function(e) {
      this.trigger("onDrop", this);
      $(document).unbind("mousemove", this.onDragging);
      return $(document).unbind("mouseup", this.onDrop);
    };

    LinePositionControl.prototype.render = function(e) {
      var ctm, item, point;
      if (this.isVisible()) {
        item = this.getItem();
        ctm = item.el.getCTM();
        this.x = parseInt($(item.el).attr("x" + this.type));
        this.y = parseInt($(item.el).attr("y" + this.type));
        point = SVGUtil.createPoint(this.x, this.y);
        point = point.matrixTransform(ctm);
        return this.$el.attr({
          "x": point.x - 8,
          "y": point.y - 8
        });
      }
    };

    return LinePositionControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PositionControl = (function(_super) {
    __extends(PositionControl, _super);

    function PositionControl() {
      this._getMovedPosition = __bind(this._getMovedPosition, this);
      this.movePosition = __bind(this.movePosition, this);
      this._getMoveMatrix = __bind(this._getMoveMatrix, this);
      this._getMoveCtmMatrix = __bind(this._getMoveCtmMatrix, this);
      this._getItemCoordPos = __bind(this._getItemCoordPos, this);
      this.onDrop = __bind(this.onDrop, this);
      this._snappingItem = __bind(this._snappingItem, this);
      this._snapPoints = __bind(this._snapPoints, this);
      this._getMovedControlPosition = __bind(this._getMovedControlPosition, this);
      this.onDragging = __bind(this.onDragging, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      _ref = PositionControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PositionControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown"
      };
    };

    PositionControl.prototype.initialize = function() {
      return this.getItem = this.options.get_item;
    };

    PositionControl.prototype.onMouseDown = function(e) {
      this.trigger("onMouseDown", this, e);
      this.pre_position = e;
      this.pre_matrix = this.getItem().getLocalMatrix();
      return this.pre_ctm = this.getItem().getCTM();
    };

    PositionControl.prototype.onDragging = function(e) {
      var pos;
      pos = this._getMovedControlPosition(e);
      if (e.altKey) {
        snap_line_view.clear();
        snap_line_view.render();
        this.movePosition(pos);
      } else {
        this._snappingItem(e);
      }
      return this.trigger("onDragging", this, e);
    };

    PositionControl.prototype._getMovedControlPosition = function(e) {
      var pos;
      pos = this._getMovedPosition(e);
      if (e.shiftKey) {
        if (Math.abs(pos.x) > Math.abs(pos.y)) {
          pos.y = 0;
        } else {
          pos.x = 0;
        }
      }
      return pos;
    };

    PositionControl.prototype._snapPoints = function(pos) {
      var center_point, points;
      points = this.getItem()._getMatrixBBoxPoints(this._getMoveCtmMatrix(pos));
      center_point = SVGUtil.createPoint((points[0].x + points[3].x) / 2, (points[0].y + points[3].y) / 2);
      points.push(center_point);
      return points;
    };

    PositionControl.prototype._snappingItem = function(e) {
      var movep, pos;
      pos = this._getMovedControlPosition(e);
      movep = Snapping.getSnap(this._snapPoints(pos));
      pos.x = pos.x - movep.x;
      pos.y = pos.y - movep.y;
      return this.movePosition(pos);
    };

    PositionControl.prototype.onDrop = function(e) {
      return this.trigger("onDrop", this);
    };

    PositionControl.prototype._getItemCoordPos = function(pos) {
      var item, matrix_inverse, move;
      item = this.getItem();
      move = SVGUtil.createPoint(pos.x, pos.y);
      matrix_inverse = item.getCTM().inverse();
      matrix_inverse.e = 0;
      matrix_inverse.f = 0;
      return move = move.matrixTransform(matrix_inverse);
    };

    PositionControl.prototype._getMoveCtmMatrix = function(pos) {
      var move;
      move = this._getItemCoordPos(pos);
      return this.pre_ctm.translate(move.x, move.y);
    };

    PositionControl.prototype._getMoveMatrix = function(pos) {
      var move;
      move = this._getItemCoordPos(pos);
      return this.pre_matrix.translate(move.x, move.y);
    };

    PositionControl.prototype.movePosition = function(pos) {
      return this.getItem().setMatrix(this._getMoveMatrix(pos));
    };

    PositionControl.prototype._getMovedPosition = function(e) {
      var dx, dy;
      dx = e.pageX - this.pre_position.pageX;
      dy = e.pageY - this.pre_position.pageY;
      return {
        x: dx,
        y: dy
      };
    };

    return PositionControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.RotateAxisControl = (function(_super) {
    __extends(RotateAxisControl, _super);

    function RotateAxisControl() {
      this.render_rotate_point = __bind(this.render_rotate_point, this);
      this.render_control_point = __bind(this.render_control_point, this);
      this.render = __bind(this.render, this);
      this.setRotate = __bind(this.setRotate, this);
      this.rotatePoint = __bind(this.rotatePoint, this);
      this.onDragging = __bind(this.onDragging, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.getRotateAxisPoint = __bind(this.getRotateAxisPoint, this);
      _ref = RotateAxisControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RotateAxisControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown"
      };
    };

    RotateAxisControl.prototype.initialize = function() {
      this.rotate_point_el = this.options.rotate_point_el;
      this.getItem = this.options.get_item;
      this.setStyle();
      this.rotate_point_view = new RotatePointControl({
        el: this.rotate_point_el
      });
      return this.rotate_point_view.bind("change", this.render);
    };

    RotateAxisControl.prototype.setStyle = function() {
      return $(this.el).attr({
        "stroke": "black",
        "stroke-width": "1",
        "fill": "lightblue",
        "r": "8"
      });
    };

    RotateAxisControl.prototype.getRotateAxisPoint = function() {
      return this.rotate_point_view.point;
    };

    RotateAxisControl.prototype.onMouseDown = function(e) {
      var center;
      this.trigger("onMouseDown", this, e);
      this._origin_matrix = this.getItem().getLocalMatrix();
      this._origin_rotate_point = this.getRotateAxisPoint().matrixTransform(SvgCanvasBase.mainCanvas.getScreenCTM());
      center = this.getItem().getCentorPoint();
      return this._origin_degree = this._radianToDegree(this._radian(center, this._origin_rotate_point));
    };

    RotateAxisControl.prototype.onDragging = function(e) {
      var degree, div, idx, mouse_point, p, rot_degree, snap_degree, _i, _len, _ref1;
      mouse_point = SVGUtil.createPoint(e.pageX, e.pageY);
      degree = this._radianToDegree(this._radian(mouse_point, this._origin_rotate_point));
      rot_degree = degree;
      snap_degree = 15;
      if (e.shiftKey) {
        div = parseInt(degree / snap_degree);
        _ref1 = [snap_degree * div, snap_degree * (div - 1)];
        for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
          p = _ref1[idx];
          if (Math.abs(p - degree) < 10) {
            rot_degree = p;
          }
        }
      }
      return this.setRotate(rot_degree, this.rotatePoint());
    };

    RotateAxisControl.prototype.rotatePoint = function() {
      return this.getRotateAxisPoint().matrixTransform(this._origin_matrix.inverse());
    };

    RotateAxisControl.prototype.setRotate = function(angle, point) {
      var matrix, transform;
      transform = d3.transform("matrix(" + SVGUtil.toStringMatrix(this._origin_matrix.translate(point.x, point.y)) + " )");
      transform.rotate = transform.rotate + angle - this._origin_degree;
      matrix = SVGUtil.TransformMatrix(transform.toString()).translate(-point.x, -point.y);
      return this.getItem().setMatrix(matrix);
    };

    RotateAxisControl.prototype._radian = function(p, origin) {
      return Math.atan2(p.y - origin.y, p.x - origin.x);
    };

    RotateAxisControl.prototype._radianToDegree = function(radian) {
      return (radian * (180 / Math.PI)) + 90;
    };

    RotateAxisControl.prototype.render = function() {
      this.render_control_point();
      return this.render_rotate_point();
    };

    RotateAxisControl.prototype.render_control_point = function() {
      var canvas, center, r, rotate_point, screen_rotate_point, x, y;
      canvas = SvgCanvasBase.mainCanvas;
      screen_rotate_point = this.getRotateAxisPoint().matrixTransform(canvas.getScreenCTM());
      center = this.getItem().getCentorPoint();
      r = Math.atan2(center.y - screen_rotate_point.y, center.x - screen_rotate_point.x);
      x = Math.cos(r) * 100;
      y = Math.sin(r) * 100;
      rotate_point = this.getRotateAxisPoint().matrixTransform(canvas.getCTM());
      this.$el.attr("cx", rotate_point.x + x);
      return this.$el.attr("cy", rotate_point.y + y);
    };

    RotateAxisControl.prototype.render_rotate_point = function() {
      return this.rotate_point_view.render();
    };

    return RotateAxisControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.RotateControl = (function(_super) {
    __extends(RotateControl, _super);

    function RotateControl() {
      this.render_control_point_adove_item = __bind(this.render_control_point_adove_item, this);
      this.render = __bind(this.render, this);
      this.setRotate2 = __bind(this.setRotate2, this);
      this.setRotate = __bind(this.setRotate, this);
      this.rotatePoint = __bind(this.rotatePoint, this);
      this.onDrop = __bind(this.onDrop, this);
      this.onDragging = __bind(this.onDragging, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      _ref = RotateControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RotateControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown"
      };
    };

    RotateControl.prototype.initialize = function() {
      this.rotate_point_el = this.options.rotate_point_el;
      this.getItem = this.options.get_item;
      return this.setStyle();
    };

    RotateControl.prototype.setStyle = function() {
      return $(this.el).attr({
        "stroke": "black",
        "stroke-width": "1",
        "fill": "lightgreen",
        "r": "8"
      });
    };

    RotateControl.prototype.onMouseDown = function(e) {
      this.trigger("onMouseDown", this, e);
      this._origin_matrix = this.getItem().getLocalMatrix();
      return this._origin_rotate_point = this.getItem().getCentorPoint();
    };

    RotateControl.prototype.onDragging = function(e) {
      var degree, div, idx, mouse_point, p, rot_degree, snap_degree, _i, _len, _ref1;
      mouse_point = SVGUtil.createPoint(e.pageX, e.pageY);
      degree = this._radianToDegree(this._radian(mouse_point, this._origin_rotate_point));
      rot_degree = degree;
      snap_degree = 15;
      if (e.shiftKey) {
        div = parseInt(degree / snap_degree);
        _ref1 = [snap_degree * div, snap_degree * (div - 1)];
        for (idx = _i = 0, _len = _ref1.length; _i < _len; idx = ++_i) {
          p = _ref1[idx];
          if (Math.abs(p - degree) < 10) {
            rot_degree = p;
          }
        }
      }
      return this.setRotate(rot_degree, this.rotatePoint());
    };

    RotateControl.prototype.onDrop = function(e) {
      return console.log("RotateControl onDrop");
    };

    RotateControl.prototype.rotatePoint = function() {
      var bbox, point;
      bbox = this.getItem().getBBox();
      point = SVGUtil.createPoint((bbox.width / 2) + bbox.x, (bbox.height / 2) + bbox.y);
      return point;
    };

    RotateControl.prototype.setRotate = function(angle, point) {
      var matrix, transform;
      transform = d3.transform("matrix(" + SVGUtil.toStringMatrix(this._origin_matrix.translate(point.x, point.y)) + " )");
      transform.rotate = angle;
      matrix = SVGUtil.TransformMatrix(transform.toString()).translate(-point.x, -point.y);
      return this.getItem().setMatrix(matrix);
    };

    RotateControl.prototype.setRotate2 = function(angle) {
      var matrix, point;
      point = this.rotatePoint();
      matrix = this._origin_matrix.translate(point.x, point.y).rotate(angle).translate(-point.x, -point.y);
      return this.getItem().setMatrix(matrix);
    };

    RotateControl.prototype._radian = function(p, origin) {
      return Math.atan2(p.y - origin.y, p.x - origin.x);
    };

    RotateControl.prototype._radianToDegree = function(radian) {
      return (radian * (180 / Math.PI)) + 90;
    };

    RotateControl.prototype.render = function() {
      return this.render_control_point_adove_item();
    };

    RotateControl.prototype.render_control_point_adove_item = function() {
      var ctm, element, group, point, point2, point3, svg, svg_matrix, svg_rect, transform;
      svg_rect = this.getItem().getBBox();
      svg = SVGUtil.SVG;
      group = SVGUtil.createTag("g");
      point = svg.createSVGPoint();
      point.x = svg_rect.x + svg_rect.width / 2;
      point.y = svg_rect.y + svg_rect.height / 2;
      point2 = svg.createSVGPoint();
      point2.x = 0;
      point2.y = -svg_rect.height / 2;
      ctm = this.getItem().getCTM();
      point = point.matrixTransform(ctm);
      ctm.e = 0;
      ctm.f = 0;
      transform = SVGUtil.toD3Transform(ctm);
      svg_matrix = SVGUtil.SVG.createSVGMatrix();
      svg_matrix = svg_matrix.translate(transform.translate[0], transform.translate[1]);
      svg_matrix = svg_matrix.scaleNonUniform(transform.scale[0], transform.scale[1]);
      svg_matrix = svg_matrix.rotate(transform.rotate);
      transform.skew = 0;
      group.setAttribute("transform", transform.toString());
      point2 = point2.matrixTransform(group.getCTM());
      point3 = svg.createSVGPoint();
      point3.x = 0;
      point3.y = -30;
      transform = SVGUtil.toD3Transform(ctm);
      transform.scale[0] = 1;
      transform.scale[1] = 1;
      transform.skew = 0;
      group.setAttribute("transform", transform.toString());
      point3 = point3.matrixTransform(group.getCTM());
      element = $(this.el);
      element.attr("cx", point.x + point2.x + point3.x);
      return element.attr("cy", point.y + point2.y + point3.y);
    };

    return RotateControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.RotatePointControl = (function(_super) {
    __extends(RotatePointControl, _super);

    function RotatePointControl() {
      this.render = __bind(this.render, this);
      this.onMouseDrop = __bind(this.onMouseDrop, this);
      this.onMouseMove = __bind(this.onMouseMove, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.setPoint = __bind(this.setPoint, this);
      _ref = RotatePointControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RotatePointControl.prototype.initialize = function() {
      this.point = SVGUtil.createPoint(250, 250);
      return this.setStyle();
    };

    RotatePointControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown"
      };
    };

    RotatePointControl.prototype.setStyle = function() {
      return $(this.el).attr({
        "stroke": "black",
        "stroke-width": "3",
        "fill": "white",
        "fill-opacity": 1,
        "r": "6"
      });
    };

    RotatePointControl.prototype.setPoint = function(x, y) {
      this.point.x = x;
      this.point.y = y;
      return this.trigger("change", this);
    };

    RotatePointControl.prototype.onMouseDown = function(e) {
      $(document).mousemove(this.onMouseMove);
      $(document).mouseup(this.onMouseDrop);
      e.preventDefault();
      return e.stopPropagation();
    };

    RotatePointControl.prototype.onMouseMove = function(e) {
      var mouse_p, movep;
      mouse_p = SVGUtil.createPoint(e.offsetX, e.offsetY);
      movep = Snapping.getSnap([mouse_p], false);
      mouse_p = SVGUtil.createPoint(e.offsetX - movep.x, e.offsetY - movep.y);
      mouse_p = mouse_p.matrixTransform(SvgCanvasBase.mainCanvas.getCTM().inverse());
      return this.setPoint(mouse_p.x, mouse_p.y);
    };

    RotatePointControl.prototype.onMouseDrop = function(e) {
      $(document).unbind('mousemove', this.onMouseMove);
      return $(document).unbind('mouseup', this.onMouseDrop);
    };

    RotatePointControl.prototype.render = function() {
      var point;
      point = this.point.matrixTransform(SvgCanvasBase.mainCanvas.getCTM());
      this.$el.attr("cx", point.x);
      return this.$el.attr("cy", point.y);
    };

    return RotatePointControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ScaleControl = (function(_super) {
    __extends(ScaleControl, _super);

    function ScaleControl() {
      this.renderForRect = __bind(this.renderForRect, this);
      this.renderForCircle = __bind(this.renderForCircle, this);
      this.render = __bind(this.render, this);
      this.onDrop = __bind(this.onDrop, this);
      this.setCenterScale = __bind(this.setCenterScale, this);
      this.setScale = __bind(this.setScale, this);
      this.getSnapPoint = __bind(this.getSnapPoint, this);
      this.onDragging = __bind(this.onDragging, this);
      this._getScaleMatrix = __bind(this._getScaleMatrix, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.saveValue = __bind(this.saveValue, this);
      this.controlPosition = __bind(this.controlPosition, this);
      this.fixedPosition = __bind(this.fixedPosition, this);
      this.yAxis = __bind(this.yAxis, this);
      this.xAxis = __bind(this.xAxis, this);
      this.setStyleForRect = __bind(this.setStyleForRect, this);
      this.setStyleForCircle = __bind(this.setStyleForCircle, this);
      _ref = ScaleControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ScaleControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown"
      };
    };

    ScaleControl.prototype.initialize = function() {
      this.pos = this.options.pos;
      this.selectView = this.options.selectView;
      this.getItem = this.options.get_item;
      return this.setStyle();
    };

    ScaleControl.prototype.setStyle = function() {
      $(this.el).attr("stroke-width", "1");
      $(this.el).attr("fill", "lightblue");
      return this.setStyleForRect();
    };

    ScaleControl.prototype.setStyleForCircle = function() {
      this.mark_size = 8;
      $(this.el).attr("stroke", "black");
      $(this.el).attr("fill-opacity", "0.5");
      return $(this.el).attr("r", this.mark_size);
    };

    ScaleControl.prototype.setStyleForRect = function() {
      this.mark_size = 10;
      $(this.el).attr("stroke", "blue");
      $(this.el).attr("stroke-width", "0.5");
      $(this.el).attr("fill-opacity", "0.7");
      $(this.el).attr("stroke", "blue");
      $(this.el).attr("x", 0);
      $(this.el).attr("y", 0);
      $(this.el).attr("width", this.mark_size);
      return $(this.el).attr("height", this.mark_size);
    };

    ScaleControl.prototype.xAxis = function() {
      return this.getItem().getPosition({
        x: this.pos.x,
        y: this.pos.y * -1
      });
    };

    ScaleControl.prototype.yAxis = function() {
      return this.getItem().getPosition({
        x: this.pos.x * -1,
        y: this.pos.y
      });
    };

    ScaleControl.prototype.fixedPosition = function() {
      return this.getItem().getPosition({
        x: this.pos.x * -1,
        y: this.pos.y * -1
      });
    };

    ScaleControl.prototype.controlPosition = function() {
      return this.getItem().getPosition(this.pos);
    };

    ScaleControl.prototype.saveValue = function() {
      var item;
      this._pre_vec_x = this._getVecPoint(this.controlPosition(), this.xAxis());
      this._pre_vec_y = this._getVecPoint(this.controlPosition(), this.yAxis());
      item = this.getItem();
      this.pre_fixed_point = this.fixedPosition();
      this.pre_control_point = this.controlPosition();
      this.pre_center_point = item.getCentorPoint();
      this._pre_vec = this._getVecPoint(this.fixedPosition(), this.controlPosition());
      this.origin_ctm = item.getLocalMatrix();
      this.origin_bbox = item.getBBox();
      return this.origin_attribute = {
        width: $(item.el).attr("width"),
        height: $(item.el).attr("height"),
        r: $(item.el).attr("r"),
        rx: $(item.el).attr("rx"),
        ry: $(item.el).attr("ry")
      };
    };

    ScaleControl.prototype.onMouseDown = function(e) {
      this.trigger("onMouseDown", this, e);
      return this.saveValue();
    };

    ScaleControl.prototype._getVecPoint = function(p1, p2) {
      return SVGUtil.createPoint(p2.x - p1.x, p2.y - p1.y);
    };

    ScaleControl.prototype._getScaleMatrix = function() {
      var m;
      m = SVGUtil.SVG.createSVGMatrix();
      m.a = this._pre_vec_y.x;
      m.b = this._pre_vec_y.y;
      m.c = this._pre_vec_x.x;
      m.d = this._pre_vec_x.y;
      return m;
    };

    ScaleControl.prototype.onDragging = function(e) {
      var control_vec, m, scale, snap_point, x_scale, y_scale;
      snap_point = this.getSnapPoint(e);
      control_vec = this._getVecPoint(this.pre_fixed_point, snap_point);
      m = this._getScaleMatrix();
      scale = control_vec.matrixTransform(m.inverse());
      x_scale = -scale.x;
      y_scale = -scale.y;
      if (e.shiftKey) {
        if (Math.abs(x_scale) > Math.abs(y_scale)) {
          y_scale = x_scale;
        } else {
          x_scale = y_scale;
        }
      }
      if (e.altKey) {
        return this.setCenterScale((x_scale * 2) - 1, (y_scale * 2) - 1);
      } else {
        return this.setScale(x_scale, y_scale);
      }
    };

    ScaleControl.prototype.getSnapPoint = function(e) {
      var mouse_p, movep, snap_points;
      snap_points = [];
      mouse_p = SVGUtil.createPoint(e.offsetX, e.offsetY);
      movep = Snapping.getSnap([mouse_p]);
      return SVGUtil.createPoint(mouse_p.x - movep.x, mouse_p.y - movep.y);
    };

    ScaleControl.prototype.setScale = function(x_scale, y_scale) {
      var box_height, box_width, item, matrix, move_bbox_height, move_bbox_width, move_bbox_x, move_bbox_y, move_height, move_width, move_x, move_y, set_rx, set_ry, x_value, y_value;
      item = this.getItem();
      if (item.el.tagName === "rect") {
        x_value = Math.abs(this.origin_attribute.width * x_scale);
        y_value = Math.abs(this.origin_attribute.height * y_scale);
        move_width = x_value - this.origin_attribute.width;
        move_height = y_value - this.origin_attribute.height;
        item.attr({
          "width": x_value,
          "height": y_value
        });
        if (this.pos.x !== -1) {
          move_width = 0;
        }
        if (this.pos.y !== -1) {
          move_height = 0;
        }
        matrix = this.origin_ctm.translate(-move_width, -move_height);
      } else if (item.el.tagName === "circle") {
        x_value = Math.abs(this.origin_attribute.r * x_scale);
        y_value = Math.abs(this.origin_attribute.r * y_scale);
        if (!(this instanceof ScaleOneAxisControl)) {
          y_value = x_value;
        }
        set_rx = x_value - this.origin_attribute.r;
        set_ry = y_value - this.origin_attribute.r;
        if (this instanceof ScaleOneAxisControl && this.axis_type === "y") {
          item.attr({
            "r": y_value
          });
        } else {
          item.attr({
            "r": x_value
          });
        }
        if (this.pos.x !== -1) {
          set_rx = -set_rx;
        }
        if (this.pos.y !== -1) {
          set_ry = -set_ry;
        }
        matrix = this.origin_ctm.translate(-set_rx, -set_ry);
      } else if (item.el.tagName === "ellipse") {
        x_value = Math.abs(this.origin_attribute.rx * x_scale);
        y_value = Math.abs(this.origin_attribute.ry * y_scale);
        set_rx = x_value - this.origin_attribute.rx;
        set_ry = y_value - this.origin_attribute.ry;
        item.attr({
          "rx": x_value,
          "ry": y_value
        });
        if (this.pos.x !== -1) {
          set_rx = -set_rx;
        }
        if (this.pos.y !== -1) {
          set_ry = -set_ry;
        }
        matrix = this.origin_ctm.translate(-set_rx, -set_ry);
      } else {
        box_width = this.origin_bbox.width;
        box_height = this.origin_bbox.height;
        move_bbox_x = (this.origin_bbox.x * x_scale) - this.origin_bbox.x;
        move_bbox_y = (this.origin_bbox.y * y_scale) - this.origin_bbox.y;
        move_bbox_width = (box_width * x_scale) - box_width;
        move_bbox_height = (box_height * y_scale) - box_height;
        if (this.pos.x !== -1) {
          move_x = move_bbox_x;
        } else {
          move_x = move_bbox_width + move_bbox_x;
        }
        if (this.pos.y !== -1) {
          move_y = move_bbox_y;
        } else {
          move_y = move_bbox_height + move_bbox_y;
        }
        matrix = this.origin_ctm.translate(-move_x, -move_y);
        matrix = matrix.scaleNonUniform(x_scale, y_scale);
      }
      return item.setMatrix(matrix);
    };

    ScaleControl.prototype.setCenterScale = function(x_scale, y_scale) {
      var box_height, box_width, item, matrix, move_bbox_height, move_bbox_width, move_bbox_x, move_bbox_y, move_height, move_width, move_x, move_y, set_rx, set_ry, x_value, y_value;
      item = this.getItem();
      if (item.el.tagName === "rect") {
        x_value = Math.abs(this.origin_attribute.width * x_scale);
        y_value = Math.abs(this.origin_attribute.height * y_scale);
        move_width = x_value - this.origin_attribute.width;
        move_height = y_value - this.origin_attribute.height;
        item.attr({
          "width": x_value,
          "height": y_value
        });
        matrix = this.origin_ctm.translate(-move_width / 2, -move_height / 2);
      } else if (item.el.tagName === "circle") {
        x_value = Math.abs(this.origin_attribute.r * x_scale);
        y_value = Math.abs(this.origin_attribute.r * y_scale);
        set_rx = x_value - this.origin_attribute.r;
        set_ry = y_value - this.origin_attribute.r;
        item.attr({
          "r": x_value
        });
        matrix = this.origin_ctm;
      } else if (item.el.tagName === "ellipse") {
        x_value = Math.abs(this.origin_attribute.rx * x_scale);
        y_value = Math.abs(this.origin_attribute.ry * y_scale);
        set_rx = x_value - this.origin_attribute.rx;
        set_ry = y_value - this.origin_attribute.ry;
        item.attr({
          "rx": x_value,
          "ry": y_value
        });
        matrix = this.origin_ctm;
      } else {
        box_width = this.origin_bbox.width;
        box_height = this.origin_bbox.height;
        move_bbox_x = (this.origin_bbox.x * x_scale) - this.origin_bbox.x;
        move_bbox_y = (this.origin_bbox.y * y_scale) - this.origin_bbox.y;
        move_bbox_width = (box_width * x_scale) - box_width;
        move_bbox_height = (box_height * y_scale) - box_height;
        move_y = move_bbox_height / 2 + move_bbox_y;
        move_x = move_bbox_width / 2 + move_bbox_x;
        matrix = this.origin_ctm.translate(-move_x, -move_y);
        matrix = matrix.scaleNonUniform(x_scale, y_scale);
      }
      return item.setMatrix(matrix);
    };

    ScaleControl.prototype.onDrop = function() {
      return console.log("ScaleControl onDrop");
    };

    ScaleControl.prototype.render = function() {
      return this.renderForRect();
    };

    ScaleControl.prototype.renderForCircle = function() {
      $(this.el).attr("cx", this.controlPosition().x);
      return $(this.el).attr("cy", this.controlPosition().y);
    };

    ScaleControl.prototype.renderForRect = function() {
      var cx, cy;
      cx = this.controlPosition().x;
      cy = this.controlPosition().y;
      $(this.el).attr("x", cx - this.mark_size / 2);
      return $(this.el).attr("y", cy - this.mark_size / 2);
    };

    return ScaleControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ScaleControlSet = (function(_super) {
    __extends(ScaleControlSet, _super);

    function ScaleControlSet() {
      this.createScaleControl = __bind(this.createScaleControl, this);
      this.createScaleOneAxixControl = __bind(this.createScaleOneAxixControl, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      _ref = ScaleControlSet.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ScaleControlSet.prototype.initialize = function() {
      var h, height_pos, idex, idx, idx2, obj, position, w, width_pos, _i, _len, _ref1, _results;
      this.selectView = this.options.selectView;
      this.getItem = this.options.get_item;
      this.scale_controls = [];
      width_pos = {
        left: -1,
        center: 0,
        right: 1
      };
      height_pos = {
        top: -1,
        center: 0,
        bottom: 1
      };
      this.positions = {};
      for (w in width_pos) {
        idx2 = width_pos[w];
        for (h in height_pos) {
          idx = height_pos[h];
          position = {
            name: w + "-" + h,
            pos: {
              x: idx2,
              y: idx
            }
          };
          this.positions[position.name] = position;
        }
      }
      for (w in width_pos) {
        idx2 = width_pos[w];
        for (h in height_pos) {
          idx = height_pos[h];
          if (w === "center" && h === "center") {
            continue;
          }
          if (w === "center" || h === "center") {
            this.scale_controls.push(this.createScaleOneAxixControl(w + "-" + h));
          } else {
            this.scale_controls.push(this.createScaleControl(w + "-" + h));
          }
        }
      }
      _ref1 = this.scale_controls;
      _results = [];
      for (idex = _i = 0, _len = _ref1.length; _i < _len; idex = ++_i) {
        obj = _ref1[idex];
        _results.push($(this.el).append(obj.el));
      }
      return _results;
    };

    ScaleControlSet.prototype.hide = function() {
      return this.$el.hide();
    };

    ScaleControlSet.prototype.show = function() {
      return this.$el.show();
    };

    ScaleControlSet.prototype.render = function() {
      var _this = this;
      return _.each(this.scale_controls, function(control) {
        return control.render();
      });
    };

    ScaleControlSet.prototype.createScaleOneAxixControl = function(pos_name) {
      var control, type;
      control = this.positions[pos_name];
      type = control.pos.x === 0 ? "y" : "x";
      return new ScaleOneAxisControl({
        selectView: this.selectView,
        el: SVGUtil.createTag("rect"),
        pos: control.pos,
        axis_type: type,
        get_item: this.getItem
      });
    };

    ScaleControlSet.prototype.createScaleControl = function(pos_name) {
      var control;
      control = this.positions[pos_name];
      return new ScaleControl({
        selectView: this.selectView,
        el: SVGUtil.createTag("rect"),
        pos: control.pos,
        get_item: this.getItem
      });
    };

    return ScaleControlSet;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ScaleOneAxisControl = (function(_super) {
    __extends(ScaleOneAxisControl, _super);

    function ScaleOneAxisControl() {
      this.onDragging = __bind(this.onDragging, this);
      _ref = ScaleOneAxisControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ScaleOneAxisControl.prototype.initialize = function() {
      this.pos = this.options.pos;
      this.selectView = this.options.selectView;
      this.axis_type = this.options.axis_type;
      this.getItem = this.options.get_item;
      return this.setStyle();
    };

    ScaleOneAxisControl.prototype._getDotVec = function(v1, v2) {
      return VectorUtil.dot(v1, v2);
    };

    ScaleOneAxisControl.prototype._getDist = function(v) {
      return Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2));
    };

    ScaleOneAxisControl.prototype.onDragging = function(e) {
      var dist, scale, snap_point, x_scale, y_scale;
      snap_point = this.getSnapPoint(e);
      this.control_vec = this._getVecPoint(this.pre_fixed_point, snap_point);
      dist = this._getDist(this._pre_vec);
      scale = this._getDotVec(this._pre_vec, this.control_vec) / (dist * dist);
      if (this.axis_type === "x") {
        x_scale = scale;
        y_scale = 1;
      } else {
        x_scale = 1;
        y_scale = scale;
      }
      if (e.altKey) {
        return this.setCenterScale((x_scale * 2) - 1, (y_scale * 2) - 1);
      } else {
        return this.setScale(x_scale, y_scale);
      }
    };

    return ScaleOneAxisControl;

  })(ScaleControl);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ItemControl = (function(_super) {
    __extends(ItemControl, _super);

    function ItemControl() {
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.clear = __bind(this.clear, this);
      this.setItem = __bind(this.setItem, this);
      this._removeLineView = __bind(this._removeLineView, this);
      this._createLineView = __bind(this._createLineView, this);
      this.onModelChange = __bind(this.onModelChange, this);
      this.isSelected = __bind(this.isSelected, this);
      this.getItem = __bind(this.getItem, this);
      this._appendElement = __bind(this._appendElement, this);
      _ref = ItemControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ItemControl.prototype.initialize = function() {
      var control, _i, _len, _ref1,
        _this = this;
      this.manager = this.options.manager;
      this.position_control = new PositionControl({
        get_item: this.getItem
      });
      this.scale_control_set = new ScaleControlSet({
        selectView: this,
        el: this._appendElement('g'),
        get_item: this.getItem
      });
      this.rotate_control = new RotateControl({
        el: this._appendElement('circle'),
        get_item: this.getItem
      });
      this.rotate_axis_control = new RotateAxisControl({
        el: this._appendElement('circle'),
        rotate_point_el: this._appendElement('circle'),
        get_item: this.getItem
      });
      this.line_position_control1 = new LinePositionControl({
        el: this._appendElement('rect'),
        type: "1",
        get_item: this.getItem
      });
      this.line_position_control2 = new LinePositionControl({
        el: this._appendElement('rect'),
        type: "2",
        get_item: this.getItem
      });
      _ref1 = _.union([this.position_control, this.rotate_control, this.rotate_axis_control], this.scale_control_set.scale_controls);
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        control = _ref1[_i];
        control.bind("onMouseDown", function(obj, e) {
          return _this.manager.onEvent("onMouseDown", obj, e);
        });
      }
      this.position_control.bind("onDragging", function(obj, e) {
        return _this.manager.onEvent("onDragging", obj, e);
      });
      return this.render();
    };

    ItemControl.prototype._appendElement = function(tag_name) {
      var element;
      element = SVGUtil.createTag(tag_name);
      this.$el.append(element);
      return element;
    };

    ItemControl.prototype.getItem = function() {
      return this.selectitem;
    };

    ItemControl.prototype.isSelected = function() {
      return this.selectitem != null;
    };

    ItemControl.prototype.onModelChange = function() {
      return this.render();
    };

    ItemControl.prototype._createLineView = function(item) {
      var rect_path, wrapper;
      wrapper = $("#select-line-views");
      rect_path = SVGUtil.createTag('path');
      $(wrapper).append(rect_path);
      return new SelectLineView({
        el: rect_path,
        model: item
      });
    };

    ItemControl.prototype._removeLineView = function() {
      if (this.select_line_view) {
        this.select_line_view.remove();
      }
      return this.select_line_view = void 0;
    };

    ItemControl.prototype.setItem = function(item) {
      if (this.selectitem) {
        this.selectitem.unbind("change", this.onModelChange, this);
      }
      this.selectitem = item;
      this._removeLineView();
      this.select_line_view = this._createLineView(item);
      this.select_line_view.stopListening();
      return this.selectitem.bind("change", this.onModelChange, this);
    };

    ItemControl.prototype.clear = function() {
      this._removeLineView();
      if (this.selectitem) {
        this.selectitem.unbind("change", this.onModelChange, this);
      }
      this.selectitem = void 0;
      return this.render();
    };

    ItemControl.prototype.hide = function() {
      this.$el.hide();
      if (this.select_line_view) {
        this.select_line_view.$el.hide();
      }
      return this._visible = false;
    };

    ItemControl.prototype.show = function() {
      this.$el.show();
      if (this.select_line_view) {
        this.select_line_view.$el.show();
      }
      this._visible = true;
      return this.render();
    };

    ItemControl.prototype.render = function() {
      if (!this._visible) {
        return;
      }
      if (!this.selectitem) {
        this.hide();
        return;
      }
      this.select_line_view.render();
      this.position_control.render();
      this.rotate_control.render();
      this.rotate_axis_control.render();
      this.scale_control_set.render();
      if (this.selectitem.el instanceof SVGLineElement) {
        this.line_position_control1.show();
        this.line_position_control2.show();
        this.line_position_control1.render();
        this.line_position_control2.render();
        this.scale_control_set.hide();
      } else {
        this.line_position_control1.hide();
        this.line_position_control2.hide();
        this.scale_control_set.show();
      }
      return this.trigger("render", this);
    };

    return ItemControl;

  })(Backbone.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.ElementControlMode = (function() {
    function ElementControlMode(maneger) {
      this.onStop = __bind(this.onStop, this);
      this.onStart = __bind(this.onStart, this);
      this._onSvgElementView = __bind(this._onSvgElementView, this);
      this._getRegionContainItems = __bind(this._getRegionContainItems, this);
      this._onRegionDrop = __bind(this._onRegionDrop, this);
      this._onSvgCanvas = __bind(this._onSvgCanvas, this);
      this.onEvent = __bind(this.onEvent, this);
      this.getControl = __bind(this.getControl, this);
      _.extend(this, Backbone.Events);
      this.maneger = maneger;
      this.regionView = new SelectRegionControlView({
        el: $("#select-control-region-view")
      });
    }

    ElementControlMode.prototype.getControl = function() {
      return this.maneger.getControl();
    };

    ElementControlMode.prototype.onEvent = function(event, sender, e, options) {
      if (sender instanceof SvgElementView) {
        if (sender.model.constructor === SvgElement) {
          return this._onSvgElementView.apply(this, arguments);
        }
      } else if (sender instanceof SvgCanvas) {
        return this._onSvgCanvas.apply(this, arguments);
      }
    };

    ElementControlMode.prototype._onSvgCanvas = function(event, sender, e, options) {
      var control;
      if (event === "onMouseDown" && !e.altKey) {
        control = this.getControl();
        if (e.shiftKey && (control.item_list.length > 0)) {
          return control.getControl().position_control.onMouseDown(e);
        } else {
          this.regionView.canvas = this.maneger.getCanvas();
          this.listenToOnce(this.regionView, "onRegionDrop", this._onRegionDrop);
          return this.regionView.startSelectRegion(e);
        }
      }
    };

    ElementControlMode.prototype._onRegionDrop = function(region) {
      var contain_items, control;
      contain_items = this._getRegionContainItems(this.maneger.canvas.getItems(), this.regionView);
      control = this.getControl();
      control.clear();
      if (contain_items.length > 0) {
        return control.setItems(contain_items);
      }
    };

    ElementControlMode.prototype._getRegionContainItems = function(_items, region) {
      var items,
        _this = this;
      items = _items.filter(function(item) {
        return !item.isLocked();
      });
      return items.filter(function(item) {
        return _.any(item.getBBoxPoints(), function(p) {
          return region.isContainPoint(p);
        });
      });
    };

    ElementControlMode.prototype._onSvgElementView = function(event, sender, e, options) {
      var control;
      control = this.getControl();
      if (event === "onMouseDown") {
        this.cancelEvent(e);
        if (e.shiftKey) {
          if (!control.exists(sender.model)) {
            return control.addItem(sender.model);
          } else {
            return control.removeItem(sender.model);
          }
        } else {
          if (!control.exists(sender.model)) {
            control.clear();
            control.addItem(sender.model);
          }
          return control.getControl().position_control.onMouseDown(e);
        }
      } else if (event === "onClick") {
        return this.cancelEvent(e);
      }
    };

    ElementControlMode.prototype.onStart = function() {
      return this.getControl().show();
    };

    ElementControlMode.prototype.onStop = function() {
      return this.getControl().hide();
    };

    ElementControlMode.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    return ElementControlMode;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.TextEditMode = (function() {
    function TextEditMode(maneger) {
      this._unbindTextEditor = __bind(this._unbindTextEditor, this);
      this.disable = __bind(this.disable, this);
      this.onStop = __bind(this.onStop, this);
      this.onStart = __bind(this.onStart, this);
      this.onEvent = __bind(this.onEvent, this);
      this.maneger = maneger;
      this.text_editor = new SvgTextEditor($("#text-editor-view")[0], void 0);
    }

    TextEditMode.prototype.onEvent = function(event, sender, e, options) {
      if (sender instanceof SvgElementView) {
        this.cancelEvent(e);
        if (event === "onClick") {
          if (sender.model.el instanceof SVGTextElement) {
            this.text_editor.unbindClickEvent();
            this.text_editor.setTextElement(sender.model.el);
            this.text_editor.bindEvent();
            return this.text_editor.onClickEvent(e);
          }
        }
      } else if (sender instanceof SvgCanvas) {
        if (event === "onMouseDown") {
          this.disable();
          return this.maneger.setMode("control");
        }
      }
    };

    TextEditMode.prototype.onStart = function() {};

    TextEditMode.prototype.onStop = function() {
      return this.disable();
    };

    TextEditMode.prototype.disable = function() {
      this.text_editor.unbindEvent();
      return this.text_editor.unbindClickEvent();
    };

    TextEditMode.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    TextEditMode.prototype._unbindTextEditor = function() {
      return this.text_editor.unbindClickEvent();
    };

    return TextEditMode;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.PathEditMode = (function() {
    function PathEditMode(maneger) {
      this.disable = __bind(this.disable, this);
      this.onStop = __bind(this.onStop, this);
      this.onStart = __bind(this.onStart, this);
      this._onRegionDrop = __bind(this._onRegionDrop, this);
      this.onEvent = __bind(this.onEvent, this);
      var _this = this;
      _.extend(this, Backbone.Events);
      this.maneger = maneger;
      this.regionView = new SelectRegionControlView({
        el: $("#select-path-region-view")
      });
      this.position_control = new PositionControl({
        get_item: null
      });
      this.position_control.onDragging = function(e) {
        var pos;
        pos = _this.position_control._getMovedControlPosition(e);
        return _this.position_control.movePosition(pos);
      };
      this.position_control.bind("onMouseDown", function(obj, e) {
        var ondrop;
        $(document).mousemove(_this.position_control.onDragging);
        ondrop = function(e) {
          _this.position_control.onDrop(e);
          $(document).unbind('mousemove', _this.position_control.onDragging);
          $(document).unbind('mouseup', ondrop);
          return _this.cancelEvent(e);
        };
        return $(document).mouseup(ondrop);
      });
    }

    PathEditMode.prototype.onEvent = function(event, sender, e, options) {
      var _this = this;
      if (sender instanceof SvgElementView) {
        if (event === "onClick") {
          if (sender.model.el instanceof SVGPathElement) {
            svgPathControl.setItem(sender.model);
          }
        }
        if (event === "onMouseDown") {
          this.cancelEvent(e);
          this.position_control.getItem = function() {
            return sender.model;
          };
          return this.position_control.onMouseDown(e);
        }
      } else if (sender instanceof SvgCanvas) {
        if (event === "onMouseDown" && !e.altKey) {
          this.regionView.canvas = this.maneger.getCanvas();
          this.listenToOnce(this.regionView, "onRegionDrop", this._onRegionDrop);
          return this.regionView.startSelectRegion(e);
        }
      }
    };

    PathEditMode.prototype._onRegionDrop = function(region, e) {
      var _this = this;
      return _(svgPathControl.getSegmentControls()).forEach(function(segment) {
        var is_contain;
        is_contain = region.isContainPoint(segment.getPointAtCanvas());
        if (e.shiftKey) {
          if (is_contain) {
            return segment.setSelected(true);
          }
        } else {
          return segment.setSelected(is_contain);
        }
      });
    };

    PathEditMode.prototype.onStart = function() {
      var selected_item;
      selected_item = this.maneger.getControl().firstOriginalItem();
      if (selected_item) {
        return svgPathControl.setItem(selected_item);
      }
    };

    PathEditMode.prototype.onStop = function() {
      return this.disable();
    };

    PathEditMode.prototype.disable = function() {
      return svgPathControl.clear();
    };

    PathEditMode.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    return PathEditMode;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.DrawPathMode = (function() {
    function DrawPathMode(maneger) {
      this.disable = __bind(this.disable, this);
      this.onStop = __bind(this.onStop, this);
      this.onStart = __bind(this.onStart, this);
      this.getMousePositionOfItem = __bind(this.getMousePositionOfItem, this);
      this.begin = __bind(this.begin, this);
      this.setPathCloseAction = __bind(this.setPathCloseAction, this);
      this.onMouseUp = __bind(this.onMouseUp, this);
      this.onMouseMove = __bind(this.onMouseMove, this);
      this.attachOnMouseMove = __bind(this.attachOnMouseMove, this);
      this.onEvent = __bind(this.onEvent, this);
      _.extend(this, Backbone.Events);
      this.maneger = maneger;
      this.path_control = new SvgPathControlView({
        el: $("#draw-path-control-panel")
      });
    }

    DrawPathMode.prototype.onEvent = function(event, sender, e, options) {
      var pos;
      if (!(sender instanceof SvgCanvas)) {
        return;
      }
      pos = {
        x: e.pageX,
        y: e.pageY
      };
      if (event === "onMouseDown") {
        if (!this.path_control.item) {
          this.begin(pos);
          this.attachOnMouseMove();
          return this.last_segment_control.handleOut.pre_position = e;
        } else {
          this.cancelEvent(e);
          pos = this.getMousePositionOfItem(pos, this.path_control.item);
          this.path_control.path._children[0].add(pos);
          this.path_control.refresh();
          this.setPathCloseAction();
          this.attachOnMouseMove();
          return this.last_segment_control.handleOut.pre_position = e;
        }
      }
    };

    DrawPathMode.prototype.attachOnMouseMove = function() {
      $(document).mousemove(this.onMouseMove);
      return $(document).mouseup(this.onMouseUp);
    };

    DrawPathMode.prototype.onMouseMove = function(e) {
      return this.last_segment_control.handleOut.onMouseMove(e);
    };

    DrawPathMode.prototype.onMouseUp = function(e) {
      $(document).unbind('mousemove', this.onMouseMove);
      return $(document).unbind('mouseup', this.onMouseUp);
    };

    DrawPathMode.prototype.setPathCloseAction = function() {
      var first_segment_control, origin, path_control, segment_controls, self;
      segment_controls = this.path_control.getSegmentControls();
      first_segment_control = _(segment_controls).first();
      this.last_segment_control = _(segment_controls).last();
      origin = first_segment_control._onClick;
      path_control = this.path_control;
      self = this;
      return first_segment_control._onClick = function(e) {
        path_control.path._children[0].closePath();
        path_control.refresh();
        return self.disable();
      };
    };

    DrawPathMode.prototype.begin = function(pos) {
      var added_item;
      added_item = SvgCanvasBase.addElement(SVGUtil.createTag("path"));
      pos = this.getMousePositionOfItem(pos, added_item);
      added_item.attr({
        "d": "M " + pos.x + ", " + pos.y,
        "stroke": "black",
        "stroke-width": "2",
        "fill-opacity": "0"
      });
      return this.path_control.setItem(added_item);
    };

    DrawPathMode.prototype.getMousePositionOfItem = function(pos, item) {
      var matrix;
      pos = SVGUtil.createPoint(pos.x, pos.y);
      matrix = item.getScreenCTM();
      return pos.matrixTransform(matrix.inverse());
    };

    DrawPathMode.prototype.onStart = function() {};

    DrawPathMode.prototype.onStop = function() {
      return this.disable();
    };

    DrawPathMode.prototype.disable = function() {
      return this.path_control.clear();
    };

    DrawPathMode.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    return DrawPathMode;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.GradientEditMode = (function() {
    function GradientEditMode(maneger) {
      this.onStop = __bind(this.onStop, this);
      this.onStart = __bind(this.onStart, this);
      this.onEvent = __bind(this.onEvent, this);
      _.extend(this, Backbone.Events);
      this.maneger = maneger;
      this.gradient_tool = new GradientToolView({
        el: $("#gradient-tool")
      });
      this.gradient_tool.disable();
    }

    GradientEditMode.prototype.onEvent = function(event, sender, e, options) {
      if (sender instanceof SvgElementView) {
        if (event === "onClick") {
          return this.gradient_tool.setItem(sender.model);
        }
      }
    };

    GradientEditMode.prototype.onStart = function() {
      return this.gradient_tool.render();
    };

    GradientEditMode.prototype.onStop = function() {
      return this.gradient_tool.disable();
    };

    GradientEditMode.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    return GradientEditMode;

  })();

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ModeView = (function(_super) {
    __extends(ModeView, _super);

    function ModeView() {
      this.render = __bind(this.render, this);
      this._onModeChange = __bind(this._onModeChange, this);
      this.onClick = __bind(this.onClick, this);
      this.initialize = __bind(this.initialize, this);
      _ref = ModeView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ModeView.prototype.events = {
      "click svg": "onClick"
    };

    ModeView.prototype.initialize = function() {
      this.manager = this.options.manager;
      return this.listenTo(this.manager, "onModeChange", this._onModeChange);
    };

    ModeView.prototype.onClick = function(e) {
      var mode;
      mode = $(e.currentTarget).data("mode");
      return this.manager.setMode(mode);
    };

    ModeView.prototype._onModeChange = function(mode) {
      return this.render();
    };

    ModeView.prototype.render = function() {
      var btns, mode,
        _this = this;
      if (!this.manager.current_mode) {
        return;
      }
      mode = this.manager.current_mode.name;
      btns = this.$el.find("svg").get();
      return btns.forEach(function(svg) {
        var $svg, color;
        $svg = $(svg);
        if ($svg.data("mode") === mode) {
          color = "blue";
        } else {
          color = "black";
        }
        return $svg.find("g").attr("fill", color);
      });
    };

    return ModeView;

  })(Backbone.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.EventManager = (function() {
    function EventManager() {
      this.setCanvas = __bind(this.setCanvas, this);
      this.onEvent = __bind(this.onEvent, this);
      this.getControl = __bind(this.getControl, this);
      this.setMode = __bind(this.setMode, this);
      this.setControl = __bind(this.setControl, this);
      this.getCanvas = __bind(this.getCanvas, this);
      var mode, name, _ref;
      _.extend(this, Backbone.Events);
      this.modes = {
        "control": new ElementControlMode(this),
        "text": new TextEditMode(this),
        "path": new PathEditMode(this),
        "grad": new GradientEditMode(this),
        "draw-path": new DrawPathMode(this)
      };
      _ref = this.modes;
      for (name in _ref) {
        mode = _ref[name];
        mode.name = name;
      }
      this.current_mode = null;
      this.selected_item = null;
    }

    EventManager.prototype.getCanvas = function() {
      return this.canvas;
    };

    EventManager.prototype.setControl = function(control) {
      return this._control = control;
    };

    EventManager.prototype.setMode = function(mode_name) {
      var mode, pre_mode;
      mode = this.modes[mode_name];
      if (mode && this.current_mode !== mode) {
        pre_mode = this.current_mode;
        this.current_mode = mode;
        if (this.current_mode.onStart) {
          this.current_mode.onStart();
        }
        if (pre_mode) {
          if (pre_mode.onStop) {
            pre_mode.onStop();
          }
        }
        return this.trigger("onModeChange", mode_name);
      }
    };

    EventManager.prototype.getControl = function() {
      return this._control;
    };

    EventManager.prototype.onEvent = function(event, sender, e, options) {
      return this.current_mode.onEvent(event, sender, e, options);
    };

    EventManager.prototype.setCanvas = function(canvas) {
      return this.canvas = canvas;
    };

    EventManager.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    return EventManager;

  })();

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.InspectorListView = (function(_super) {
    __extends(InspectorListView, _super);

    function InspectorListView() {
      this.sortElementByIndex = __bind(this.sortElementByIndex, this);
      this.removeItem = __bind(this.removeItem, this);
      this.addItem = __bind(this.addItem, this);
      this.initialize = __bind(this.initialize, this);
      _ref = InspectorListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    InspectorListView.prototype.tagName = "ul";

    InspectorListView.prototype.initialize = function() {
      this.$el.addClass("list-unstyled");
      this.item_list = this.options.item_list;
      this.control = this.options.control;
      this.listenTo(this.item_list, "add", this.addItem);
      this.listenTo(this.item_list, "remove", this.removeItem);
      return this._inspector_views = [];
    };

    InspectorListView.prototype.addItem = function(item) {
      var klass, view;
      if (item.constructor === SvgElement) {
        klass = InspectorView;
      }
      if (item.constructor === SvgFolder) {
        klass = InspectorFolderView;
      }
      view = new klass({
        model: item,
        control: this.control
      });
      this._inspector_views.push(view);
      this.$el.prepend(view.el);
      return this.sortElementByIndex();
    };

    InspectorListView.prototype.removeItem = function(item) {
      var index, view,
        _this = this;
      view = _(this._inspector_views).find(function(e) {
        return e.model === item;
      });
      index = this._inspector_views.indexOf(view);
      this._inspector_views.splice(index, 1);
      return this.sortElementByIndex();
    };

    InspectorListView.prototype.sortElementByIndex = function() {
      var sorted_views,
        _this = this;
      sorted_views = _(this._inspector_views).sortBy(function(e) {
        return $(e.model.el).index();
      });
      return sorted_views.forEach(function(e) {
        return _this.$el.prepend(e.el);
      });
    };

    InspectorListView.prototype.remove = function() {
      this._inspector_views.forEach(function(view) {
        return view.remove();
      });
      return InspectorListView.__super__.remove.call(this);
    };

    return InspectorListView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.InspectorView = (function(_super) {
    __extends(InspectorView, _super);

    function InspectorView() {
      this.render = __bind(this.render, this);
      this.onClickVisible = __bind(this.onClickVisible, this);
      this.onClickLock = __bind(this.onClickLock, this);
      this.onClickSelect = __bind(this.onClickSelect, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.onMouseOver = __bind(this.onMouseOver, this);
      this.onMouseLeave = __bind(this.onMouseLeave, this);
      this.initialize = __bind(this.initialize, this);
      _ref = InspectorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    InspectorView.prototype.tagName = "li";

    InspectorView.prototype.initialize = function() {
      this.control = this.options.control;
      this.listenTo(this.model, 'remove', this.remove);
      this.listenTo(this.model, 'change', this.render);
      return this.render();
    };

    InspectorView.prototype.events = function() {
      return {
        "click .lock-element": "onClickLock",
        "click .select-element": "onClickSelect",
        "click .visible-element": "onClickVisible",
        "mousedown .move-element": "onMouseDown",
        "mouseover": "onMouseOver",
        "mouseleave": "onMouseLeave"
      };
    };

    InspectorView.prototype.onMouseLeave = function(e) {
      this.cancelEvent(e);
      if (inspectorDragAndDrop.isEnable()) {
        return inspectorDragAndDrop.onMouseLeave(e, this);
      }
    };

    InspectorView.prototype.onMouseOver = function(e) {
      this.cancelEvent(e);
      if (inspectorDragAndDrop.isEnable()) {
        return inspectorDragAndDrop.onMouseOver(e, this);
      }
    };

    InspectorView.prototype.onMouseDown = function(e) {
      this.cancelEvent(e);
      return inspectorDragAndDrop.onMouseDown(e, this);
    };

    InspectorView.prototype.cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    InspectorView._rowTemplate = '\
        <div class="inspector-xs-block">\
            <i class="move-element fa fa-arrows"></i>\
        </div>\
        <div class="inspector-xs-block">\
            <i class="open-element fa fa-caret-square-o-right"></i>\
        </div>\
        <div class="inspector-xs-block select-element" style="border:1px solid black">\
        </div>\
        <div style="float:left">\
            <input style="width:100px" class="name"/>\
        </div>\
        <div style="float:right">\
            <span style="margin:0px 5px">\
                <i class="lock-element fa fa-lock"></i>\
            </span>\
            <span style="margin:0px 5px">\
                <i class="visible-element fa fa-eye"></i>\
            </span>\
        </div>\
        <div style="clear:both"></div>';

    InspectorView.prototype.template = _.template('\
        <div class="inspector-row">\
        ' + InspectorView._rowTemplate + '</div>\
    ');

    InspectorView.prototype.onClickSelect = function(e) {
      this.cancelEvent(e);
      if (this.model.isSelected()) {
        return this.control.removeItem(this.model);
      } else {
        return this.control.addItem(this.model);
      }
    };

    InspectorView.prototype.onClickLock = function(e) {
      this.cancelEvent(e);
      return this.model.toggleLock();
    };

    InspectorView.prototype.onClickVisible = function(e) {
      this.cancelEvent(e);
      if (this.model.isVisibled()) {
        return this.model.hide();
      } else {
        return this.model.show();
      }
    };

    InspectorView.prototype._initElement = function() {
      var container, name;
      name = this.model.get("data-name");
      this.$el.html(this.template());
      container = this.$el.find("div");
      container.find(".open-element").hide();
      this._select_el = container.children(".select-element");
      this._lock_el = container.find(".lock-element");
      return this._visible_el = container.find(".visible-element");
    };

    InspectorView.prototype._render = function() {
      var color;
      color = this.model.isSelected() ? "skyblue" : "white";
      this._select_el.css("background-color", color);
      this.$el.find("div").find(".name").val(this.model.get("data-name"));
      this.toggleClass(this._lock_el, "fa-lock", "fa-unlock-alt", this.model.isLocked());
      return this.toggleClass(this._visible_el, "fa-eye", "fa-eye-slash", this.model.isVisibled());
    };

    InspectorView.prototype.rowElement = function() {
      return this.$el.children("div").first();
    };

    InspectorView.prototype.setSelectedStyle = function() {
      return this.rowElement().css("background-color", "#ccc");
    };

    InspectorView.prototype.setDefalutStyle = function() {
      this.rowElement().css("background-color", "white");
      return this.rowElement().css("border-bottom", "1px solid #ccc");
    };

    InspectorView.prototype.setOverStyle = function() {
      return this.rowElement().css("border-bottom", "2px solid blue");
    };

    InspectorView.prototype.toggleClass = function(el, add_class, remove_class, none_swap) {
      if (none_swap == null) {
        none_swap = true;
      }
      if (none_swap) {
        el.addClass(add_class);
        return el.removeClass(remove_class);
      } else {
        el.addClass(remove_class);
        return el.removeClass(add_class);
      }
    };

    InspectorView.prototype.render = function() {
      if (this.$el.find("div").length === 0) {
        this._initElement();
      }
      this._render();
      return this;
    };

    return InspectorView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.InspectorFolderView = (function(_super) {
    __extends(InspectorFolderView, _super);

    function InspectorFolderView() {
      this.render = __bind(this.render, this);
      this.onClickOpen = __bind(this.onClickOpen, this);
      this.initialize = __bind(this.initialize, this);
      _ref = InspectorFolderView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    InspectorFolderView.prototype.tagName = "li";

    InspectorFolderView.prototype.initialize = function() {
      this.control = this.options.control;
      this.listenTo(this.model, 'remove', this.remove);
      this.listenTo(this.model, 'change', this.render);
      return this.render();
    };

    InspectorFolderView.prototype.events = function() {
      return {
        "click .inspetor-folder .open-element": "onClickOpen",
        "click .inspetor-folder .select-element": "onClickSelect",
        "click .inspetor-folder .visible-element": "onClickVisible",
        "mousedown .inspetor-folder .move-element": "onMouseDown",
        "mouseover .inspetor-folder": "onMouseOver",
        "mouseleave .inspetor-folder": "onMouseLeave"
      };
    };

    InspectorFolderView.prototype.template = _.template('\
        <div class="inspetor-folder inspector-row">\
        ' + InspectorView._rowTemplate + '</div>\
        <ul class="inspector-items"></ul>\
        <div style="height:1px;background-color:#eee"></div>\
    ');

    InspectorFolderView.prototype.onClickOpen = function(e) {
      this.cancelEvent(e);
      if (this.model.isOpen()) {
        return this.model.close();
      } else {
        return this.model.open();
      }
    };

    InspectorFolderView.prototype._initElement = function() {
      var container, list_view, ul,
        _this = this;
      this.$el.html(this.template());
      ul = this.$el.find("ul").first();
      list_view = new InspectorListView({
        el: ul,
        control: this.control,
        item_list: this.model.items
      });
      list_view.item_list.forEach(function(item) {
        return item.trigger('add', item, list_view.item_list, {});
      });
      list_view.$el.css("margin-left", "5px");
      this.list_view = list_view;
      container = this.$el.children(".inspetor-folder");
      this._select_el = container.children(".select-element");
      this._open_el = container.find(".open-element");
      return this._visible_el = container.find(".visible-element");
    };

    InspectorFolderView.prototype._render = function() {
      var color, container, items_el;
      color = this.model.isSelected() ? "skyblue" : "white";
      container = this.$el.children(".inspetor-folder");
      this._select_el.css("background-color", color);
      container.find(".name").val(this.model.get("data-name"));
      items_el = this.$el.find("ul").first();
      if (this.model.isOpen()) {
        items_el.show();
      } else {
        items_el.hide();
      }
      this.toggleClass(this._open_el, "fa-caret-square-o-down", "fa-caret-square-o-right", this.model.isOpen());
      return this.toggleClass(this._visible_el, "fa-eye", "fa-eye-slash", this.model.isVisibled());
    };

    InspectorFolderView.prototype.render = function() {
      if (this.$el.children("div").length === 0) {
        this._initElement();
      }
      this._render();
      return this;
    };

    InspectorFolderView.prototype.remove = function() {
      var _ref1;
      if ((_ref1 = this.list_view) != null) {
        _ref1.remove();
      }
      return InspectorFolderView.__super__.remove.call(this);
    };

    return InspectorFolderView;

  })(InspectorView);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.InspectorDragAndDrop = (function() {
    function InspectorDragAndDrop() {
      this.onMouseUp = __bind(this.onMouseUp, this);
    }

    InspectorDragAndDrop.prototype.initialize = function() {
      this.select_view = null;
      return this.over_view = null;
    };

    InspectorDragAndDrop.prototype.enable = function() {
      return this._enable = true;
    };

    InspectorDragAndDrop.prototype.disable = function() {
      this.select_view.setDefalutStyle();
      if (this.over_view) {
        this.over_view.setDefalutStyle();
      }
      this.select_view = null;
      this.over_view = null;
      return this._enable = false;
    };

    InspectorDragAndDrop.prototype.isEnable = function() {
      return this._enable;
    };

    InspectorDragAndDrop.prototype.onMouseDown = function(e, view) {
      this.enable();
      this.select_view = view;
      this.select_view.setSelectedStyle();
      return $(document).mouseup(this.onMouseUp);
    };

    InspectorDragAndDrop.prototype.onMouseLeave = function(e, view) {
      if (view !== this.select_view) {
        return view.setDefalutStyle();
      }
    };

    InspectorDragAndDrop.prototype.onMouseOver = function(e, view) {
      this.over_view = view;
      if (view !== this.select_view) {
        return view.setOverStyle();
      }
    };

    InspectorDragAndDrop.prototype.onMouseUp = function(e) {
      var _ref;
      InspectorDragAndDrop.moveToElement(this.select_view.model, (_ref = this.over_view) != null ? _ref.model : void 0);
      this.disable();
      e.preventDefault();
      e.stopPropagation();
      return $(document).unbind('mouseup', this.onMouseUp);
    };

    InspectorDragAndDrop.moveToElement = function(from, to) {
      if (!to) {
        return;
      }
      if (from === to) {
        return;
      }
      if (to.constructor === SvgElement) {
        to.$el.before(from.$el);
        from.pergeFromFolder();
        return to.folder.add(from);
      } else {
        to.$el.append(from.$el);
        from.pergeFromFolder();
        return to.add(from);
      }
    };

    return InspectorDragAndDrop;

  })();

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgCurveView = (function(_super) {
    __extends(SvgCurveView, _super);

    function SvgCurveView() {
      this.render = __bind(this.render, this);
      this.toPathData = __bind(this.toPathData, this);
      this.onMouseLeave = __bind(this.onMouseLeave, this);
      this.onMouseOver = __bind(this.onMouseOver, this);
      this.onMouseDrop = __bind(this.onMouseDrop, this);
      this.onMouseMove = __bind(this.onMouseMove, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this._cancelEvent = __bind(this._cancelEvent, this);
      this.onClick = __bind(this.onClick, this);
      this.setDefalutStyle = __bind(this.setDefalutStyle, this);
      this.setStyle = __bind(this.setStyle, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SvgCurveView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgCurveView.prototype.initialize = function() {
      this.curve = this.options.curve;
      this.item = this.options.item;
      this.pathControl = this.options.pathControl;
      this.setStyle();
      this.setDefalutStyle();
      return this.render();
    };

    SvgCurveView.prototype.events = function() {
      return {
        "click": "onClick",
        "mousedown": "onMouseDown",
        "mouseover": "onMouseOver",
        "mouseleave": "onMouseLeave"
      };
    };

    SvgCurveView.prototype.setSegment = function(segment) {
      return this.segment = segment;
    };

    SvgCurveView.prototype.setStyle = function() {
      return $(this.el).attr({
        "fill": "none",
        "stroke-width": "3"
      });
    };

    SvgCurveView.prototype.setDefalutStyle = function() {
      return $(this.el).attr({
        "stroke": "blue",
        "stroke-opacity": "0"
      });
    };

    SvgCurveView.prototype.onClick = function(e) {
      var curve_location, matrix, point;
      if (e.shiftKey) {
        matrix = this.item.getScreenCTM();
        point = SVGUtil.createPoint(e.pageX, e.pageY);
        point = point.matrixTransform(matrix.inverse());
        curve_location = this.curve.getNearestLocation(point);
        if (e.altKey) {
          curve_location.split();
        } else {
          curve_location.divide();
        }
        this.pathControl.refresh();
        return this._cancelEvent(e);
      }
    };

    SvgCurveView.prototype._cancelEvent = function(e) {
      e.preventDefault();
      return e.stopPropagation();
    };

    SvgCurveView.prototype.onMouseDown = function(e) {
      this._cancelEvent(e);
      $(document).mousemove(this.onMouseMove);
      return $(document).mouseup(this.onMouseDrop);
    };

    SvgCurveView.prototype.onMouseMove = function(e) {
      var c, center, center_x, center_y, div, matrix, n, n_dist, next, next_p, next_vec, point, point2_vec, point_vec, point_vec2, seg, seg_p, seg_vec, v;
      seg = this.segment;
      next = this.segment.nextSegment;
      seg_p = seg.getPoint();
      seg_p = {
        x: seg_p.getX(),
        y: seg_p.getY()
      };
      next_p = next.getPoint();
      next_p = {
        x: next_p.getX(),
        y: next_p.getY()
      };
      center_x = (seg_p.x + next_p.x) / 2;
      center_y = (seg_p.y + next_p.y) / 2;
      center = {
        x: center_x,
        y: center_y
      };
      matrix = this.item.getScreenCTM();
      point = SVGUtil.createPoint(e.pageX, e.pageY);
      point = point.matrixTransform(matrix.inverse());
      if (e.shiftKey) {
        point_vec = VectorUtil.sub(point, seg_p);
        point2_vec = VectorUtil.sub(next_p, seg_p);
        c = VectorUtil.dot(point_vec, point2_vec);
        n = point2_vec;
        n_dist = VectorUtil.dist(n);
        n_dist = n_dist * n_dist;
        v = VectorUtil.multiply(VectorUtil.multiply(n, c), 1 / n_dist);
        v = VectorUtil.sub(point_vec, v);
        v = VectorUtil.multiply(v, 4 / 3);
        seg.handleOut.getPoint().setPoint(v.x, v.y);
        return next.handleIn.getPoint().setPoint(v.x, v.y);
      } else {
        point_vec = VectorUtil.sub(point, center);
        point_vec2 = VectorUtil.multiply(point_vec, 2);
        point_vec2 = VectorUtil.add(point_vec2, center);
        seg_vec = VectorUtil.sub(point_vec2, seg_p);
        next_vec = VectorUtil.sub(point_vec2, next_p);
        div = 2 / 3;
        seg_vec = VectorUtil.multiply(seg_vec, div);
        next_vec = VectorUtil.multiply(next_vec, div);
        seg.handleOut.getPoint().setPoint(seg_vec.x, seg_vec.y);
        return next.handleIn.getPoint().setPoint(next_vec.x, next_vec.y);
      }
    };

    SvgCurveView.prototype.onMouseDrop = function(e) {
      $(document).unbind('mousemove', this.onMouseMove);
      return $(document).unbind('mouseup', this.onMouseDrop);
    };

    SvgCurveView.prototype.onMouseOver = function(e) {
      var matrix, point;
      $(this.el).attr({
        "stroke": "red",
        "stroke-opacity": "1"
      });
      matrix = this.item.getScreenCTM();
      point = SVGUtil.createPoint(e.pageX, e.pageY);
      return point = point.matrixTransform(matrix.inverse());
    };

    SvgCurveView.prototype.onMouseLeave = function(e) {
      return this.setDefalutStyle();
    };

    SvgCurveView.prototype.toPathData = function() {
      var addCurve, ctm, getPoint, getPoint2, matrix, multiplier, number, parts, point, precision, seg_control_point,
        _this = this;
      parts = [];
      precision = false;
      multiplier = Math.pow(10, 5);
      ctm = this.item.el.getCTM();
      matrix = this.item.el.getCTM();
      matrix.e = 0;
      matrix.f = 0;
      number = function(val) {
        return Math.round(val * multiplier) / multiplier;
      };
      point = function(val) {
        return number(val.x) + ',' + number(val.y);
      };
      getPoint = function(val) {
        var p;
        p = SVGUtil.createPoint(val.x, val.y);
        return p.matrixTransform(ctm);
      };
      getPoint2 = function(val) {
        var p;
        p = SVGUtil.createPoint(val.x, val.y);
        return p.matrixTransform(matrix);
      };
      addCurve = function(seg1, seg2, skipLine) {
        var end, handle1, handle2, point1, point2;
        point1 = getPoint(seg1._point);
        point2 = getPoint(seg2._point);
        point1 = new paper.Point(point1.x, point1.y);
        point2 = new paper.Point(point2.x, point2.y);
        handle1 = getPoint2(seg1._handleOut);
        handle2 = getPoint2(seg2._handleIn);
        handle1 = new paper.Point(handle1.x, handle1.y);
        handle2 = new paper.Point(handle2.x, handle2.y);
        if (handle1.isZero() && handle2.isZero()) {
          return parts.push('L' + point(point2));
        } else {
          end = point2.subtract(point1);
          return parts.push("c" + (point(handle1)) + " " + (point(end.add(handle2))) + " " + (point(end)));
        }
      };
      seg_control_point = getPoint(this.curve.getSegment1()._point);
      parts.push("M" + seg_control_point.x + ", " + seg_control_point.y);
      addCurve(this.curve.getSegment1(), this.curve.getSegment2(), false);
      return parts.join('');
    };

    SvgCurveView.prototype.render = function() {
      return this.$el.attr("d", this.toPathData());
    };

    return SvgCurveView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgPathControlView = (function(_super) {
    __extends(SvgPathControlView, _super);

    function SvgPathControlView() {
      this.createRect = __bind(this.createRect, this);
      this.createPoint = __bind(this.createPoint, this);
      this.getItem = __bind(this.getItem, this);
      this.setItem = __bind(this.setItem, this);
      this.isSelected = __bind(this.isSelected, this);
      this.unbindItem = __bind(this.unbindItem, this);
      this.refresh = __bind(this.refresh, this);
      this.updateItemPath = __bind(this.updateItemPath, this);
      this.clear = __bind(this.clear, this);
      this.render = __bind(this.render, this);
      this.clearView = __bind(this.clearView, this);
      this.moveSelectSegments = __bind(this.moveSelectSegments, this);
      this.savePoint = __bind(this.savePoint, this);
      this._setupControlView = __bind(this._setupControlView, this);
      this.createViews = __bind(this.createViews, this);
      this.getSegmentControls = __bind(this.getSegmentControls, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SvgPathControlView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgPathControlView.prototype.initialize = function() {
      var canvas, container;
      container = document.getElementById('paper-js-container');
      canvas = document.createElement('canvas');
      $(canvas).hide();
      container.appendChild(canvas);
      this.paper_score = new paper.PaperScope();
      this.paper_score.setup(canvas);
      this.path = new paper.CompoundPath();
      this.path.strokeColor = "#268BD2";
      this.path.strokeWidth = 2;
      this.path.fillColor = "#B5E1FF";
      this.path.opacity = 0.75;
      this.path.fullySelected = true;
      this._control_views = [];
      return this._segments = [];
    };

    SvgPathControlView.prototype.getSegmentControls = function() {
      var _this = this;
      return _(this._control_views).filter(function(view) {
        return view.constructor === SvgSegmentPointControl;
      });
    };

    SvgPathControlView.prototype.createViews = function() {
      var child, control_view, controls, last, seg, _i, _j, _len, _len1, _ref1, _ref2;
      this.clearView();
      _ref1 = this.path._children;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        child = _ref1[_i];
        controls = [];
        this._pre_curve_control = null;
        _ref2 = child._segments;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          seg = _ref2[_j];
          control_view = this.createView(seg);
          controls.push(control_view);
          this._segments.push(control_view.segment);
        }
        last = null;
        if (child.isClosed()) {
          last = _(controls).last();
        }
        _.reduce(controls, (function(pre, control) {
          if (pre) {
            pre.setNextSegment(control);
          }
          control.setPreSegment(pre);
          return control;
        }), last);
      }
      return this._setupControlView();
    };

    SvgPathControlView.prototype._setupControlView = function() {
      var control_group, curve_group, handle_group, line_group,
        _this = this;
      line_group = SVGUtil.createTag("g");
      curve_group = SVGUtil.createTag("g");
      control_group = SVGUtil.createTag("g");
      handle_group = SVGUtil.createTag("g");
      this._control_views.forEach(function(view) {
        if (view instanceof SvgSegmentHandleControl) {
          return $(handle_group).append(view.el);
        } else if (view instanceof SvgSegmentPointControl) {
          return $(control_group).append(view.el);
        } else if (view instanceof SvgCurveView) {
          return $(curve_group).append(view.el);
        } else {
          return $(group).append(view.el);
        }
      });
      this._control_views.forEach(function(view) {
        if (view instanceof SvgSegmentPointControl) {
          view.createHandleLine(line_group);
        }
        return view.render();
      });
      this.$el.append(line_group);
      this.$el.append(curve_group);
      this.$el.append(handle_group);
      return this.$el.append(control_group);
    };

    SvgPathControlView.prototype.createView = function(seg) {
      var control, curve, curve_control, el, handleIncontrol, handleOutcontrol, segment_model,
        _this = this;
      segment_model = new PathSegmentAdapeter();
      segment_model.init(seg);
      curve = seg.getCurve();
      curve_control = null;
      if (curve && this._pre_curve_control !== curve) {
        this._pre_curve_control = curve;
        el = SVGUtil.createTag("path");
        curve_control = new SvgCurveView({
          pathControl: this,
          el: el,
          item: this.item,
          curve: curve
        });
        this._control_views.push(curve_control);
      }
      el = this.createRect(0, 0);
      control = new SvgSegmentPointControl({
        pathControl: this,
        el: el,
        item: this.item,
        curveControl: curve_control,
        segment: segment_model,
        getPoint: (function() {
          return segment_model.getPoint();
        })
      });
      if (curve_control) {
        curve_control.setSegment(control);
      }
      this._control_views.push(control);
      el = this.createPoint(0, 0);
      handleOutcontrol = new SvgSegmentHandleControl({
        pathControl: this,
        el: el,
        item: this.item,
        segment: segment_model,
        getPoint: (function() {
          return segment_model.getHandleOut();
        })
      });
      this._control_views.push(handleOutcontrol);
      el = this.createPoint(0, 0);
      handleIncontrol = new SvgSegmentHandleControl({
        pathControl: this,
        el: el,
        item: this.item,
        segment: segment_model,
        getPoint: (function() {
          return segment_model.getHandleIn();
        })
      });
      this._control_views.push(handleIncontrol);
      segment_model.on("change", function() {
        _this.updateItemPath();
        handleIncontrol.render();
        handleOutcontrol.render();
        control.render();
        if (control.curveControl) {
          control.curveControl.render();
        }
        if (control.preSegment) {
          if (control.preSegment.curveControl) {
            control.preSegment.curveControl.render();
          }
        }
        if (control.nextSegment) {
          if (control.nextSegment.curveControl) {
            return control.nextSegment.curveControl.render();
          }
        }
      });
      control.setHandleOut(handleOutcontrol);
      control.setHandleIn(handleIncontrol);
      return control;
    };

    SvgPathControlView.prototype.savePoint = function() {
      var seg, _i, _len, _ref1, _results;
      _ref1 = this._segments;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        seg = _ref1[_i];
        _results.push(seg.getPoint().savePoint());
      }
      return _results;
    };

    SvgPathControlView.prototype.moveSelectSegments = function(pos) {
      var point, pre_point, seg, x, y, _i, _len, _ref1, _results;
      _ref1 = this._segments;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        seg = _ref1[_i];
        if (seg.isSelected()) {
          point = seg.getPoint();
          pre_point = point.getSavePoint();
          x = pre_point.x + pos.x;
          y = pre_point.y + pos.y;
          _results.push(point.setPoint(x, y));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    SvgPathControlView.prototype.clearView = function() {
      var _this = this;
      this._control_views.forEach(function(e) {
        return e.remove();
      });
      this._control_views = [];
      this._segments = [];
      return this.$el.empty();
    };

    SvgPathControlView.prototype.render = function() {
      var _this = this;
      return this._control_views.forEach(function(view) {
        return view.render();
      });
    };

    SvgPathControlView.prototype.clear = function() {
      return this.unbindItem();
    };

    SvgPathControlView.prototype.updateItemPath = function() {
      return this.item.attr("d", this.path.getPathData());
    };

    SvgPathControlView.prototype.refresh = function() {
      this.updateItemPath();
      return this.createViews();
    };

    SvgPathControlView.prototype.unbindItem = function() {
      this.item = null;
      this.stopListening();
      return this.clearView();
    };

    SvgPathControlView.prototype.isSelected = function() {
      return this.item;
    };

    SvgPathControlView.prototype.setItem = function(item) {
      this.unbindItem();
      this.item = item;
      this.path.setPathData($(this.item.el).attr("d"));
      this.listenTo(item, "change:matrix", this.render);
      return this.createViews();
    };

    SvgPathControlView.prototype.getItem = function() {
      return this.item;
    };

    SvgPathControlView.prototype.createPoint = function(x, y) {
      var el;
      el = SVGUtil.createTag("circle");
      $(el).attr({
        "cx": x,
        "cy": y,
        "stroke": "black",
        "stroke-width": "1",
        "fill": "lightgreen",
        "r": "8"
      });
      return el;
    };

    SvgPathControlView.prototype.createRect = function(x, y) {
      var el;
      el = SVGUtil.createTag("rect");
      return $(el).attr({
        "x": x - 8,
        "y": y - 8,
        "stroke": "black",
        "stroke-width": "1",
        "fill": "lightblue",
        "width": "16",
        "height": "16"
      });
    };

    return SvgPathControlView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgSegmentPointControl = (function(_super) {
    __extends(SvgSegmentPointControl, _super);

    function SvgSegmentPointControl() {
      this.remove = __bind(this.remove, this);
      this.renderHandleLine = __bind(this.renderHandleLine, this);
      this.render = __bind(this.render, this);
      this.getPointAtCanvas = __bind(this.getPointAtCanvas, this);
      this.onMouseDropHandle = __bind(this.onMouseDropHandle, this);
      this.onMouseDrop = __bind(this.onMouseDrop, this);
      this._getMovedPosition = __bind(this._getMovedPosition, this);
      this.onMouseMove = __bind(this.onMouseMove, this);
      this.onMouseMoveHandle = __bind(this.onMouseMoveHandle, this);
      this._itemMatrixPos = __bind(this._itemMatrixPos, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.setSelected = __bind(this.setSelected, this);
      this.onClick = __bind(this.onClick, this);
      this.setStyle = __bind(this.setStyle, this);
      this.onMouseLeave = __bind(this.onMouseLeave, this);
      this._createLine = __bind(this._createLine, this);
      this.createHandleLine = __bind(this.createHandleLine, this);
      this._init = __bind(this._init, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SvgSegmentPointControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgSegmentPointControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown",
        "click": "onClick",
        "mouseover": "onMouseOver",
        "mouseleave": "onMouseLeave"
      };
    };

    SvgSegmentPointControl.prototype.initialize = function() {
      return this._init();
    };

    SvgSegmentPointControl.prototype._init = function() {
      this.segment = this.options.segment;
      this.item = this.options.item;
      this.getPoint = this.options.getPoint;
      this.pathControl = this.options.pathControl;
      this.curveControl = this.options.curveControl;
      return this.setStyle();
    };

    SvgSegmentPointControl.prototype.setHandleOut = function(handle) {
      return this.handleOut = handle;
    };

    SvgSegmentPointControl.prototype.setHandleIn = function(handle) {
      return this.handleIn = handle;
    };

    SvgSegmentPointControl.prototype.setNextSegment = function(segment) {
      return this.nextSegment = segment;
    };

    SvgSegmentPointControl.prototype.setPreSegment = function(segment) {
      return this.preSegment = segment;
    };

    SvgSegmentPointControl.prototype.createHandleLine = function(wrap) {
      this.handleInLine = this._createLine(wrap);
      return this.handleOutLine = this._createLine(wrap);
    };

    SvgSegmentPointControl.prototype._createLine = function(wrap) {
      var element;
      element = SVGUtil.createTag("line");
      $(wrap).append(element);
      return $(element).attr({
        "stroke-width": "1",
        "stroke": "blue"
      });
    };

    SvgSegmentPointControl.prototype.onMouseOver = function(e) {
      return $(this.el).attr({
        "stroke-width": "3"
      });
    };

    SvgSegmentPointControl.prototype.onMouseLeave = function(e) {
      return $(this.el).attr({
        "stroke-width": "1"
      });
    };

    SvgSegmentPointControl.prototype.setStyle = function() {
      return $(this.el).attr({
        "stroke": "black",
        "stroke-width": "1",
        "fill": "white",
        "width": "10",
        "height": "10"
      });
    };

    SvgSegmentPointControl.prototype.onClick = function(e) {
      return this._onClick(e);
    };

    SvgSegmentPointControl.prototype._onClick = function(e) {
      if (e.shiftKey) {
        this.setSelected(!this.segment.isSelected());
      }
      if (e.altKey) {
        if (e.shiftKey) {
          this.segment.remove();
          return this.pathControl.refresh();
        } else {
          return this.segment.setLinear();
        }
      }
    };

    SvgSegmentPointControl.prototype.setSelected = function(val) {
      return this.segment.setSelected(val);
    };

    SvgSegmentPointControl.prototype.onMouseDown = function(e) {
      this.pre_position = e;
      this.pathControl.savePoint();
      if (e.altKey) {
        $(document).mousemove(this.onMouseMoveHandle);
        $(document).mouseup(this.onMouseDropHandle);
      } else {
        $(document).mousemove(this.onMouseMove);
        $(document).mouseup(this.onMouseDrop);
      }
      e.preventDefault();
      return e.stopPropagation();
    };

    SvgSegmentPointControl.prototype._itemMatrixPos = function(pos) {
      var matrix, move_point;
      move_point = SVGUtil.createPoint(pos.x, pos.y);
      matrix = this.item.getCTM();
      matrix.e = 0;
      matrix.f = 0;
      return move_point.matrixTransform(matrix.inverse());
    };

    SvgSegmentPointControl.prototype.onMouseMoveHandle = function(e) {
      var pos, x, y;
      pos = this._getMovedPosition(e);
      pos = this._itemMatrixPos(pos);
      x = pos.x;
      y = pos.y;
      this.segment.getHandleOut().setPoint(x, y);
      return this.segment.getHandleIn().setPoint(-x, -y);
    };

    SvgSegmentPointControl.prototype.onMouseMove = function(e) {
      var point, pos, pre_point, x, y;
      pos = this._getMovedPosition(e);
      if (e.shiftKey) {
        if (Math.abs(pos.x) > Math.abs(pos.y)) {
          pos.y = 0;
        } else {
          pos.x = 0;
        }
      }
      point = this.getPoint();
      pos = this._itemMatrixPos(pos);
      x = pos.x;
      y = pos.y;
      if (this.segment.isSelected()) {

      } else {
        point = this.segment.getPoint();
        pre_point = point.getSavePoint();
        x = pre_point.x + pos.x;
        y = pre_point.y + pos.y;
        point.setPoint(x, y);
      }
      return this.pathControl.moveSelectSegments(pos);
    };

    SvgSegmentPointControl.prototype._getMovedPosition = function(e) {
      var dx, dy;
      dx = e.pageX - this.pre_position.pageX;
      dy = e.pageY - this.pre_position.pageY;
      return {
        x: dx,
        y: dy
      };
    };

    SvgSegmentPointControl.prototype.onMouseDrop = function(e) {
      $(document).unbind('mousemove', this.onMouseMove);
      return $(document).unbind('mouseup', this.onMouseDrop);
    };

    SvgSegmentPointControl.prototype.onMouseDropHandle = function(e) {
      $(document).unbind('mousemove', this.onMouseMoveHandle);
      return $(document).unbind('mouseup', this.onMouseDropHandle);
    };

    SvgSegmentPointControl.prototype.getPointAtCanvas = function() {
      var point, seg_point;
      point = this.getPoint();
      seg_point = SVGUtil.createPoint(point.getX(), point.getY());
      return seg_point.matrixTransform(this.item.getCTM());
    };

    SvgSegmentPointControl.prototype.render = function() {
      var point;
      point = this.getPointAtCanvas();
      if (this.segment.isSelected()) {
        this.$el.attr({
          "fill": "blue"
        });
      } else {
        this.$el.attr({
          "fill": "white"
        });
      }
      this.$el.attr({
        "x": point.x - 6,
        "y": point.y - 6
      });
      this.renderHandleLine(this.segment.getHandleOut(), this.handleOutLine);
      return this.renderHandleLine(this.segment.getHandleIn(), this.handleInLine);
    };

    SvgSegmentPointControl.prototype.renderHandleLine = function(handle, line_el) {
      var seg_control_point, seg_point, seg_x, seg_y;
      seg_x = this.segment.getPoint().getX();
      seg_y = this.segment.getPoint().getY();
      seg_point = SVGUtil.createPoint(seg_x + handle.getX(), seg_y + handle.getY());
      seg_point = seg_point.matrixTransform(this.item.getCTM());
      seg_control_point = SVGUtil.createPoint(seg_x, seg_y);
      seg_control_point = seg_control_point.matrixTransform(this.item.getCTM());
      return $(line_el).attr({
        "x1": seg_point.x,
        "y1": seg_point.y,
        "x2": seg_control_point.x,
        "y2": seg_control_point.y
      });
    };

    SvgSegmentPointControl.prototype.remove = function() {
      SvgSegmentPointControl.__super__.remove.call(this);
      this.handleInLine.remove();
      return this.handleOutLine.remove();
    };

    return SvgSegmentPointControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgSegmentHandleControl = (function(_super) {
    __extends(SvgSegmentHandleControl, _super);

    function SvgSegmentHandleControl() {
      this.render = __bind(this.render, this);
      this.setStyle = __bind(this.setStyle, this);
      this.onMouseMove = __bind(this.onMouseMove, this);
      this.onClick = __bind(this.onClick, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SvgSegmentHandleControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgSegmentHandleControl.prototype.initialize = function() {
      return this._init();
    };

    SvgSegmentHandleControl.prototype.onClick = function(e) {
      if (e.altKey) {
        return this.getPoint().setPoint(0, 0);
      }
    };

    SvgSegmentHandleControl.prototype.onMouseMove = function(e) {
      var point, pos, x, y;
      pos = this._getMovedPosition(e);
      point = this.getPoint();
      pos = this._itemMatrixPos(pos);
      x = point.getX() + pos.x;
      y = point.getY() + pos.y;
      this.setHandlePoint({
        x: x,
        y: y
      }, e.shiftKey);
      return this.pre_position = e;
    };

    SvgSegmentHandleControl.prototype.setHandlePoint = function(pos, sync) {
      var point, x, y;
      x = pos.x;
      y = pos.y;
      point = this.getPoint();
      point.setPoint(x, y);
      if (sync) {
        if (point === this.segment.getHandleIn()) {
          return this.segment.getHandleOut().setPoint(-x, -y);
        } else if (point === this.segment.getHandleOut()) {
          return this.segment.getHandleIn().setPoint(-x, -y);
        }
      }
    };

    SvgSegmentHandleControl.prototype.setStyle = function() {
      return $(this.el).attr({
        "stroke": "blue",
        "stroke-width": "1",
        "fill": "white",
        "r": "5"
      });
    };

    SvgSegmentHandleControl.prototype.render = function() {
      var point, seg_point, seg_x, seg_y;
      seg_x = this.segment.getPoint().getX();
      seg_y = this.segment.getPoint().getY();
      point = this.getPoint();
      seg_point = SVGUtil.createPoint(seg_x + point.getX(), seg_y + point.getY());
      seg_point = seg_point.matrixTransform(this.item.getCTM());
      return this.$el.attr({
        "cx": seg_point.x - 1,
        "cy": seg_point.y - 1
      });
    };

    return SvgSegmentHandleControl;

  })(SvgSegmentPointControl);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PropertyEditSetView = (function(_super) {
    __extends(PropertyEditSetView, _super);

    function PropertyEditSetView() {
      this.clear = __bind(this.clear, this);
      this.bindElement = __bind(this.bindElement, this);
      this.render = __bind(this.render, this);
      this._init_view = __bind(this._init_view, this);
      this.initialize = __bind(this.initialize, this);
      _ref = PropertyEditSetView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PropertyEditSetView.prototype.initialize = function() {
      this.prop_views = {};
      this.model = new PropertyEdit();
      this.attrs = ["id", "data-name", "class", "x", "y", "width", "height", "transform", "fill", "fill-spe", "fill-opacity", "stroke", "stroke-spe", "stroke-opacity", "stroke-width", "stroke-linecap", "stroke-dasharray", "stroke-offset", "style", "filter", "opacity", "xlink:href", "mask", "r", "rx", "ry", "writing-mode", "x1", "x2", "y1", "y2", "fill-rule", "d", "font-size", "font-family", "text-anchor", "visibility"];
      return this._init_view();
    };

    PropertyEditSetView.prototype._init_view = function() {
      var attr, data_attr_re, klass, prop_view, type, _i, _len, _ref1, _results;
      data_attr_re = /^data-/;
      type = "text";
      _ref1 = this.attrs;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        attr = _ref1[_i];
        klass = attr.match(data_attr_re) ? PropertyEditView : DataPropertyEditView;
        prop_view = new klass({
          inputType: type,
          attrName: attr,
          model: this.model
        });
        this.prop_views[attr] = prop_view;
        _results.push(this.$el.append(prop_view.el));
      }
      return _results;
    };

    PropertyEditSetView.prototype.render = function() {
      var attr, view, _ref1, _results;
      this.model.updateElement();
      _ref1 = this.prop_views;
      _results = [];
      for (attr in _ref1) {
        view = _ref1[attr];
        _results.push(view.render());
      }
      return _results;
    };

    PropertyEditSetView.prototype.bindElement = function(target_model) {
      this.stopListening();
      this.listen_model = target_model;
      this.model.bindElement(target_model);
      this.listenTo(target_model, "change", this.render);
      return this.render();
    };

    PropertyEditSetView.prototype.clear = function() {
      var attr, view, _ref1, _results;
      this.stopListening();
      this.model.unbindElement();
      _ref1 = this.prop_views;
      _results = [];
      for (attr in _ref1) {
        view = _ref1[attr];
        _results.push(view.clear());
      }
      return _results;
    };

    return PropertyEditSetView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PropertyEditView = (function(_super) {
    __extends(PropertyEditView, _super);

    function PropertyEditView() {
      this.clear = __bind(this.clear, this);
      this.render = __bind(this.render, this);
      this.initElement = __bind(this.initElement, this);
      this.initialize = __bind(this.initialize, this);
      this.onChange = __bind(this.onChange, this);
      this.onKeydown = __bind(this.onKeydown, this);
      this.update = __bind(this.update, this);
      _ref = PropertyEditView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PropertyEditView.prototype.tagName = "tr";

    PropertyEditView.prototype.events = {
      "keydown .edit": "onKeydown",
      "change .edit": "onChange"
    };

    PropertyEditView.prototype.template = _.template('\
    <td style="text-align:right;padding-right:5px">{{name}}</td>\
    <td>\
        <input id="{{id}}" class="edit" type="{{type}}" value="{{value}}"/>\
    </td>\
    ');

    PropertyEditView.prototype.update = function(val) {
      var values;
      values = {};
      values[this.attrName] = val;
      return this.model.setAttr(values);
    };

    PropertyEditView.prototype.onKeydown = function(e) {
      var _this = this;
      return setTimeout(function() {
        var v;
        v = _this.input.val();
        return _this.update(v);
      }, 10);
    };

    PropertyEditView.prototype.onChange = function(e) {};

    PropertyEditView.prototype.initialize = function(attrName) {
      this.attrName = this.options.attrName;
      this.inputType = this.options.inputType;
      this.listenTo(this.model, 'update', this.render);
      return this.initElement();
    };

    PropertyEditView.prototype.initElement = function() {
      var props;
      props = {
        type: this.inputType,
        id: "property-edit-" + this.attrName,
        name: this.attrName,
        value: ""
      };
      return this.$el.html(this.template(props));
    };

    PropertyEditView.prototype.render = function() {
      var value;
      value = this.model ? this.model.get(this.attrName) : "";
      this.input = this.$('.edit');
      if (this.input.val() !== value) {
        this.input.val(value);
      }
      return this;
    };

    PropertyEditView.prototype.clear = function() {
      return this.input.val("");
    };

    return PropertyEditView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.DataPropertyEditView = (function(_super) {
    __extends(DataPropertyEditView, _super);

    function DataPropertyEditView() {
      _ref = DataPropertyEditView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return DataPropertyEditView;

  })(PropertyEditView);

}).call(this);

(function() {
  var _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SelectLineView = (function(_super) {
    __extends(SelectLineView, _super);

    function SelectLineView() {
      this._setProperty = __bind(this._setProperty, this);
      _ref = SelectLineView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SelectLineView.prototype.initialize = function() {
      this._setProperty();
      this.listenTo(this.model, "change", this.render);
      return this.listenTo(this.model, 'remove', this.remove);
    };

    SelectLineView.prototype._setProperty = function() {
      return $(this.el).attr({
        "fill": "none",
        "stroke": "gray",
        "stroke-width": "1",
        "stroke-dasharray": "5",
        "stroke-dashoffset": "10"
      });
    };

    SelectLineView.prototype.render = function() {
      var points, property_path;
      points = this.model.getBBoxPoints();
      property_path = "M " + points[0].x + " " + points[0].y + " L " + points[1].x + " " + points[1].y + " L " + points[3].x + " " + points[3].y + " L " + points[2].x + " " + points[2].y + "z";
      return $(this.el).attr("d", property_path);
    };

    return SelectLineView;

  })(Backbone.View);

  this.CloneSelectLineView = (function(_super) {
    __extends(CloneSelectLineView, _super);

    function CloneSelectLineView() {
      this._setProperty = __bind(this._setProperty, this);
      _ref1 = CloneSelectLineView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    CloneSelectLineView.prototype._setProperty = function() {
      return $(this.el).attr({
        "pointer-events": "none",
        "fill": "blue",
        "fill-opacity": "0.5",
        "stroke": "gray",
        "stroke-width": "1",
        "stroke-dasharray": "5",
        "stroke-dashoffset": "10"
      });
    };

    return CloneSelectLineView;

  })(SelectLineView);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SelectLineListView = (function(_super) {
    __extends(SelectLineListView, _super);

    function SelectLineListView() {
      this.remove = __bind(this.remove, this);
      this.clear = __bind(this.clear, this);
      this.render = __bind(this.render, this);
      this.addItem = __bind(this.addItem, this);
      _ref = SelectLineListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SelectLineListView.prototype.initialize = function() {
      this.item_list = new SvgElementList();
      this.item_list.bind('add', this.addItem);
      this.line_view_class = this.options.line_view_class;
      return this.views = [];
    };

    SelectLineListView.prototype.addItem = function(item) {
      var rect_path;
      rect_path = SVGUtil.createTag('path');
      $(this.el).append(rect_path);
      if (this.line_view_class) {
        return this.views.push(new this.line_view_class({
          el: rect_path,
          model: item
        }));
      } else {
        return this.views.push(new SelectLineView({
          el: rect_path,
          model: item
        }));
      }
    };

    SelectLineListView.prototype.render = function() {
      var view, _i, _len, _ref1, _results;
      _ref1 = this.views;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        _results.push(view.render());
      }
      return _results;
    };

    SelectLineListView.prototype.clear = function() {
      var _this = this;
      this.views.forEach(function(view) {
        return view.remove();
      });
      this.views = [];
      return this.item_list.reset();
    };

    SelectLineListView.prototype.remove = function() {
      this.clear();
      return SelectLineListView.__super__.remove.call(this);
    };

    return SelectLineListView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SelectRegionControlView = (function(_super) {
    __extends(SelectRegionControlView, _super);

    function SelectRegionControlView() {
      this.regionDrop = __bind(this.regionDrop, this);
      this._getPosition = __bind(this._getPosition, this);
      this.regionDragging = __bind(this.regionDragging, this);
      this.startSelectRegion = __bind(this.startSelectRegion, this);
      this.isContainPoint = __bind(this.isContainPoint, this);
      this.render = __bind(this.render, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.clear = __bind(this.clear, this);
      this._size = __bind(this._size, this);
      this._getButtomRightPoint = __bind(this._getButtomRightPoint, this);
      this._getLeftTopPoint = __bind(this._getLeftTopPoint, this);
      this.setEnd = __bind(this.setEnd, this);
      this.setStart = __bind(this.setStart, this);
      this._setStyle = __bind(this._setStyle, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SelectRegionControlView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SelectRegionControlView.prototype.initialize = function() {
      this.canvas = this.options.canvas;
      this.region_el = SVGUtil.createTag('rect');
      $(this.el).append(this.region_el);
      return this._setStyle();
    };

    SelectRegionControlView.prototype._setStyle = function() {
      $(this.region_el).attr("fill", "none");
      $(this.region_el).attr("stroke", "black");
      $(this.region_el).attr("stroke-width", "1");
      $(this.region_el).attr("stroke-dasharray", "5");
      return $(this.region_el).attr("stroke-dashoffset", "10");
    };

    SelectRegionControlView.prototype.setStart = function(pos) {
      return this.start = pos;
    };

    SelectRegionControlView.prototype.setEnd = function(pos) {
      return this.end = pos;
    };

    SelectRegionControlView.prototype._getLeftTopPoint = function() {
      return {
        x: Math.min(this.start.x, this.end.x),
        y: Math.min(this.start.y, this.end.y)
      };
    };

    SelectRegionControlView.prototype._getButtomRightPoint = function() {
      return {
        x: Math.max(this.start.x, this.end.x),
        y: Math.max(this.start.y, this.end.y)
      };
    };

    SelectRegionControlView.prototype._size = function(start, end) {
      return {
        width: end.x - start.x,
        height: end.y - start.y
      };
    };

    SelectRegionControlView.prototype.clear = function() {
      this.start = null;
      this.end = null;
      $(this.region_el).attr("width", 0);
      $(this.region_el).attr("height", 0);
      return this.hide();
    };

    SelectRegionControlView.prototype.hide = function() {
      return this.$el.attr("display", "none");
    };

    SelectRegionControlView.prototype.show = function() {
      return this.$el.attr("display", "");
    };

    SelectRegionControlView.prototype.render = function() {
      var buttom_right, left_top, size;
      if (!(this.start && this.end)) {
        return;
      }
      left_top = this._getLeftTopPoint();
      buttom_right = this._getButtomRightPoint();
      size = this._size(left_top, buttom_right);
      $(this.region_el).attr("width", size.width);
      $(this.region_el).attr("height", size.height);
      return $(this.el).attr("transform", "translate(" + left_top.x + ", " + left_top.y + ")");
    };

    SelectRegionControlView.prototype.isContainPoint = function(p) {
      var end, start;
      start = this._getLeftTopPoint();
      end = this._getButtomRightPoint();
      return (start.x < p.x && p.x < end.x) && (start.y < p.y && p.y < end.y);
    };

    SelectRegionControlView.prototype.startSelectRegion = function(e) {
      this.clear();
      this.show();
      this.setStart(this._getPosition(e));
      $(document).mousemove(this.regionDragging);
      return $(document).mouseup(this.regionDrop);
    };

    SelectRegionControlView.prototype.regionDragging = function(e) {
      this.setEnd(this._getPosition(e));
      return this.render();
    };

    SelectRegionControlView.prototype._getPosition = function(e) {
      var offset;
      offset = $(this.canvas.el).offset();
      return {
        x: e.pageX - offset.left,
        y: e.pageY - offset.top
      };
    };

    SelectRegionControlView.prototype.regionDrop = function(e) {
      $(document).unbind('mousemove', this.regionDragging);
      $(document).unbind('mouseup', this.regionDrop);
      this.setEnd(this._getPosition(e));
      this.trigger("onRegionDrop", this, e);
      return this.clear();
    };

    return SelectRegionControlView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SnapItemView = (function(_super) {
    __extends(SnapItemView, _super);

    function SnapItemView() {
      this.render = __bind(this.render, this);
      this.clear = __bind(this.clear, this);
      this.createSvgRect = __bind(this.createSvgRect, this);
      this.setStyle = __bind(this.setStyle, this);
      this.addItem = __bind(this.addItem, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SnapItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SnapItemView.prototype.initialize = function() {
      this.items = [];
      return this.setStyle();
    };

    SnapItemView.prototype.addItem = function(item) {
      return this.items.push(this.createSvgRect(item));
    };

    SnapItemView.prototype.setStyle = function() {
      return this.$el.attr({
        "fill": "blue",
        "fill-opacity": "0.4"
      });
    };

    SnapItemView.prototype.createSvgRect = function(svg_element) {
      var el, points, property_path;
      el = SVGUtil.createTag("path");
      points = svg_element.getBBoxPoints();
      property_path = "M " + points[0].x + " " + points[0].y + " L " + points[1].x + " " + points[1].y + " L " + points[3].x + " " + points[3].y + " L " + points[2].x + " " + points[2].y + "z";
      $(el).attr("d", property_path);
      return el;
    };

    SnapItemView.prototype.clear = function() {
      this.items = [];
      return this.$el.empty();
    };

    SnapItemView.prototype.render = function() {
      var item, _i, _len, _ref1, _results,
        _this = this;
      this.$el.empty();
      _ref1 = this.items;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        item = _ref1[_i];
        _results.push((function(item) {
          return _this.$el.append(item);
        })(item));
      }
      return _results;
    };

    return SnapItemView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SnapLineView = (function(_super) {
    __extends(SnapLineView, _super);

    function SnapLineView() {
      this.render = __bind(this.render, this);
      this.clear = __bind(this.clear, this);
      this.createSvgLine = __bind(this.createSvgLine, this);
      this.setStyle = __bind(this.setStyle, this);
      this.addLineUsePoint = __bind(this.addLineUsePoint, this);
      this.addLine = __bind(this.addLine, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SnapLineView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SnapLineView.prototype.initialize = function() {
      this.lines = [];
      return this.setStyle();
    };

    SnapLineView.prototype.addLine = function(line) {
      return this.lines.push(line);
    };

    SnapLineView.prototype.addLineUsePoint = function(beg, end) {
      return this.addLine(this.createSvgLine(beg, end));
    };

    SnapLineView.prototype.setStyle = function() {
      return this.$el.attr({
        "stroke-width": "2",
        "stroke": "red",
        "opacity": "1"
      });
    };

    SnapLineView.prototype.createSvgLine = function(beg, end) {
      var line;
      line = SVGUtil.createTag("line");
      $(line).attr({
        "x1": beg.x,
        "y1": beg.y,
        "x2": end.x,
        "y2": end.y
      });
      return line;
    };

    SnapLineView.prototype.clear = function() {
      this.lines = [];
      return this.$el.empty();
    };

    SnapLineView.prototype.render = function() {
      var line, _i, _len, _ref1, _results,
        _this = this;
      this.$el.empty();
      _ref1 = this.lines;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        line = _ref1[_i];
        _results.push((function(line) {
          return _this.$el.append(line);
        })(line));
      }
      return _results;
    };

    return SnapLineView;

  })(Backbone.View);

}).call(this);

(function() {
  this.Snapping = (function() {
    function Snapping() {}

    Snapping.getNearPoints = function(points, snap_points) {
      var near_points, p, _i, _len;
      near_points = [];
      for (_i = 0, _len = points.length; _i < _len; _i++) {
        p = points[_i];
        _.each(snap_points, function(obj) {
          var dist_x, dist_y;
          dist_x = Math.abs(p.x - obj.point.x);
          dist_y = Math.abs(p.y - obj.point.y);
          if (dist_x < 5) {
            near_points.push({
              type: "x",
              p: p,
              snap_point: obj.point,
              dist_x: dist_x,
              dist_y: dist_y,
              obj: obj
            });
          }
          if (dist_y < 5) {
            return near_points.push({
              type: "y",
              p: p,
              snap_point: obj.point,
              dist_x: dist_x,
              dist_y: dist_y,
              obj: obj
            });
          }
        });
      }
      return near_points;
    };

    Snapping.getSnap = function(snap_target_points, none_filter) {
      var canvas_base, canvas_matrix, clone_origin_list, item, item_list, movep, near_point, near_point_x, near_point_y, near_points, ondrop, snap_item_list, snap_points, x, y, _fn, _i, _j, _len, _len1, _ref;
      if (none_filter == null) {
        none_filter = true;
      }
      canvas_base = SvgCanvasBase;
      snap_points = [];
      canvas_matrix = canvas_base.mainCanvas.getCTM();
      item_list = canvas_base.getItems();
      item_list = item_list.filter(function(item) {
        return item.constructor === SvgElement;
      });
      if (none_filter) {
        clone_origin_list = cloneControlView.item_list.map(function(item) {
          return item.get("origin_model");
        });
        snap_item_list = item_list.filter(function(item) {
          return !_.contains(clone_origin_list, item);
        });
      } else {
        snap_item_list = item_list;
      }
      _fn = function(item) {
        return _.each(item.getSnapPoints(), function(point) {
          return snap_points.push({
            type: "item",
            item: item,
            point: point
          });
        });
      };
      for (_i = 0, _len = snap_item_list.length; _i < _len; _i++) {
        item = snap_item_list[_i];
        _fn(item);
      }
      near_points = [];
      near_points = Snapping.getNearPoints(snap_target_points, snap_points);
      near_point_x = _.first(_.sortBy(_.filter(near_points, function(e) {
        return e.type === "x";
      }), function(e) {
        return e.dist_x;
      }));
      near_point_y = _.first(_.sortBy(_.filter(near_points, function(e) {
        return e.type === "y";
      }), function(e) {
        return e.dist_y;
      }));
      snap_line_view.clear();
      snap_item_view.clear();
      movep = SVGUtil.createPoint(0, 0);
      if (near_point_x) {
        x = near_point_x.snap_point.x;
        movep.x = near_point_x.p.x - near_point_x.snap_point.x;
        snap_line_view.addLineUsePoint({
          x: x,
          y: near_point_x.p.y
        }, {
          x: x,
          y: near_point_x.snap_point.y
        });
      }
      if (near_point_y) {
        y = near_point_y.snap_point.y;
        movep.y = near_point_y.p.y - near_point_y.snap_point.y;
        snap_line_view.addLineUsePoint({
          x: near_point_y.p.x,
          y: y
        }, {
          x: near_point_y.snap_point.x,
          y: y
        });
      }
      _ref = [near_point_x, near_point_y];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        near_point = _ref[_j];
        if (near_point && near_point.obj.type === "item") {
          snap_item_view.addItem(near_point.obj.item);
        }
      }
      snap_line_view.render();
      snap_item_view.render();
      ondrop = function(e) {
        snap_line_view.clear();
        snap_item_view.clear();
        return $(document).unbind('mouseup', ondrop);
      };
      $(document).on('mouseup', ondrop);
      return movep;
    };

    return Snapping;

  }).call(this);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgGridView = (function(_super) {
    __extends(SvgGridView, _super);

    function SvgGridView() {
      this.render = __bind(this.render, this);
      this.clear = __bind(this.clear, this);
      this.show = __bind(this.show, this);
      this.hide = __bind(this.hide, this);
      this.isVisible = __bind(this.isVisible, this);
      this.createSvgLine = __bind(this.createSvgLine, this);
      this.setStyle = __bind(this.setStyle, this);
      this.snapPoints = __bind(this.snapPoints, this);
      this.createYLine = __bind(this.createYLine, this);
      this.createXLine = __bind(this.createXLine, this);
      this.visible = __bind(this.visible, this);
      this.height = __bind(this.height, this);
      this.width = __bind(this.width, this);
      this.grid_size = __bind(this.grid_size, this);
      this.initialize = __bind(this.initialize, this);
      _ref = SvgGridView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgGridView.prototype.initialize = function() {
      this.lines = [];
      this.createXLine();
      this.createYLine();
      this.setStyle();
      return this.listenTo(this.model, "change", this.render);
    };

    SvgGridView.prototype.grid_size = function() {
      return this.model.gridSize();
    };

    SvgGridView.prototype.width = function() {
      return this.model.width();
    };

    SvgGridView.prototype.height = function() {
      return this.model.height();
    };

    SvgGridView.prototype.visible = function() {
      return this.model.visible();
    };

    SvgGridView.prototype.createXLine = function() {
      var i, index, poss, _i, _len, _results,
        _this = this;
      index = 0;
      poss = (function() {
        var _i, _ref1, _ref2, _results;
        _results = [];
        for (i = _i = 0, _ref1 = this.width(), _ref2 = this.grid_size(); _ref2 > 0 ? _i <= _ref1 : _i >= _ref1; i = _i += _ref2) {
          _results.push(i);
        }
        return _results;
      }).call(this);
      _results = [];
      for (_i = 0, _len = poss.length; _i < _len; _i++) {
        i = poss[_i];
        _results.push((function(i) {
          _this.lines.push(_this.createSvgLine({
            x: i,
            y: 0
          }, {
            x: i,
            y: _this.height()
          }));
          return index++;
        })(i));
      }
      return _results;
    };

    SvgGridView.prototype.createYLine = function() {
      var i, index, poss, _i, _len, _results,
        _this = this;
      index = 0;
      poss = (function() {
        var _i, _ref1, _ref2, _results;
        _results = [];
        for (i = _i = 0, _ref1 = this.height(), _ref2 = this.grid_size(); _ref2 > 0 ? _i <= _ref1 : _i >= _ref1; i = _i += _ref2) {
          _results.push(i);
        }
        return _results;
      }).call(this);
      _results = [];
      for (_i = 0, _len = poss.length; _i < _len; _i++) {
        i = poss[_i];
        _results.push((function(i) {
          _this.lines.push(_this.createSvgLine({
            y: i,
            x: 0
          }, {
            y: i,
            x: _this.width()
          }));
          return index++;
        })(i));
      }
      return _results;
    };

    SvgGridView.prototype.snapPoints = function() {
      var h_poss, i, points, w_poss, _i, _j, _len, _len1;
      points = [];
      w_poss = (function() {
        var _i, _ref1, _ref2, _results;
        _results = [];
        for (i = _i = 0, _ref1 = this.width(), _ref2 = this.grid_size(); _ref2 > 0 ? _i <= _ref1 : _i >= _ref1; i = _i += _ref2) {
          _results.push(i);
        }
        return _results;
      }).call(this);
      for (_i = 0, _len = w_poss.length; _i < _len; _i++) {
        i = w_poss[_i];
        points.push({
          x: i,
          y: 0
        });
      }
      h_poss = (function() {
        var _j, _ref1, _ref2, _results;
        _results = [];
        for (i = _j = 0, _ref1 = this.height(), _ref2 = this.grid_size(); _ref2 > 0 ? _j <= _ref1 : _j >= _ref1; i = _j += _ref2) {
          _results.push(i);
        }
        return _results;
      }).call(this);
      for (_j = 0, _len1 = h_poss.length; _j < _len1; _j++) {
        i = h_poss[_j];
        points.push({
          x: 0,
          y: i
        });
      }
      return points;
    };

    SvgGridView.prototype.setStyle = function() {
      return this.$el.attr({
        "stroke-width": "0.5",
        "stroke": "gray",
        "opacity": "1"
      });
    };

    SvgGridView.prototype.createSvgLine = function(beg, end, _options) {
      var line, options;
      options = _options || {};
      line = $(SVGUtil.createTag("line"));
      line.attr(_.extend({
        "x1": beg.x,
        "y1": beg.y,
        "x2": end.x,
        "y2": end.y
      }, options));
      return line;
    };

    SvgGridView.prototype.isVisible = function() {
      return this.$el.css("display") !== "none";
    };

    SvgGridView.prototype.hide = function() {
      return this.$el.hide();
    };

    SvgGridView.prototype.show = function() {
      return this.$el.show();
    };

    SvgGridView.prototype.clear = function() {
      return this.lines = [];
    };

    SvgGridView.prototype.render = function() {
      var line, _i, _len, _ref1, _results,
        _this = this;
      if (this.visible()) {
        this.show();
      } else {
        this.hide();
      }
      this.$el.empty();
      this.clear();
      this.createXLine();
      this.createYLine();
      _ref1 = this.lines;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        line = _ref1[_i];
        _results.push((function(line) {
          return _this.$el.append(line);
        })(line));
      }
      return _results;
    };

    return SvgGridView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GridSettingView = (function(_super) {
    __extends(GridSettingView, _super);

    function GridSettingView() {
      this.render = __bind(this.render, this);
      this.onHeightChange = __bind(this.onHeightChange, this);
      this.onWidthChange = __bind(this.onWidthChange, this);
      this.onSizeChange = __bind(this.onSizeChange, this);
      this.onVisibleChange = __bind(this.onVisibleChange, this);
      this.initialize = __bind(this.initialize, this);
      _ref = GridSettingView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GridSettingView.prototype.events = {
      "change #grid-visible-checkbox": "onVisibleChange",
      "change #grid-size": "onSizeChange",
      "change #grid-width": "onWidthChange",
      "change #grid-height": "onHeightChange"
    };

    GridSettingView.prototype.initialize = function() {
      this.grid_visible_el = $("#grid-visible-checkbox");
      this.grid_size_el = $("#grid-size");
      this.grid_height_el = $("#grid-height");
      this.grid_width_el = $("#grid-width");
      return this.listenTo(this.model, "change", this.render);
    };

    GridSettingView.prototype.onVisibleChange = function() {
      return this.model.set("visible", this.grid_visible_el.prop("checked"));
    };

    GridSettingView.prototype.onSizeChange = function() {
      return this.model.set("grid_size", Number(this.grid_size_el.val()));
    };

    GridSettingView.prototype.onWidthChange = function() {
      return this.model.set("width", Number(this.grid_width_el.val()));
    };

    GridSettingView.prototype.onHeightChange = function() {
      return this.model.set("height", Number(this.grid_height_el.val()));
    };

    GridSettingView.prototype.render = function() {
      this.grid_visible_el.prop({
        "checked": this.model.visible()
      });
      this.grid_size_el.val(this.model.gridSize());
      this.grid_height_el.val(this.model.height());
      return this.grid_width_el.val(this.model.width());
    };

    return GridSettingView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.OpenFileView = (function(_super) {
    __extends(OpenFileView, _super);

    function OpenFileView() {
      this.onChange = __bind(this.onChange, this);
      _ref = OpenFileView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OpenFileView.prototype.events = {
      "change #file-select": "onChange"
    };

    OpenFileView.prototype.onChange = function(e) {
      var $file_select, file, util;
      $("#fileModal").modal('hide');
      $file_select = $("#file-select");
      file = $file_select.get(0).files[0];
      $file_select.val("");
      util = new FileUtil;
      return util.load(file, function(parsed) {
        var elem, _i, _j, _len, _len1, _ref1, _ref2, _results;
        _ref1 = parsed.items;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          elem = _ref1[_i];
          SvgCanvasBase.addElement(elem);
        }
        _ref2 = parsed.defs;
        _results = [];
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          elem = _ref2[_j];
          _results.push($("#item-defs").append(elem));
        }
        return _results;
      });
    };

    return OpenFileView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.OpenImageFileView = (function(_super) {
    __extends(OpenImageFileView, _super);

    function OpenImageFileView() {
      this.onChange = __bind(this.onChange, this);
      _ref = OpenImageFileView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    OpenImageFileView.prototype.events = {
      "change #image-file-select": "onChange"
    };

    OpenImageFileView.prototype.onChange = function(e) {
      var $file_select, file, util,
        _this = this;
      $("#imageFileModal").modal('hide');
      $file_select = $("#image-file-select");
      file = $file_select.get(0).files[0];
      $file_select.val("");
      util = new FileUtil;
      return util.loadImageAsURL(file, function(image_url) {
        return SvgCanvasBase.addElement(_this.createImage(image_url));
      });
    };

    OpenImageFileView.prototype.createImage = function(image_url) {
      var image, img;
      img = new Image();
      img.onload = function() {
        return $(image).attr({
          width: img.width,
          height: img.height
        });
      };
      img.src = image_url;
      image = SVGUtil.createTag("image");
      image.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", image_url);
      return image;
    };

    return OpenImageFileView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgCanvas = (function(_super) {
    __extends(SvgCanvas, _super);

    function SvgCanvas() {
      this.deleteSelectdItem = __bind(this.deleteSelectdItem, this);
      this._getPosition = __bind(this._getPosition, this);
      this._getMovedPosition = __bind(this._getMovedPosition, this);
      this.moveDrop = __bind(this.moveDrop, this);
      this.moveDragging = __bind(this.moveDragging, this);
      this.mousedown = __bind(this.mousedown, this);
      this.group = __bind(this.group, this);
      this.unGroup = __bind(this.unGroup, this);
      this.unGroupSelectedItem = __bind(this.unGroupSelectedItem, this);
      this.addFolderSelectedItem = __bind(this.addFolderSelectedItem, this);
      this.groupSelectedItem = __bind(this.groupSelectedItem, this);
      this.zoom = __bind(this.zoom, this);
      this.addZoomCenter = __bind(this.addZoomCenter, this);
      this.addFolder = __bind(this.addFolder, this);
      this.addElement = __bind(this.addElement, this);
      this.addItem = __bind(this.addItem, this);
      this.removeItem = __bind(this.removeItem, this);
      this.generateId = __bind(this.generateId, this);
      _ref = SvgCanvas.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgCanvas.prototype.events = function() {
      return {
        "mousedown": "mousedown",
        "mousewheel": "onMouseWheel"
      };
    };

    SvgCanvas.prototype.initialize = function() {
      this.mainCanvas = this.options.mainCanvas;
      this.manager = this.options.manager;
      this.control = this.options.control;
      this.zoomValue = 1.0;
      this.unique_index = 0;
      this.rootFolder = new SvgFolder();
      this.rootFolder.setElement(this.mainCanvas);
      this.rootFolder.setManager(this.manager);
      return this.item_list = this.rootFolder.items;
    };

    SvgCanvas.prototype.generateId = function() {
      return "item-" + UUID.generate();
    };

    SvgCanvas.prototype.getItems = function() {
      return _.flatten(this._getItems(this.rootFolder));
    };

    SvgCanvas.prototype._getItems = function(folder) {
      var _this = this;
      return folder.items.map(function(item) {
        if (item.constructor === SvgFolder) {
          return _this._getItems(item);
        } else {
          return item;
        }
      });
    };

    SvgCanvas.prototype.removeItem = function(item) {
      return item.folder.remove(item);
    };

    SvgCanvas.prototype.addItem = function(item) {
      var elm;
      elm = item.el;
      if (!$(elm).attr("id")) {
        $(elm).attr("id", this.generateId());
      }
      $(elm).attr("class", "svg-control-item");
      this.rootFolder.$el.append(elm);
      this.rootFolder.add(item);
      return item;
    };

    SvgCanvas.prototype.addElement = function(elm) {
      var item;
      item = new SvgElement();
      item.setElement(elm);
      return this.addItem(item);
    };

    SvgCanvas.prototype.addFolder = function(targetFolder) {
      var elm, folder;
      if (targetFolder == null) {
        targetFolder = this.rootFolder;
      }
      folder = new SvgFolder();
      folder.setManager(this.manager);
      folder.setElement(SVGUtil.createTag("g"));
      folder.setFolder(targetFolder);
      elm = folder.el;
      if (!$(elm).attr("id")) {
        $(elm).attr("id", this.generateId());
      }
      $(targetFolder.el).append(elm);
      targetFolder.add(folder);
      $(folder.el).attr("class", "svg-folder-item");
      return folder;
    };

    SvgCanvas.prototype.onMouseWheel = function(e) {
      var offset, pos, val, wheelEvent;
      if (e.altKey) {
        offset = this.$el.offset();
        wheelEvent = e.originalEvent;
        pos = {
          x: wheelEvent.pageX - offset.left,
          y: wheelEvent.pageY - offset.top
        };
        val = Math.pow(1.02, wheelEvent.wheelDelta / 10);
        this.zoom(val * this.zoomValue, pos);
        return e.preventDefault();
      }
    };

    SvgCanvas.prototype.addZoomCenter = function(val) {
      return this.zoom(this.zoomValue + val, {
        x: $(this.el).width() / 2,
        y: $(this.el).height() / 2
      });
    };

    SvgCanvas.prototype.zoom = function(val, pos, add) {
      var canvas_el, canvas_matrix, matrix, point, transform, x, y;
      if (add == null) {
        add = true;
      }
      if (val < 0.05) {
        return;
      }
      if (val > 100) {
        return;
      }
      canvas_el = this.mainCanvas;
      point = SVGUtil.createPoint(pos.x, pos.y);
      canvas_matrix = canvas_el.getCTM();
      point = point.matrixTransform(canvas_matrix.inverse());
      transform = SVGUtil.toD3Transform(canvas_matrix);
      this.zoomValue = val;
      x = point.x;
      y = point.y;
      matrix = void 0;
      if (add) {
        val = val / transform.scale[0];
        matrix = SVGUtil.SVG.createSVGMatrix().translate(x, y).scale(val).translate(-x, -y);
        matrix = canvas_matrix.multiply(matrix);
      } else {
        matrix = SVGUtil.SVG.createSVGMatrix().translate(x, y).scale(val).translate(-x, -y);
      }
      SVGUtil.setMatrixTransform(canvas_el, matrix);
      return this.trigger("onZoom", {
        sender: this,
        pos: point,
        scale: val
      });
    };

    SvgCanvas.prototype.groupSelectedItem = function() {
      var clone_origin_list, group,
        _this = this;
      if (this.control.item_list.length > 0) {
        clone_origin_list = this.control.item_list.map(function(item) {
          return item.get("origin_model");
        });
        group = this.group(clone_origin_list);
        return this.control.setItems([group]);
      }
    };

    SvgCanvas.prototype.addFolderSelectedItem = function() {
      var clone_origin_list, folder,
        _this = this;
      if (this.control.item_list.length > 0) {
        clone_origin_list = this.getItems().filter(function(item) {
          return item.isSelected();
        });
        console.log(this._getItems(this.rootFolder));
        console.log(clone_origin_list);
        folder = this.addFolder();
        return clone_origin_list.forEach(function(item) {
          return InspectorDragAndDrop.moveToElement(item, folder);
        });
      }
    };

    SvgCanvas.prototype.unGroupSelectedItem = function() {
      if (this.control.isOneItem()) {
        this.unGroup(this.control.firstOriginalItem());
        return this.control.clear();
      }
    };

    SvgCanvas.prototype.unGroup = function(item) {
      var group_matrix,
        _this = this;
      group_matrix = SVGUtil.localMatrix(item.el);
      _.each($(item.el).children(), function(el) {
        var matrix;
        matrix = group_matrix.multiply(SVGUtil.localMatrix(el));
        SVGUtil.setMatrixTransform(el, matrix);
        return _this.addElement(el);
      });
      return this.item_list.remove(item);
    };

    SvgCanvas.prototype.group = function(items) {
      var canvas, group_el,
        _this = this;
      canvas = this.mainCanvas;
      group_el = SVGUtil.createTag("g");
      $(canvas).append(group_el);
      items = items.sort(function(a, b) {
        return a.$el.index() - b.$el.index();
      });
      items.forEach(function(item) {
        item.group();
        $(group_el).append(item.el);
        return item.removeFromFolder();
      });
      return this.addElement(group_el);
    };

    SvgCanvas.prototype.mousedown = function(e) {
      if (e.altKey) {
        this.pre_position = e;
        $(document).mousemove(this.moveDragging);
        $(document).mouseup(this.moveDrop);
      }
      return this.manager.onEvent("onMouseDown", this, e);
    };

    SvgCanvas.prototype.moveDragging = function(e) {
      var matrix, matrix_inverse, point, pos;
      pos = this._getMovedPosition(e);
      point = SVGUtil.createPoint(pos.x, pos.y);
      matrix = this.mainCanvas.getCTM();
      matrix_inverse = matrix.inverse();
      matrix_inverse.e = 0;
      matrix_inverse.f = 0;
      point = point.matrixTransform(matrix_inverse);
      SVGUtil.setMatrixTransform(this.mainCanvas, matrix.translate(point.x, point.y));
      this.pre_position = e;
      return this.trigger("onZoom", this);
    };

    SvgCanvas.prototype.moveDrop = function(e) {
      $(document).unbind('mousemove', this.moveDragging);
      return $(document).unbind('mouseup', this.moveDrop);
    };

    SvgCanvas.prototype._getMovedPosition = function(e) {
      var dx, dy;
      dx = e.pageX - this.pre_position.pageX;
      dy = e.pageY - this.pre_position.pageY;
      return {
        x: dx,
        y: dy
      };
    };

    SvgCanvas.prototype._getPosition = function(e) {
      var offset;
      offset = $(this.el).offset();
      return {
        x: e.pageX - offset.left,
        y: e.pageY - offset.top
      };
    };

    SvgCanvas.prototype.deleteSelectdItem = function() {
      var _this = this;
      this.control.item_list.each(function(e) {
        return _this.removeItem(e.get("origin_model"));
      });
      return this.control.clear();
    };

    return SvgCanvas;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgElementView = (function(_super) {
    __extends(SvgElementView, _super);

    function SvgElementView() {
      this.remove = __bind(this.remove, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.onDblClick = __bind(this.onDblClick, this);
      this.onClick = __bind(this.onClick, this);
      _ref = SvgElementView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgElementView.prototype.events = function() {
      return {
        "mousedown": "onMouseDown",
        "click": "onClick",
        "dblclick": "onDblClick"
      };
    };

    SvgElementView.prototype.initialize = function() {
      return this.listenTo(this.model, 'remove', this.remove);
    };

    SvgElementView.prototype.onClick = function(e) {
      return this.trigger("onClick", this, e);
    };

    SvgElementView.prototype.onDblClick = function(e) {
      this.trigger("onDblClick", this, e);
      return e.stopPropagation();
    };

    SvgElementView.prototype.onMouseDown = function(e) {
      if (!this.model.isLocked()) {
        return this.trigger("onMouseDown", this, e);
      }
    };

    SvgElementView.prototype.remove = function() {
      if (this.model.isSuspendRemove()) {
        this.stopListening();
        return this.undelegateEvents();
      } else if (this.model.isGrouped()) {
        this.stopListening();
        return this.undelegateEvents();
      } else {
        return SvgElementView.__super__.remove.call(this);
      }
    };

    return SvgElementView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgItemListView = (function(_super) {
    __extends(SvgItemListView, _super);

    function SvgItemListView() {
      this.clickedItem = __bind(this.clickedItem, this);
      this.mouseDraggingItem = __bind(this.mouseDraggingItem, this);
      this.mouseUpItem = __bind(this.mouseUpItem, this);
      this.mouseDownItem = __bind(this.mouseDownItem, this);
      this.addOne = __bind(this.addOne, this);
      _ref = SvgItemListView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgItemListView.prototype.initialize = function() {
      return this.model.bind('add', this.addOne);
    };

    SvgItemListView.prototype.addOne = function(svgitem) {
      var view,
        _this = this;
      view = new SvgItemView({
        model: svgitem
      });
      view.bind("clicked", this.clickedItem);
      view.bind("onMouseDown", this.mouseDownItem);
      view.bind("onMouseUp", this.mouseUpItem);
      view.bind("onMouseDragging", this.mouseDraggingItem);
      $(this.el).append(view.render().el);
      setTimeout(function() {
        return view.fit();
      }, 0);
      return $(view.el).attr("class", "svg-item");
    };

    SvgItemListView.prototype.mouseDownItem = function(svgitem, e) {
      return this.trigger("mouseDown.item", svgitem, e);
    };

    SvgItemListView.prototype.mouseUpItem = function(svgitem, e) {
      return this.trigger("mouseUp.item", svgitem, e);
    };

    SvgItemListView.prototype.mouseDraggingItem = function(svgitem, e) {
      return this.trigger("mouseDragging.item", svgitem, e);
    };

    SvgItemListView.prototype.clickedItem = function(svgitem) {
      return this.trigger("clicked.item", svgitem);
    };

    return SvgItemListView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgItemToolView = (function(_super) {
    __extends(SvgItemToolView, _super);

    function SvgItemToolView() {
      this.mouseDraggingItem = __bind(this.mouseDraggingItem, this);
      this.mouseUpItem = __bind(this.mouseUpItem, this);
      this.getSelectedItemElement = __bind(this.getSelectedItemElement, this);
      this._updateDraggingItemPosition = __bind(this._updateDraggingItemPosition, this);
      this.mouseDownItem = __bind(this.mouseDownItem, this);
      this._getDraggingItemElement = __bind(this._getDraggingItemElement, this);
      _ref = SvgItemToolView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgItemToolView.prototype.initialize = function() {
      this._canvas = this.options.canvas;
      this._mainCanvas = this._canvas.mainCanvas;
      this.bind("mouseDown.item", this.mouseDownItem);
      this.bind("mouseDragging.item", this.mouseDraggingItem);
      this.bind("mouseUp.item", this.mouseUpItem);
      return SvgItemToolView.__super__.initialize.call(this);
    };

    SvgItemToolView.prototype._getDraggingItemElement = function() {
      return $("#item-dragging");
    };

    SvgItemToolView.prototype.mouseDownItem = function(sender, e) {
      var clone_node, ondrop,
        _this = this;
      $(document).mousemove(sender.onDragging);
      ondrop = function(e) {
        if (sender.onDrop) {
          sender.onDrop(e);
        }
        $(document).unbind('mousemove', sender.onDragging);
        $(document).unbind('mouseup', ondrop);
        e.preventDefault();
        return e.stopPropagation();
      };
      $(document).mouseup(ondrop);
      $("#svg-item-tool").show();
      clone_node = this.getSelectedItemElement(sender).cloneNode(true);
      this._getDraggingItemElement().append(clone_node);
      this._updateDraggingItemPosition(e);
      e.preventDefault();
      return e.stopPropagation();
    };

    SvgItemToolView.prototype._updateDraggingItemPosition = function(e) {
      var matrix, point, screen_ctm;
      screen_ctm = this._mainCanvas.getScreenCTM();
      point = SVGUtil.createPoint(e.pageX, e.pageY);
      matrix = screen_ctm.inverse();
      point = point.matrixTransform(matrix);
      return SVGUtil.setMatrixTransform(this._getDraggingItemElement()[0], screen_ctm.translate(point.x, point.y));
    };

    SvgItemToolView.prototype.getSelectedItemElement = function(sender) {
      return $(sender.el).find("svg g").children()[0];
    };

    SvgItemToolView.prototype.mouseUpItem = function(sender, e) {
      var canvas, canvas_matrix, clone_node, isContain, pos, screen_ctm,
        _this = this;
      canvas = this._canvas.$el;
      pos = canvas.position();
      isContain = function() {
        return pos.left < e.pageX && e.pageX < (canvas.width() + pos.left) && pos.top < e.pageY && e.pageY < (canvas.height() + pos.top);
      };
      screen_ctm = this._getDraggingItemElement().children()[0].getScreenCTM();
      this._getDraggingItemElement().empty();
      $("#svg-item-tool").hide();
      if (isContain()) {
        clone_node = this.getSelectedItemElement(sender).cloneNode(true);
        $(this._mainCanvas).append(clone_node);
        canvas_matrix = this._mainCanvas.getScreenCTM();
        SVGUtil.setMatrixTransform(clone_node, canvas_matrix.inverse().multiply(screen_ctm));
        return this._canvas.addElement(clone_node);
      }
    };

    SvgItemToolView.prototype.mouseDraggingItem = function(sender, e) {
      return this._updateDraggingItemPosition(e);
    };

    return SvgItemToolView;

  })(SvgItemListView);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SvgItemView = (function(_super) {
    __extends(SvgItemView, _super);

    function SvgItemView() {
      this.click = __bind(this.click, this);
      this.onDrop = __bind(this.onDrop, this);
      this.onDragging = __bind(this.onDragging, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.fit = __bind(this.fit, this);
      _ref = SvgItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SvgItemView.template = _.template('\
    <svg\
        height="40px"\
        width="40px"\
        viewBox="0 10 100 100"\
        xmlns="http://www.w3.org/2000/svg"\
        xmlns:xlink="http://www.w3.org/1999/xlink">\
      <g>\
      {{contents}}\
      </g>\
    </svg>');

    SvgItemView.prototype.events = function() {
      return {
        "click": "click",
        "mousedown": "onMouseDown"
      };
    };

    SvgItemView.prototype.render = function() {
      $(this.el).css("width", "40px");
      $(this.el).css("height", "40px");
      $(this.el).css("border", "1px solid #ccc");
      $(this.el).css("float", "left");
      $(this.el).css("margin", "1px");
      $(this.el).html(SvgItemView.template(this.model.attributes));
      return this;
    };

    SvgItemView.prototype.fit = function() {
      var bbox, svg, svg_group, view_box;
      svg_group = $(this.el).find("g")[0];
      svg = $(this.el).find("svg")[0];
      bbox = svg_group.getBBox();
      view_box = bbox.x + " " + bbox.y + " " + bbox.width + " " + bbox.height;
      return svg.setAttribute("viewBox", view_box);
    };

    SvgItemView.prototype.onMouseDown = function(e) {
      return this.trigger("onMouseDown", this, e);
    };

    SvgItemView.prototype.onDragging = function(e) {
      return this.trigger("onMouseDragging", this, e);
    };

    SvgItemView.prototype.onDrop = function(e) {
      return this.trigger("onMouseUp", this, e);
    };

    SvgItemView.prototype.click = function() {
      return this.trigger("clicked", this);
    };

    return SvgItemView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ZOrderControl = (function(_super) {
    __extends(ZOrderControl, _super);

    function ZOrderControl() {
      this._toBottom = __bind(this._toBottom, this);
      this._toTop = __bind(this._toTop, this);
      this._bringBack = __bind(this._bringBack, this);
      this._bringForward = __bind(this._bringForward, this);
      this._sort = __bind(this._sort, this);
      this._move = __bind(this._move, this);
      this._getSelectedElement = __bind(this._getSelectedElement, this);
      this.toBottom = __bind(this.toBottom, this);
      this.toTop = __bind(this.toTop, this);
      this.bringBack = __bind(this.bringBack, this);
      this.bringForward = __bind(this.bringForward, this);
      _ref = ZOrderControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ZOrderControl.prototype.initialize = function() {
      this.canvas = this.options.canvas;
      return this.canvas_el = this.canvas.mainCanvas;
    };

    ZOrderControl.prototype.bringForward = function() {
      return this._move(this._bringForward);
    };

    ZOrderControl.prototype.bringBack = function() {
      return this._move(this._bringBack);
    };

    ZOrderControl.prototype.toTop = function() {
      return this._move(this._toTop);
    };

    ZOrderControl.prototype.toBottom = function() {
      return this._move(this._toBottom);
    };

    ZOrderControl.prototype._getSelectedElement = function() {
      var _this = this;
      return this.canvas.control.item_list.map(function(item) {
        return $(item.get("origin_model").el);
      });
    };

    ZOrderControl.prototype._move = function(fn) {
      fn(this._getSelectedElement());
      return this.trigger("onMove", this);
    };

    ZOrderControl.prototype._sort = function(elements) {
      var _this = this;
      return elements.sort(function(a, b) {
        return b.index() - a.index();
      });
    };

    ZOrderControl.prototype._bringForward = function(elements) {
      var e, _i, _len, _results;
      elements = this._sort(elements).reverse();
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        e = elements[_i];
        _results.push(e.insertAfter(e.next()));
      }
      return _results;
    };

    ZOrderControl.prototype._bringBack = function(elements) {
      var e, _i, _len, _results;
      elements = this._sort(elements);
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        e = elements[_i];
        _results.push(e.insertBefore(e.prev()));
      }
      return _results;
    };

    ZOrderControl.prototype._toTop = function(elements) {
      var e, _i, _len, _results;
      elements = this._sort(elements).reverse();
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        e = elements[_i];
        _results.push($(this.canvas_el).append(e));
      }
      return _results;
    };

    ZOrderControl.prototype._toBottom = function(elements) {
      var e, _i, _len, _results;
      elements = this._sort(elements);
      _results = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        e = elements[_i];
        _results.push($(this.canvas_el).prepend(e));
      }
      return _results;
    };

    return ZOrderControl;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.LinearGradientModel = (function(_super) {
    __extends(LinearGradientModel, _super);

    function LinearGradientModel() {
      this.toAttr = __bind(this.toAttr, this);
      _ref = LinearGradientModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    LinearGradientModel.prototype.toAttr = function() {
      var attrs;
      attrs = {};
      attrs["x1"] = this.get("x1") + "%";
      attrs["y1"] = this.get("y1") + "%";
      attrs["x2"] = this.get("x2") + "%";
      attrs["y2"] = this.get("y2") + "%";
      attrs["spreadMethod"] = this.get("spreadMethod");
      attrs["gradientUnits"] = this.get("gradientUnits");
      return attrs;
    };

    return LinearGradientModel;

  })(Backbone.Model);

  this.RadialGradientModel = (function(_super) {
    __extends(RadialGradientModel, _super);

    function RadialGradientModel() {
      this.toAttr = __bind(this.toAttr, this);
      _ref1 = RadialGradientModel.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    RadialGradientModel.prototype.toAttr = function() {
      var attrs;
      attrs = {};
      attrs["cx"] = this.get("cx") + "%";
      attrs["cy"] = this.get("cy") + "%";
      attrs["r"] = this.get("r") + "%";
      attrs["fx"] = this.get("fx") + "%";
      attrs["fy"] = this.get("fy") + "%";
      attrs["spreadMethod"] = this.get("spreadMethod");
      attrs["gradientUnits"] = this.get("gradientUnits");
      return attrs;
    };

    return RadialGradientModel;

  })(Backbone.Model);

  this.GradientStopModel = (function(_super) {
    __extends(GradientStopModel, _super);

    function GradientStopModel() {
      this.toAttr = __bind(this.toAttr, this);
      _ref2 = GradientStopModel.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    GradientStopModel.prototype.toAttr = function() {
      var attrs;
      attrs = {};
      attrs["offset"] = this.get("offset");
      attrs["stop-color"] = this.get("color");
      attrs["stop-opacity"] = this.get("opacity");
      return attrs;
    };

    return GradientStopModel;

  })(Backbone.Model);

  this.GradientStopCollection = (function(_super) {
    __extends(GradientStopCollection, _super);

    function GradientStopCollection() {
      _ref3 = GradientStopCollection.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    GradientStopCollection.prototype.model = GradientStopModel;

    return GradientStopCollection;

  })(Backbone.Collection);

  this.GradientPointControl = (function(_super) {
    __extends(GradientPointControl, _super);

    function GradientPointControl() {
      this.render = __bind(this.render, this);
      this.getRenderPosition = __bind(this.getRenderPosition, this);
      this._getItemCoordinateMatrix = __bind(this._getItemCoordinateMatrix, this);
      this.mouseUp = __bind(this.mouseUp, this);
      this.itemBBoxPoints = __bind(this.itemBBoxPoints, this);
      this.mouseMove = __bind(this.mouseMove, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.initialize = __bind(this.initialize, this);
      _ref4 = GradientPointControl.__super__.constructor.apply(this, arguments);
      return _ref4;
    }

    GradientPointControl.prototype.events = function() {
      return {
        "mousedown": "onMouseDown"
      };
    };

    GradientPointControl.prototype.initialize = function() {
      this.type = this.options.type;
      this.x_attr = this.options.x_attr;
      this.y_attr = this.options.y_attr;
      return this.setStyle();
    };

    GradientPointControl.prototype.setStyle = function() {
      return $(this.el).attr({
        "stroke": "black",
        "stroke-width": "1",
        "fill": "white",
        "opacity": 0.5,
        "width": 16,
        "height": 16,
        "x": 0,
        "y": 0
      });
    };

    GradientPointControl.prototype.onMouseDown = function(e) {
      this.pre_position = e;
      e.preventDefault();
      e.stopPropagation();
      $(document).mousemove(this.mouseMove);
      return $(document).mouseup(this.mouseUp);
    };

    GradientPointControl.prototype.mouseMove = function(e) {
      var matrix, mouse_pos, point, points, scale_per;
      e.preventDefault();
      e.stopPropagation();
      mouse_pos = SVGUtil.createPoint(e.pageX, e.pageY);
      points = this.itemBBoxPoints();
      point = SVGUtil.createPoint(mouse_pos.x - points[0].x, mouse_pos.y - points[0].y);
      matrix = this._getItemCoordinateMatrix();
      scale_per = point.matrixTransform(matrix.inverse());
      this.model.set(this.x_attr, scale_per.x * 100);
      return this.model.set(this.y_attr, scale_per.y * 100);
    };

    GradientPointControl.prototype.itemBBoxPoints = function() {
      var item;
      item = this.model.get("item");
      return item._getMatrixBBoxPoints(item.getScreenCTM());
    };

    GradientPointControl.prototype.mouseUp = function(e) {
      $(document).unbind('mousemove', this.mouseMove);
      return $(document).unbind('mouseup', this.mouseUp);
    };

    GradientPointControl.prototype._getItemCoordinateMatrix = function() {
      var m, points;
      points = this.itemBBoxPoints();
      m = SVGUtil.SVG.createSVGMatrix();
      m.a = points[2].x - points[0].x;
      m.b = points[2].y - points[0].y;
      m.c = points[1].x - points[0].x;
      m.d = points[1].y - points[0].y;
      return m;
    };

    GradientPointControl.prototype.getRenderPosition = function() {
      var matrix, point, points, x, y;
      points = this.model.get("item").getBBoxPoints();
      x = this.model.get(this.x_attr) / 100;
      y = this.model.get(this.y_attr) / 100;
      point = SVGUtil.createPoint(x, y);
      matrix = this._getItemCoordinateMatrix();
      point = point.matrixTransform(matrix);
      x = points[0].x + point.x;
      y = points[0].y + point.y;
      return SVGUtil.createPoint(x, y);
    };

    GradientPointControl.prototype.render = function() {
      var point;
      point = this.getRenderPosition();
      return this.$el.attr({
        "x": point.x - 8,
        "y": point.y - 8
      });
    };

    return GradientPointControl;

  })(Backbone.View);

  this.GradientControlBase = (function(_super) {
    __extends(GradientControlBase, _super);

    function GradientControlBase() {
      this._applyGradientToItem = __bind(this._applyGradientToItem, this);
      this._getGradientElement = __bind(this._getGradientElement, this);
      this._appendElement = __bind(this._appendElement, this);
      this._createStopModels = __bind(this._createStopModels, this);
      this._toNumber = __bind(this._toNumber, this);
      this._getGradientStops = __bind(this._getGradientStops, this);
      _ref5 = GradientControlBase.__super__.constructor.apply(this, arguments);
      return _ref5;
    }

    GradientControlBase.prototype._getGradientStops = function(model) {
      var _this = this;
      return model.get("stops").map(function(stop) {
        var stop_el;
        stop_el = SVGUtil.createTag("stop");
        $(stop_el).attr(stop.toAttr());
        return stop_el;
      });
    };

    GradientControlBase.prototype._toNumber = function(str, instead) {
      if (instead == null) {
        instead = 0;
      }
      if (str) {
        return Number(str.replace(/[^0-9.]/, ""));
      } else {
        return instead;
      }
    };

    GradientControlBase.prototype._createStopModels = function(grad_el) {
      var stops, stops_el,
        _this = this;
      stops_el = $(grad_el).find("stop").get();
      stops = stops_el.map(function(elm) {
        elm = $(elm);
        return new GradientStopModel({
          offset: elm.attr("offset"),
          color: elm.attr("stop-color"),
          opacity: elm.attr("stop-opacity")
        });
      });
      return new GradientStopCollection(stops);
    };

    GradientControlBase.prototype._appendElement = function(tag_name) {
      var element;
      element = SVGUtil.createTag(tag_name);
      this.$el.append(element);
      return element;
    };

    GradientControlBase.prototype._getGradientElement = function(model, element) {
      var attr, gradient;
      gradient = SVGUtil.createTag(element);
      attr = model.toAttr();
      $(gradient).attr(_.omit(attr, ["spreadMethod", "gradientUnits"]));
      gradient.setAttributeNS(null, "spreadMethod", attr["spreadMethod"]);
      gradient.setAttributeNS(null, "gradientUnits", attr["gradientUnits"]);
      return gradient;
    };

    GradientControlBase.prototype._applyGradientToItem = function(model, item, element) {
      var grad, grad_el, grad_id, stops,
        _this = this;
      if (!item) {
        return;
      }
      grad_id = $(item.el).attr("id") + "-grad";
      grad_el = $("#" + grad_id);
      grad_el.attr(model.toAttr());
      grad = this._getGradientElement(model, element);
      stops = this._getGradientStops(model);
      if (grad_el.length > 0) {
        grad_el.remove();
      }
      $("#item-defs").append(grad);
      stops.forEach(function(stop) {
        return $(grad).append(stop);
      });
      return $(grad).attr("id", grad_id);
    };

    return GradientControlBase;

  })(Backbone.View);

  this.RadialGradientControl = (function(_super) {
    __extends(RadialGradientControl, _super);

    function RadialGradientControl() {
      this.render = __bind(this.render, this);
      this._getGradientModel = __bind(this._getGradientModel, this);
      this.setItem = __bind(this.setItem, this);
      this.initialize = __bind(this.initialize, this);
      _ref6 = RadialGradientControl.__super__.constructor.apply(this, arguments);
      return _ref6;
    }

    RadialGradientControl.prototype.initialize = function() {};

    RadialGradientControl.prototype.setItem = function(item) {
      var _this = this;
      this.stopListening();
      if (!item) {
        return;
      }
      this.item = item;
      this.grad_model = this._getGradientModel(item);
      if (this.point1) {
        this.point1.remove();
      }
      if (this.point2) {
        this.point2.remove();
      }
      this.point1 = new GradientPointControl({
        el: this._appendElement('rect'),
        model: this.grad_model,
        x_attr: "cx",
        y_attr: "cy"
      });
      this.point2 = new GradientPointControl({
        el: this._appendElement('rect'),
        model: this.grad_model,
        x_attr: "fx",
        y_attr: "fy"
      });
      this.render();
      this.listenTo(item, "change", this.render);
      this.listenTo(this.grad_model, "change", this.render);
      return this.listenTo(this.grad_model, "change", function() {
        return _this._applyGradientToItem(_this.grad_model, item, "radialGradient");
      });
    };

    RadialGradientControl.prototype._getGradientModel = function(item) {
      var cx, cy, fx, fy, grad_el, grad_id, gradient, r, spread, stops, unit;
      grad_id = $(item.el).attr("id") + "-grad";
      grad_el = $("#" + grad_id);
      if (grad_el) {
        cx = this._toNumber(grad_el.attr("cx"), 50);
        cy = this._toNumber(grad_el.attr("cy"), 50);
        fx = this._toNumber(grad_el.attr("fx"), 50);
        fy = this._toNumber(grad_el.attr("fy"), 50);
        r = this._toNumber(grad_el.attr("r"), 50);
        spread = grad_el[0].getAttributeNS(null, "spreadMethod");
        if (spread === "") {
          spread = "pad";
        }
        unit = grad_el[0].getAttributeNS(null, "gradientUnits");
        console.log("unit", unit);
        if (unit === "") {
          unit = "objectBoundingBox";
        }
        stops = this._createStopModels(grad_el);
        gradient = new RadialGradientModel({
          item: item,
          isNew: false,
          cx: cx,
          cy: cy,
          fx: fx,
          fy: fy,
          r: r,
          spreadMethod: spread,
          gradientUnits: unit,
          stops: stops
        });
      } else {
        gradient = new RadialGradientModel({
          item: item,
          isNew: true,
          cx: 50,
          cy: 50,
          fx: 50,
          fy: 50,
          r: 50,
          spreadMethod: "pad",
          gradientUnits: "objectBoundingBox",
          stops: new GradientStopCollection([])
        });
      }
      return gradient;
    };

    RadialGradientControl.prototype.render = function() {
      this.point1.render();
      return this.point2.render();
    };

    return RadialGradientControl;

  })(GradientControlBase);

  this.LinearGradientControl = (function(_super) {
    __extends(LinearGradientControl, _super);

    function LinearGradientControl() {
      this.render = __bind(this.render, this);
      this._getGradientModel = __bind(this._getGradientModel, this);
      this.setItem = __bind(this.setItem, this);
      this.initialize = __bind(this.initialize, this);
      _ref7 = LinearGradientControl.__super__.constructor.apply(this, arguments);
      return _ref7;
    }

    LinearGradientControl.prototype.initialize = function() {};

    LinearGradientControl.prototype.setItem = function(item) {
      var _this = this;
      this.stopListening();
      if (!item) {
        return;
      }
      this.item = item;
      this.grad_model = this._getGradientModel(item);
      if (this.point1) {
        this.point1.remove();
      }
      if (this.point2) {
        this.point2.remove();
      }
      this.point1 = new GradientPointControl({
        el: this._appendElement('rect'),
        model: this.grad_model,
        x_attr: "x1",
        y_attr: "y1"
      });
      this.point2 = new GradientPointControl({
        el: this._appendElement('rect'),
        model: this.grad_model,
        x_attr: "x2",
        y_attr: "y2"
      });
      this.render();
      this.listenTo(item, "change", this.render);
      this.listenTo(this.grad_model, "change", this.render);
      return this.listenTo(this.grad_model, "change", function() {
        return _this._applyGradientToItem(_this.grad_model, item, "linearGradient");
      });
    };

    LinearGradientControl.prototype._getGradientModel = function(item) {
      var grad_el, grad_id, gradient, spread, stops, unit, x1, x2, y1, y2;
      grad_id = $(item.el).attr("id") + "-grad";
      grad_el = $("#" + grad_id);
      if (grad_el) {
        x1 = this._toNumber(grad_el.attr("x1"), 0);
        y1 = this._toNumber(grad_el.attr("y1"), 0);
        x2 = this._toNumber(grad_el.attr("x2"), 100);
        y2 = this._toNumber(grad_el.attr("y2"), 0);
        stops = this._createStopModels(grad_el);
        spread = grad_el[0].getAttributeNS(null, "spreadMethod");
        if (spread === "") {
          spread = "pad";
        }
        unit = grad_el[0].getAttributeNS(null, "gradientUnits");
        console.log("unit", unit);
        if (unit === "") {
          unit = "objectBoundingBox";
        }
        gradient = new LinearGradientModel({
          item: item,
          isNew: false,
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          spreadMethod: spread,
          gradientUnits: unit,
          stops: stops
        });
      } else {
        gradient = new LinearGradientModel({
          item: item,
          isNew: true,
          x1: 0,
          y1: 0,
          x2: 100,
          y2: 0,
          spreadMethod: "pad",
          gradientUnits: "objectBoundingBox",
          stops: new GradientStopCollection([])
        });
      }
      return gradient;
    };

    LinearGradientControl.prototype.render = function() {
      this.point1.render();
      return this.point2.render();
    };

    return LinearGradientControl;

  })(GradientControlBase);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GradientToolView = (function(_super) {
    __extends(GradientToolView, _super);

    function GradientToolView() {
      this.render = __bind(this.render, this);
      this.hide_control = __bind(this.hide_control, this);
      this.disable = __bind(this.disable, this);
      this.linearMode = __bind(this.linearMode, this);
      this.radialMode = __bind(this.radialMode, this);
      this.onChangeR = __bind(this.onChangeR, this);
      this.onChangeUnit = __bind(this.onChangeUnit, this);
      this.onChangeSpread = __bind(this.onChangeSpread, this);
      this.setItem = __bind(this.setItem, this);
      this.changeControl = __bind(this.changeControl, this);
      this.initialize = __bind(this.initialize, this);
      _ref = GradientToolView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GradientToolView.prototype.events = {
      "click #linear-gradient-button": "linearMode",
      "click #radial-gradient-button": "radialMode",
      "change #grad-spread": "onChangeSpread",
      "change #grad-r": "onChangeR",
      "change #grad-unit": "onChangeUnit"
    };

    GradientToolView.prototype.initialize = function() {
      this.linear_gradient_control = new LinearGradientControl({
        el: $("#linear-gradient-control")
      });
      this.radial_gradient_control = new RadialGradientControl({
        el: $("#radial-gradient-control")
      });
      this.gradient_control = this.linear_gradient_control;
      this.radial_button_el = $("#radial-gradient-button");
      this.linear_button_el = $("#linear-gradient-button");
      this.grad_r_el = $("#grad-r");
      this.grad_spread_el = $("#grad-spread");
      return this.grad_unit_el = $("#grad-unit");
    };

    GradientToolView.prototype.changeControl = function(control) {
      var item;
      console.log("changeControl:(control)", this);
      item = cloneControlView.firstOriginalItem();
      if (this.gradient_control !== control) {
        this.gradient_control = control;
        return this.setItem(item);
      }
    };

    GradientToolView.prototype.setItem = function(item) {
      this.gradient_control.setItem(item);
      return this.render();
    };

    GradientToolView.prototype.onChangeSpread = function() {
      var spread;
      spread = this.grad_spread_el.val();
      this.gradient_control.grad_model.set("spreadMethod", spread);
      return console.log("onChangeSpread", spread);
    };

    GradientToolView.prototype.onChangeUnit = function() {
      var unit;
      unit = this.grad_unit_el.val();
      this.gradient_control.grad_model.set("gradientUnits", unit);
      return console.log("onChangeUnit", unit);
    };

    GradientToolView.prototype.onChangeR = function() {
      var r;
      r = this.grad_r_el.val();
      this.gradient_control.grad_model.set("r", r);
      return console.log("onChangeR", r);
    };

    GradientToolView.prototype.radialMode = function() {
      return this.changeControl(this.radial_gradient_control);
    };

    GradientToolView.prototype.linearMode = function() {
      return this.changeControl(this.linear_gradient_control);
    };

    GradientToolView.prototype.disable = function() {
      this.$el.hide();
      return this.hide_control();
    };

    GradientToolView.prototype.hide_control = function() {
      this.radial_gradient_control.$el.hide();
      this.linear_gradient_control.$el.hide();
      this.radial_button_el.css("background-color", "");
      return this.linear_button_el.css("background-color", "");
    };

    GradientToolView.prototype.render = function() {
      var isLinear, model;
      this.$el.show();
      this.hide_control();
      if (this.gradient_control && this.gradient_control.grad_model) {
        model = this.gradient_control.grad_model;
        this.grad_r_el.val(model.get("r"));
        this.grad_spread_el.val(model.get("spreadMethod"));
        this.grad_unit_el.val(model.get("gradientUnits"));
      } else {
        return;
      }
      isLinear = this.gradient_control === this.linear_gradient_control;
      if (isLinear) {
        this.linear_gradient_control.$el.show();
        return this.linear_button_el.css("background-color", "#ebebeb");
      } else {
        this.radial_gradient_control.$el.show();
        return this.radial_button_el.css("background-color", "#ebebeb");
      }
    };

    return GradientToolView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PanelBaseView = (function(_super) {
    __extends(PanelBaseView, _super);

    function PanelBaseView() {
      this.render = __bind(this.render, this);
      this.loadFile = __bind(this.loadFile, this);
      this.initialize = __bind(this.initialize, this);
      _ref = PanelBaseView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PanelBaseView.prototype.initialize = function() {
      PanelBaseView.__super__.initialize.call(this);
      this.control = this.options.control;
      this._defs_id = this.options.defs_id;
      this._element_key = this.options.element_key;
      return this._template = _.template('<rect x="0" y="0" fill="url(#{{element_id}})" width="100" height="100"></rect>');
    };

    PanelBaseView.prototype.setTemplate = function(template) {
      return this._template = template;
    };

    PanelBaseView.prototype.loadFile = function(path) {
      return PanelViewHelper.loadFile(path, this._defs_id, this.render);
    };

    PanelBaseView.prototype.render = function() {
      var element, element_key, model, temp, _i, _len, _ref1, _results;
      console.log("PanelBaseView render", this, this.model);
      model = this.model;
      element_key = this._element_key;
      temp = this._template;
      _ref1 = $(this._defs_id).children();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        element = _ref1[_i];
        _results.push((function(element) {
          var element_id, params, svg;
          element_id = $(element).attr("id");
          svg = temp({
            element_id: element_id
          });
          params = {
            contents: svg
          };
          params[element_key] = element_id;
          return model.add(new SvgItem(params));
        })(element));
      }
      return _results;
    };

    PanelBaseView.prototype.svgApplyFill = function(fill_id, item_fill_id, defs) {
      var $item_fill, clone, id;
      if (this.control.isOneItem()) {
        id = item_fill_id;
        $item_fill = $("#" + id);
        clone = $("#" + fill_id)[0].cloneNode(true);
        if ($item_fill.length > 0) {
          $item_fill.empty();
          $item_fill.append(clone.childNodes);
        } else {
          $(clone).attr("id", id);
          $("#" + defs).append(clone);
        }
        return this.control.firstOriginalItem().attr("fill", "url(#" + id + ")");
      }
    };

    return PanelBaseView;

  })(SvgItemListView);

}).call(this);

(function() {
  this.PanelViewHelper = (function() {
    function PanelViewHelper() {}

    PanelViewHelper.loadFile = function(path, load_element_id, cb) {
      return PanelViewHelper.getFile(path, function(data) {
        var div, temp;
        temp = _.template('\
            <svg\
                xmlns="http://www.w3.org/2000/svg"\
                xmlns:xlink="http://www.w3.org/1999/xlink">\
              <defs id="temp-data">\
              {{data}}\
              </defs>\
            </svg>');
        div = $("<div>");
        div.html(temp({
          data: data
        }));
        $("body").append(div);
        $(load_element_id).append($("#temp-data").children());
        div.remove();
        return cb();
      });
    };

    PanelViewHelper.getFile = function(path, cb) {
      return $.ajax({
        type: "GET",
        url: path,
        success: cb,
        error: (function(jqXHR, textStatus) {
          return console.log(textStatus);
        })
      });
    };

    return PanelViewHelper;

  }).call(this);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.GradientPanelView = (function(_super) {
    __extends(GradientPanelView, _super);

    function GradientPanelView() {
      this.initialize = __bind(this.initialize, this);
      _ref = GradientPanelView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GradientPanelView.prototype.initialize = function() {
      GradientPanelView.__super__.initialize.call(this);
      return this.bind("clicked.item", function(item) {
        var gradient_id, id;
        gradient_id = item.model.get("gradient_id");
        if (this.control.isOneItem()) {
          id = this.control.firstOriginalItem().$el.attr("id") + "-grad";
        }
        return this.svgApplyFill(gradient_id, id, "item-defs");
      });
    };

    return GradientPanelView;

  })(PanelBaseView);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.PatternPanelView = (function(_super) {
    __extends(PatternPanelView, _super);

    function PatternPanelView() {
      this.initialize = __bind(this.initialize, this);
      _ref = PatternPanelView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PatternPanelView.prototype.initialize = function() {
      PatternPanelView.__super__.initialize.call(this);
      return this.bind("clicked.item", function(item) {
        var id, pattern_id;
        pattern_id = item.model.get("pattern_id");
        if (this.control.isOneItem()) {
          id = this.control.firstOriginalItem().$el.attr("id") + "-pattern";
        }
        return this.svgApplyFill(pattern_id, id, "item-defs");
      });
    };

    return PatternPanelView;

  })(PanelBaseView);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.FilterPanelView = (function(_super) {
    __extends(FilterPanelView, _super);

    function FilterPanelView() {
      this.initialize = __bind(this.initialize, this);
      _ref = FilterPanelView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FilterPanelView.prototype.initialize = function() {
      FilterPanelView.__super__.initialize.call(this);
      return this.bind("clicked.item", function(item) {
        var filter_id;
        filter_id = item.model.get("filter_id");
        if (this.control.isOneItem()) {
          return this.control.firstOriginalItem().attr("filter", "url(#" + filter_id + ")");
        }
      });
    };

    return FilterPanelView;

  })(PanelBaseView);

}).call(this);

(function() {
  this.SVGUtil = (function() {
    function SVGUtil() {}

    SVGUtil.SVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    SVGUtil.toD3Transform = function(svg_matrix) {
      return d3.transform("matrix(" + SVGUtil.toStringMatrix(svg_matrix) + ")");
    };

    SVGUtil.toStringMatrix = function(svg_matrix) {
      var prop, props;
      props = (function() {
        var _i, _len, _ref, _results;
        _ref = ["a", "b", "c", "d", "e", "f"];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          prop = _ref[_i];
          _results.push(svg_matrix[prop].toString());
        }
        return _results;
      })();
      return props.join();
    };

    SVGUtil.TransformMatrix = function(transform) {
      return SVGUtil.Transform(transform).matrix;
    };

    SVGUtil.Transform = function(string) {
      var g;
      g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("transform", string.toString());
      return g.transform.baseVal.consolidate();
    };

    SVGUtil.createPoint = function(x, y) {
      var point;
      point = SVGUtil.SVG.createSVGPoint();
      point.x = x;
      point.y = y;
      return point;
    };

    SVGUtil.createTag = function(tag) {
      return document.createElementNS('http://www.w3.org/2000/svg', tag);
    };

    SVGUtil.setMatrixTransform = function(el, matrix) {
      var transform;
      transform = SVGUtil.SVG.createSVGTransform();
      transform.setMatrix(matrix);
      return SVGUtil.setTransform(el, transform);
    };

    SVGUtil.setTransform = function(el, transform) {
      return el.transform.baseVal.initialize(transform);
    };

    SVGUtil.localMatrix = function(el) {
      var consolidate;
      consolidate = el.transform.baseVal.consolidate();
      if (consolidate) {
        return consolidate.matrix;
      } else {
        return SVGUtil.SVG.createSVGMatrix();
      }
    };

    return SVGUtil;

  }).call(this);

}).call(this);

(function() {
  this.FileUtil = (function() {
    function FileUtil() {}

    FileUtil.prototype.load = function(file, callback) {
      var reader,
        _this = this;
      reader = new FileReader;
      reader.onload = function(e) {
        var parsed, svg;
        svg = e.target.result;
        parsed = _this.parse($(svg));
        return callback(parsed);
      };
      return reader.readAsText(file);
    };

    FileUtil.prototype.loadImageAsURL = function(file, callback) {
      var reader,
        _this = this;
      reader = new FileReader;
      reader.onload = function(e) {
        return callback(e.target.result);
      };
      return reader.readAsDataURL(file);
    };

    FileUtil.prototype.parse = function(container) {
      var defs, elem, items, _i, _len, _ref;
      defs = [];
      items = [];
      _ref = container.children();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (elem.nodeName === "defs") {
          defs.push(elem);
        } else {
          items.push(elem);
        }
      }
      return {
        defs: defs,
        items: items
      };
    };

    return FileUtil;

  })();

}).call(this);

(function() {
  this.SvgExporter = (function() {
    function SvgExporter() {}

    SvgExporter.prototype.toSvg = function(element, filename, options) {
      var $svg_clone, canvas, elem, serializer, svg_clone, svg_xml, url, url_prefix, _i, _len, _ref;
      svg_clone = element.cloneNode(true);
      $svg_clone = $(svg_clone);
      canvas = $svg_clone.find("#svg-canvas");
      _ref = canvas.children();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        $svg_clone.append(elem);
      }
      canvas.remove();
      serializer = new XMLSerializer();
      $(svg_clone).attr("id", "");
      $(svg_clone).attr("style", "");
      svg_xml = serializer.serializeToString(svg_clone);
      url_prefix = "data:image/svg+xml, ";
      url = url_prefix + svg_xml;
      return window.open(url, filename, options);
    };

    return SvgExporter;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.SvgTextEditor = (function() {
    function SvgTextEditor(_parent_el, _text_el) {
      this.bindEvent = __bind(this.bindEvent, this);
      this.onClickEvent = __bind(this.onClickEvent, this);
      this.unbindClickEvent = __bind(this.unbindClickEvent, this);
      this.showInput = __bind(this.showInput, this);
      this.keyDown = __bind(this.keyDown, this);
      this.disable = __bind(this.disable, this);
      this.remove = __bind(this.remove, this);
      this.keyPress = __bind(this.keyPress, this);
      this.updateTextValue = __bind(this.updateTextValue, this);
      this.setTextElement = __bind(this.setTextElement, this);
      this.unbindEvent = __bind(this.unbindEvent, this);
      this.getCaretPosition = __bind(this.getCaretPosition, this);
      this.getCaretPositionFromPoint = __bind(this.getCaretPositionFromPoint, this);
      this.setOnDisable = __bind(this.setOnDisable, this);
      this.parent_el = _parent_el;
      this.text_el = _text_el;
      this.cursor_el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      $(this.cursor_el).css("fill", "black");
      $(this.cursor_el).css("stroke", "white");
      $(this.cursor_el).attr("width", "2");
      $(this.cursor_el).attr("stroke-width", "0.4");
      $(this.parent_el).append(this.cursor_el);
      this.input_el = document.createElement("input");
      $(this.input_el).attr("size", "100");
      $(this.input_el).attr("type", "text");
      $(this.input_el).attr("style", "z-index:1000;position:absolute;left:0;top:0;display:none;");
      $("body").prepend(this.input_el);
      this.edit_cursor = new EditCursor(this.cursor_el, this.text_el);
    }

    SvgTextEditor.prototype.setOnDisable = function(fn) {
      return this.onDisable = fn;
    };

    SvgTextEditor.prototype.getCaretPositionFromPoint = function(el, point) {
      var dist, end_dist, end_point, first_point, i, point_dist, start_dist, start_point, svg_text_input_chars, _i,
        _this = this;
      svg_text_input_chars = el.getNumberOfChars();
      if (svg_text_input_chars > 0) {
        first_point = el.getStartPositionOfChar(0);
        for (i = _i = 0; 0 <= svg_text_input_chars ? _i <= svg_text_input_chars : _i >= svg_text_input_chars; i = 0 <= svg_text_input_chars ? ++_i : --_i) {
          end_point = el.getEndPositionOfChar(i);
          start_point = el.getStartPositionOfChar(i);
          dist = function(p1, p2) {
            var x, y;
            x = p1.x - p2.x;
            y = p1.y - p2.y;
            return Math.sqrt(x * x + y * y);
          };
          start_dist = dist(start_point, first_point);
          end_dist = dist(end_point, first_point);
          point_dist = dist(point, first_point);
          if (start_dist <= point_dist && end_dist >= point_dist) {
            if (Math.abs(start_dist - point_dist) > Math.abs(end_dist - point_dist)) {
              return i + 1;
            } else {
              return i;
            }
          }
        }
        return i;
      } else {
        return -1;
      }
    };

    SvgTextEditor.prototype.getCaretPosition = function(el, x) {
      var end_point, i, point, svg_text_input_chars, _i;
      svg_text_input_chars = el.getNumberOfChars();
      if (svg_text_input_chars > 0) {
        for (i = _i = 0; 0 <= svg_text_input_chars ? _i <= svg_text_input_chars : _i >= svg_text_input_chars; i = 0 <= svg_text_input_chars ? ++_i : --_i) {
          end_point = el.getEndPositionOfChar(i);
          point = el.getStartPositionOfChar(i);
          if (point.x <= x && end_point.x >= x) {
            if (Math.abs(point.x - x) > Math.abs(end_point.x - x)) {
              return i + 1;
            } else {
              return i;
            }
          }
        }
        return i;
      } else {
        return -1;
      }
    };

    SvgTextEditor.prototype.unbindEvent = function() {
      $(this.input_el).unbind("blur", this.unbindEvent);
      $(this.input_el).unbind("keydown", this.keyDown);
      $(this.input_el).unbind("keyup", this.keyPress);
      this.edit_cursor.disable();
      $(this.input_el).hide();
      return this.onDisable && this.onDisable();
    };

    SvgTextEditor.prototype.setTextElement = function(el) {
      this.text_el = el;
      return this.edit_cursor.text_element = el;
    };

    SvgTextEditor.prototype.updateTextValue = function() {
      var text_value;
      text_value = this.input_el.value;
      return $(this.text_el).text(text_value);
    };

    SvgTextEditor.prototype.keyPress = function(e) {
      this.updateTextValue();
      return this.edit_cursor.updateCharPos(this.input_el.selectionStart);
    };

    SvgTextEditor.prototype.remove = function() {
      $(this.cursor_el).remove();
      return $(this.input_el).remove();
    };

    SvgTextEditor.prototype.disable = function() {
      return $(this.input_el).blur();
    };

    SvgTextEditor.prototype.keyDown = function(e) {
      if (e.keyCode === 13) {
        return this.disable();
      } else {
        return this.updateTextValue(e);
      }
    };

    SvgTextEditor.prototype.showInput = function(char_at) {
      var input;
      input = $(this.input_el);
      input.show();
      input.val(this.text_el.textContent);
      input.focus();
      return input[0].setSelectionRange(char_at, char_at);
    };

    SvgTextEditor.prototype.unbindClickEvent = function() {
      return $(this.text_el).unbind("click", this.onClickEvent);
    };

    SvgTextEditor.prototype.onClickEvent = function(e) {
      var bbox, char_at, ctm, input, point;
      point = SVGUtil.createPoint(e.pageX, e.pageY);
      ctm = this.text_el.getScreenCTM();
      point = point.matrixTransform(ctm.inverse());
      char_at = this.getCaretPositionFromPoint(this.text_el, point);
      this.edit_cursor.updateCharPos(char_at);
      this.showInput(char_at);
      input = $(this.input_el);
      bbox = this.text_el.getBBox();
      ctm = this.text_el.getScreenCTM();
      input.css("left", ctm.e + bbox.x);
      input.css("top", ctm.f + bbox.y + bbox.height + 10);
      input.on("blur", this.unbindEvent);
      input.on("keydown", this.keyDown);
      return input.on("keyup", this.keyPress);
    };

    SvgTextEditor.prototype.bindEvent = function() {
      return $(this.text_el).on("click", this.onClickEvent);
    };

    return SvgTextEditor;

  })();

  this.EditCursor = (function() {
    function EditCursor(el, text_el) {
      this.blink = __bind(this.blink, this);
      this.startBlink = __bind(this.startBlink, this);
      this.clearBlink = __bind(this.clearBlink, this);
      this.updateCharPos = __bind(this.updateCharPos, this);
      this.setCursor = __bind(this.setCursor, this);
      this.disable = __bind(this.disable, this);
      this.pos = 0;
      this.el = el;
      this.text_element = text_el;
      this.interval_blink;
      this.disable();
    }

    EditCursor.prototype.disable = function() {
      this.clearBlink();
      return $(this.el).hide();
    };

    EditCursor.prototype.setCursor = function(char_at) {
      var $el, bbox, chars, extent, point;
      chars = this.text_element.getNumberOfChars();
      if (char_at >= chars) {
        point = this.text_element.getEndPositionOfChar(char_at);
      } else {
        point = this.text_element.getStartPositionOfChar(char_at);
      }
      SVGUtil.setMatrixTransform(this.el, this.text_element.getCTM());
      $el = $(this.el);
      if (char_at >= chars) {
        extent = this.text_element.getExtentOfChar(char_at - 1);
        $el.attr("x", extent.x + extent.width);
      } else {
        extent = this.text_element.getExtentOfChar(char_at);
        $el.attr("x", extent.x);
        $el.attr("y", extent.y);
      }
      bbox = this.text_element.getBBox();
      $el.attr("height", bbox.height);
      return $el.attr("width", 1);
    };

    EditCursor.prototype.updateCharPos = function(_pos) {
      this.pos = _pos;
      this.setCursor(this.pos);
      $(this.el).show();
      return this.startBlink();
    };

    EditCursor.prototype.clearBlink = function() {
      return this.interval_blink && clearInterval(this.interval_blink);
    };

    EditCursor.prototype.startBlink = function() {
      this.clearBlink();
      return this.interval_blink = setInterval(this.blink, 500);
    };

    EditCursor.prototype.blink = function() {
      return $(this.el).toggle();
    };

    return EditCursor;

  })();

}).call(this);

(function() {
  this.VectorUtil = (function() {
    function VectorUtil() {}

    VectorUtil.cross = function(v1, v2) {
      return (v1.x * v2.y) - (v1.y * v2.x);
    };

    VectorUtil.dot = function(v1, v2) {
      return (v1.x * v2.x) + (v1.y * v2.y);
    };

    VectorUtil.add = function(v1, v2) {
      return {
        x: v1.x + v2.x,
        y: v1.y + v2.y
      };
    };

    VectorUtil.sub = function(v1, v2) {
      return {
        x: v1.x - v2.x,
        y: v1.y - v2.y
      };
    };

    VectorUtil.multiply = function(v1, val) {
      return {
        x: v1.x * val,
        y: v1.y * val
      };
    };

    VectorUtil.dist = function(v1, v2) {
      var v;
      if (v2) {
        v = VectorUtil.sub(v1, v2);
      } else {
        v = v1;
      }
      return Math.sqrt((v.x * v.x) + (v.y * v.y));
    };

    return VectorUtil;

  })();

}).call(this);

(function() {
  var _this = this;

  $(document).ready(function() {
    var e, i, mode_view, move, move_item_position, move_keys, option, svg, temp, update_pattern, _fn, _fn1, _i, _j, _k, _len, _len1, _len2, _ref;
    _this.event_manager = new EventManager();
    _this.cloneControlView = new CloneControlView({
      el: $("#clone-control-view"),
      line_wrapper: $("#clone-select-line-views"),
      select_el: $("#clone-selected-view"),
      manager: _this.event_manager
    });
    _this.event_manager.setControl(_this.cloneControlView);
    _this.SvgCanvasBase = new SvgCanvas({
      el: $("#svg-canvas-base"),
      control: _this.cloneControlView,
      mainCanvas: $("#svg-canvas")[0],
      manager: _this.event_manager
    });
    _this.event_manager.setCanvas(_this.SvgCanvasBase);
    _this.cloneControlView.setCanvas(_this.SvgCanvasBase);
    _this.svgPathControl = new SvgPathControlView({
      el: $("#path-control-panel")
    });
    _this.inspectorListView = new InspectorListView({
      control: _this.cloneControlView,
      item_list: SvgCanvasBase.item_list
    });
    _this.inspectorDragAndDrop = new InspectorDragAndDrop();
    $("#inspector-list").append(_this.inspectorListView.el);
    _this.SvgCanvasBase.bind("onZoom", function(e) {
      var canvas_transform;
      canvas_transform = $(_this.SvgCanvasBase.mainCanvas).attr("transform");
      $(grid_view.el).attr("stroke-width", 0.5 * (1 / SvgCanvasBase.zoomValue));
      $(grid_view.el).attr("transform", canvas_transform);
      $("#clone-control-view-wapper").attr("transform", canvas_transform);
      cloneControlView.render();
      return svgPathControl.render();
    });
    _this.SvgItems = new SvgItemList;
    _this.SvgItemToolView = new SvgItemToolView({
      model: _this.SvgItems,
      el: $("#svg-item-list"),
      canvas: SvgCanvasBase
    });
    _fn = function(svg) {
      return SvgItems.add(new SvgItem({
        name: "item",
        contents: svg
      }));
    };
    for (_i = 0, _len = SvgSample.length; _i < _len; _i++) {
      svg = SvgSample[_i];
      _fn(svg);
    }
    _this.patternItemsView = new PatternPanelView({
      model: new SvgItemList,
      el: $("#pattern-items"),
      control: cloneControlView,
      defs_id: "#pattern-defs",
      element_key: "pattern_id"
    });
    _this.gradientItemsView = new GradientPanelView({
      model: new SvgItemList,
      el: $("#gradient-items"),
      control: cloneControlView,
      defs_id: "#gradient-defs",
      element_key: "gradient_id"
    });
    _this.filterItemsView = new FilterPanelView({
      model: new SvgItemList,
      el: $("#filter-items"),
      control: cloneControlView,
      defs_id: "#filter-defs",
      element_key: "filter_id"
    });
    _this.filterItemsView.setTemplate(_.template('<rect x="10" y="10" filter="url(#{{element_id}})" fill="white" width="30" height="30"></rect>'));
    _this.gradientItemsView.loadFile("partial/gradient_defs.html");
    _this.patternItemsView.loadFile("partial/pattern_defs.html");
    _this.filterItemsView.loadFile("partial/filter_defs.html");
    _this.orderControl = new ZOrderControl({
      canvas: _this.SvgCanvasBase
    });
    _this.orderControl.bind("onMove", function() {
      return inspectorListView.sortByIndex();
    });
    $("#export-button").click(function(e) {
      return SvgExport();
    });
    $("#open-file-button").click(function(e) {
      return $("#fileModal").modal();
    });
    $("#open-image-file-button").click(function(e) {
      return $("#imageFileModal").modal();
    });
    _this.grid_setting = new GridSetting({
      width: 800,
      height: 600,
      grid_size: 10,
      visible: true
    });
    _this.grid_view = new SvgGridView({
      model: _this.grid_setting,
      el: $("#svg-canvas-grid"),
      width: 800,
      height: 600
    });
    _this.grid_view.render();
    _this.grid_setting_view = new GridSettingView({
      model: _this.grid_setting,
      el: $("#grid-setting")
    });
    _this.grid_setting_view.render();
    _this.open_file_view = new OpenFileView({
      el: $("#fileModal")
    });
    _this.open_image_file_view = new OpenImageFileView({
      el: $("#imageFileModal")
    });
    _this.contextMenu = new ContextMenuView({
      el: $("#svg-canvas-base")
    });
    _this.snap_line_view = new SnapLineView({
      el: $("#snap-line-view")
    });
    _this.snap_item_view = new SnapItemView({
      el: $("#snap-item-view")
    });
    $('#panel-tabs a').click(function(e) {
      e.preventDefault();
      return $(this).tab('show');
    });
    event_manager.setMode('control');
    mode_view = new ModeView({
      el: $("#mode-btn-group"),
      manager: event_manager
    });
    mode_view.render();
    _ref = _.map(_.range(1, 30), function(e) {
      return 0.1 * e;
    });
    for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
      i = _ref[_j];
      temp = _.template('<option value="{{val}}" {{option}}> {{name}}</option>');
      option = "";
      e = Math.round(i * 100);
      if (e === 100) {
        option = "selected";
      }
      $("#zoom-control").append(temp({
        option: option,
        name: e + "%",
        val: i
      }));
    }
    $("#zoom-control").change(function(e) {
      return SvgCanvasBase.zoom($("#zoom-control").val(), {
        x: 400,
        y: 300
      }, false);
    });
    key("backspace, delete", function(e) {
      e.preventDefault();
      return SvgCanvasBase.deleteSelectdItem();
    });
    key("c", function(e) {
      return event_manager.setMode('control');
    });
    key("t", function(e) {
      return event_manager.setMode('text');
    });
    key("v", function(e) {
      return event_manager.setMode('path');
    });
    key("g", function(e) {
      return event_manager.setMode('grad');
    });
    move_item_position = function(pos) {
      if (cloneControlView.item_list.length > 0) {
        return cloneControlView.getControlItem().move(pos);
      }
    };
    move_keys = [
      {
        key: "up",
        x: 0,
        y: -1
      }, {
        key: "down",
        x: 0,
        y: 1
      }, {
        key: "right",
        x: 1,
        y: 0
      }, {
        key: "left",
        x: -1,
        y: 0
      }
    ];
    _fn1 = function(move) {
      return key(move.key, function(e) {
        move_item_position({
          x: move.x,
          y: move.y
        });
        return e.preventDefault();
      });
    };
    for (_k = 0, _len2 = move_keys.length; _k < _len2; _k++) {
      move = move_keys[_k];
      _fn1(move);
    }
    $("#gradient-rotate").knob({
      "change": function(v) {
        var attr, bbox, cx, cy, el, id;
        el = cloneControlView.firstOriginalItem().el;
        bbox = el.getBBox();
        id = $(el).attr("id") + "-grad";
        cx = bbox.width / 2;
        cy = bbox.height / 2;
        attr = "rotate(" + v + ")";
        return $("#" + id)[0].setAttributeNS(null, "gradientTransform", attr);
      }
    });
    update_pattern = function() {
      var attr, bbox, cx, cy, el, id, scale, v;
      el = cloneControlView.firstOriginalItem().el;
      bbox = el.getBBox();
      id = $(el).attr("id") + "-pattern";
      cx = bbox.width / 2;
      cy = bbox.height / 2;
      v = $("#pattern-rotate").val();
      scale = Math.pow($("#pattern-slider").slider("value") / 25, 2);
      attr = "rotate(" + v + ", " + cx + ", " + cy + ") scale(" + scale + ")";
      return $("#" + id)[0].setAttributeNS(null, "patternTransform", attr);
    };
    $("#pattern-rotate").knob({
      "change": function(v) {
        return update_pattern();
      }
    });
    $("#pattern-slider").slider({
      slide: function(event, ui) {
        return update_pattern();
      }
    });
    $('#grid-check').click(function(e) {
      if ($('#grid-check')[0].checked) {
        return grid_view.show();
      } else {
        return grid_view.hide();
      }
    });
    $(".navbar-fixed-top").hide();
    $(".container-fluid").css("padding-top", "0px");
    $("#add-folder-button").click(function(e) {
      return SvgCanvasBase.addFolder();
    });
    $("#delete-item-button").click(function(e) {
      return SvgCanvasBase.deleteSelectdItem();
    });
    initPropertyEdit();
    return cloneControlView.hide();
  });

  this.excutePathBoolean = function(operate) {
    var child, item1, item2, paperMatrix, path, path1, path2, _i, _j, _len, _len1, _ref, _ref1;
    if (cloneControlView.item_list.length === 2) {
      item1 = cloneControlView.item_list.at(0).get("origin_model");
      item2 = cloneControlView.item_list.at(1).get("origin_model");
      path1 = new paper.CompoundPath();
      path2 = new paper.CompoundPath();
      paperMatrix = function(sm) {
        return new paper.Matrix(sm.a, sm.b, sm.c, sm.d, sm.e, sm.f);
      };
      path1.setPathData($(item1.el).attr("d"));
      path2.setPathData($(item2.el).attr("d"));
      path1.transform(paperMatrix(item1.getLocalMatrix()));
      path2.transform(paperMatrix(item2.getLocalMatrix()));
      _ref = [path1, path2];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        _ref1 = path._children;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          child = _ref1[_j];
          if (!child.isClockwise()) {
            child.reverse();
          }
        }
      }
      path = path2[operate](path1);
      if (_(["exclude", "divide"]).contains(operate)) {
        path._children.forEach(function(item) {
          var path_el;
          path_el = item1.el.cloneNode(true);
          console.log(item);
          $(path_el).attr({
            "d": item.getPathData(),
            "fill-rule": "evenodd",
            "transform": "",
            "id": ""
          });
          return SvgCanvasBase.addElement(path_el);
        });
        SvgCanvasBase.removeItem(item1);
        SvgCanvasBase.removeItem(item2);
        return cloneControlView.clear();
      } else {
        item1.attr({
          "d": path.getPathData(),
          "fill-rule": "evenodd",
          "transform": ""
        });
        SvgCanvasBase.removeItem(item2);
        return cloneControlView.setItems([item1]);
      }
    }
  };

  this.propertyEditSet = {};

  this.initPropertyEdit = function() {
    var attr, propertyEditSet, _fn, _i, _len, _ref,
      _this = this;
    propertyEditSet = new PropertyEditSetView({
      el: $("#property-table")
    });
    _ref = ["fill-spe", "stroke-spe"];
    _fn = function(attr) {
      var prop;
      prop = attr;
      return $("#property-edit-" + attr).spectrum({
        showPalette: true,
        showSelectionPalette: true,
        maxPaletteSize: 10,
        palette: [["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"], ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"], ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"], ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"], ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"], ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"], ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"], ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]],
        change: function(color) {
          return propertyEditSet.prop_views[prop.replace("-spe", "")].update(color.toHexString());
        }
      });
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      attr = _ref[_i];
      _fn(attr);
    }
    return cloneControlView.bind("onChangeList", function(control) {
      var item, _j, _len1, _ref1, _results;
      if (cloneControlView.isOneItem()) {
        item = cloneControlView.firstOriginalItem();
        propertyEditSet.bindElement(item);
        _ref1 = ["fill-spe", "stroke-spe"];
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          attr = _ref1[_j];
          _results.push((function(attr) {
            return $("#property-edit-" + attr).spectrum("set", $(item.el).attr(attr.replace("-spe", "")));
          })(attr));
        }
        return _results;
      } else {
        return propertyEditSet.clear();
      }
    });
  };

  this.SvgExport = function() {
    return (new SvgExporter).toSvg($("#svg-canvas-wrap")[0], "svgfile", "width=600, height=400");
  };

}).call(this);

(function() {
  this.SvgSample = [
    '<circle cx="30" cy="30" r="30" fill="black" />', '<rect x="0" y="0" width="60" height="60" fill="white" stroke="black" stroke-width="1" />', '<ellipse cx="100" cy="100" rx="60" ry="30" fill="white" stroke="black" stroke-width="1" />', '<line x1="30" y1="30" x2="350" y2="30" style="stroke:#000000;stroke-width:3;" />', '<rect x="0" y="0" width="60" height="60" fill="white" stroke="black" stroke-width="10" rx="10" fill-opacity="0"/>', '<path  d="m0, 0l50,-86.6l50,86.6z"/>', '<path transform="matrix(1 0 0 1 -290.902 -260.481)" d="M320.57759,329.54771c-16.18867,-16.1889 -16.18842,-42.41456 0.00039,-58.60337c16.1885,16.18891 16.18837,42.41462 -0.00039,58.60337z"></path>', '<path d="M296.37796,276.28552c0.03854,-19.29356 3.81805,-41.04709 13.32033,-40.98555c9.50228,0.06154 13.6521,21.59305 13.71874,41.0383c0.06664,19.44525 -4.89249,38.94574 -13.32033,38.93074c-8.42784,-0.015 -13.75728,-19.68993 -13.71874,-38.98349z" transform="matrix(1 0 0 1 -293.484 -235.284)" fill-rule="evenodd"></path>', '<path\
       d="M 174.28571,429.50505 104.88042,396.05244 37.976041,434.26207 48.34395,357.91629 -8.6701593,306.09387 67.142856,292.36219 l 31.667721,-70.23765 36.487113,67.85914 76.58584,8.41317 -53.26275,55.67093 z"\
       transform="translate(11.428571,-220)"\
       id="path2985"\
       style="" />', '<text x="0" y="0" style="font-size:14pt">Text</text>', '<text x="0" y="0" writing-mode="tb-rl" direction="ltr" glyph-orientation-vertical="auto" style="font-size:20pt">Text</text>', '<path transform="scale(0.3)" d="m62.86963,236.11111c0,-76.31512 61.81525,-138.13037 138.13037,-138.13037c76.31512,0 138.13037,61.81525 138.13037,138.13037c0,76.31512 -61.81525,138.13037 -138.13037,138.13037c-76.31512,0 -138.13037,-61.81525 -138.13037,-138.13037z"/>', '<path d="M100,100L100,200L200,200L200,100z"></path>', '<path transform="matrix(1 0 0 1 -94.9266 -48.9701)" d="M145.54865,148.9436c-27.62432,0 -50.00002,-22.3757 -50.00002,-50.00002c0,-27.62432 22.3757,-50.00002 50.00002,-50.00002L245.46218,48.9436c27.62432,0 50.00002,22.3757 50.00002,50.00002c0,27.62432 -22.3757,50.00002 -50.00002,50.00002z" ></path>'
  ];

}).call(this);
