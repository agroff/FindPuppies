<?php


namespace Groff\Restaurant;


class Csv {

	private $filePath;

	public function setFilePath( $path ) {
		$this->filePath = $path;
	}

	public function parse() {
		ini_set( 'auto_detect_line_endings', true );
		$formatted = array();
		$indexes   = array();

		$row    = 0;
		$handle = fopen( $this->filePath, "r" );

		if ( $handle === false ) {
			return false;
		}

		while ( ( $data = fgetcsv( $handle, 1000, "," ) ) !== false ) {
			$row ++;
			//grab the headers then skip them
			if ( $row === 1 ) {
				$indexes = $data;
				continue;
			}

			//skip empty rows
			if ( count( $data ) < 2 ) {
				continue;
			}

			//build a formatted array
			$rowArray = array();
			foreach ( $data as $index => $value ) {
				$field              = $indexes[ $index ];
				$rowArray[ $field ] = $value;
			}

			//push array
			$formatted[] = $rowArray;
		}
		fclose( $handle );

		return $formatted;
	}
}