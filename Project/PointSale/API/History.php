<?php

header("Content-Type: application/json; charset=UTF-8");

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
OBTENER HISTORIAL
=====================================================
*/

try {

    $sql = "
        SELECT
            history_id,
            original_id,
            table_,
            waiter_,
            state_,
            total_,
            date_open,
            date_close

        FROM History

        ORDER BY date_close DESC
    ";

    $stmt = $pdo->prepare($sql);

    $stmt->execute();

    $ventas = $stmt->fetchAll(PDO::FETCH_ASSOC);


    /*
    =============================================
        DEVOLVER ARRAY
    =============================================
    */

    echo json_encode(
        $ventas,
        JSON_UNESCAPED_UNICODE
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Error al consultar el historial",
        "error" => $e->getMessage()
    ]);

}

?>