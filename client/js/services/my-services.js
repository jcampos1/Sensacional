'use strict';
angular.module("myservices", []);

angular.module("myservices").service('myser', function($log, $rootScope) {
    return {
        //Configuraciòn de la grilla
        columnDefinition: function( $scope ) {
            $scope.gridOptions = {
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25,
                enableSorting: true,
                enableFiltering: true,
                columnDefs: [
                  { field: 'imagen', enableSorting: false},
                  { field: 'sku', enableSorting: false },
                  { field: 'name', enableSorting: false },
                  { field: 'condition', enableSorting: false },
                  { field: 'priceref' },
                  { field: 'price' },
                  { field: 'qty' }
                ],
                onRegisterApi: function( gridApi ) {
                    $scope.grid1Api = gridApi;
                }
            };
        },

        num: function( number ) {
            var prStr = number + "";
            prStr = prStr.replace('.', '');
            return parseFloat(prStr);
        }
    }
});