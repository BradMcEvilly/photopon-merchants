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
                resolve: load(['moment','js/services/acs.js', 'js/controllers/chart.js', 'js/controllers/dashboardsuper.js', 'js/controllers/header.js', 'js/controllers/aside.js'])
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

			.state('app.change_password', {
                url: '/change/password',
                templateUrl: 'tpl/form_change_password.html',
                controller: 'ChangePasswordCtrl',
                resolve: load(['js/services/acs.js', 'js/controllers/change_password.js'])
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

              .state('app.analytics.activeusers', {
                url: '/activeusers',
                templateUrl: 'tpl/active_users.html',
                controller: 'ActiveUsersCtrl',
                resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'toaster', 'moment', 'js/services/acs.js', 'js/controllers/activeusers.js'], function() { 
                  return loadGoogleMaps(); 
                })
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

			.state('access.validateEmail', {
                url: '/validateEmail/:token',
                templateUrl: 'tpl/page_validate_email.html',
                resolve: load([  'toaster', 'moment', 'js/services/acs.js','js/controllers/signin.js'], function() { 
                 
                })
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
                resolve: load(['js/services/acs.js', 'moment', 'js/controllers/adminlists.js'])
            })
              .state('app.allmerchantrequests', {
                url: '/allmerchantrequests',
                templateUrl: 'tpl/admin_items_list.html',
                controller: 'AllMerchantRequestsCtrl',
                resolve: load(['js/services/acs.js', 'moment', 'js/controllers/adminlists.js'])
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
