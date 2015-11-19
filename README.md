# Summary
This application is a code sample for GoFundMe in accordance with the requirements [here.](https://www.gofundme.com/code-sample)

[Try out the hosted version here.](http://104.236.91.226/)

It uses a custom written barebones MVC framework and PSR-4 autoloading classes to demonstrate in-depth knowledge of MVC and OOP, while also meeting the more basic requirements of implementing an auto-complete text field using AJAX and a RESTful JSON API.
 
It also includes a command-line install script written in PHP to parse the provided CSV and seed the database.

Since there are many files in the application, the most relevant ones are described here:

[Installation Command](https://github.com/agroff/favorite-restaurants/blob/master/Groff/Restaurant/Command/Install.php) - This class extends my [Command](https://github.com/agroff/Command) respository which is installed via composer and implements a CLI program which seeds the database 

[Main Controller](https://github.com/agroff/favorite-restaurants/blob/master/Groff/Restaurant/Controller.php) - A simple thin controller which serves the index page and the search api.

[Restaurant Model](https://github.com/agroff/favorite-restaurants/blob/master/Groff/Restaurant/Restaurant.php) - The class that implements data access to restaurants. While the ORM provides Ad-Hoc models, this class contains more complex aspects of the data access layer, namely the search implementation.

[Auto-Complete Implementation](https://github.com/agroff/favorite-restaurants/blob/master/public/js/main.js) - The main javascript file which queries the API and updates the markup to display matching restaurants. 

# Try it out

Be up and running quickly with the following commands:

If you don't have composer you'll need that. Also have a mysql username and password available.

    curl -sS https://getcomposer.org/installer | php
    mv composer.phar /usr/local/bin/composer

Checkout the code

    git clone https://github.com/agroff/favorite-restaurants.git

cd into the root directory:

    cd favorite-restaurants

Run the configuration bash script. This will prompt some input and then configure and serve the application.

    ./configure.sh
    
The script should run fine in OSX or Ubuntu, but if there are problems, simply copy `bootstrap/settings.sample.php` to `bootstrap/settings.php` and add database configuration. Then:

    #install dependencies
    composer install
    
    #run install script to create and seed DB
    php install
    
    #change directory to public
    cd public
    
    #serve application
    php -S localhost:8788


