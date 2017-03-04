'use strict';


angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ngMaterial'
]);

// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide,   $httpProvider) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;



    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }]);

  

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);


app.filter('toPhoneNumber', function() {
  return function(input) {
    input = input || '';
    var out = "";

    input.replace(/\D/g,'');

    if (input.length == 0) {
      return "No Phone"
    }

    if (input.length != 10) {
      return input;
    }

    
    return "(" + input.substr(0, 3) + ") " + input.substr(3, 3) + "-" + input.substr(6, 4);
  };
});


app.directive("disableAnimate", function ($animate) {
    return function (scope, element) {
        $animate.enabled(element, false);
    };
});


   
// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   './libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline:      [   './libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'],
      plot:           [   './libs/jquery/flot/jquery.flot.js',
                          './libs/jquery/flot/jquery.flot.pie.js', 
                          './libs/jquery/flot/jquery.flot.resize.js',
                          './libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
                          './libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js',
                          './libs/jquery/flot-spline/js/jquery.flot.spline.min.js'],
      moment:         [   './libs/jquery/moment/moment.js'],
      screenfull:     [   './libs/jquery/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   './libs/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       [   './libs/jquery/html5sortable/jquery.sortable.js'],
      nestable:       [   './libs/jquery/nestable/jquery.nestable.js',
                          './libs/jquery/nestable/jquery.nestable.css'],
      filestyle:      [   './libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         [   './libs/jquery/bootstrap-slider/bootstrap-slider.js',
                          './libs/jquery/bootstrap-slider/bootstrap-slider.css'],
      chosen:         [   './libs/jquery/chosen/chosen.jquery.min.js',
                          './libs/jquery/chosen/bootstrap-chosen.css'],
      TouchSpin:      [   './libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          './libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg:        [   './libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          './libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable:      [   './libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                          './libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          './libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap:      [   './libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 
                          './libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                          './libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
                          './libs/jquery/bower-jvectormap/jquery-jvectormap.css'],
      footable:       [   './libs/jquery/footable/dist/footable.all.min.js',
                          './libs/jquery/footable/css/footable.core.css'],
      fullcalendar:   [   './libs/jquery/moment/moment.js',
                          './libs/jquery/fullcalendar/dist/fullcalendar.min.js',
                          './libs/jquery/fullcalendar/dist/fullcalendar.css',
                          './libs/jquery/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker:[   './libs/jquery/moment/moment.js',
                          './libs/jquery/bootstrap-daterangepicker/daterangepicker.js',
                          './libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css'],
      tagsinput:      [   './libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                          './libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css'],
      pdfMake:        [   './libs/angular/pdfmake/build/pdfmake.js'],
      pdfMakeVFS:     [   './libs/angular/pdfmake/build/vfs_fonts.js']
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'photopon.backend',
          files: [
              'js/services/acs.js'
          ]
      },
      {
          name: 'ngGrid',
          files: [
              './libs/angular/ng-grid/build/ng-grid.min.js',
              './libs/angular/ng-grid/ng-grid.min.css',
              './libs/angular/ng-grid/ng-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.grid',
          files: [
              './libs/angular/angular-ui-grid/ui-grid.min.js',
              './libs/angular/angular-ui-grid/ui-grid.min.css',
              './libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
          ]
      },
      {
          name: 'ui.select',
          files: [
              './libs/angular/angular-ui-select/dist/select.min.js',
              './libs/angular/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            './libs/angular/angular-file-upload/angular-file-upload.js'
          ]
      },
      {
          name:'ui.calendar',
          files: ['./libs/angular/angular-ui-calendar/src/calendar.js']
      },
      {
          name: 'ngImgCrop',
          files: [
              './libs/angular/ngImgCrop/compile/minified/ng-img-crop.js',
              './libs/angular/ngImgCrop/compile/minified/ng-img-crop.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              './libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
              './libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
      },
      {
          name: 'toaster',
          files: [
              './libs/angular/angularjs-toaster/toaster.js',
              './libs/angular/angularjs-toaster/toaster.css'
          ]
      },
      {
          name: 'textAngular',
          files: [
              './libs/angular/textAngular/dist/textAngular-sanitize.min.js',
              './libs/angular/textAngular/dist/textAngular.min.js'
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              './libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
              './libs/angular/venturocket-angular-slider/build/angular-slider.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              './libs/angular/videogular/videogular.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              './libs/angular/videogular-controls/controls.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              './libs/angular/videogular-buffering/buffering.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              './libs/angular/videogular-overlay-play/overlay-play.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              './libs/angular/videogular-poster/poster.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              './libs/angular/videogular-ima-ads/ima-ads.min.js'
          ]
      },
      {
          name: 'xeditable',
          files: [
              './libs/angular/angular-xeditable/dist/js/xeditable.min.js',
              './libs/angular/angular-xeditable/dist/css/xeditable.css'
          ]
      },
      {
          name: 'smart-table',
          files: [
              './libs/angular/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'angular-skycons',
          files: [
              './libs/angular/angular-skycons/angular-skycons.js'
          ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;

'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "tpl/app.html";
          if(window.location.href.indexOf("material") > 0){
            layout = "tpl/blocks/material.layout.html";
					}
					
            $urlRouterProvider
              .otherwise('/access/signin');
          
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
								templateUrl: layout,
								resolve: load(['js/services/acs.js', 'js/controllers/header.js', 'js/controllers/aside.js'])
              })


              
              .state('app.dashboard-super', {
                  url: '/dashboard-super',
                  templateUrl: 'tpl/app_dashboard_super.html',
                controller: 'DashboardSuperCtrl',
                resolve: load(['js/services/acs.js', 'js/controllers/chart.js', 'js/controllers/dashboardsuper.js', 'js/controllers/header.js', 'js/controllers/aside.js'])
              })

							
              .state('app.dashboard-merchant', {
                  url: '/dashboard-merchant/:action',
                  templateUrl: 'tpl/app_dashboard_merchant.html',
								controller: 'DashboardCtrl',
								resolve: load(['js/directives/tutorial.js', 'js/services/acs.js', 'js/controllers/chart.js', 'js/controllers/dashboard.js', 'js/controllers/header.js', 'js/controllers/aside.js', 'toaster'])
              })

      
              .state('app.editlocation', {
                url: '/location/edit/:id',
                templateUrl: 'tpl/form_add_location.html',
                controller: 'EditLoctionCtrl',
                resolve: load(['ui.select', 'js/services/acs.js', 'js/controllers/addlocation.js'])
              })
			
							.state('app.addlocation', {
								url: '/location/add',
								templateUrl: 'tpl/form_add_location.html',
								controller: 'AddLoctionCtrl',
								resolve: load(['ui.select', 'js/services/acs.js', 'js/controllers/addlocation.js'])
							})

              .state('app.addcoupon', {
                url: '/coupon/add',
                templateUrl: 'tpl/form_add_coupon.html',
                controller: 'AddCouponCtrl',
                resolve: load(['js/directives/tutorial.js', 'ngImgCrop', 'ui.select', 'js/services/acs.js', 'js/controllers/addcoupon.js'])
              })

              .state('app.editcoupon', {
                url: '/coupon/edit/:id',
                templateUrl: 'tpl/form_add_coupon.html',
                controller: 'EditCouponCtrl',
                resolve: load(['ngImgCrop', 'ui.select', 'js/services/acs.js', 'js/controllers/addcoupon.js'])
              })




              .state('app.locations', {
                url: '/location/all',
                templateUrl: 'tpl/form_all_locations.html',
                controller: 'AllLoctionsCtrl',
                resolve: load(['js/services/acs.js', 'js/controllers/alllocations.js'])
              })

              .state('app.coupons', {
                url: '/coupon/all',
                templateUrl: 'tpl/form_all_coupons.html',
                controller: 'AllCouponsCtrl',
                resolve: load(['toaster', 'moment', 'js/services/acs.js', 'js/controllers/allcoupons.js'])
              })


              .state('app.qrcode', {
                url: '/qrcode',
                templateUrl: 'tpl/qr_code.html',
                controller: 'QRCodeCtrl',
                params: { all: null, location: null },
                resolve: load(['toaster', 'moment', 'js/services/acs.js', 'js/controllers/qrcode.js'])
              })


              .state('app.analytics', {
                url: '/analytics',
                abstract: true,
                template: '<ui-view/>'
              })

              .state('app.analytics.allcoupons', {
                url: '/allcoupons',
                templateUrl: 'tpl/company_statistics.html',
                controller: 'CompanyStatsCtrl',
                resolve: load(['js/services/acs.js', 'js/controllers/companystats.js'])
              })

              .state('app.analytics.redeems', {
                url: '/redeems/all',
                templateUrl: 'tpl/form_all_redeems.html',
                controller: 'AllRedeemsCtrl',
                resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'toaster', 'moment', 'js/services/acs.js', 'js/controllers/allredeems.js'], function() { 
                  return loadGoogleMaps(); 
                })
              })


              .state('app.analytics.redeem', {
                url: '/redeems/:id',
                templateUrl: 'tpl/form_all_redeems.html',
                controller: 'CouponRedeemCtrl',
                resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'toaster', 'moment', 'js/services/acs.js', 'js/controllers/allredeems.js'], function() { 
                  return loadGoogleMaps(); 
                })
              })

              .state('app.analytics.shares', {
                url: '/shares/all',
                templateUrl: 'tpl/form_all_shares.html',
                controller: 'AllSharesCtrl',
                resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'toaster', 'moment', 'js/services/acs.js', 'js/controllers/allshares.js'], function() { 
                  return loadGoogleMaps(); 
                })
              })



              .state('app.companyinfo', {
                url: '/company',
                templateUrl: 'tpl/form_company_info.html',
                controller: 'CompanyInfoCtrl',
                resolve: load(['ngImgCrop', 'ui.select', 'js/services/acs.js', 'js/controllers/companyinfo.js'])
              })

              
      
              .state('app.invoices', {
                url: '/invoices',
                templateUrl: 'tpl/company_invoices.html',
                controller: 'CompanyInvoicesCtrl',
                resolve: load(['moment', 'pdfMake', 'pdfMakeVFS', 'js/services/acs.js', 'js/controllers/companyinvoices.js'])
              })
      
              .state('app.security', {
                url: '/security',
                templateUrl: 'tpl/company_security.html',
                controller: 'CompanySecurityCtrl',
                resolve: load(['moment', 'toaster', 'js/services/acs.js', 'js/controllers/companysecurity.js'])
              })

      


              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })

              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: load( ['js/services/acs.js', 'js/controllers/signin.js'] )
              })
              .state('access.request', {
                  url: '/request',
                  templateUrl: 'tpl/page_requestaccess.html',
                  resolve: load( ['ngImgCrop', 'js/services/acs.js', 'js/controllers/requestaccess.js'] )
              })
              /*
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: load( ['js/controllers/signup.js'] )
              })
              */
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html',
                  resolve: load( ['js/services/acs.js', 'js/controllers/signin.js'] )
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })



              // Merchant Pages
              .state('app.admincompany', {
                url: '/company/:id',
                templateUrl: 'tpl/admin_company_info.html',
                controller: 'AdminCompanyInfo',
                resolve: load(['js/services/acs.js', 'moment', 'js/controllers/companyinfo.js'])
              })
              .state('app.allcoupons', {
                url: '/allcoupons',
                templateUrl: 'tpl/admin_items_list.html',
                controller: 'AllCouponsCtrl',
                resolve: load(['js/services/acs.js', 'moment', 'js/controllers/adminlists.js'])
              })
              .state('app.alllocations', {
                url: '/alllocations',
                templateUrl: 'tpl/admin_items_list.html',
                controller: 'AllLocationsCtrl',
                resolve: load(['js/services/acs.js', 'moment', 'js/controllers/adminlists.js'])
              })
              .state('app.allphotopons', {
                url: '/allphotopons',
                templateUrl: 'tpl/admin_items_list.html',
                controller: 'AllPhotoponsCtrl',
                resolve: load(['js/services/acs.js', 'moment', 'js/controllers/adminlists.js'])
              })
              .state('app.managemerchants', {
                url: '/managemerchants',
                templateUrl: 'tpl/merchant_item_list.html',
                controller: 'ManageMerchantsCtrl',
                resolve: load(['js/services/acs.js', 'js/controllers/managemerchants.js'])
              })
              .state('app.acceptrequest', {
                url: '/acceptrequest',
                templateUrl: 'tpl/admin_accept_request.html',
                controller: 'AcceptRequestCtrl',
                resolve: load(['ngImgCrop', 'js/services/acs.js', 'js/controllers/acceptrequest.js']),
                params: { obj: null }
              })
              .state('app.salesreps', {
                url: '/salesreps',
                templateUrl: 'tpl/admin_salesreps.html',
                controller: 'SalesReps',
                resolve: load(['toaster', 'moment', 'js/services/acs.js', 'js/controllers/salesreps.js'])
              })

              .state('app.manageregions', {
                url: '/regions',
                templateUrl: 'tpl/admin_regions.html',
                controller: 'ManageRegions',
                resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'toaster', 'moment', 'js/services/acs.js', 'js/controllers/manageregions.js'], function() { 
                  return loadGoogleMaps(); 
                })
              })






          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
											console.log(src);
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );

