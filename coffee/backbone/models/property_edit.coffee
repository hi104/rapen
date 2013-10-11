class @PropertyEdit extends Backbone.Model

    bindElement:(el) =>
        @_bindingModel = el

    setAttr:(values) =>
        @set(values)
        @_bindingModel.attr(values) if(@_bindingModel)
        @trigger("update")

    updateElement:() =>
        attrs = {}
        _.each(@_bindingModel.el.attributes, (attr) =>
            attrs[attr.nodeName] = attr.nodeValue
        )
        @clear()
        @set(attrs)
        @trigger("update")

    unbindElement:() =>
        @_bindingModel = null
        @clear()
