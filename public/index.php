<?php
require_once("../bootstrap/initialize.php");

ob_start();

require_once(DOC_ROOT . "/bootstrap/routing.php");

ob_end_flush();

