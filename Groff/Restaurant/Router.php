<?php


namespace Groff\Restaurant;

use Groff\Restaurant\Controller;

class Router {

	public function route( $uri ) {

		//remove the leading slash
		$uri = preg_replace( "/^\\//", "", $uri );

		//Overwrite base case to index
		if ( trim( $uri ) === "" ) {
			$uri = "index";
		}

		//split the arguments on forward slash
		$uri = explode( "/", $uri );

		//the first argument is the controller method
		$method = array_shift( $uri );

		//instantiate the controller
		$controller = new Controller();

		//create a callable array with the controller and the string containing the method which was requested.
		$callable = array( $controller, $method );

		if ( is_callable( $callable ) ) {
			try {
				//try calling the method, passing any extra parameters as variables to the method.
				call_user_func_array( $callable, $uri );
			}
			catch ( Exception $e ) {
				//We'll show a 404 because the URL didn't have enough arguments.
				if ( $e->getCode() === GROFF_ERROR_ARGUMENTS ) {
					show404();
					throw $e;
				} //otherwise, a regular uncaught error occured. Re-throw it to be handled by the general error handler.
				else {
					throw $e;
				}
			}

		} else {
			show404();
		}
	}
}