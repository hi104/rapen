class @PanelViewHelper
    @loadFile:(path, load_element_id, cb) =>
        PanelViewHelper.getFile(path, (data) =>
            temp =_.template('
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
              <defs id="temp-data">
              {{data}}
              </defs>
            </svg>')
            div = $("<div>")
            div.html(temp(data:data))
            $("body").append(div)
            $(load_element_id).append($("#temp-data").children())
            div.remove()
            cb()
        )
    @getFile:(path, cb) =>
        $.ajax({
            type: "GET",
            url: path,
            success: cb
            error :((jqXHR, textStatus) =>
                console.log(textStatus)
            )}
        )
