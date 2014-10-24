/**
 * Created by RFilomeno on 23/10/14.
 */
var sampleCountTotal = 0;
var sampleCountOK = 0;
var plotLatencyData = [];

function showPlotData(newdata) {

    plotLatencyData.push(newdata);
    if(plotLatencyData.length >= 20) plotLatencyData.slice(1);

    var res = [];
    var largestValue = Math.max.apply(Math, plotLatencyData);

    for (var i = 0; i < 20; ++i) {
        if(i < plotLatencyData.length) {
            res.push([i, plotLatencyData[i]]);
        } else {
            res.push([i,0]);
        }
    }


    $.plot("#plot-placeholder", [ res ], {
        series: {
            shadowSize: 0	// Drawing is faster without shadows
        },
        yaxis: {
            min: 0,
            max: largestValue
        },
        xaxis: {
            show: false
        }
    });

    var data = [
    	{ label: "Success",  data: sampleCountOK},
    	{ label: "Fails",  data: sampleCountTotal - sampleCountOK}
    ];

    $.plot('#pie-placeholder', data, {
        series: {
            pie: {
                show: true
            }
        },
        legend: {
            show: false
        }
    });

}



$(document).ready(function(){


    var spinnerjs = {
        lines: 17, // The number of lines to draw
        length: 0, // The length of each line
        width: 5, // The line thickness
        radius: 5, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 35, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '10px', // Top position relative to parent
        left: '10px', // Left position relative to parent
        position: 'relative'
    };


    sampleCountOK = sampleCountTotal = 1;
    showPlotData(0);
    sampleCountOK = sampleCountTotal = 0;
    plotLatencyData = [];


    $("#btnSearch").click(function(e){
        e.preventDefault();
        var _date = new Date();
        var _uid = _date.getTime();
        var _url = $("#txtSearch").val();
        var _timestamp = ('0'+_date.getHours()).slice(-2) + ':' + ('0'+_date.getMinutes()).slice(-2) + ':' +  ('0'+_date.getSeconds()).slice(-2)  + '.' + _date.getMilliseconds();

        $('<tr id="result-' + _uid +'" class="active connecting"><td>' + _timestamp + '</td><td>' + _url + '</td><td>NA</td><td>NA</td><td>NA</td><td><div id="spin-' + _uid +'"></div><span class="spinnerlabel">Connecting...</span></td></tr>').insertBefore('table > tbody > tr:first');
        $('#spin-' + _uid).spin(spinnerjs);

        $.ajax({type: "POST",
            url: "server.php",
            data: {
                url: _url,
                uid: _uid,
                timestamp: _timestamp
            },

            success:function(data, textStatus, jqXHR){
                var result = jQuery.parseJSON(data);
                $('tr#result-' + result.uid).replaceWith( '<tr id="result-' + result.uid + '" class="' + result.class + '"><td>' + result.timestamp + '</td><td>' + result.url + '</td><td>' + result.httpcode + '</td><td>' + result.httplatency + 'secs</td><td>' + result.httpsize + 'bytes</td><td><button id="view-' + result.uid + '" class="btn btn-xs btn-default" type="button">View</button><div id="dialog-' + result.uid + '">  <pre class="prettyprint"><code class="lang-html" id="body-' + result.uid + '"></code></pre> </div> ' + result.httpdescription + ' </td></tr>' );
                $('#dialog-' + result.uid).dialog(
                    {
                        title: "Response Body",
                        modal: true,
                        autoOpen: false,
                        closeOnEscape: true,
                        width:'90%',
                        height:'400',
                        resizable:false,
                        open: function(){
                            $('#body-' + result.uid).text(result.httpmessage);
                        }
                    }
                );

                $('#view-' + result.uid ).click(function() {
                    $('#dialog-' + result.uid).dialog('open');
                    $('#body-' + result.uid).dialog('open');
                });
                if(result.class == 'success') sampleCountOK++;
                sampleCountTotal++;
                showPlotData(result.httplatency);
            },

            error: function (jqXHR, textStatus, errorThrown)
            {
                $('tr#result-' + result.uid).replaceWith( '<tr id="result-' + _uid + '" class="danger"><td>' + _timestamp + '</td><td>' + _url + '</td><td>NA</td><td>NA</td><td>0bytes</td><td>Client cannot connect to server</td></tr>' );
                sampleCountTotal++;
                showPlotData(0);
            }
        });
    });
});