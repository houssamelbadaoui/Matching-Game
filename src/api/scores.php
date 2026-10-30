<?php
require 'db.php';
header('Content-Type: application/json');

$scores = scoresCollection(); // get scores from mongo

//  GET request: return top 5
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $scores->find([], [
        'sort'       => ['total' => -1, 'time' => 1],
        'limit'      => 5,
    ]);

    $players = [];
    foreach($result as $row){
        $players[] = [
            "username" => $row["username"],
            "total" => $row["total"],
            "moves" => $row["moves"],
            "time" => $row["time"],
        ];
    }
    echo json_encode($players);
    exit;
}

// POST request: save a score
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data     = json_decode(file_get_contents('php://input'), true);
    $username = trim((string)($data['username']));
    $score    = (int)($data['score']);
    $moves    = (int)($data['moves']);
    $time     = (int)($data['time']);

    // if user doesn´t input the username
    if ($username === '') {
        echo json_encode(['error' => 'no username']); // return error
        exit;
    }

    // calculate total score
    $total = max(0, $score * 100 - $moves * 10);

    $scores->insertOne([
        'username'   => $username,
        'score'      => $score,
        'moves'      => $moves,
        'time'       => $time,
        'total'      => $total,
        'created_at' => new MongoDB\BSON\UTCDateTime(),
    ]);

    echo json_encode(['ok' => true, 'total' => $total]);
    exit;
}

