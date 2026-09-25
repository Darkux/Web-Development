/*
=====================================================
    TakeOnnewOrder.js
    TOMAR NUEVO PEDIDO
=====================================================
*/


/*
=====================================================
    VARIABLES
=====================================================
*/

let productos = [];
let pedido = [];

let idMesa = null;


/*
=====================================================
    INICIO
=====================================================
*/

function iniciarTakeOnNewOrder() {

    const parametros =
        new URLSearchParams(window.location.search);

    idMesa =
        parametros.get("table");

    console.log(
        "Mesa:",
        idMesa
    );

    cargarProductos();

    configurarEventos();

}


/*
=====================================================
    CARGAR PRODUCTOS
=====================================================
*/

async function cargarProductos() {
    console.log()
    const contenedor =
        document.getElementById("productos");

    try {

        const respuesta =
            await fetch("api/TakeOnNewOrder.php");


        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP: " +
                respuesta.status
            );

        }


        productos =
            await respuesta.json();


        console.log(
            "Productos:",
            productos
        );


        /*
            Mostrar productos
        */

        mostrarProductos();


    } catch (error) {

        console.error(
            "Error cargando productos:",
            error
        );


        if (contenedor) {

            contenedor.innerHTML = `
                <div class="error-productos">
                    No se pudieron cargar los productos.
                </div>
            `;

        }

    }

}


/*
=====================================================
    MOSTRAR PRODUCTOS
=====================================================
*/

function mostrarProductos() {

    const contenedor =
        document.getElementById("productos");


    if (!contenedor) {

        console.error(
            "No existe #productos"
        );

        return;

    }


    contenedor.innerHTML = "";


    /*
        No hay productos
    */

    if (
        !productos ||
        productos.length === 0
    ) {

        contenedor.innerHTML = `
            <div class="sin-productos">
                No hay productos disponibles.
            </div>
        `;

        return;

    }


    /*
        Crear producto
    */

    productos.forEach(producto => {

        const tarjeta =
            crearProducto(producto);

        contenedor.appendChild(
            tarjeta
        );

    });

}


/*
=====================================================
    CREAR TARJETA DE PRODUCTO
=====================================================
*/

function crearProducto(producto) {

    const tarjeta =
        document.createElement("article");


    tarjeta.className =
        "producto";


    /*
    -------------------------------------------------
        IMAGEN
    -------------------------------------------------
    */

    const imagen =
        document.createElement("div");

    imagen.className =
        "producto-imagen";


    /*
        Si el producto tiene imagen
    */

    if (
        producto.image_product
    ) {

        const img =
            document.createElement("img");


        img.src =
            "data:image/jpeg;base64," +
            producto.image_product;


        img.alt =
            producto.name_product;


        imagen.appendChild(
            img
        );

    } else {

        imagen.textContent =
            "Sin imagen";

    }


    /*
    -------------------------------------------------
        INFORMACIÓN
    -------------------------------------------------
    */

    const informacion =
        document.createElement("div");


    informacion.className =
        "producto-informacion";


    /*
        Nombre
    */

    const nombre =
        document.createElement("div");


    nombre.className =
        "producto-nombre";


    nombre.textContent =
        producto.name_product;


    /*
        Categoría
    */

    const categoria =
        document.createElement("div");


    categoria.className =
        "producto-categoria";


    categoria.textContent =
        producto.category_product ||
        "Sin categoría";


    /*
        Precio
    */

    const precio =
        document.createElement("div");


    precio.className =
        "producto-precio";


    precio.textContent =
        formatoMoneda(
            producto.price_product
        );


    /*
        Stock
    */

    const stock =
        document.createElement("div");


    stock.className =
        "producto-stock";


    stock.textContent =
        "Stock: " +
        producto.stock_product;


    informacion.appendChild(
        nombre
    );

    informacion.appendChild(
        categoria
    );

    informacion.appendChild(
        precio
    );

    informacion.appendChild(
        stock
    );


    /*
    -------------------------------------------------
        BOTÓN AGREGAR
    -------------------------------------------------
    */

    const boton =
        document.createElement("button");


    boton.className =
        "btn-agregar";


    boton.textContent =
        "Agregar";


    /*
        Si no hay stock
    */

    if (
        Number(producto.stock_product) <= 0
    ) {

        boton.disabled =
            true;

        boton.textContent =
            "Agotado";

    }


    /*
        Agregar producto al pedido
    */

    boton.addEventListener(
        "click",
        (evento) => {

            evento.stopPropagation();

            agregarProducto(
                producto
            );

        }
    );


    /*
    -------------------------------------------------
        CONSTRUIR TARJETA
    -------------------------------------------------
    */

    tarjeta.appendChild(
        imagen
    );

    tarjeta.appendChild(
        informacion
    );

    tarjeta.appendChild(
        boton
    );


    return tarjeta;

}


