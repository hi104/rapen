class @PropertyEditSetView extends Backbone.View
    initialize:() =>
        @prop_views = {}
        @model = new PropertyEdit()
        @attrs = [
         "id",
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
        for attr in @attrs
            type = "text"
            prop_view = new PropertyEditView({
                inputType:type,
                attrName:attr,
                model:@model
            })
            @prop_views[attr] = prop_view
            @$el.append(prop_view.el)

    _bindElement:() =>
        @model.updateElement()
        for attr, view of @prop_views
            view.render()

    bindElement:(target_model) =>
        @stopListening()
        @listen_model = target_model
        @model.bindElement(target_model)
        @model.updateElement()
        @listenTo(target_model, "change", @_bindElement)
        @_bindElement()

    clear:() =>
        @stopListening()
        @model.unbindElement()
        for attr, view of @prop_views
            view.clear()
