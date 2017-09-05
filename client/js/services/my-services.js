'use strict';
angular.module("myservices", []);

angular.module("myservices").factory('grid', function($log, $rootScope) {
    return {
        //Configuraciòn de la grilla
        columnDefinition: function( ) {
            $rootScope.gridOptions = {
                enableSorting: true,
                enableFiltering: true,
                columnDefs: [
                  { field: 'imagen', enableSorting: false},
                  { field: 'sku', enableSorting: false },
                  { field: 'name', enableSorting: false },
                  { field: 'condition', enableSorting: false },
                  { field: 'priceref' },
                  { field: 'priceventa' },
                  { field: 'qty' }
                ],
                onRegisterApi: function( gridApi ) {
                    $rootScope.grid1Api = gridApi;
                }
            };
        }
    }
});