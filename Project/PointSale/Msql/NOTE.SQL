USE restaurant;
CREATE TABLE Users (
    user_id INT NOT NULL UNIQUE,
    name_user VARCHAR(100) NOT NULL,
    date_entry DATE NOT NULL,
    role_user ENUM('owner', 'manager', 'waiter', 'chef') NOT NULL,
    password_user VARCHAR(255) NOT NULL,

    PRIMARY KEY (user_id)
);

CREATE TABLE Today_Sales (
    id_ INT AUTO_INCREMENT PRIMARY KEY,
    table_ INT NOT NULL,
    waiter_ INT NOT NULL,
    state_ VARCHAR(30) NOT NULL DEFAULT 'abierta',
    total_ DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    date_open DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_close DATETIME DEFAULT NULL,

    FOREIGN KEY (waiter_)
        REFERENCES Users(user_id)
);

CREATE TABLE product (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name_product VARCHAR(150) NOT NULL,
    price_product DECIMAL(10,2) NOT NULL,
    category_product VARCHAR(100),
    stock_product INT DEFAULT 0,
    image_product MEDIUMBLOB
);

CREATE TABLE Sales_Detail (
    id_detail INT AUTO_INCREMENT PRIMARY KEY,
    id_sale INT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_unit DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (id_sale)
        REFERENCES Today_Sales(id_)
        ON DELETE CASCADE,

    FOREIGN KEY (id_product)
        REFERENCES product(id_product)
);

CREATE TABLE History (
    history_id BIGINT NOT NULL,
    original_id INT NOT NULL,
    table_ INT NOT NULL,
    waiter_ INT NOT NULL,
    state_ VARCHAR(30) NOT NULL,
    total_ DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    date_open DATETIME NOT NULL,
    date_close DATETIME NOT NULL,

    PRIMARY KEY (history_id),

    FOREIGN KEY (waiter_)
        REFERENCES Users(user_id)
);

CREATE TABLE History_Detail (
    id_history_detail BIGINT AUTO_INCREMENT PRIMARY KEY,
    history_id BIGINT NOT NULL,
    id_product INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_unit DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (history_id)
        REFERENCES History(history_id)
        ON DELETE CASCADE,

    FOREIGN KEY (id_product)
        REFERENCES product(id_product)
);



INSERT INTO Users
    (user_id, name_user, date_entry, role_user, password_user)
VALUES
    (10000001, 'Daniel Salgado',         '2024-01-15', 'owner', '12345678'),
    (10000002, 'Carlos Ramirez',         '2024-03-10', 'manager', '12345678'),
    (10000003, 'Maria Gonzalez',         '2025-01-20', 'waiter', '12345678'),
    (10000004, 'Luis Hernandez',         '2025-02-05', 'chef', '12345678');


INSERT INTO product
    (name_product, price_product, category_product, stock_product)
VALUES
    ('Hamburguesa Clásica', 95.00, 'Hamburguesas', 50),
    ('Hamburguesa Doble', 135.00, 'Hamburguesas', 40),
    ('Hamburguesa BBQ', 125.00, 'Hamburguesas', 35),
    ('Hamburguesa con Tocino', 145.00, 'Hamburguesas', 30),
    ('Hamburguesa Especial', 165.00, 'Hamburguesas', 25),

    ('Papas Fritas', 45.00, 'Complementos', 80),
    ('Papas con Queso', 65.00, 'Complementos', 60),
    ('Aros de Cebolla', 55.00, 'Complementos', 50),

    ('Refresco', 35.00, 'Bebidas', 100),
    ('Agua Embotellada', 25.00, 'Bebidas', 100),
    ('Limonada', 40.00, 'Bebidas', 60),
    ('Malteada de Chocolate', 70.00, 'Bebidas', 40),
    ('Malteada de Vainilla', 70.00, 'Bebidas', 40),

    ('Nuggets de Pollo', 75.00, 'Complementos', 50),
    ('Alitas BBQ', 110.00, 'Complementos', 45),

    ('Cheesecake', 65.00, 'Postres', 30),
    ('Brownie con Helado', 80.00, 'Postres', 25);