'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 
    function(              $scope,   $translate,   $localStorage,   $window ) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Photopon',
        version: '3.0.3',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // for box layout, add background image
        $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };


      Parse.$ = jQuery;
      //Parse.initialize("qyY21OT36AiP5hIEdrzrBvbOS1HgXzIK52oyzrAN", "vJIGuBlr7sPADL5PUISygvp55PbGXtrdhst3w3Jv");
      Parse.initialize("qyY21OT36AiP5hIEdrzrBvbOS1HgXzIK52oyzrAN");
      Parse.serverURL = 'https://photopon.herokuapp.com/parse'


      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

  }]);

angular.module('app')
  .directive('setNgAnimate', ['$animate', function ($animate) {
    return {
        link: function ($scope, $element, $attrs) {
            $scope.$watch( function() {
                return $scope.$eval($attrs.setNgAnimate, $scope);
            }, function(valnew, valold){
                $animate.enabled(!!valnew, $element);
            });
        }
    };
  }]);
var ShowOverlayFor = function($element, $scope) {
    var body = $("body");

    var wScale = 1.3;
    var hScale = 2;

    var hintWidth = $($element).outerWidth() * wScale;
    var hintHeight = $($element).outerHeight() * hScale;
 
    var hintBottom = $($element).attr("hint-bottom");

    var d = $("<div>").addClass("tutorial-shadow")
                .css("left", $($element).offset().left)
                .css("top", $($element).offset().top)
                .css("width", hintWidth)
                .css("height", hintHeight)
                .css("background-size", hintWidth + "px " + hintHeight + "px")
                .appendTo(body);



    var leftShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("top", 0)
                        .css("bottom", 0)
                        .css("left", 0)
                        .appendTo(body);

    var rightShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("right", 0)
                        .css("top", 0)
                        .css("bottom", 0)
                        .appendTo(body);


                        
    var topShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("top", 0)
                        .appendTo(body);

    var bottomShadow = $("<div>")
                        .addClass("tutorial-shadow-cover")
                        .css("bottom", 0)
                        .appendTo(body);


    var hintText = $("<div>")
                        .addClass("tutorial-text")
                        .text($($element).attr("hint-text"))
                        .appendTo(body);

    var hintArrow = $("<div>")
                        .addClass("tutorial-arrow")
                        .appendTo(body);

    if (hintBottom) {
        hintArrow.css("transform", "scaleY(-1)");
    }

    var oldLeft = 0;
    var oldTop = 0;
    var oldWidth = hintWidth;
    var oldHeight = hintHeight

    var SetPosition = function() {
        var o = $($element).offset();

        var w = $($element).outerWidth() * wScale;
        var h = $($element).outerHeight() * hScale;

        if (oldTop != o.top || oldLeft != o.left || oldHeight != h || oldWidth != w) {

            oldWidth = w;
            oldHeight = h;

            var ow = w;
            var oh = h;


            d.css("left", o.left - ow * 0.12)
             .css("top", o.top - oh * 0.25)
             .css("width", w)
             .css("height", h)
             .css("background-size", w + "px " + h + "px");

            oldLeft = o.left;
            oldTop = o.top;

            leftShadow.css("width", d.offset().left);
            rightShadow.css("left", d.offset().left + d.outerWidth());


            topShadow.css("left", d.offset().left);
            topShadow.css("width", d.outerWidth());
            topShadow.css("height", d.offset().top);

            bottomShadow.css("left", d.offset().left);
            bottomShadow.css("width", d.outerWidth());
            bottomShadow.css("top", d.offset().top + d.outerHeight());


            hintArrow.css("left", d.offset().left + ow - 10);

            if (hintBottom) {
                hintArrow.css("top", d.offset().top + hintArrow.outerHeight() - oh / 2);
            } else {
                hintArrow.css("top", d.offset().top - hintArrow.outerHeight() + oh / 2);
            }

            hintText.css("left", hintArrow.offset().left + hintArrow.outerWidth() - hintText.outerWidth() / 2);

            if (hintBottom) {
                hintText.css("top", d.offset().top + d.outerHeight() + hintArrow.outerHeight());
            } else {
                hintText.css("top", d.offset().top - hintArrow.outerHeight() - hintText.outerHeight() + oh/2);
            }

        }
    };


    var intervalId = setInterval(SetPosition, 100);
    SetPosition();


    var CloseHint = function() {
        d.remove();
        topShadow.remove();
        bottomShadow.remove();
        leftShadow.remove();
        rightShadow.remove();

        hintArrow.remove();
        hintText.remove();

        clearInterval(intervalId);
    };

    $scope.$on('$destroy', CloseHint);

    if ($($element).attr("hint-close-on-click")) {
        d.css("pointer-events", "auto");
        d.click(CloseHint);
    }
};


