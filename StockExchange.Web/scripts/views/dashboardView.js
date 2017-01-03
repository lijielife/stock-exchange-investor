﻿(function ($) {
    'use strict';

    drawPieChart('stocks-by-value-chart', config.stocksByValueData.title,
        mapData(config.stocksByValueData.data));

    function mapData(data) {
        return data.map(function (item) {
            return {
                name: item.name,
                y: item.value
            };
        });
    }

    function drawPieChart(element, title, data) {
        Highcharts.chart(element, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height: 300
            },
            title: {
                text: title
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.2f}</b> ({point.percentage:.2f}%)'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Company',
                colorByPoint: true,
                data: data
            }]
        });
    }

    var ajaxUrl = $('#signal-grid').data('ajax-url');
    var columns = $('#signal-grid th').DataTableColumns();
    var columnDefs = $('#signal-grid th').DataTableColumnDefs();
    // ReSharper disable once UnusedLocals
    var dataTableSignals = $('#signal-grid').DataTable(
    {
        columns: columns,
        columnDefs: columnDefs,
        ajax: {
            url: ajaxUrl,
            contentType: 'application/json',
            type: 'POST',
            data: function (d) {
                d.filter = {
                };
                return JSON.stringify(d);
            }
        }
    });

    // ReSharper disable once UnusedLocals
    var dataTable = initCurrentStocksTable();

    function initCurrentStocksTable() {
        var columnDefsCurrent = [{
            targets: $('#current-grid th[data-column=Profit]').index(),
            render: function (data) {
                return getPriceWithIconHtml(data);
            }
        }];
        return createDataTable($('#current-grid'), columnDefsCurrent);
    }

    function getPriceWithIconHtml(value, down) {
        if (down || value < 0) {
            return '<i class="fa fa-arrow-down icon-stock-down"></i>' +
                ' <span class="text-danger">' + value + '</span>';
        } else {
            return '<i class="fa fa-arrow-up icon-stock-up"></i>' +
                ' <span class="text-success">' + value + '</span>';
        }
    }

    function createDataTable($selector, columnDefs) {
        var ajaxUrl = $selector.data('ajax-url');
        var columns = $('th', $selector).DataTableColumns();

        return $selector.DataTable({
            columns: columns,
            columnDefs: columnDefs,
            responsive: true,
            ajax: {
                url: ajaxUrl,
                contentType: 'application/json',
                type: 'POST',
                data: function (d) {
                    return JSON.stringify(d);
                }
            }
        });
    }

})(jQuery);