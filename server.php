<?php
require_once('utils.inc.php');



$result = array(
    'timestamp'         => filter_var(  ( isset($_REQUEST['timestamp']) ? $_REQUEST['timestamp']:date('H:i:s A') ),FILTER_SANITIZE_STRING  ),
    'url'               => filter_var(  ( isset($_REQUEST['url']) ? $_REQUEST['url']:full_url($_SERVER) ),FILTER_SANITIZE_URL  ),
    'httpcode'          => '0',
    'httpdescription'   => 'Unknown',
    'httpmessage'       => 'Script Error!',
    'httplatency'       => '0ms',
    'httpsize'          => '0bytes',
    'class'             => 'danger',
    'uid'               => filter_var( ( isset($_REQUEST['uid']) ? $_REQUEST['uid']: strtotime(date('now')) ),FILTER_SANITIZE_STRING )
);

try {
    $cc = new cURL();
    $result['httpmessage']      = $cc->get($result['url']);
    $result['httpcode']         = $cc->get_info()['http_code'];
    $result['httpdescription']  = $cc->get_info()['http_code_description'];
    $result['httpsize']         = $cc->get_info()['size_download'];
    $result['httplatency']      = $cc->get_info()['total_time'];

    if($cc->get_info()['http_code'] >= 200 && $cc->get_info()['http_code'] < 400 )  $result['class'] = 'success';
    if($cc->get_info()['http_code'] >= 400 && $cc->get_info()['http_code'] < 500)   $result['class'] = 'warning';
    if($cc->get_info()['http_code'] >= 500 )                                        $result['class'] = 'danger';
} catch (Exception $e) {
    $result['httpdescription'] = $e->getMessage();
}

$resultString = json_encode($result,JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
echo $resultString;