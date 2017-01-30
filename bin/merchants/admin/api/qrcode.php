<?php
/**
 * QR Code + Logo Generator
 *
 * http://labs.nticompassinc.com
 */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$data = 'http://photopon.co/qr/#/';
$size = '400x400';

if (isset($_GET['company'])) {
	$data .= $_GET['company'];
}

if (isset($_GET['location'])) {
	$data .= '/' . $_GET['location'];
} else {
	$data .= '/all';
}

if (isset($_GET['download'])) {
	header("Pragma: public");
	header("Expires: 0");
	header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
	header("Content-Type: application/force-download");
	header("Content-Type: application/octet-stream");
	header("Content-Type: application/download");
	header("Content-Disposition: attachment;filename=qrcode.png");
	header("Content-Transfer-Encoding: binary ");
} else {
	header('Content-type: image/png');
}

// Get QR Code image from Google Chart API
// http://code.google.com/apis/chart/infographics/docs/qr_codes.html
$QR = imagecreatefrompng('https://chart.googleapis.com/chart?cht=qr&chld=H|1&chs='.$size.'&chl='.urlencode($data));

$logo = imagecreatefromstring(file_get_contents("qrlogo.png"));
$QR_width = imagesx($QR);
$QR_height = imagesy($QR);

$logo_width = imagesx($logo);
$logo_height = imagesy($logo);

// Scale logo to fit in the QR Code
$logo_qr_width = $QR_width/3;
$scale = $logo_width/$logo_qr_width;
$logo_qr_height = $logo_height/$scale;

imagecopyresampled($QR, $logo, $QR_width/3, $QR_height/3, 0, 0, $logo_qr_width, $logo_qr_height, $logo_width, $logo_height);

imagepng($QR);
imagedestroy($QR);
/*
*/
?>