/* jshint esversion: 6 */

define(function (require) {
  var module = require('ui/modules').get('kibana/funnel_chart_vis', ['kibana']);
  module.controller('KbnFunnelChartVisController', function ($scope, Private) {
    const tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    const metrics = $scope.metrics = [];

    $scope.processTableGroups = function (tableGroups) {
        console.log("tableGroups: " + tableGroups);
     tableGroups.tables.forEach(function (table) {
         table.rows.forEach(function(row, i){
             metrics.push({
                 label: row[0],
                 value: row[1]
             });
         });
     });
   };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      }
    });
  });
});