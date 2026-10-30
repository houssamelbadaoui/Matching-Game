<?php
require '/var/www/vendor/autoload.php';

function scoresCollection() {
    $uri =  'mongodb://mongo:27017'; // url to db
    $client = new MongoDB\Client($uri); // connect to mongo
    return $client->memorygame->scores; // databse memorygame - collection scores
}

?>