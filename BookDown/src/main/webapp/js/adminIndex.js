var lineChartData = {
    //X坐标数据
    labels : ["周一","周二","周三","周四","周五","周六","周日"],
    datasets : [
        {
            //统计表的背景颜色
            fillColor : "rgba(0,0,255,0.5)",
            //统计表画笔颜色
            strokeColor : "#f60",
            //点的颜色
            pointColor : "#000;",
            //点边框的颜色
            pointStrokeColor : "red",
            //鼠标触发时点的颜色
            pointHighlightFill : "red",
            //鼠标触发时点边框的颜色
            pointHighlightStroke : "#000",
            //Y坐标数据
            data : [300,555,655,714,899,905,1000]
        },{
            fillColor : "rgba(0,255,0,0.5)",
            strokeColor : "rgba(92, 184, 92, 1)",
            pointColor : "rgba(23, 126, 23, 1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(151,187,205,1)",
            data : [200,455,755,814,999,905,1000]
        }
        ,{
            fillColor : "rgba(255,0,0,0.5)",
            strokeColor : "blue",
            pointColor : "rgba(23, 126, 23, 1)",
            pointStrokeColor : "#fff",
            pointHighlightFill : "#fff",
            pointHighlightStroke : "rgba(151,187,205,1)",
            data : [114,255,455,414,599,605,500]
        }
    ]

}

// 用户类型，并统计各个类型的数量
function countNum(){
    $.ajax({
        url: "/showUserNum",
        type: "GET",
        dataType: "json",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != null) {
                // 解析数据
                // 清除所有数据
               $("#userNum").children().remove();
               $.each(result,function (index,item) {
                    var td = '<tr> <th scope="row">'+item.name+'</th><td style="text-align: ">'+item.num+'</td></tr>';
                   $("#userNum").append(td);
               });
            } else {
                //返回数据为空
            }

        },
        error: function () {
            console.log("查询异常");
        }
    });
}

// 饼状图，图书类型，以及各个类型所占百分比
function countBookType(){
    $.ajax({
        url: "/showBookNum",
        type: "GET",
        dataType: "json",
        cache: false,
        processData: false,
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            if (result != null) {
                // 解析数据
                // 清除所有数据
                $("#interactive").children().remove();
               bindDate(result, $("#interactive"))
            } else {
                //返回数据为空
            }

        },
        error: function () {
            console.log("查询异常");
        }
    });
}
// 解析数据
function bindDate(result,id){
    var chart = {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
    };

    var tooltip = {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    };

    var sum = result[result.length-1].num;
    var dataJson= [];
    $.each(result,function (index,item) {
            if (index != result.length-1){
                var e = [item.name,(item.num*1.0/sum).toFixed(2)*100];
                dataJson.push(e);
            }
    });

    var title = {
        text: '图书类型以及所占比重'
    };

    var series= [{
        type: 'pie',
        name: '图书比例',
        data:dataJson,
    }];
    // Radialize the colors
    Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    });

    var json = {};
    json.chart = chart;
    json.title = title;
    json.tooltip = tooltip;
    json.series = series;
    json.plotOptions = plotOptions;
   id.highcharts(json);

}

window.onload = function(){
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        responsive: true
    });

    // 统计用户类型数量
    countNum();
    // 画图书的饼状图
    countBookType();



}