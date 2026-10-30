<?php
require __DIR__ . '/db.php';
header('Content-Type: application/json');

$scores = scoresCollection();

// ---- GET: return top 5 ----
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $cursor = $scores->find([], [
        'sort'       => ['total' => -1, 'time' => 1],
        'limit'      => 5,
        'projection' => ['_id' => 0],
    ]);
    echo json_encode(iterator_to_array($cursor, false));
    exit;
}

// ---- POST: save a score ----
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data     = json_decode(file_get_contents('php://input'), true) ?? [];
    $username = trim((string)($data['username'] ?? ''));
    $score    = (int)($data['score'] ?? 0);
    $moves    = (int)($data['moves'] ?? 0);
    $time     = (int)($data['time'] ?? 0);

    if ($username === '' || mb_strlen($username) > 20) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid username']);
        exit;
    }

    // total score is calculated here, not in the browser
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

http_response_code(405);