angular.module('app')
  .directive('uiButterbar', ['$rootScope', '$anchorScroll', function($rootScope, $anchorScroll, $http) {
     return {
      restrict: 'AC',
      template:'<span class="bar"></span>',
      link: function(scope, el, attrs) {        
        el.addClass('butterbar hide');
        scope.$on('$stateChangeStart', function(event) {
          $anchorScroll();
          el.removeClass('hide').addClass('active');
        });
        scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
          event.targetScope.$watch('$viewContentLoaded', function(){
            el.addClass('hide').removeClass('active');
          })
        });

      }
     };
  }]);
angular.module('app')
  .directive('uiFocus', function($timeout, $parse) {
    return {
      link: function(scope, element, attr) {
        var model = $parse(attr.uiFocus);
        scope.$watch(model, function(value) {
          if(value === true) {
            $timeout(function() {
              element[0].focus();
            });
          }
        });
        element.bind('blur', function() {
           scope.$apply(model.assign(scope, false));
        });
      }
    };
  });
 angular.module('app')
  .directive('uiFullscreen', ['uiLoad', 'JQ_CONFIG', '$document', '$window', function(uiLoad, JQ_CONFIG, $document, $window) {
    return {
      restrict: 'AC',
      template:'<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
      link: function(scope, el, attr) {
        el.addClass('hide');
        uiLoad.load(JQ_CONFIG.screenfull).then(function(){
          // disable on ie11
          if (screenfull.enabled && !navigator.userAgent.match(/Trident.*rv:11\./)) {
            el.removeClass('hide');
          }
          el.on('click', function(){
            var target;
            attr.target && ( target = $(attr.target)[0] );            
            screenfull.toggle(target);
          });
          $document.on(screenfull.raw.fullscreenchange, function () {
            if(screenfull.isFullscreen){
              el.addClass('active');
            }else{
              el.removeClass('active');
            }
          });
        });
      }
    };
  }]);

'use strict';

/**
 * 0.1.1
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click' } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange">
 */
angular.module('ui.jq', ['ui.load']).
  value('uiJqConfig', {}).
  directive('uiJq', ['uiJqConfig', 'JQ_CONFIG', 'uiLoad', '$timeout', function uiJqInjectingFunction(uiJqConfig, JQ_CONFIG, uiLoad, $timeout) {

  return {
    restrict: 'A',
    compile: function uiJqCompilingFunction(tElm, tAttrs) {

      if (!angular.isFunction(tElm[tAttrs.uiJq]) && !JQ_CONFIG[tAttrs.uiJq]) {
        throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
      }
      var options = uiJqConfig && uiJqConfig[tAttrs.uiJq];

      return function uiJqLinkingFunction(scope, elm, attrs) {

        function getOptions(){
          var linkOptions = [];

          // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
          if (attrs.uiOptions) {
            linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
            if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
              linkOptions[0] = angular.extend({}, options, linkOptions[0]);
            }
          } else if (options) {
            linkOptions = [options];
          }
          return linkOptions;
        }

        // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
        if (attrs.ngModel && elm.is('select,input,textarea')) {
          elm.bind('change', function() {
            elm.trigger('input');
          });
        }

        // Call jQuery method and pass relevant options
        function callPlugin() {
          $timeout(function() {
            elm[attrs.uiJq].apply(elm, getOptions());
          }, 0, false);
        }

        function refresh(){
          // If ui-refresh is used, re-fire the the method upon every change
          if (attrs.uiRefresh) {
            scope.$watch(attrs.uiRefresh, function() {
              callPlugin();
            });
          }
        }

        if ( JQ_CONFIG[attrs.uiJq] ) {
          uiLoad.load(JQ_CONFIG[attrs.uiJq]).then(function() {
            callPlugin();
            refresh();
          }).catch(function() {
            
          });
        } else {
          callPlugin();
          refresh();
        }
      };
    }
  };
}]);
angular.module('app')
  .directive('uiModule', ['MODULE_CONFIG','uiLoad', '$compile', function(MODULE_CONFIG, uiLoad, $compile) {
    return {
      restrict: 'A',
      compile: function (el, attrs) {
        var contents = el.contents().clone();
        return function(scope, el, attrs){
          el.contents().remove();
          uiLoad.load(MODULE_CONFIG[attrs.uiModule])
          .then(function(){
            $compile(contents)(scope, function(clonedElement, scope) {
              el.append(clonedElement);
            });
          });
        }
      }
    };
  }]);
angular.module('app')
  .directive('uiNav', ['$timeout', function($timeout) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        var _window = $(window), 
        _mb = 768, 
        wrap = $('.app-aside'), 
        next, 
        backdrop = '.dropdown-backdrop';
        // unfolded
        el.on('click', 'a', function(e) {
          next && next.trigger('mouseleave.nav');
          var _this = $(this);
          _this.parent().siblings( ".active" ).toggleClass('active');
          _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
          // mobile
          _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.off-screen').removeClass('show off-screen') );
        });

        // folded & fixed
        el.on('mouseenter', 'a', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
          if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb ) || $('.app-aside-dock').length) return;
          var _this = $(e.target)
          , top
          , w_h = $(window).height()
          , offset = 50
          , min = 150;

          !_this.is('a') && (_this = _this.closest('a'));
          if( _this.next().is('ul') ){
             next = _this.next();
          }else{
            return;
          }
         
          _this.parent().addClass('active');
          top = _this.parent().position().top + offset;
          next.css('top', top);
          if( top + next.height() > w_h ){
            next.css('bottom', 0);
          }
          if(top + min > w_h){
            next.css('bottom', w_h - top - offset).css('top', 'auto');
          }
          next.appendTo(wrap);

          next.on('mouseleave.nav', function(e){
            $(backdrop).remove();
            next.appendTo(_this.parent());
            next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
            _this.parent().removeClass('active');
          });

          $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
            next && next.trigger('mouseleave.nav');
          });

        });

        wrap.on('mouseleave', function(e){
          next && next.trigger('mouseleave.nav');
          $('> .nav', wrap).remove();
        });
      }
    };
  }]);

