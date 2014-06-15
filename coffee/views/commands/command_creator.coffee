class @CommandCreator

    createUpdateAttrCommand:(svg_element, attrs, preattrs) ->

        if not preattrs
            preattrs = {}
            for key in _.keys(attrs)
                preattrs[key] = svg_element.$el.attr(key) || ""

        id = svg_element.getElementId()

        new UpdateAttrCommand(
            id,
            attrs,
            preattrs
        )

    createMultiCommand:(commands)->
        new MultiCommand(commands)
