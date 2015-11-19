<?php namespace Groff\Restaurant\Command;

use Groff\Restaurant\Csv;
use \ORM;
use \mysqli;

class Install extends \Groff\Command\Command {
	protected $description = "Creates the database, table, and seed data for the favorite restaurant app.";

	protected function printUsage( $scriptName ) {
		echo "Usage: $scriptName  [options] \n";
	}

	private function createDatabase( $dbConfig ) {
		$database = $dbConfig["database"];

		//since the ORM expects an existing database, we'll create it manually in here.
		$conn = new mysqli( $dbConfig["host"], $dbConfig["username"], $dbConfig["password"] );
		if ( $conn->connect_error ) {
			die( "Connection failed: " . $conn->connect_error );
		}

		$sql = "CREATE DATABASE IF NOT EXISTS `$database`;" ;
		if ( $conn->query( $sql ) === true ) {
			echo "Database created. \n";
			$success = 0;
		} else {
			echo "Error creating database: " . $conn->error . "\n";
			$success = 1;
		}

		$conn->close();

		return $success;
	}

	private function createTables() {
		$table = 'restaurants';
		$db = ORM::get_db();

		$db->exec( "DROP TABLE IF EXISTS `$table`" );

		$sql = "
			CREATE TABLE IF NOT EXISTS `$table` (
			  `id` int(11) NOT NULL AUTO_INCREMENT,
			  `restaurant_name` varchar(155) NOT NULL,
			  `cuisine_type` varchar(155) NOT NULL COMMENT 'Ideally this would be its own table for normalization',
			  `created` datetime NOT NULL,
			  `updated` datetime NOT NULL,
			  PRIMARY KEY (`id`),
			  KEY `restaurant_name` (`restaurant_name`,`cuisine_type`)
			) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
		";

		$db->exec( $sql );

		$results = ORM::for_table($table)->raw_query("SHOW TABLES LIKE '$table'")->find_many();

		if(count($results) > 0){
			echo "Tables Created. \n";
			return 0;
		}

		echo "Error creating table. \n";
		return 1;
	}

	private function seed() {
		$parser = new Csv();
		$parser->setFilePath(DOC_ROOT . '/data/restaurants.csv');
		$data = $parser->parse();

		if($data === false){
			echo "Error parsing CSV";
			return 1;
		}

		foreach($data as $row) {
			$restaurant = ORM::for_table("restaurants")->create();
			$name = $row["restaurant_name"];

			$restaurant->restaurant_name = $name;
			$restaurant->cuisine_type = $row["cuisine_type"];
			$restaurant->created = sqlDate();
			$restaurant->updated = sqlDate();

			$restaurant->save();

			echo "Created restaurant `$name` \n";
		}

		return 0;
	}

	/**
	 * Contains the main body of the command
	 *
	 * @return Int Status code - 0 for success
	 */
	function main() {
		$status = 0;
		require( DOC_ROOT . "/bootstrap/settings.php" );

		$dbConfig = $config["DB"];

		$status += $this->createDatabase( $dbConfig );
		$status += $this->createTables();
		$status += $this->seed();

		return $status;
	}
}