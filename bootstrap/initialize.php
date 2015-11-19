<?php
define( "DOC_ROOT", str_replace("/public", "", $_SERVER["DOCUMENT_ROOT"]) );

date_default_timezone_set( 'UTC' );

require_once( DOC_ROOT . "/vendor/autoload.php" );


$settingsFile = DOC_ROOT . "/bootstrap/settings.php";

if ( file_exists( $settingsFile ) ) {
	require_once( $settingsFile );
} else {
	die( "Could not find settings file. Please copy `settings.sample.php` to $settingsFile" );
}


// php returns the error code two when trying to call a method without enough arguments.
// We'll define that here to help avoid magic numbers in the code.
define( "GROFF_ERROR_ARGUMENTS", 2 );


include( DOC_ROOT . "/helpers/global.php" );

function exception_handler( $exception ) {
	ob_end_clean();
	//logError($exception);
	showError( $exception );
	exit();
}

function error_handler( $errno, $errstr, $errfile, $errline ) {
	throw new Exception( $errstr, $errno );
}

set_error_handler( "error_handler", E_ALL );
set_exception_handler( 'exception_handler' );


$host         = $config["DB"]["host"];
$databaseName = $config["DB"]["database"];
$username     = $config["DB"]["username"];
$password     = $config["DB"]["password"];

ORM::configure( 'mysql:host=' . $host . ';dbname=' . $databaseName );
ORM::configure('logging', true);
ORM::configure( 'username', $username );
ORM::configure( 'password', $password );
