<!DOCTYPE html>
<html>
<head>
    <title>URL Testter</title>
    <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css">
    <link rel="stylesheet" href="css/app.css">
</head>
<body>
    <div class="panel panel-default" id="forms">
        <div class="panel-heading">URL Tester</div>
        <div class="panel-body">

            <!-- Search Panel -->
            <div class="panel panel-default" id="input-groups">
                <div class="panel-heading">Search Options</div>
                <div class="panel-body">
                    <div class="input-group">
                        <span class="input-group-btn">
                            <button id="btnSearch" name="btnSearch" class="btn btn-default" type="button">Go!</button>
                        </span>
                        <input id="txtSearch" name="txtSearch" type="text" class="form-control" placeholder="Enter URL here" value="https://hcp.clevercapture.net">
                    </div><br>
                </div>
            </div>

            <!-- Statistics Panel -->
            <div class="panel panel-default" id="tables">
                <div class="panel-heading">Statistics</div>
                <div class="panel-body">
                    <div  class="col-lg-4">
                        Success Rate
                        <div id="pie-placeholder"></div>
                    </div>
                    <div class="col-lg-8">
                        Latency
                        <div id="plot-placeholder"></div>
                    </div>
                </div>
            </div>

            <!-- Results Panel -->
            <div class="panel panel-default" id="tables">
                <div class="panel-heading">Results</div>
                <div class="panel-body">
                    <table id="tblResults" class="table table-hover">
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>URL</th>
                                <th>Response Code</th>
                                <th>Latency</th>
                                <th>Size</th>
                                <th>Response / Content / Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script type="application/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
    <script type="application/javascript" src="bower_components/jquery-ui/jquery-ui.min.js"></script>
    <script type="application/javascript" src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script type="application/javascript" src="bower_components/jquery-flot/jquery.flot.js"></script>
    <script type="application/javascript" src="bower_components/jquery-flot/jquery.flot.pie.js"></script>
    <script type="application/javascript" src="bower_components/spin.js/spin.js"></script>
    <script type="application/javascript" src="bower_components/spin.js/jquery.spin.js"></script>
    <script type="application/javascript" src="js/app.js"></script>
</body>
</html>