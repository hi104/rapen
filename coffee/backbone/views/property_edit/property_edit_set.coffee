class @PropertyEditSetView extends Backbone.View
    initialize:() =>
        @prop_views = {}
        @model = new PropertyEdit()
        @attrs = [
         "id",
         "data-name",
         "class",
         "x",
         "y",
         "width",
         "height",
         "transform",
         "fill",
         "fill-spe", #for spectrum
         "fill-opacity",
         "stroke",
         "stroke-spe",  #for spectrum
         "stroke-opacity",
         "stroke-width",
         "stroke-linecap",
         "stroke-dasharray",
         "stroke-offset",
         "style",
         "filter",
         "opacity",
         "xlink:href",
         "mask",
         "r",
         "rx",
         "ry",
         "writing-mode",
         "x1",
         "x2",
         "y1",
         "y2",
         "fill-rule",
         "d"
         "font-size",
         "font-family",
         "text-anchor",
         "visibility"
        ]
        @_init_view()

    _init_view:() =>
        data_attr_re = /^data-/
        type = "text"
        for attr in @attrs
            klass = if attr.match(data_attr_re) then PropertyEditView else DataPropertyEditView

            prop_view = new klass({
                inputType: type,
                attrName: attr,
                model: @model
            })
            @prop_views[attr] = prop_view
            @$el.append(prop_view.el)

    render:() =>
        @model.updateElement()
        for attr, view of @prop_views
            view.render()

    bindElement:(target_model) =>
        @stopListening()
        @listen_model = target_model
        @model.bindElement(target_model)
        @listenTo(target_model, "change", @render)
        @render()

    clear:() =>
        @stopListening()
        @model.unbindElement()
        for attr, view of @prop_views
            view.clear()