angular.module('app')
  .directive('uiScrollTo', ['$location', '$anchorScroll', function($location, $anchorScroll) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          $location.hash(attr.uiScrollTo);
          $anchorScroll();
        });
      }
    };
  }]);

angular.module('app')
  .directive('uiShift', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, el, attr) {
        // get the $prev or $parent of this el
        var _el = $(el),
            _window = $(window),
            prev = _el.prev(),
            parent,
            width = _window.width()
            ;

        !prev.length && (parent = _el.parent());
        
        function sm(){
          $timeout(function () {
            var method = attr.uiShift;
            var target = attr.target;
            _el.hasClass('in') || _el[method](target).addClass('in');
          });
        }
        
        function md(){
          parent && parent['prepend'](el);
          !parent && _el['insertAfter'](prev);
          _el.removeClass('in');
        }

        (width < 768 && sm()) || md();

        _window.resize(function() {
          if(width !== _window.width()){
            $timeout(function(){
              (_window.width() < 768 && sm()) || md();
              width = _window.width();
            });
          }
        });
      }
    };
  }]);
angular.module('app')
  .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
    return {
      restrict: 'AC',
      link: function(scope, el, attr) {
        el.on('click', function(e) {
          e.preventDefault();
          var classes = attr.uiToggleClass.split(','),
              targets = (attr.target && attr.target.split(',')) || Array(el),
              key = 0;
          angular.forEach(classes, function( _class ) {
            var target = targets[(targets.length && key)];            
            ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
            $( target ).toggleClass(_class);
            key ++;
          });
          $(el).toggleClass('active');

          function magic(_class, target){
            var patt = new RegExp( '\\s' + 
                _class.
                  replace( /\*/g, '[A-Za-z0-9-_]+' ).
                  split( ' ' ).
                  join( '\\s|\\s' ) + 
                '\\s', 'g' );
            var cn = ' ' + $(target)[0].className + ' ';
            while ( patt.test( cn ) ) {
              cn = cn.replace( patt, ' ' );
            }
            $(target)[0].className = $.trim( cn );
          }
        });
      }
    };
  }]);
angular.module('app')