INSERT INTO Today_Sales
    (table_, waiter_, state_, total_)
VALUES
    (1, 10000001, 'abierta', 0.00),
    (2, 10000001, 'abierta', 0.00),
    (3, 10000002, 'abierta', 0.00),
    (4, 10000001, 'abierta', 0.00),
    (5, 10000003, 'abierta', 0.00),
    (6, 10000002, 'abierta', 0.00);

INSERT INTO Sales_Detail
    (id_sale, id_product, quantity, price_unit, subtotal)
VALUES
    (1, 1, 2, 95.00, 190.00),
    (1, 6, 2, 45.00, 90.00),
    (1, 9, 2, 35.00, 70.00);

INSERT INTO Sales_Detail
    (id_sale, id_product, quantity, price_unit, subtotal)
VALUES
    (2, 2, 1, 135.00, 135.00),
    (2, 7, 1, 65.00, 65.00),
    (2, 12, 1, 70.00, 70.00);

INSERT INTO Sales_Detail
    (id_sale, id_product, quantity, price_unit, subtotal)
VALUES
    (3, 3, 2, 125.00, 250.00),
    (3, 6, 2, 45.00, 90.00),
    (3, 9, 2, 35.00, 70.00),
    (3, 16, 1, 65.00, 65.00);

INSERT INTO Sales_Detail
    (id_sale, id_product, quantity, price_unit, subtotal)
VALUES
    (4, 4, 1, 145.00, 145.00),
    (4, 6, 1, 45.00, 45.00),
    (4, 8, 1, 55.00, 55.00),
    (4, 11, 1, 40.00, 40.00);

INSERT INTO Sales_Detail
    (id_sale, id_product, quantity, price_unit, subtotal)
VALUES
    (5, 5, 2, 165.00, 330.00),
    (5, 7, 2, 65.00, 130.00),
    (5, 13, 2, 70.00, 140.00);

INSERT INTO Sales_Detail
    (id_sale, id_product, quantity, price_unit, subtotal)
VALUES
    (6, 1, 1, 95.00, 95.00),
    (6, 14, 1, 75.00, 75.00),
    (6, 15, 1, 110.00, 110.00),
    (6, 9, 2, 35.00, 70.00);

UPDATE Today_Sales
SET total_ = (
    SELECT COALESCE(SUM(subtotal), 0)
    FROM Sales_Detail
    WHERE Sales_Detail.id_sale = Today_Sales.id_
);

START TRANSACTION;

-- 1. Copiar ventas actuales a History
INSERT INTO History (
    history_id,
    original_id,
    table_,
    waiter_,
    state_,
    total_,
    date_open,
    date_close
)
SELECT
    CAST(
        CONCAT(
            DATE_FORMAT(CURDATE(), '%Y%m%d'),
            LPAD(id_, 6, '0')
        ) AS UNSIGNED
    ),
    id_,
    table_,
    waiter_,
    state_,
    total_,
    date_open,
    NOW()
FROM Today_Sales;


-- 2. Copiar los detalles
INSERT INTO History_Detail (
    history_id,
    id_product,
    quantity,
    price_unit,
    subtotal
)
SELECT
    CAST(
        CONCAT(
            DATE_FORMAT(CURDATE(), '%Y%m%d'),
            LPAD(ts.id_, 6, '0')
        ) AS UNSIGNED
    ),
    sd.id_product,
    sd.quantity,
    sd.price_unit,
    sd.subtotal
FROM Sales_Detail sd
INNER JOIN Today_Sales ts
    ON sd.id_sale = ts.id_;


-- 3. Vaciar las ventas del día
DELETE FROM Today_Sales;

COMMIT;