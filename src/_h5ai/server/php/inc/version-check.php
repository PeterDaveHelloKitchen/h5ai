<?php

define("MIN_PHP_VERSION", "5.4.0");
define("HAS_MIN_PHP_VERSION", version_compare(PHP_VERSION, MIN_PHP_VERSION) >= 0);

if (!HAS_MIN_PHP_VERSION) {
    header("Content-type: application/json;charset=utf-8");
    echo json_encode(array(
        "err" => "ERR_PHP",
        "msg" => "PHP " . MIN_PHP_VERSION . "+ required, only found " . PHP_VERSION,
        "ver" => PHP_VERSION
    ));
    exit;
}