<?php

header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"), true);

/*
=====================================================
CONEXIÓN A MYSQL
=====================================================
*/

$host = "localhost";
$db   = "restaurant";
$user = "root";
$pass = "";

try {

    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8mb4",
        $user,
        $pass
    );

    $pdo->setAttribute(
        PDO::ATTR_ERRMODE,
        PDO::ERRMODE_EXCEPTION
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Error de conexión con MySQL"
    ]);

    exit;
}


/*
=====================================================
DATOS DEL LOGIN
=====================================================
*/

$user_id = $data['user_id'] ?? null;
$password = $data['password'] ?? null;

if (!$user_id || !$password) {

    echo json_encode([
        "success" => false,
        "message" => "Faltan datos"
    ]);

    exit;
}


/*
=====================================================
CONSULTAR USUARIO
=====================================================
*/

$stmt = $pdo->prepare("
    SELECT `user_id`,`name_user`,`role_user`
    FROM Users
    WHERE user_id = ?
    AND password_user = ?
");

$stmt->execute([
    $user_id,
    $password
]);

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);


/*
=====================================================
RESPUESTA
=====================================================
*/

if ($usuario) {

    echo json_encode([
        "success" => true,
        "usuario" => $usuario
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Usuario o contraseña incorrectos"
    ]);
}
