class @PropertyEdit extends Backbone.Model
    initialize:() ->
        @on('change', (model) =>
            _.each(model.attributes, (v, k) =>
                if(@_bindingModel)
                    @_bindingModel.attr(k, v)
            )
        )
    bindElement:(el) =>
        @_bindingModel = el

    updateElement:() =>
        attrs = {}
        _.each(@_bindingModel.el.attributes, (attr) =>
            attrs[attr.nodeName] = attr.nodeValue
        )
        @clear()
        @set(attrs)


    unbindElement:() =>
        @_bindingModel = null
        @clear()
