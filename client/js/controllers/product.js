// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('ProductController', ['$scope', '$state', '$log', 'Product', 'grid', function($scope,
      $state, $log, Product, grid) {
    $scope.products = [];

    //Configuraciòn inicial de la grilla
    grid.columnDefinition();

    $scope.getProductsByFilter = function() {
        var fields = new Array();
        var obj1, obj2;
        obj2 = new Object();

        //Construcciòn del filtro
        obj2.like = $scope.search;
        if( $scope.section ){
            obj1 = new Object();
            obj1.section = obj2;
            fields.push(obj1);
        }
        if( $scope.name ){
            obj1 = new Object();
            obj1.name = obj2;
            fields.push(obj1);
        }
        if( $scope.mark ){
            obj1 = new Object();
            obj1.mark = obj2;
            fields.push(obj1);
        }
        if( $scope.condition ){
            obj1 = new Object();
            obj1.condition = obj2;
            fields.push(obj1);
        }
        //Se obtiene el universo de productos de acuerdo al filtro
        Product
          .find({"filter":{"where":{"or": fields}, "order": "priceventa DESC"} })
          .$promise
          .then(function(products) {
              $log.info("EL RESULTADO ES: ");
              $log.info(products);
              $scope.products = products;
              $scope.gridOptions.data = products;
              
              $scope.series = ['Vendidos', 'No Vendidos'];
              $scope.color = [ '#00FF00', '#FF0000'];
              $scope.labels = new Array();
              $scope.data = new Array();
              var vend = new Array();
              var novend = new Array();
              var cantvend, cantnovend;
              var tope = (1000-(products[0].priceventa%1000))+products[0].priceventa;
              //Se obtienen los precios de los productos para el gràfico
              for (var index = 1; (index*1000) <= tope; index++) {
                  $scope.labels.push(index*1000);
                  cantvend = 0;
                  cantnovend = 0; 
                  products.forEach(function(prod) {
                    if( prod.priceventa >= ((index-1)*1000) && prod.priceventa <= (index*1000) ){
                        if( prod.qty ){
                            cantvend++;
                        }else{
                            cantnovend++;
                        }
                    }
                  }, this);
                  vend.push(cantvend);
                  novend.push(cantnovend);
              }

              $scope.data.push(vend);
              $scope.data.push(novend);
              
          });
    }

    $scope.showGrid = function (points, evt) {
      console.log(points, evt);
    };
  }]);