.factory('acsManager', ['$http', function($http) {

	var userInfo = null;


	var AcsLogin = function(username, password, callback) {
		

		Parse.User.logIn(username, password, {
		  success: function(user) {
	  		userInfo = user;
			//localStorage.setItem("userInfo", JSON.stringify(userInfo));

			user.set("lastLogin", new Date());
			user.save();
			callback(null, userInfo);
		    
		  },
		  error: function(user, error) {
			callback(new Error('Invalid username or password. Please try again.'));

		  }
		});
	};

	var AcsRegister = function(username, password, email, mobile, callback) {
		
		var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        
        if (mobile) {
        	mobile = mobile.replace(/\D/g,'');
        	user.set("phone", mobile);
        }
        
        user.set("email", email);

        user.signUp(null, {
              success: function(user) {
              	user.set("lastLogin", new Date());
				user.save();
				
              	callback(null, user);
              },
              error: function(user, error) {
                callback(new Error(error.message));
              }
        });
		
	};




	var AcsForgot = function(email, callback) {
				
		Parse.User.requestPasswordReset(email, {
		  success: function() {
			callback(null);
		  },
		  error: function(error) {
			callback(new Error('Failed to reset password.'));
		  }
		});
	};

	var AcsIsLoggedIn = function() {
		if (Parse.User.current()) {
			return true;
		}
		return false;
	};




	var AcsGetInfo = function() {
		return Parse.User.current();
	};


	var AcsIsAdmin = function() {
		
	    if (!Parse.User.current()) {
	        return false;
	    }

	    if (!Parse.User.current().get("isSuperUser")) {
	        return false;
	    }

	    return true;
	};

	var AcsLogout = function() {
		Parse.User.logOut();
		console.log("Logging out from parse");
		
	};

/*
 ######   #######  ##     ## ########   #######  ##    ## 
##    ## ##     ## ##     ## ##     ## ##     ## ###   ## 
##       ##     ## ##     ## ##     ## ##     ## ####  ## 
##       ##     ## ##     ## ########  ##     ## ## ## ## 
##       ##     ## ##     ## ##        ##     ## ##  #### 
##    ## ##     ## ##     ## ##        ##     ## ##   ### 
 ######   #######   #######  ##         #######  ##    ## 
*/


	var AcsNumAllCoupons = function(callback) {
		var query = new Parse.Query("Coupon");
		var query1 = new Parse.Query("Coupon");
		query1.equalTo("isActive", true);

		query.count({
			success: function(count) {
				
				query1.count({
					success: function(activeCount) {
						callback(null, count, activeCount);			
					},

					error: function(error) {
						callback(new Error("Failed to get coupons"), null);
					}
				});
				
			},

			error: function(error) {
				callback(new Error("Failed to get coupons"), null);
			}
		});
	};


	var AcsNumPhotopons = function(callback) {
		var query = new Parse.Query("Photopon");

		query.count({
			success: function(count) {
				callback(null, count);
			},

			error: function(error) {
				callback(new Error("Failed to get photopons"), null);
			}
		});
	};


	var AcsGetCoupon = function(id, callback) {
	
		var query = new Parse.Query("Coupon");
		query.include("company");

		query.get(id, {
			success: function(object) {
				callback(null, object);			
			},

			error: function(object, error) {
				callback(new Error("Failed to get coupon"), null);
			}
		});
		
	};



	var AcsGetCoupons = function(callback, allCoupons, forUser) {
		AcsGetLocations(function(err, allLocations) {

		
			var query = new Parse.Query("Coupon");
			query.include("company");
			query.include("company.merchant");

			if (!allCoupons) {
				query.equalTo("owner", Parse.User.current());
			}

			if (forUser) {
				query.equalTo("owner", forUser);
			}

			query.ascending("company");
			
			query.find({
				success: function(results) {



					for (var i = 0; i < results.length; i++) {

						results[i].getGiveToGet = function() {
							var giveToGet = this.get('givetoget') || 0;

							if (giveToGet == 0) {
								return "None";
							}

							return giveToGet + ((giveToGet == 1) ? " share" : " shares");
						};


						results[i].getShareRato = function() {
							var numShared = this.get('numShared');
							var numRedeemed = this.get('numRedeemed');

							return Math.floor(100 * numRedeemed / numShared) + "%";
						};



						results[i].getImageStyle = function() {
							var imgObj = this.get("company").get("image");

							var img = "img/icon-discount.png";
							if (imgObj) {
								img = imgObj.url();
							}

							return {
								'background-image': 'url("' + img + '")'
							};

						};

						results[i].getExpirationDelta = function() {
							var exp = moment(this.get("expiration"));
							
							return exp.fromNow();
						};
						
						results[i].getExpirationDeltaColor = function() {
							var exp = moment(this.get("expiration"));
							if (exp.format("X") > moment().format("X")) {
								return "#00aa33";
							} else {
								return "#ff0000";
							}
						};						

						results[i].fetchNumRedeems = function(uiupdater) {
							var cpn = this;
							cpn.actualNumRedeemed = "Loading...";
							cpn.numRedeemedRaw = "Loading...";
							cpn.noAvailableRedeems = true;


							var query = new Parse.Query("Redeem");
							query.equalTo("coupon", this);
							
							query.count({
								success: function(count) {
									if (count == 0) {
										cpn.actualNumRedeemed = "No redeems";
										cpn.numRedeemedRaw = 0;
									} else if (count == 1) {
										cpn.actualNumRedeemed = "View 1 redeem";
										cpn.numRedeemedRaw = 1;
										cpn.noAvailableRedeems = false;
									} else {
										cpn.actualNumRedeemed = "View " + count + " redeems";
										cpn.numRedeemedRaw = count;
										cpn.noAvailableRedeems = false;
									}

									uiupdater();
								},
								error: function(err) {
									cpn.actualNumRedeemed = "Error!";
									cpn.numRedeemedRaw = "Error!";
									uiupdater();
								}
							});
						};

						results[i].getExpiration = function() {
							var exp = moment(this.get("expiration"));
							
							return exp.calendar();
						};



						results[i].getLocationTitleFull = function() {
							var locs = this.get("locations");
							var locString = "";
							

							if (locs.length == 0) {
								locs = [];
								for (var j = 0; j < allLocations.length; j++) {
									locs.push(allLocations[j].id);
								}
							} 

							for (var i = 0; i < locs.length; i++) {

								for (var j = 0; j < allLocations.length; j++) {
									if (allLocations[j].id == locs[i]) {
										locString += allLocations[j].get("name");
										if (locs.length - 1 != i) {
											locString += ", ";
										}
									}
								};

							};

							return locString;
						};

						results[i].getLocationTitle = function() {
							var locs = this.get("locations");

	
							if (locs.length == 0) {
								return "All Locations";
							} else if (locs.length > 3) {
								return "3+ Locations";
							} else {
								var locString = "";
								for (var i = 0; i < locs.length; i++) {

									for (var j = 0; j < allLocations.length; j++) {
										if (allLocations[j].id == locs[i]) {
											locString += allLocations[j].get("name");
											if (locs.length - 1 != i) {
												locString += ", ";
											}
										}
									};

								};

								return locString;
							}

							return "Error!!!";
						};

					};
					
					callback(null, results);			
				},

				error: function(error) {
				// error is an instance of Parse.Error.
					callback(new Error('Failed to get coupons'));
				}
			});
		}, allCoupons, forUser);

	};


	var AcsGetRedeems = function(callback, id) {
		var query = new Parse.Query("Redeem");
		query.include("to");
		query.include("from");
		query.include("coupon");

		if (id) {

			var Coupon = Parse.Object.extend("Coupon");
			var coupon = new Coupon();
			coupon.id = id;
			query.equalTo("coupon", coupon);

		} else {
			var innerQuery = new Parse.Query("Coupon");
			innerQuery.equalTo("owner", Parse.User.current());
			query.matchesQuery("coupon", innerQuery);
		}
		

		query.find({
			success: function(results) {

				for (var i = 0; i < results.length; i++) {

					results[i].getExpiration = function() {
						var exp = moment(this.get("coupon").get("expiration"));
						return exp.calendar();
					};
					
					results[i].getUser = function(key) {
						var user = this.get(key);
						
						return user;
					};

					results[i].getUserEmail = function(key) {
						var user = this.get(key);
						if (!user) return "No Email";
						
						return user.get("email");
					};

					results[i].getUserPhone = function(key) {
						var user = this.get(key);

						if (user && user.get("phone")) {
							return user.get("phone");
						} else {
							return "No phone";
						}
					};
					results[i].getUserName = function(key) {
						var user = this.get(key);
						if (!user) return "No Username";

						return user.get("username");
					};

					results[i].getCreateTime = function() {
						return moment(this.createdAt).format('MM/DD/YYYY h:mm:ss a');
						
					};
				}
				callback(results);			
			},

			error: function(error) {
				throw new Error('Failed to get redeems');
			}
		});

	};


	var AcsGetFriendInfo = function(user, callback) {
		var info = {
			activeFriends: 0,
			totalFriends: 0
		};
		
		var query = new Parse.Query("Friends");
		query.include("user2");
		query.equalTo("user1", user);


		query.find({
			success: function(results) {
				info.totalFriends = results.length;
				info.activeFriends = 0;

				for (var i = 0; i < results.length; i++) {
					var lp = results[i].get("user2").get("lastPhotopon");
					if (!lp) continue;

					var momentLastPhotopon = moment(lp);
					if (momentLastPhotopon.add(3, 'days') > moment()) {
						++info.activeFriends;
					}
				}
				callback(info);
			}, 
			error: function() {
				callback(info);
			}
		});
	};


	var AcsAddCoupon = function(data, callback) {
		
		AcsGetCompany(function(error, company) {
			if (error) {
				alert("Can not get company info");
				return;
			}

			var CouponClass = Parse.Object.extend("Coupon");
			var coupon = new CouponClass();

			coupon.set("title", data.title);
			coupon.set("description", data.body);
			coupon.set("code", data.code);
			coupon.set("company", company);
			coupon.set("expiration", data.expiration);
			coupon.set("oneperuser", data.oneperuser);
			coupon.set("givetoget", parseInt(data.givetoget + "", 10));
			coupon.set("isActive", data.isActive);
			coupon.set("locations", data.locations);

			coupon.set("owner", Parse.User.current());


			coupon.save(null, {
				success: function(coupon) {
					callback();
				},
				error: function(coupon, error) {
					alert("Failed to save object.");
				}
			});

		});
		
	};

	var AcsEditCoupon = function(id, data, callback) {
		var query = new Parse.Query("Coupon");
		query.include("company");

		query.get(id, {
			success: function(object) {

				object.set("title", data.title);
				object.set("description", data.body);
				object.set("code", data.code);
				object.set("expiration", data.expiration);
				object.set("oneperuser", data.oneperuser);
				object.set("locations", data.locations);
				object.set("givetoget", parseInt(data.givetoget + "", 10));

				object.save(null, {
					success: function(coupon) {
						callback();
					},
					error: function(coupon, error) {
						alert("Failed to save object.");
					}
				});
			},

			error: function(object, error) {
				callback(new Error("Failed to get coupon"), null);
			}
		});

		
		
	};



/*
##        #######   ######     ###    ######## ####  #######  ##    ## 
##       ##     ## ##    ##   ## ##      ##     ##  ##     ## ###   ## 
##       ##     ## ##        ##   ##     ##     ##  ##     ## ####  ## 
##       ##     ## ##       ##     ##    ##     ##  ##     ## ## ## ## 
##       ##     ## ##       #########    ##     ##  ##     ## ##  #### 
##       ##     ## ##    ## ##     ##    ##     ##  ##     ## ##   ### 
########  #######   ######  ##     ##    ##    ####  #######  ##    ## 
*/

	var AcsGetLocation = function(id, callback) {
	
		var query = new Parse.Query("Location");

		query.get(id, {
			success: function(object) {
				callback(null, object);			
			},

			error: function(object, error) {
				callback(new Error("Failed to get object"), null);
			}
		});
		
	};

	var AcsGetLocations = function(callback, allLocations, uiupdater, forUser) {
		
		var query = new Parse.Query("Location");
		query.include("owner");

		if (!allLocations) {
			query.equalTo("owner", Parse.User.current());
		}

		if (forUser) {
			query.equalTo("owner", forUser);
		}

		query.ascending("company");

		query.find({
			success: function(results) {

				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						var obj = this;
						var merchant = obj.get('owner');

						obj.companyName = "Loading...";

						var query2 = new Parse.Query("Company");
						query2.equalTo("merchant", merchant);

						query2.find({
							success: function(company) {
								obj.companyName = company[0].get("name");
								if (uiupdater) uiupdater();		
							},
							error: function(error) {
								obj.companyName = "Not Found!";
								if (uiupdater) uiupdater();		
							}
						});




					}

					results[i].fetchEverything();
				};

				callback(null, results);			
			},

			error: function(error) {
			// error is an instance of Parse.Error.
				callback(new Error('Failed to get coupons'));
			}
		});

	};

	var AcsAddLocation = function(data, callback) {
		
		var point = new Parse.GeoPoint({
			latitude: data.latitude, 
			longitude: data.longitude
		});

		var LocationClass = Parse.Object.extend("Location");
		var location = new LocationClass();

		location.set("name", data.name);
		location.set("phoneNumber", data.phoneNumber);
		location.set("address", data.address);
		location.set("location", point);
		location.set("owner", Parse.User.current());


		location.save(null, {
			success: function(location) {
				callback();
			},
			error: function(location, error) {
				alert("Failed to save object.");
			}
		});

	};

	var AcsEditLocation = function(id, data, callback) {
		var query = new Parse.Query("Location");

		query.get(id, {
			success: function(object) {



				var point = new Parse.GeoPoint({
					latitude: data.latitude, 
					longitude: data.longitude
				});

				object.set("name", data.name);
				object.set("phoneNumber", data.phoneNumber);
				object.set("address", data.address);
				object.set("location", point);


				object.save(null, {
					success: function(coupon) {
						callback();
					},
					error: function(coupon, error) {
						alert("Failed to save object.");
					}
				});
			},

			error: function(object, error) {
				callback(new Error("Failed to get object"), null);
			}
		});
		
	};

	var AcsRemoveLocation = function(id, callback) {
		return $http.post('api/removelocation.php', {
			id: id
		}).then(function(response) {

			if (response.data.meta.status != "ok") {
				callback(new Error('Failed to remove location'));
			} else {
				callback(null, response.data.response);
			}
		});
	};


	var AcsGetBills = function(callback) {

		var query = new Parse.Query("Bills");
		query.include("user");

		query.equalTo("user", Parse.User.current());
		query.descending("generation");

		query.find({
			success: function(results) {

				callback(null, results);			
			},

			error: function(error) {
				callback(new Error('Failed to get bills'));
			}
		});
	}


/*
 ######   #######  ##     ## ########     ###    ##    ## ##    ## 
##    ## ##     ## ###   ### ##     ##   ## ##   ###   ##  ##  ##  
##       ##     ## #### #### ##     ##  ##   ##  ####  ##   ####   
##       ##     ## ## ### ## ########  ##     ## ## ## ##    ##    
##       ##     ## ##     ## ##        ######### ##  ####    ##    
##    ## ##     ## ##     ## ##        ##     ## ##   ###    ##    
 ######   #######  ##     ## ##        ##     ## ##    ##    ##    
*/


	var AcsGetCompany = function(callback) {
		
		var query = new Parse.Query("Company");
		query.equalTo("merchant", Parse.User.current());
		query.first().then(function(results) {
			callback(null, results);			
		});

	};

	var AcsGetCompanyByID = function(id, callback) {
		
		var query = new Parse.Query("Company");
		
		query.get(id, {
			success: function(object) {
				callback(null, object);
			},

			error: function(object, error) {
				callback(new Error("Failed to get object"), null);
			}
		});
	};


	var AcsGetCompanies = function(callback, uiupdater) {
		
		var query = new Parse.Query("Company");
		query.find({
			success: function(results) {

				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						//return merchant.id;
						var obj = this;
						var merchant = obj.get('merchant');

						obj.numLocations = "Loading...";
						obj.numCoupons = "Loading...";
						obj.numShared = "Loading...";
						obj.numRedeemed = "Loading...";

						// Load locations
						var query1 = new Parse.Query("Location");
						query1.equalTo("owner", merchant);

						query1.count({
							success: function(count) {
								obj.numLocations = count;
								uiupdater();		
							},
							error: function(error) {
								obj.numLocations = "Error";
								uiupdater();
							}
						});



						// Load coupons
						var query2 = new Parse.Query("Coupon");
						query2.equalTo("owner", merchant);

						query2.find({
							success: function(coupons) {
								obj.numCoupons = coupons.length;
								obj.numShared = 0;
								obj.numRedeemed = 0;

								for (var i = 0; i < coupons.length; i++) {
									obj.numShared += coupons[i].get('numShared') || 0;
									obj.numRedeemed += coupons[i].get('numRedeemed') || 0;
								};


								obj.shareRatio = Math.floor(100 * obj.numRedeemed / obj.numShared) + "%";
								uiupdater();		
							},
							error: function(error) {
								obj.numCoupons = "Error";
								uiupdater();
							}
						});




					}

					results[i].fetchEverything();
				};
				callback(null, results);			
			},
			error: function() {
				callback(new Error('Failed to get coupons'));
			}
		});

	};

	var AcsNewCompany = function(name, file, userId, callback, realFile) {
		var base64 = file;
		var image = null;

		if (!realFile) {
			image = new Parse.File("logo.png", { base64: base64 });	
		} else {
			image = file;	
		}

		AcsGetCompany(function(err, company) {

			var CompanyClass = Parse.Object.extend("Company");
			var company = new CompanyClass();

			var tuser = new Parse.User();
			tuser.id = userId;



			company.set("name", name);
			company.set("image", image);
			company.set("merchant", tuser);


			company.save(null, {
				success: function(company) {
					callback(company);
				},
				error: function(company, error) {
					alert("Failed to save object.");
				}
			});

		});
	};

	var AcsSaveCompanyInfo = function(name, file, callback) {
		var base64 = file;
		var image = new Parse.File("logo.png", { base64: base64 });	

		AcsGetCompany(function(err, company) {
			company.set("name", name);
			company.set("image", image);


			company.save(null, {
				success: function(company) {
					callback(company);
				},
				error: function(company, error) {
					alert("Failed to save object.");
				}
			});

		});

		
	}
	var AcsSaveCompanyName = function(name, callback) {
		AcsGetCompany(function(err, company) {
			company.set("name", name);

			company.save(null, {
				success: function(company) {
					callback(company);
				},
				error: function(company, error) {
					alert("Failed to save object.");
				}
			});

		});

		
	}

	var AcsRemoveCompanyLogo = function(callback) {

		var query = new Parse.Query("Company");
		query.equalTo("merchant", Parse.User.current());
		query.first().then(function(results) {
			results.unset("image");
			results.save();
			if (callback) callback(null);			
		});

	};



	var AcsGetCompanyStats = function(callback) {
		var query = new Parse.Query("Coupon");
		query.equalTo("owner", Parse.User.current());
		
		query.find({
			success: function(results) {
				var stats = {
					numShares: 0,
					numRedeems: 0
				};

				for (var i = 0; i < results.length; i++) {
					var ns = results[i].get("numShared");
					var nr = results[i].get("numRedeemed");
					ns = ns || "0";
					nr = nr || "0";
					stats.numShares += parseInt(ns, 10);
					stats.numRedeems += parseInt(nr, 10);
				};
				callback(stats);			
			},

			error: function(error) {
			}
		});

	};


	var AcsGetCompanyBannedNumbers = function(callback) {
		AcsGetCompany(function(err, company) {

			var query = new Parse.Query("BannedNumbers");
			query.equalTo("company", company);
			
			query.find({
				success: function(results) {
					callback(results);			
				},

				error: function(error) {
				}
			});
		});

	};


	var AcsAddBannedNumber = function(newBannedNumber, callback) {
		AcsGetCompany(function(err, company) {


			var BannedNumbers = Parse.Object.extend("BannedNumbers");
			var num = new BannedNumbers();

			num.set("name", newBannedNumber.name);
			num.set("phoneNumber", newBannedNumber.phone);
			num.set("company", company);

			num.save(null, {
			  success: function(num) {
			  	callback(null);
			  },
			  error: function(num, error) {
				callback(error);
			  }
			});

		});

	};

	var AcsRemoveBannedNumber = function(id, callback) {
		var BannedNumbers = Parse.Object.extend("BannedNumbers");
		var query = new Parse.Query(BannedNumbers);
		query.get(id, {
		  success: function(num) {

		    num.destroy({
			  success: function(myObject) {
			    callback(null);
			  },
			  error: function(myObject, error) {
			    callback(error, null);
			  }
			});

		  },
		  error: function(object, error) {
		    callback(error, null);

		  }
		});

	};



	var AcsGetUserStats = function(callback) {
		
		Parse.Cloud.run("UserStats", {}, {
			success: function(stats) {
				callback(null, stats);			
			},

			error: function(error) {
				callback(new Error('Failed to get user stats'));
			}
		});

	};

	var AcsGetTotalStats = function(callback) {
		var stats = {
			numShares: 0,
			numRedeems: 0
		};



		var maybeSendStats = function() {

			if ((stats.todaysPhotopon !== undefined) && (stats.todaysShares !== undefined) && (stats.todaysRedeems !== undefined)) {
				stats.dailyRevenue = stats.todaysRedeems * 0.25;
				callback(null, stats);

			}
		};


		var query = new Parse.Query("Coupon");
		
		query.find({
			success: function(results) {
				

				for (var i = 0; i < results.length; i++) {
					var ns = results[i].get("numShared");
					var nr = results[i].get("numRedeemed");
					ns = ns || "0";
					nr = nr || "0";
					stats.numShares += parseInt(ns, 10);
					stats.numRedeems += parseInt(nr, 10);
				};



				var dayBeforeDate = new Date((new Date()).getTime() - (24 * 3600 * 1000));



				var query1 = new Parse.Query("Photopon");
				query1.greaterThanOrEqualTo("createdAt", dayBeforeDate);
				query1.count({
					success: function(count) {
						stats.todaysPhotopon = count;
						maybeSendStats();
					},

					error: function(error) {
						callback(new Error("Failed to get stats"), null);
					}
				});

				
				var query2 = new Parse.Query("Notifications");
				query2.greaterThanOrEqualTo("createdAt", dayBeforeDate);
				query2.equalTo("type", "PHOTOPON");
				query2.count({
					success: function(count) {
						stats.todaysShares = count;
						maybeSendStats();
					},

					error: function(error) {
						callback(new Error("Failed to get stats"), null);
					}
				});



				var query3 = new Parse.Query("Notifications");
				query3.greaterThanOrEqualTo("createdAt", dayBeforeDate);
				query3.equalTo("type", "REDEEMED");
				query3.count({
					success: function(count) {
						stats.todaysRedeems = count;
						maybeSendStats();
					},

					error: function(error) {
						callback(new Error("Failed to get stats"), null);
					}
				});




			},

			error: function(error) {
				callback(new Error('Failed to get stats'));
			}
		});

	};


	var AcsGetMerchantRequests = function(callback) {
		var query = new Parse.Query("MerchantRequests");
		query.include("user");
		
		query.find({
			success: function(results) {
				callback(null, results);			
			},

			error: function(error) {
				callback(new Error('Failed to get merchant requests'));
			}
		});

	};





	var AcsDenyMerchantRequest = function(id, callback) {
		var MerchantRequest = Parse.Object.extend("MerchantRequests");
		var query = new Parse.Query(MerchantRequest);

		query.get(id, {
			success: function(obj) {
				obj.destroy();
				callback();
			},
			error: function(object, error) {
				callback(new Error('Failed to deny merchant request'));
			}
		});
	};

	var AcsAcceptMerchantRequest = function(id, callback) {
		
		var MerchantRequest = Parse.Object.extend("MerchantRequests");
		var query = new Parse.Query(MerchantRequest);

		query.get(id, {
			success: function(obj) {
				obj.set("isAccepted", true);
				obj.save();
				callback();

			},
			error: function(object, error) {
				callback(new Error('Failed to accept merchant request'));
			}
		});
	};

	var AcsCreateMerchantRequest = function(data, callback) {

		var SaveRequest = function(parseFile) {

            var ReqClass = Parse.Object.extend("MerchantRequests");
            var req = new ReqClass();

            req.set("taxID", data.taxid);
            req.set("promo", data.promocode);
            req.set("businessName", data.companyname);
            req.set("phoneNumber", data.phonenumber);
            req.set("user", Parse.User.current());

            if (parseFile) {
            	req.set("logo", parseFile);
            }


            req.save(null, {
                success: function(req) {
                    callback();
                },
                error: function(req, error) {
                     callback("Failed to send request");
                }
            });

		};


		if (data.file) {
			var base64 = data.file;
			var parseFile = new Parse.File("logo.png", { base64: base64 });	

	        parseFile.save().then(function() {
	        	SaveRequest(parseFile);
	        }, function(error) {
	            callback("Failed to upload file");
	        });	
		} else {
			SaveRequest(null);
		}
		
	};


	var AcsGetAllLocations = function(callback, uiupdater) {
		AcsGetLocations(callback, true, uiupdater);
	};

	var AcsGetAllCoupons = function(callback) {
		AcsGetCoupons(callback, true);
	};

	var AcsGetAllPhotopons = function(callback, uiupdater) {
		var query = new Parse.Query("Photopon");

		query.include("creator");
		query.include("coupon");
		query.include("coupon.company");

		query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						var obj = this;
						var users = obj.get("users");

						obj.userList = "Loading...";

						var query2 = new Parse.Query("User");
						console.log(users);
						query2.containedIn("objectId", users);

						query2.find({
							success: function(users) {
								obj.userList = "";
								console.log(users);

								for (var i = 0; i < users.length; i++) {
									obj.userList += users[i].get("username") + ((i == users.length - 1) ? "" : ", ")
								};
								if (uiupdater) uiupdater();		
							},
							error: function(error) {
								obj.userList = "Not Found!";
								if (uiupdater) uiupdater();		
							}
						});




					}

					results[i].fetchEverything();
				};

				callback(null, results);
			}
		});
	};




	var AcsGetLocationsFor = function(user, callback, uiupdater) {
		AcsGetLocations(callback, false, uiupdater, user);
	};

	var AcsGetCouponsFor = function(user, callback) {
		AcsGetCoupons(callback, false, user);
	};

	var AcsGetPhotoponsFor = function(user, callback, uiupdater) {
		var query = new Parse.Query("Photopon");

		query.include("creator");
		query.include("coupon");
		query.include("coupon.company");

		//query.equalTo("coupon.owner", user);
		query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					results[i].fetchEverything = function() {
						var obj = this;
						var users = obj.get("users");

						obj.userList = "Loading...";

						var query2 = new Parse.Query("User");
						console.log(users);
						query2.containedIn("objectId", users);

						query2.find({
							success: function(users) {
								obj.userList = "";
								console.log(users);

								for (var i = 0; i < users.length; i++) {
									obj.userList += users[i].get("username") + ((i == users.length - 1) ? "" : ", ")
								};
								if (uiupdater) uiupdater();		
							},
							error: function(error) {
								obj.userList = "Not Found!";
								if (uiupdater) uiupdater();		
							}
						});




					}

					results[i].fetchEverything();
				};

				callback(null, results);
			}
		});
	};






	var AcsAddRepresentative = function(repInfo, callback, isEditing) {

		var FillInfo = function(rep) {
			rep.set("title", repInfo.title);
			rep.set("firstName", repInfo.firstName);
			rep.set("middleName", repInfo.middleName);
			rep.set("lastName", repInfo.lastName);
			rep.set("phoneNumber", repInfo.phoneNumber);
			rep.set("address", repInfo.address);
			rep.set("birthday", repInfo.birthday);
			rep.set("bio", repInfo.bio);
			rep.set("linkedin", repInfo.linkedin);
			rep.set("facebook", repInfo.facebook);
			rep.set("twitter", repInfo.twitter);
			rep.set("repID", repInfo.repID);


			if (repInfo.profile) {
				image = new Parse.File("profile.png", { base64: repInfo.profile });	
				rep.set("photo", image);
			}
		};

		var SaveRep = function(rep) {
			if (repInfo.originalRepID == repInfo.repID) {
				rep.save(null, {
					success: function(rep) {
						callback(null, rep);
					},
					error: function(rep, error) {
						callback("Failed to save object.");
					}
				});
			} else {
				AcsCheckRepID(repInfo.repID, function(isValid, err) {
					if (!isValid) {
						callback(err);
						return;
					}

					rep.save(null, {
						success: function(rep) {
							callback(null, rep);
						},
						error: function(rep, error) {
							callback("Failed to save object.");
						}
					});
				});
			}
		};
		

		var RepClass = Parse.Object.extend("Representative");
		
		if (!isEditing) {
			var rep = new RepClass();

			FillInfo(rep);
			SaveRep(rep);
		} else {
			
			var query = new Parse.Query(RepClass);
            query.get(repInfo.objectId, {
                success: function(repObj) {
                    FillInfo(repObj);
                    SaveRep(repObj);
                },
                error: function(repObj, err) {
                	callback("Failed to save object.");
                }
            });
		}

	};



	var AcsCheckRepID = function(id, callback) {
		var query = new Parse.Query("Representative");
		query.equalTo("repID", id);
		
		query.find({
			success: function(results) {
				if (results.length == 0) {
					callback(true);
				} else {
					callback(false, "Representative ID is already used. Please use other ID", results[0]);
				}
			},

			error: function(error) {
				callback(false, "Server communication error", results[0]);
			}
		});

	};


	var AcsGetReps = function(callback, allCoupons) {
		var query = new Parse.Query("Representative");

		query.find({
			success: function(results) {



				for (var i = 0; i < results.length; i++) {

					results[i].getBirthday = function() {
						return  moment(this.get("birthday")).format('MM/DD/YYYY');
					};



					results[i].getFullName = function() {
						var first = this.get("firstName");
						var middle = this.get("middleName");
						var last = this.get("lastName");
						var title = this.get("title");
						
						return title + " " + first + " " + (middle ? middle : "") + " " + last;
					};

				};
				
				callback(null, results);			
			},

			error: function(error) {
				callback('Failed to get representatives');
			}
		});

	};


	var AcsGetZipCodes = function(callback) {
		var allResults = [];
		var maxResults = 1000;
		var currentOffset = 0;

		var GetSomething = function() {
			var query = new Parse.Query("EnabledLocations");
			query.limit(maxResults);
			query.skip(currentOffset);
			query.ascending("zipcode");

			query.find({
				success: function(results) {
					allResults = allResults.concat(results);

					if (results.length == maxResults) {
						currentOffset += maxResults;
						GetSomething();
					} else {
						callback(null, allResults);				
					}

				},

				error: function(error) {
					callback('Failed to get representatives');
				}
			});

		};

		GetSomething();
	};

	var AcsRemoveZipCode = function(id, callback) {
		var EnableLocation = Parse.Object.extend("EnabledLocations");
		var query = new Parse.Query(EnableLocation);

		query.get(id, {
			success: function(obj) {
				obj.destroy();
				callback();
			},
			error: function(object, error) {
				callback(new Error('Failed to deny merchant request'));
			}
		});
	};

	var AcsAddZipCode = function(zip, callback) {

        var EnabledLocation = Parse.Object.extend("EnabledLocations");
        var loc = new EnabledLocation();

        loc.set("zipcode", zip);

        loc.save(null, {
            success: function(req) {
                callback();
            },
            error: function(req, error) {
                 callback("Failed to send request");
            }
        });
	};



	var AcsGetLastBill = function(callback) {


		var billQuery = new Parse.Query("Bills");
		billQuery.equalTo("user", Parse.User.current());
		billQuery.descending("generation");
		
		billQuery.first({
			success: function(object) {
				callback(object);
			},
			error: function(error) {
				callback(null);
			}
		});


	};

	var AcsVerifyNumber = function(number, callback) {
		var cnum = number.replace(/[^0-9]/, '');

	    var Verifications = Parse.Object.extend("Verifications");
	    var v = new Verifications();
	    var c = Math.ceil(Math.random() * 900000 + 100000) + "";

	    v.set("userName", Parse.User.current().get("username"));
	    v.set("code", c);
	    v.set("phoneNumber", cnum);
	    v.set("numTried", 0);


	    v.save(null, {
	        success: function(v) {
	            callback(null, c);
	        },
	        error: function(v, error) {
	             callback("Failed to send request");
	        }
	    });

	};


	return {
		loggedIn: AcsIsLoggedIn,
		login: AcsLogin,
		register: AcsRegister,
		forgot: AcsForgot,
		logout: AcsLogout,
		info: AcsGetInfo,
		isAdmin: AcsIsAdmin,


		
		numAllCoupons: AcsNumAllCoupons,
		getCoupons: AcsGetCoupons,
		getCoupon: AcsGetCoupon,
		addCoupon: AcsAddCoupon,
		editCoupon: AcsEditCoupon,



		getLocations: AcsGetLocations,
		getLocation: AcsGetLocation,
		addLocation: AcsAddLocation,
		editLocation: AcsEditLocation,
		removeLocation: AcsRemoveLocation,


		getRedeems: AcsGetRedeems,
		getFriendInfo: AcsGetFriendInfo,


		getCompany: AcsGetCompany,
		getCompanyByID: AcsGetCompanyByID,
		newCompany: AcsNewCompany,
		getCompanies: AcsGetCompanies,
		removeCompanyLogo: AcsRemoveCompanyLogo,
		saveCompanyInfo: AcsSaveCompanyInfo,
		saveCompanyName: AcsSaveCompanyName,
		getCompanyStats: AcsGetCompanyStats,
		getCompanyInvoices: AcsGetBills,
		getLastBill: AcsGetLastBill,

		getBannedNumbers: AcsGetCompanyBannedNumbers,
		removeBannedNumber: AcsRemoveBannedNumber,
		addBannedNumber: AcsAddBannedNumber,



		getUserStats: AcsGetUserStats,
		getTotalStats: AcsGetTotalStats,
		getMerchantRequests: AcsGetMerchantRequests,
		denyMerchantRequest: AcsDenyMerchantRequest,
		acceptMerchantRequest: AcsAcceptMerchantRequest,
		createMerchantRequest: AcsCreateMerchantRequest,
		
		getAllLocations: AcsGetAllLocations,
		getAllCoupons: AcsGetAllCoupons,
		getAllPhotopons: AcsGetAllPhotopons,

		getLocationsFor: AcsGetLocationsFor,
		getCouponsFor: AcsGetCouponsFor,
		getPhotoponsFor: AcsGetPhotoponsFor,
		numPhotopons: AcsNumPhotopons,


		addRepresentative: AcsAddRepresentative,
		getRepresentatives: AcsGetReps,
		checkRepID: AcsCheckRepID,

		verifyNumber: AcsVerifyNumber,
		getZipCodes: AcsGetZipCodes,
		addZipCode: AcsAddZipCode,
		removeZipCode: AcsRemoveZipCode
	};
}]);