/*
=====================================================
    AGREGAR PRODUCTO AL PEDIDO
=====================================================
*/

function agregarProducto(producto) {

    /*
        Buscar si ya existe
    */

    const existente =
        pedido.find(
            item =>
                item.id_product ===
                producto.id_product
        );


    if (existente) {

        /*
            Verificar stock
        */

        if (
            existente.quantity >=
            Number(producto.stock_product)
        ) {

            alert(
                "No hay más productos disponibles."
            );

            return;

        }


        existente.quantity++;

        existente.subtotal =
            existente.quantity *
            Number(producto.price_product);

    } else {

        /*
            Producto nuevo
        */

        pedido.push({

            id_product:
                producto.id_product,

            name_product:
                producto.name_product,

            price_product:
                Number(
                    producto.price_product
                ),

            quantity:
                1,

            subtotal:
                Number(
                    producto.price_product
                )

        });

    }


    console.log(
        "Pedido:",
        pedido
    );


    /*
        Actualizar pantalla
    */

    mostrarPedido();

}


/*
=====================================================
    MOSTRAR PEDIDO
=====================================================
*/

function mostrarPedido() {

    const contenedor =
        document.getElementById(
            "pedido"
        );


    if (!contenedor) {

        return;

    }


    contenedor.innerHTML = "";


    if (
        pedido.length === 0
    ) {

        contenedor.innerHTML = `
            <div class="pedido-vacio">
                No hay productos en el pedido.
            </div>
        `;

        actualizarTotal();

        return;

    }


    pedido.forEach(
        producto => {

            const fila =
                document.createElement(
                    "div"
                );


            fila.className =
                "pedido-producto";


            /*
                Nombre
            */

            const nombre =
                document.createElement(
                    "div"
                );


            nombre.textContent =
                producto.name_product;


            /*
                Cantidad
            */

            const cantidad =
                document.createElement(
                    "div"
                );


            cantidad.className =
                "cantidad";


            cantidad.innerHTML = `
                <button
                    onclick="disminuirProducto(${producto.id_product})">
                    -
                </button>

                <span>
                    ${producto.quantity}
                </span>

                <button
                    onclick="aumentarProducto(${producto.id_product})">
                    +
                </button>
            `;


            /*
                Subtotal
            */

            const subtotal =
                document.createElement(
                    "div"
                );


            subtotal.className =
                "subtotal";


            subtotal.textContent =
                formatoMoneda(
                    producto.subtotal
                );


            /*
                Eliminar
            */

            const eliminar =
                document.createElement(
                    "button"
                );


            eliminar.className =
                "btn-eliminar";


            eliminar.textContent =
                "×";


            eliminar.addEventListener(
                "click",
                () => {

                    eliminarProducto(
                        producto.id_product
                    );

                }
            );


            /*
                Construir fila
            */

            fila.appendChild(
                nombre
            );

            fila.appendChild(
                cantidad
            );

            fila.appendChild(
                subtotal
            );

            fila.appendChild(
                eliminar
            );


            contenedor.appendChild(
                fila
            );

        }
    );


    actualizarTotal();

}


/*
=====================================================
    AUMENTAR CANTIDAD
=====================================================
*/

