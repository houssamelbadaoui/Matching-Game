<?php
require '/var/www/vendor/autoload.php';

function scoresCollection() {
    $uri = getenv('MONGO_URI') ?: 'mongodb://mongo:27017';
    $client = new MongoDB\Client($uri);
    return $client->memorygame->scores;
}