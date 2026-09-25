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

    $pdo->setAttribute(
        PDO::ATTR_DEFAULT_FETCH_MODE,
        PDO::FETCH_ASSOC
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "error" => "Error de conexión con MySQL"
    ]);

    exit;

}


/*
=====================================================
OBTENER PRODUCTOS
=====================================================
*/

$sql = "
    SELECT
        id_product,
        name_product,
        price_product,
        category_product,
        stock_product,
        TO_BASE64(image_product) AS image_product
    FROM product
    ORDER BY category_product, name_product
";


try {

    $resultado =
        $pdo->query($sql);


    $productos =
        $resultado->fetchAll();


    /*
    =================================================
    RESPUESTA
    =================================================
    */

    echo json_encode(
        $productos,
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "error" => "Error al consultar los productos"
    ]);

}