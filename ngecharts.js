const angular = require('./node_modules/angular/angular.min.js');
const echarts = require('./node_modules/echarts/dist/echarts.min');

var ngecharts = angular.module('ngecharts', []);

ngecharts.directive('echarts', ['$window', function ($window) {
    return {
        restrict: 'EA',
        template: '<div></div>',
        scope: {
            options: '=options'
        },
        link: buildLinkFunc($window)
    };
}]);

function buildLinkFunc($window) {
    return function (scope, ele, attrs) {
        var chart, options;
        chart = echarts.init(ele[0], 'macarons');

        createChart(scope.options);

        function createChart(options) {
            if (!options) return;

            chart.setOption(options);
            // scope.$emit('create', chart);

            angular.element($window).bind('resize', function(){
                chart.resize();
            });

        }

        scope.$watch('options', function (newVal, oldVal) {
            if (angular.equals(newVal, oldVal)) return;
            createChart(newVal);
        })


    };
}

module.exports = ngecharts;

