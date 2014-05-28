class @PropertyEditView extends Backbone.View

    tagName:  "tr"

    events:
        "keydown .edit"  : "onKeydown",
        "change .edit"  : "onChange"

    template : _.template('
    <td style="text-align:right;padding-right:5px">{{name}}</td>
    <td>
        <input id="{{id}}" class="edit" type="{{type}}" value="{{value}}"/>
    </td>
    ')

    update:(val)=>
        values ={}
        values[@attrName] = val
        @model.setAttr(values)

    onKeydown:(e) =>
        setTimeout(() =>
            v = @input.val()
            @update v,
        10)

    onChange:(e) =>
        # @update(@input.val())

    initialize:(attrName) =>
        @attrName = @options.attrName
        @inputType = @options.inputType
        @listenTo(@model, 'update', @render)
        @initElement()

    initElement:() =>
        props = {
            type: @inputType,
            id: "property-edit-" + @attrName,
            name: @attrName,
            value: ""
            }
        @$el.html(@template(props))

    render:() =>
        value = if @model then @model.get(@attrName) else ""
        @input = @$('.edit')
        if @input.val() != value
            @input.val(value)
        @

    clear:() =>
        @input.val("")
