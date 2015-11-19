<?php namespace Groff\Restaurant;


use \ORM;

class Restaurant {

	public static function search($query){
		$query = addcslashes($query, "%_") . "%";

		$query = str_replace("*", "%", $query);

		$restaurants = ORM::for_table( 'restaurants' )
		                  ->where_any_is( array(
			                  array( 'restaurant_name' => $query ),
			                  array( 'cuisine_type' => $query ),
		                  ), "LIKE" )
		                  ->order_by_asc( 'restaurant_name' )
		                  ->find_many();

		$results = array();
		foreach ( $restaurants as $restaurant ) {
			$results[] = $restaurant->as_array();
		}

		return $results;
	}
}