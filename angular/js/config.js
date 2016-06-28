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


   