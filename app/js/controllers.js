var app = angular.module("app");

var mainCtrl = app.controller("mainCtrl", function($scope, $http){
    $scope.items = [];

    // filter
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };

    // paging
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [25, 50, 100],
        pageSize: 25,
        currentPage: 1
    };

    // sort
    $scope.sortOptions = {
        fields: ["ip"],
        directions: ["ASC"]
    };

    // grid
    $scope.gridOptions = {
        data: "items",
        columnDefs: [
            { field: 'ip', displayName: 'IP' },
            { field: 'datetime', displayName: 'Date/Time' },
            { field: 'userAgent', displayName: 'User Agent' },
            { field: 'url', displayName: 'URL' },
            { field: 'statusCode', displayName: 'Status Code' },
            { field: 'generationTime', displayName: 'Generation Time' },
            { field: 'size', displayName: 'Size' }
        ],
        enablePaging: true,
        enablePinning: true,
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        keepLastSelected: true,
        multiSelect: false,
        showColumnMenu: true,
        showFilter: true,
        showGroupPanel: true,
        showFooter: true,
        sortInfo: $scope.sortOptions,
        totalServerItems: "totalServerItems",
        useExternalSorting: true,
        i18n: "en"
    };

    $scope.refresh = function() {
        setTimeout(function () {
            var sb = [];
            for (var i = 0; i < $scope.sortOptions.fields.length; i++) {
                sb.push($scope.sortOptions.directions[i] === "desc" ? "-" : "+");
                sb.push($scope.sortOptions.fields[i]);
            }

            var p = {
                name: $scope.filterOptions.filterText,
                pageNumber: $scope.pagingOptions.currentPage,
                pageSize: $scope.pagingOptions.pageSize,
                sortInfo: sb.join("")
            };

            $http({
                url: "/api/log",
                method: "GET",
                params: p
            }).success(function(data, status, headers, config) {
                $scope.totalServerItems = data.totalItems;
                $scope.items = data.items;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }).error(function(data, status, headers, config) {
                alert(JSON.stringify(data));
            });
        }, 100);
    };

    // watches
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.refresh();
        }
    }, true);

    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.refresh();
        }
    }, true);

    $scope.$watch('sortOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.refresh();
        }
    }, true);

    $scope.refresh();
});