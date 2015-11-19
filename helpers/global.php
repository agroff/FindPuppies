<?php

/**
 * Escapes html then prints $output
 *
 * @param $output
 */
function o( $output ) {
	echo htmlentities( $output );
}

/**
 * Dumps a variable for inspection in a console
 *
 * @param $item
 *
 * @return void
 */
function cdbg( $item ) {

	if ( is_array( $item ) || is_object( $item ) ) {
		print_r( $item );

		return;
	}

	echo $item . "\n";

	return;
}

/**
 * Dumps a variable for inspection in a browser
 *
 * @param $item
 */
function dbg( $item ) {
	echo "<pre>";
	var_dump( $item );
	echo "</pre>";
}

function dd($item){
	dbg($item);
	die();
}

/**
 * Includes a view. Data passes via the $data parameter is extracted into local variables
 *
 * @param       $file
 * @param array $data
 */
function view( $file, $data = array() ) {
	extract( $data );
	require( DOC_ROOT . '/views/' . $file . '.php' );
}

/**
 * Formats a date into a MySQL compatible string
 *
 * @param string $date
 *
 * @return bool|string
 */
function sqlDate( $date = 'now' ) {
	$time = strtotime( $date );

	return date( 'Y-m-d H:i:s', $time );
}

function escapeLike($searched){
	$db = ORM::get_db();
	dd($db);
	//$searched = $db->real_escape_string($searched);
//	$searched = $db->escape_string();
	return addcslashes($searched, "%_");
}

function show404() {
	header("HTTP/1.1 404 Not Found");
	view( "errors/404");
}

function showError($error = FALSE)
{
	if(ob_get_level() > 0)
	{
		ob_end_clean();
	}
	view("errors/default", array("error" => $error));
}

function template( $id ) {

	echo '<script type="text/html" id="' . $id . '">';
	view( "templates/" . $id );
	echo '</script>';

}

function get( $key ) {
	if ( ! isset( $_GET[ $key ] ) ) {
		return false;
	}

	return $_GET[ $key ];
}

function post( $key ) {
	if ( ! isset( $_POST[ $key ] ) ) {
		return false;
	}

	return $_GET[ $key ];
}