function aumentarProducto(
    idProducto
) {

    const item =
        pedido.find(
            producto =>
                producto.id_product ===
                idProducto
        );


    if (!item) {

        return;

    }


    /*
        Buscar producto original
    */

    const producto =
        productos.find(
            producto =>
                producto.id_product ===
                idProducto
        );
        
        


    if (!producto) {

        return;

    }


    /*
        Verificar stock
    */

    if (
        item.quantity >=
        Number(
            producto.stock_product
        )
    ) {

        alert(
            "No hay más productos disponibles."
        );

        return;

    }


    item.quantity++;


    item.subtotal =
        item.quantity *
        item.price_product;


    mostrarPedido();

}


/*
=====================================================
    DISMINUIR CANTIDAD
=====================================================
*/

function disminuirProducto(
    idProducto
) {

    const item =
        pedido.find(
            producto =>
                producto.id_product ===
                idProducto
        );


    if (!item) {

        return;

    }


    item.quantity--;


    if (
        item.quantity <= 0
    ) {

        pedido =
            pedido.filter(
                producto =>
                    producto.id_product !==
                    idProducto
            );

    } else {

        item.subtotal =
            item.quantity *
            item.price_product;

    }


    mostrarPedido();

}


/*
=====================================================
    ELIMINAR PRODUCTO
=====================================================
*/

function eliminarProducto(
    idProducto
) {

    pedido =
        pedido.filter(
            producto =>
                producto.id_product !==
                idProducto
        );


    mostrarPedido();

}


/*
=====================================================
    CALCULAR TOTAL
=====================================================
*/

function obtenerTotal() {

    return pedido.reduce(
        (total, producto) => {

            return total +
                Number(
                    producto.subtotal
                );

        },
        0
    );

}


/*
=====================================================
    MOSTRAR TOTAL
=====================================================
*/

function actualizarTotal() {

    const elemento =
        document.getElementById(
            "total"
        );


    if (!elemento) {

        return;

    }


    elemento.textContent =
        formatoMoneda(
            obtenerTotal()
        );

}


/*
=====================================================
    CONFIRMAR PEDIDO
=====================================================
*/

async function confirmarPedido() {

    if (
        !idMesa
    ) {

        alert(
            "No se especificó la mesa."
        );

        return;

    }


    if (
        pedido.length === 0
    ) {

        alert(
            "El pedido está vacío."
        );

        return;

    }


    const usuarioGuardado =
        localStorage.getItem(
            "usuario"
        );


    if (!usuarioGuardado) {

        alert(
            "No hay un usuario conectado."
        );

        window.location.href =
            "login.html";

        return;

    }


    const usuario =
        JSON.parse(
            usuarioGuardado
        );


    /*
        Datos que enviaremos
    */

    const datos = {

        table:
            idMesa,

        user_id:
            usuario.user_id,

        products:
            pedido,

        total:
            obtenerTotal()

    };


    console.log(
        "Enviando pedido:",
        datos
    );


    try {

        const respuesta =
            await fetch(
                "api/create_order.php",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            datos
                        )

                }
            );


        const resultado =
            await respuesta.json();


        if (
            resultado.success
        ) {

            alert(
                "Pedido creado correctamente."
            );


            /*
                Regresar a notebook
            */

            window.location.href =
                "notebook.html";

        } else {

            alert(
                resultado.message ||
                "No se pudo crear el pedido."
            );

        }


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Error al crear el pedido."
        );

    }

}


/*
=====================================================
    CONFIGURAR EVENTOS
=====================================================
*/

function configurarEventos() {

    const boton =
        document.getElementById(
            "confirmarPedido"
        );


    if (
        boton
    ) {

        boton.addEventListener(
            "click",
            confirmarPedido
        );

    }

}


/*
=====================================================
    FORMATO MONEDA
=====================================================
*/

function formatoMoneda(
    valor
) {

    return new Intl.NumberFormat(
        "es-MX",
        {

            style:
                "currency",

            currency:
                "MXN"

        }
    ).format(
        Number(valor)
    );

}


iniciarTakeOnNewOrder();