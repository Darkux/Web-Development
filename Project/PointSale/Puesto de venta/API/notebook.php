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
        "error" => "Error de conexión con MySQL"
    ]);

    exit;

}


/*
=====================================================
OBTENER VENTAS DEL DÍA
=====================================================
*/

$sqlVentas = "

    SELECT
        ts.id_,
        ts.table_,
        ts.waiter_,
        ts.state_,
        ts.total_,
        ts.date_open,
        ts.date_close

    FROM Today_Sales ts

    ORDER BY ts.id_ ASC

";


$stmtVentas = $pdo->prepare($sqlVentas);

$stmtVentas->execute();

$ventas = $stmtVentas->fetchAll(
    PDO::FETCH_ASSOC
);


/*
=====================================================
OBTENER PRODUCTOS DE CADA VENTA
=====================================================
*/

$sqlProductos = "

    SELECT

        sd.id_sale,
        sd.id_product,
        sd.quantity,
        sd.price_unit,
        sd.subtotal,

        p.name_product

    FROM Sales_Detail sd

    INNER JOIN product p
        ON p.id_product = sd.id_product

    WHERE sd.id_sale = :id_sale

    ORDER BY sd.id_detail ASC

";


$stmtProductos =
    $pdo->prepare($sqlProductos);


/*
=====================================================
CONSTRUIR JSON
=====================================================
*/

$resultado = [];


foreach ($ventas as $venta) {

    $idVenta =
        (int)$venta["id_"];


    /*
    -------------------------------------------------
    PRODUCTOS
    -------------------------------------------------
    */

    $stmtProductos->execute([
        ":id_sale" => $idVenta
    ]);


    $productos =
        $stmtProductos->fetchAll(
            PDO::FETCH_ASSOC
        );


    $listaProductos = [];


    foreach ($productos as $producto) {

        $listaProductos[] = [

            "id" =>
                (int)$producto["id_product"],

            "name" =>
                $producto["name_product"],

            "quantity" =>
                (int)$producto["quantity"],

            "price" =>
                (float)$producto["price_unit"],

            "subtotal" =>
                (float)$producto["subtotal"]

        ];

    }


    /*
    -------------------------------------------------
    VENTA
    -------------------------------------------------
    */

    $resultado[] = [

        "id" =>
            $idVenta,

        "table" =>
            (int)$venta["table_"],

        "waiter" =>
            (int)$venta["waiter_"],

        "state" =>
            $venta["state_"],

        "total" =>
            (float)$venta["total_"],

        "date_open" =>
            $venta["date_open"],

        "date_close" =>
            $venta["date_close"],

        "products" =>
            $listaProductos

    ];

}


/*
=====================================================
ENVIAR RESPUESTA
=====================================================
*/

echo json_encode(
    $resultado,
    JSON_UNESCAPED_UNICODE |
    JSON_PRETTY_PRINT
);

?>
