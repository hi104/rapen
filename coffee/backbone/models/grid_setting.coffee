# attributes
# - width
# - height
# - grid_size
#

class @GridSetting extends Backbone.Model

    gridSize:() =>
        @get("grid_size")

    width:() =>
        @get("width")

    height:() =>
        @get("height")

    visible:() =>
        @get("visible")
