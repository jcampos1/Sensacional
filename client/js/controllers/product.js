// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('ProductController', ['$scope', '$state', '$log', 'Product', 'myser', '$uibModal', function($scope,
      $state, $log, Product, myser, $uibModal) {
    $scope.products = [];
    var fields;
    //Configuraciòn inicial de la grilla
    myser.columnDefinition($scope);

    $scope.getProductsByFilter = function() {
        fields = new Array();
        var obj1, obj2;
        obj2 = new Object();

        //Construcciòn del filtro
        obj2.like = "%"+$scope.search+"%";
        if( $scope.categories ){
            obj1 = new Object();
            obj1.categories = obj2;
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
          .find({"filter":{"where":{"or": fields}, "order": "price DESC"} })
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
              var tope = (1000-(myser.num(products[0].price)%1000))+myser.num(products[0].price);

              //Se obtienen los precios de los productos para el gràfico
              for (var index = 1; (index*1000) <= tope; index++) {
                  $scope.labels.push(index*1000);
                  cantvend = 0;
                  cantnovend = 0; 
                  products.forEach(function(prod) {
                    if( myser.num(prod.price) > ((index-1)*1000) && myser.num(prod.price) <= (index*1000) ){
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

    $scope.showGrid = function (points, evt, barClicked) {
      console.log(points, evt);
         if (barClicked) {
            //Muestra modal para la barra seleccionada
            var modalInstance = $uibModal.open({
                animation : true,
                templateUrl : 'modalDetailProduct.html',
                controller : 'DetailProductController',
                backdrop: true,
                size : "md",
                resolve: {
                    graph: function () {return barClicked._model},
                    products: function(){return $scope.products}
                }
            });
            modalInstance.result.then(function() {
            }, function() {
            });
        }
    };
  }]);

  //Muestra el modal de confirmacion de pedido
angular.module("app").controller('DetailProductController',
['$scope', 'Product', '$uibModalInstance', 'myser', '$log', 'graph', 'products',
function($scope, Product, $uibModalInstance, myser, $log, graph, products) {
    $scope.qtyLabel = graph.datasetLabel;
    //Intervalo de precio
    $scope.inf = graph.label-1000;
    $scope.sup = graph.label;
    var qty = $scope.qtyLabel == "Vendidos";
    
    //Configuraciòn inicial de la grilla
    myser.columnDefinition($scope);

    $scope.gridOptions.data = [];

    products.forEach(function(prod) {
        if( myser.num(prod.price) > $scope.inf && myser.num(prod.price) <= $scope.sup) {
            if( qty == prod.qty) {
                $scope.gridOptions.data.push(prod);
            }
        }
    }, this);

    $scope.cancel = function() {
        $uibModalInstance.dismiss(false);
    };
}]);

angular.module('app').component('detailProductComponent',
{
    templateUrl: '../../views/detail.html',
    controller : 'ProductController'
});
