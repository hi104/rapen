@StoreAttrsMixin =
    storeAttrs:(keys) ->
        @_store_attrs = @_getItemAttrs(@getItem(), keys)

    _getItemAttrs:(item, keys) ->
        attrs = {}
        for key in keys
            attrs[key] = item.getAttr(key)
        attrs

    getStoreAttrs: () ->
        @_store_attrs

    getChangedAttrs:(item = @getItem()) ->
        attrs = @getStoreAttrs()
        {
            pre: attrs,
            current: @_getItemAttrs(item, _.keys(attrs))
        }
