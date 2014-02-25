module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            app: {
                src: ["coffee/backbone/models/property_edit.coffee",
                      "coffee/backbone/models/svg_element.coffee",
                      "coffee/backbone/models/svg_element_list.coffee",
                      "coffee/backbone/models/svg_item.coffee",
                      "coffee/backbone/models/svg_item_list.coffee",
                      "coffee/backbone/models/path_segment_adapter.coffee",
                      "coffee/backbone/models/path_segment_point_adapter.coffee",
                      "coffee/backbone/models/grid_setting.coffee",
                      "coffee/backbone/views/clone-control-view.coffee",
                      "coffee/backbone/views/controls/line_position_control.coffee",
                      "coffee/backbone/views/controls/position_control.coffee",
                      "coffee/backbone/views/controls/rotate_axis_control.coffee",
                      "coffee/backbone/views/controls/rotate_control.coffee",
                      "coffee/backbone/views/controls/rotate_point_control.coffee",
                      "coffee/backbone/views/controls/scale_control.coffee",
                      "coffee/backbone/views/controls/scale_control_set.coffee",
                      "coffee/backbone/views/controls/scale_one_axis_control.coffee",
                      "coffee/backbone/views/controls/item_control_view.coffee",
                      "coffee/backbone/views/mode/element_control_mode.coffee",
                      "coffee/backbone/views/mode/text_edit_mode.coffee",
                      "coffee/backbone/views/mode/path_edit_mode.coffee",
                      "coffee/backbone/views/mode/gradient_edit_mode.coffee",
                      "coffee/backbone/views/mode/mode_view.coffee",
                      "coffee/backbone/views/event_manager.coffee",
                      "coffee/backbone/views/inspector/inspector_list_view.coffee",
                      "coffee/backbone/views/inspector/inspector_view.coffee",
                      "coffee/backbone/views/path_controls/svg_curve_view.coffee",
                      "coffee/backbone/views/path_controls/svg_path_control_view.coffee",
                      "coffee/backbone/views/path_controls/svg_segment_point_control_view.coffee",
                      "coffee/backbone/views/path_controls/svg_segment_handle_control.coffee",
                      "coffee/backbone/views/property_edit/property_edit_set.coffee",
                      "coffee/backbone/views/property_edit/property_edit_view.coffee",
                      "coffee/backbone/views/select_line_view.coffee",
                      "coffee/backbone/views/select_line_view_list.coffee",
                      "coffee/backbone/views/select_region_control_view.coffee",
                      "coffee/backbone/views/snapping/snap_item_view.coffee",
                      "coffee/backbone/views/snapping/snap_line_view.coffee",
                      "coffee/backbone/views/snapping/snapping.coffee",
                      "coffee/backbone/views/svg_grid_view.coffee",
                      "coffee/backbone/views/grid_setting_view.coffee",
                      "coffee/backbone/views/open_file_view.coffee",
                      "coffee/backbone/views/svg_canvas.view.coffee",
                      "coffee/backbone/views/svg_element_view.coffee",
                      "coffee/backbone/views/svg_item_list_view.coffee",
                      "coffee/backbone/views/svg_item_tool_view.coffee",
                      "coffee/backbone/views/svg_item_view.coffee",
                      "coffee/backbone/views/z-order-control.coffee",
                      "coffee/backbone/views/gradient/gradient_control.coffee",
                      "coffee/backbone/views/gradient/gradient_tool_view.coffee",
                      "coffee/backbone/views/panels/panel_base_view.coffee",
                      "coffee/backbone/views/panels/panel_view_helper.coffee",
                      "coffee/backbone/views/panels/gradient_panel_view.coffee",
                      "coffee/backbone/views/panels/pattern_panel_view.coffee",
                      "coffee/backbone/views/panels/filter_panel_view.coffee",
                      "coffee/lib/svg_util.coffee",
                      "coffee/lib/file_util.coffee",
                      "coffee/lib/svg_exporter.coffee",
                      "coffee/lib/svg_text_editor.coffee",
                      "coffee/lib/vector_util.coffee",
                      "coffee/main.coffee",
                      "coffee/sample.coffee"],
                dest: 'javascripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'javascripts/<%= pkg.name %>.js',
                dest: 'javascripts/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            main: {
                files: [
                    '<%= coffee.app.src %>'
                ],
                tasks: ['coffee']
            }
        }, 
        connect: {
            server: {
                options: {
                    hostname:'*', 
                    directory:"rapen", 
                    port: 9000
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['coffee', 'uglify', 'connect', 'watch']);

};
