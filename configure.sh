#!/usr/bin/env bash
SOURCE_SETTINGS="bootstrap/settings.sample.php"
DESTINATION_SETTINGS="bootstrap/settings.php"

echo "You are about to configure the favorite restaurants app. This will configure the application's"
echo "database settings,install dependencies, create a database, seed the database, and serve the"
echo "application using PHP's built in web server."
echo ""
echo "Please ensure you have composer installed, as well as MySQL and PHP v5.5 or greater."
echo "Continue?"

##########################################################
################## GATHER USER INPUT #####################
##########################################################

select yn in "Yes" "No"; do
    case $yn in
        Yes ) echo "Proceeding."; break;;
        No ) exit;;
    esac
done

read -e -p "Please enter the mysql username: " USERNAME

read -s -p "Please enter the mysql password: " PASSWORD

echo ""

read -e -p "Please enter the mysql host (leave empty for 'localhost'): " HOST

if [ -z "$HOST" ];
then
  HOST="localhost"
fi

echo ""
echo "We will create a database if the user has permission. Otherwise use an existing one."
read -e -p "Please enter the mysql database name (leave empty for 'restaurants'): " DATABASE


##########################################################
################# WRITE SETTINGS FILE ####################
##########################################################

if [ -z "$DATABASE" ];
then
  DATABASE="restaurants"
fi

cp $SOURCE_SETTINGS "$DESTINATION_SETTINGS.tmp"

sed "s/{{host}}/$HOST/g" < "$DESTINATION_SETTINGS.tmp" > $DESTINATION_SETTINGS
mv $DESTINATION_SETTINGS "$DESTINATION_SETTINGS.tmp"

sed "s/{{database}}/$DATABASE/g" < "$DESTINATION_SETTINGS.tmp" > $DESTINATION_SETTINGS
mv $DESTINATION_SETTINGS "$DESTINATION_SETTINGS.tmp"

sed "s/{{username}}/$USERNAME/g" < "$DESTINATION_SETTINGS.tmp" > $DESTINATION_SETTINGS
mv $DESTINATION_SETTINGS "$DESTINATION_SETTINGS.tmp"

sed "s/{{password}}/$PASSWORD/g" < "$DESTINATION_SETTINGS.tmp" > $DESTINATION_SETTINGS
rm "$DESTINATION_SETTINGS.tmp"


##########################################################
############### RUN INSTALLATION PROCESSES ###############
##########################################################

#install dependencies
composer install

#run install script to create and seed DB
php install


##########################################################
#################### SERVE APPLICATION ###################
##########################################################

#change directory to public
cd public

echo "The application is running at http://localhost:8788"

php -S localhost:8788

