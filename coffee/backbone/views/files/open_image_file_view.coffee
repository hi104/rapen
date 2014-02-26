class @OpenImageFileView extends Backbone.View
    events:
        "change #image-file-select"  : "onChange"

    onChange: (e) =>

        $("#imageFileModal").modal('hide')
        $file_select = $("#image-file-select")
        file = $file_select.get(0).files[0]
        $file_select.val("")

        util = new FileUtil
        util.loadImageAsURL(file, (image_url) =>
            SvgCanvasBase.addElement(@createImage(image_url))
        )

    createImage:(image_url) ->
        img = new Image()
        img.onload = () ->
            $(image).attr({
                 width:img.width,
                 height:img.height
            })
        img.src = image_url

        image = SVGUtil.createTag("image")
        image.setAttributeNS('http://www.w3.org/1999/xlink', "xlink:href", image_url)
        image
