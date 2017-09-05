// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'lbServices',
    'ui.router', 'ui.grid', 'ui.grid.pagination', 'myservices', 'chart.js', 'ui.bootstrap',
  ])
  .config(['$stateProvider', '$urlRouterProvider', 'ChartJsProvider', function($stateProvider,
      $urlRouterProvider, ChartJsProvider) {
    $stateProvider
      .state('product', {
        url: '',
        templateUrl: 'views/product.html',
        controller: 'ProductController'
      });

      ChartJsProvider.setOptions({ colors : [ '#DCDCDC', '#46BFBD', '#803690', '#00ADF9', '#FDB45C', '#949FB1', '#4D5360'] });

    $urlRouterProvider.otherwise('product');
  }]);
