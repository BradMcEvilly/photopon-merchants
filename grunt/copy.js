module.exports = {
    libs:{
        files:[
            {
                src:  [
                    'angular/angular.js',
                    'angular-animate/angular-animate.js',
                    'angular-aria/angular-aria.js',
                    'angular-cookies/angular-cookies.js',
                    'angular-messages/angular-messages.js',
                    'angular-resource/angular-resource.js',
                    'angular-sanitize/angular-sanitize.js',
                    'angular-touch/angular-touch.js',
                    'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'angular-bootstrap/ui-bootstrap.min.js',
                    'angular-bootstrap-nav-tree/dist/**',
                    'angular-file-upload/angular-file-upload.js',
                    'angular-loading-bar/build/**',
                    'angular-material/angular-material.js',
                    'angular-material/angular-material.css',
                    'angular-smart-table/dist/**',
                    'angular-translate/angular-translate.js',
                    'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                    'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                    'angular-translate-storage-local/angular-translate-storage-local.js',
                    'angular-ui-grid/ui-grid.*',
                    'angular-ui-calendar/src/calendar.js',
                    'angular-ui-map/ui-map.js',
                    'angular-ui-router/release/**',
                    'angular-ui-select/dist/**',
                    'angular-ui-utils/ui-utils.js',
                    'angular-xeditable/dist/**',
                    'angularjs-toaster/toaster.js',
                    'angularjs-toaster/toaster.css',
                    'angular-skycons/angular-skycons.min.js',
                    'jquery.easy-pie-chart/dist/angular.easypiechart.js',
                    'ng-grid/build/**',
                    'ng-grid/ng-grid.min.css',
                    'ngImgCrop/compile/minified/**',
                    'ngstorage/ngStorage.js',
                    'oclazyload/dist/**',
                    'textAngular/dist/**',
                    'venturocket-angular-slider/build/**',
                    'videogular/videogular.min.js',
                    'videogular-controls/controls.min.js',
                    'videogular-buffering/buffering.min.js',
                    'videogular-overlay-play/overlay-play.min.js',
                    'videogular-poster/poster.min.js',
                    'videogular-ima-ads/ima-ads.min.js',
                    'pdfmake/build/pdfmake.min.js',
                    'pdfmake/build/pdfmake.js',
                    'pdfmake/build/vfs_fonts.js',
                    'angular-country-picker/country-picker.js'
                ],
                dest: 'bin/merchants/admin/libs/angular',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'jquery/dist/jquery.js',
                    'bootstrap/dist/**',
                    'datatables/media/js/jquery.dataTables.min.js',
                    'plugins/integration/bootstrap/3/**',
                    'plugins/integration/bootstrap/images/**',
                    'footable/dist/footable.all.min.js',
                    'footable/css/footable.core.css',
                    'footable/css/fonts/**',
                    'bower-jvectormap/*.js',
                    'flot/jquery.flot.js',
                    'flot/jquery.flot.resize.js',
                    'flot/jquery.flot.pie.js',
                    'flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'flot-spline/js/jquery.flot.spline.min.js',
                    'flot.orderbars/js/jquery.flot.orderBars.js',
                    'moment/moment.js',
                    'screenfull/dist/screenfull.min.js',
                    'slimscroll/jquery.slimscroll.min.js',
                    'html5sortable/jquery.sortable.js',
                    'nestable/jquery.nestable.js',
                    'bootstrap-filestyle/src/bootstrap-filestyle.js',
                    'bootstrap-slider/bootstrap-slider.js',
                    'bootstrap-slider/bootstrap-slider.css',
                    'chosen/chosen.jquery.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
                    'bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'bootstrap-wysiwyg/external/jquery.hotkeys.js',
                    'fullcalendar/dist/fullcalendar.min.js',
                    'bootstrap-daterangepicker/daterangepicker.js',
                    'bootstrap-daterangepicker/daterangepicker-bs3.css',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'jquery_appear/jquery.appear.js'
                ],
                dest: 'bin/merchants/admin/libs/jquery',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'animate.css/animate.css',
                    'font-awesome/css/**',
                    'font-awesome/fonts/**',
                    'simple-line-icons/css/**',
                    'simple-line-icons/fonts/**'
                ],
                dest: 'bin/merchants/admin/libs/assets',
                cwd:  'bower_components',
                expand: true
            },

            {
                src:  [
                    'parse/dist/parse.js'
                ],
                dest: 'bin/merchants/admin/libs/parse',
                cwd:  'node_modules',
                expand: true
            },

            {src: '**', cwd: 'bower_components/bootstrap/dist/fonts', dest: 'src/fonts', expand: true}
        ]
    },
    angular: {
        files: [
            {expand: true, src: "**", cwd: 'src/fonts',   dest: "bin/merchants/admin/fonts"},
            {expand: true, src: "**", cwd: 'src/api',     dest: "bin/merchants/admin/api"},
            {expand: true, src: "**", cwd: 'src/l10n',    dest: "bin/merchants/admin/l10n"},
            {expand: true, src: "**", cwd: 'src/img',     dest: "bin/merchants/admin/img"},
            {expand: true, src: "**", cwd: 'src/js',      dest: "bin/merchants/admin/js"},
            {expand: true, src: "**", cwd: 'src/tpl',     dest: "bin/merchants/admin/tpl"},
            {src: 'src/index.min.html', dest : 'bin/merchants/admin/index.html'},
            {src: 'src/zips.json', dest : 'bin/merchants/admin/zips.json'},
            {src: 'src/material.min.html', dest : 'bin/merchants/admin/material.html'},
            {src: 'src/css/font.css', dest : 'bin/merchants/admin/css/font.css'}
        ]
    },
    paypal: {
        files: [
            {expand: true, src: "**", cwd: 'paypal',      dest: "bin/paypal"}
        ]
    },
    qrlanding: {
        files: [
            {expand: true, src: "**", cwd: 'src/qrlanding',      dest: "bin/qr"}
        ]
    },

    angulardev: {
        files: [
            {expand: true, src: "**", cwd: 'src/fonts',   dest: "bin/merchants/admin/fonts"},
            {expand: true, src: "**", cwd: 'src/api',     dest: "bin/merchants/admin/api"},
            {expand: true, src: "**", cwd: 'src/l10n',    dest: "bin/merchants/admin/l10n"},
            {expand: true, src: "**", cwd: 'src/img',     dest: "bin/merchants/admin/img"},
            {expand: true, src: "**", cwd: 'src/js',      dest: "bin/merchants/admin/js"},
            {expand: true, src: "**", cwd: 'src/tpl',     dest: "bin/merchants/admin/tpl"},
            {src: 'src/index.html', dest : 'bin/merchants/admin/index.html'},
            {src: 'src/zips.json', dest : 'bin/merchants/admin/zips.json'},
            {src: 'src/material.html', dest : 'bin/merchants/admin/material.html'},
            {src: 'src/css/font.css', dest : 'bin/merchants/admin/css/font.css'}
        ]
    },


    landing: {
        files: [
            {expand: true, src:'**', cwd:'src/fonts/', dest: 'bin/fonts/'},
            {expand: true, src:'*.css', cwd:'src/css/', dest: 'bin/css/'},
            {expand: true, src: "**", cwd: 'src/img',     dest: "bin/img"},

            {src:'src/landing/landing.js', dest: 'bin/landing.js'},
            {src:'html/css/app.min.css', dest: 'bin/css/app.min.css'},
            {
                src:  [
                    'angular/angular.js',
                    'angular-animate/angular-animate.js',
                    'angular-aria/angular-aria.js',
                    'angular-cookies/angular-cookies.js',
                    'angular-messages/angular-messages.js',
                    'angular-resource/angular-resource.js',
                    'angular-sanitize/angular-sanitize.js',
                    'angular-touch/angular-touch.js',
                    'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'angular-bootstrap/ui-bootstrap.min.js',
                    'angular-bootstrap-nav-tree/dist/**',
                    'angular-file-upload/angular-file-upload.js',
                    'angular-loading-bar/build/**',
                    'angular-material/angular-material.js',
                    'angular-material/angular-material.css',
                    'angular-smart-table/dist/**',
                    'angular-translate/angular-translate.js',
                    'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                    'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                    'angular-translate-storage-local/angular-translate-storage-local.js',
                    'angular-ui-grid/ui-grid.*',
                    'angular-ui-calendar/src/calendar.js',
                    'angular-ui-map/ui-map.js',
                    'angular-ui-router/release/**',
                    'angular-ui-select/dist/**',
                    'angular-ui-utils/ui-utils.js',
                    'angular-xeditable/dist/**',
                    'angularjs-toaster/toaster.js',
                    'angularjs-toaster/toaster.css',
                    'angular-skycons/angular-skycons.min.js',
                    'jquery.easy-pie-chart/dist/angular.easypiechart.js',
                    'ng-grid/build/**',
                    'ng-grid/ng-grid.min.css',
                    'ngImgCrop/compile/minified/**',
                    'ngstorage/ngStorage.js',
                    'oclazyload/dist/**',
                    'textAngular/dist/**',
                    'venturocket-angular-slider/build/**',
                    'videogular/videogular.min.js',
                    'videogular-controls/controls.min.js',
                    'videogular-buffering/buffering.min.js',
                    'videogular-overlay-play/overlay-play.min.js',
                    'videogular-poster/poster.min.js',
                    'videogular-ima-ads/ima-ads.min.js',
                    'angular-country-picker/country-picker.js'
                ],
                dest: 'bin/libs/angular',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'jquery/dist/jquery.js',
                    'bootstrap/dist/**',
                    'datatables/media/js/jquery.dataTables.min.js',
                    'plugins/integration/bootstrap/3/**',
                    'plugins/integration/bootstrap/images/**',
                    'footable/dist/footable.all.min.js',
                    'footable/css/footable.core.css',
                    'footable/css/fonts/**',
                    'bower-jvectormap/*.js',
                    'flot/jquery.flot.js',
                    'flot/jquery.flot.resize.js',
                    'flot/jquery.flot.pie.js',
                    'flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'flot-spline/js/jquery.flot.spline.min.js',
                    'flot.orderbars/js/jquery.flot.orderBars.js',
                    'moment/moment.js',
                    'screenfull/dist/screenfull.min.js',
                    'slimscroll/jquery.slimscroll.min.js',
                    'html5sortable/jquery.sortable.js',
                    'nestable/jquery.nestable.js',
                    'bootstrap-filestyle/src/bootstrap-filestyle.js',
                    'bootstrap-slider/bootstrap-slider.js',
                    'bootstrap-slider/bootstrap-slider.css',
                    'chosen/chosen.jquery.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
                    'bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'bootstrap-wysiwyg/external/jquery.hotkeys.js',
                    'fullcalendar/dist/fullcalendar.min.js',
                    'bootstrap-daterangepicker/daterangepicker.js',
                    'bootstrap-daterangepicker/daterangepicker-bs3.css',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'jquery_appear/jquery.appear.js'
                ],
                dest: 'bin/libs/jquery',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'animate.css/animate.css',
                    'font-awesome/css/**',
                    'font-awesome/fonts/**',
                    'simple-line-icons/css/**',
                    'simple-line-icons/fonts/**'
                ],
                dest: 'bin/libs/assets',
                cwd:  'bower_components',
                expand: true
            }

        ]
    },



    merchanthelp: {
        files: [
            {expand: true, src:'**', cwd:'src/fonts/', dest: 'bin/merchants/fonts/'},
            {expand: true, src:'*.css', cwd:'src/css/', dest: 'bin/merchants/css/'},
            {expand: true, src: "**", cwd: 'src/img',     dest: "bin/merchants/img"},
            {src:'src/merchants/landing.js', dest: 'bin/merchants/landing.js'},
            {src:'html/css/app.min.css', dest: 'bin/merchants/css/app.min.css'},
            {
                src:  [
                    'angular/angular.js',
                    'angular-animate/angular-animate.js',
                    'angular-aria/angular-aria.js',
                    'angular-cookies/angular-cookies.js',
                    'angular-messages/angular-messages.js',
                    'angular-resource/angular-resource.js',
                    'angular-sanitize/angular-sanitize.js',
                    'angular-touch/angular-touch.js',
                    'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'angular-bootstrap/ui-bootstrap.min.js',
                    'angular-bootstrap-nav-tree/dist/**',
                    'angular-file-upload/angular-file-upload.js',
                    'angular-loading-bar/build/**',
                    'angular-material/angular-material.js',
                    'angular-material/angular-material.css',
                    'angular-smart-table/dist/**',
                    'angular-translate/angular-translate.js',
                    'angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                    'angular-translate-storage-cookie/angular-translate-storage-cookie.js',
                    'angular-translate-storage-local/angular-translate-storage-local.js',
                    'angular-ui-grid/ui-grid.*',
                    'angular-ui-calendar/src/calendar.js',
                    'angular-ui-map/ui-map.js',
                    'angular-ui-router/release/**',
                    'angular-ui-select/dist/**',
                    'angular-ui-utils/ui-utils.js',
                    'angular-xeditable/dist/**',
                    'angularjs-toaster/toaster.js',
                    'angularjs-toaster/toaster.css',
                    'angular-skycons/angular-skycons.min.js',
                    'jquery.easy-pie-chart/dist/angular.easypiechart.js',
                    'ng-grid/build/**',
                    'ng-grid/ng-grid.min.css',
                    'ngImgCrop/compile/minified/**',
                    'ngstorage/ngStorage.js',
                    'oclazyload/dist/**',
                    'textAngular/dist/**',
                    'venturocket-angular-slider/build/**',
                    'videogular/videogular.min.js',
                    'videogular-controls/controls.min.js',
                    'videogular-buffering/buffering.min.js',
                    'videogular-overlay-play/overlay-play.min.js',
                    'videogular-poster/poster.min.js',
                    'videogular-ima-ads/ima-ads.min.js',
                    'angular-country-picker/country-picker.js'
                ],
                dest: 'bin/merchants/libs/angular',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'jquery/dist/jquery.js',
                    'bootstrap/dist/**',
                    'datatables/media/js/jquery.dataTables.min.js',
                    'plugins/integration/bootstrap/3/**',
                    'plugins/integration/bootstrap/images/**',
                    'footable/dist/footable.all.min.js',
                    'footable/css/footable.core.css',
                    'footable/css/fonts/**',
                    'bower-jvectormap/*.js',
                    'flot/jquery.flot.js',
                    'flot/jquery.flot.resize.js',
                    'flot/jquery.flot.pie.js',
                    'flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'flot-spline/js/jquery.flot.spline.min.js',
                    'flot.orderbars/js/jquery.flot.orderBars.js',
                    'moment/moment.js',
                    'screenfull/dist/screenfull.min.js',
                    'slimscroll/jquery.slimscroll.min.js',
                    'html5sortable/jquery.sortable.js',
                    'nestable/jquery.nestable.js',
                    'bootstrap-filestyle/src/bootstrap-filestyle.js',
                    'bootstrap-slider/bootstrap-slider.js',
                    'bootstrap-slider/bootstrap-slider.css',
                    'chosen/chosen.jquery.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                    'bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css',
                    'bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'bootstrap-wysiwyg/external/jquery.hotkeys.js',
                    'fullcalendar/dist/fullcalendar.min.js',
                    'bootstrap-daterangepicker/daterangepicker.js',
                    'bootstrap-daterangepicker/daterangepicker-bs3.css',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                    'bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'jquery_appear/jquery.appear.js'
                ],
                dest: 'bin/merchants/libs/jquery',
                cwd:  'bower_components',
                expand: true
            },
            {
                src:  [
                    'animate.css/animate.css',
                    'font-awesome/css/**',
                    'font-awesome/fonts/**',
                    'simple-line-icons/css/**',
                    'simple-line-icons/fonts/**'
                ],
                dest: 'bin/merchants/libs/assets',
                cwd:  'bower_components',
                expand: true
            }

        ]
    },

    




};
