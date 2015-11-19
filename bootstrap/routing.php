<?php

use Groff\Restaurant\Router;

//Grab the URI

//Check for apache mod_rewrite uri
$uri = get("mod_rewrite_uri");

//otherwise, lets use the request URI from the server
if($uri === false){
	$uri = $_SERVER["REQUEST_URI"];
}

$router = new Router();
$router->route($uri);
