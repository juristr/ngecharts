(function (root, factory) {
    if (typeof require === 'function' && typeof exports === 'object') {
        // CommonJS
        var angular = require('./node_modules/angular/angular.min.js');
        var echarts = require('./node_modules/echarts/dist/echarts.min');

        exports.ngecharts = factory(angular, echarts);
    } else if (typeof define === 'function' && define.amd) {
        // AMD.
        define(['angular', 'echarts'], function (angular, echarts) {
            return root.ngecharts = factory(angular, echarts);
        });
    } else {
        // Browser globals
        root.ngecharts = factory(root.angular, root.echarts);
    }
}(this, function (angular, echarts) {

var app = angular.module('ngecharts', []);

app.directive('echarts', ['$window', function ($window) {
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
}));