'use strict';

/**
 * 0.1.1
 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
 * 
 * @ flatfull.com All Rights Reserved.
 * Author url: http://themeforest.net/user/flatfull
 */

angular.module('ui.load', [])
	.service('uiLoad', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {

		var loaded = [];
		var promise = false;
		var deferred = $q.defer();

		/**
		 * Chain loads the given sources
		 * @param srcs array, script or css
		 * @returns {*} Promise that will be resolved once the sources has been loaded.
		 */
		this.load = function (srcs) {
			srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
			var self = this;
			if(!promise){
				promise = deferred.promise;
			}
      angular.forEach(srcs, function(src) {
      	promise = promise.then( function(){
      		return src.indexOf('.css') >=0 ? self.loadCSS(src) : self.loadScript(src);
      	} );
      });
      deferred.resolve();
      return promise;
		}

		/**
		 * Dynamically loads the given script
		 * @param src The url of the script to load dynamically
		 * @returns {*} Promise that will be resolved once the script has been loaded.
		 */
		this.loadScript = function (src) {
			if(loaded[src]) return loaded[src].promise;

			var deferred = $q.defer();
			var script = $document[0].createElement('script');
			script.src = src;
			script.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			script.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise;
		};

		/**
		 * Dynamically loads the given CSS file
		 * @param href The url of the CSS to load dynamically
		 * @returns {*} Promise that will be resolved once the CSS file has been loaded.
		 */
		this.loadCSS = function (href) {
			if(loaded[href]) return loaded[href].promise;

			var deferred = $q.defer();
			var style = $document[0].createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = href;
			style.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			style.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise;
		};
}]);
'use strict';

/* Filters */
// need load the moment.js to use this filter. 
angular.module('app')
  .filter('fromNow', function() {
    return function(date) {
      return moment(date).fromNow();
    }
  });
'use strict';

/* Controllers */

  // bootstrap controller
  app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
      { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg',
        text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ; 
  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  ; 
  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadDemoCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously
    $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ; 
  app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }])
  ; 
  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);