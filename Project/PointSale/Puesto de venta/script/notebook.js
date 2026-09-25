    /*
    =====================================================
    CARGAR CUENTAS
    =====================================================
    */

    async function cargarCuentas() {

        const contenedor =
            document.getElementById("cuentas");

        try {

            const respuesta =
                await fetch("api/notebook.php");

            if (!respuesta.ok) {
                throw new Error(
                    "Error HTTP: " + respuesta.status
                );
            }

            const ventas =
                await respuesta.json();

            contenedor.innerHTML = "";

            if (!ventas || ventas.length === 0) {

                contenedor.innerHTML = `
                    <div class="sin-cuentas">
                        No hay cuentas abiertas.
                    </div>
                `;

                return;
            }


            /*
            =================================================
            CREAR UNA NOTA POR CADA VENTA
            =================================================
            */

            ventas.forEach(venta => {

                const nota =
                    crearNota(venta);

                contenedor.appendChild(nota);

            });


        } catch (error) {

            console.error(error);

            contenedor.innerHTML = `
                <div class="error-cuentas">
                    No se pudieron cargar las cuentas.
                </div>
            `;

        }

    }


    /*
    =====================================================
    CREAR NOTA
    =====================================================
    */

    function crearNota(venta) {

        const nota =
            document.createElement("article");

        nota.className = "nota";


        /*
        -------------------------------------------------
        ANILLOS
        -------------------------------------------------
        */

        const anillos = document.createElement("div");

        anillos.className = "anillos";

        for (let i = 0; i < 4; i++) {

            const anillo =
                document.createElement("div");

            anillo.className = "anillo";

            anillos.appendChild(anillo);

        }


        /*
        -------------------------------------------------
        HEADER
        -------------------------------------------------
        */

        const header =
            document.createElement("div");

        header.className = "nota-header";


        const identificador =
            document.createElement("div");

        identificador.className =
            "identificador";

        identificador.textContent =
            "MESA " + venta.table;


        const tipo =
            document.createElement("div");

        tipo.className = "tipo";

        tipo.textContent =
            venta.state;


        header.appendChild(identificador);
        header.appendChild(tipo);


        /*
        -------------------------------------------------
        PRODUCTOS
        -------------------------------------------------
        */

        const productos =
            document.createElement("div");

        productos.className =
            "productos";


        venta.products.forEach(producto => {

            const fila =
                document.createElement("div");

            fila.className =
                "producto";


            const nombre =
                document.createElement("div");

            nombre.className =
                "producto-nombre";

            nombre.textContent =
                producto.quantity +
                "x " +
                producto.name;


            const precio =
                document.createElement("div");

            precio.className =
                "producto-precio";

            precio.textContent =
                formatoMoneda(producto.subtotal);


            fila.appendChild(nombre);
            fila.appendChild(precio);

            productos.appendChild(fila);

        });


        /*
        -------------------------------------------------
        ESTADO
        -------------------------------------------------
        */

        const estado =
            document.createElement("div");

        estado.className =
            "estado";


        const linea1 =
            document.createElement("div");

        linea1.className =
            "estado-linea";


        const circulo1 =
            document.createElement("div");

        circulo1.className =
            "estado-circulo completo";


        const linea2 =
            document.createElement("div");

        linea2.className =
            "estado-linea";


        const circulo2 =
            document.createElement("div");

        circulo2.className =
            "estado-circulo actual";


        const linea3 =
            document.createElement("div");

        linea3.className =
            "estado-linea";


        estado.appendChild(linea1);
        estado.appendChild(circulo1);
        estado.appendChild(linea2);
        estado.appendChild(circulo2);
        estado.appendChild(linea3);


        /*
        -------------------------------------------------
        TOTAL
        -------------------------------------------------
        */

        const total =
            document.createElement("div");

        total.className =
            "total";


        const totalTexto =
            document.createElement("div");

        totalTexto.className =
            "total-texto";

        totalTexto.textContent =
            "Total";


        const totalPrecio =
            document.createElement("div");

        totalPrecio.className =
            "total-precio";

        totalPrecio.textContent =
            formatoMoneda(venta.total);


        total.appendChild(totalTexto);
        total.appendChild(totalPrecio);


        /*
        -------------------------------------------------
        ID
        -------------------------------------------------
        */

        const pedidoId =
            document.createElement("div");

        pedidoId.className =
            "pedido-id";

        pedidoId.textContent =
            "#" + venta.id;


        /*
        -------------------------------------------------
        CONSTRUIR NOTA
        -------------------------------------------------
        */

        nota.appendChild(anillos);

        nota.appendChild(header);

        nota.appendChild(productos);

        nota.appendChild(estado);

        nota.appendChild(total);

        nota.appendChild(pedidoId);


        /*
        -------------------------------------------------
        CLICK EN LA NOTA
        -------------------------------------------------
        */

        nota.addEventListener("click", () => {

            abrirPedido(venta.id);

        });


        return nota;

    }


    /*
    =====================================================
    FORMATO MONEDA
    =====================================================
    */

    function formatoMoneda(valor) {

        return new Intl.NumberFormat(
            "es-MX",
            {
                style: "currency",
                currency: "MXN"
            }
        ).format(valor);

    }


    /*
    =====================================================
    ABRIR PEDIDO
    =====================================================
    */

    function abrirPedido(idVenta) {

        console.log(
            "Pedido seleccionado:",
            idVenta
        );

        /*
            Aquí posteriormente podemos abrir:

            pedido.html?id=1

            o un panel lateral para modificar
            la cuenta.
        */

    }


    /*
    =====================================================
    ACTUALIZACIÓN AUTOMÁTICA
    =====================================================
    */

    cargarCuentas();

    /*
        Actualiza las cuentas cada 5 segundos.
        Esto permite que cuando un mesero agregue
        un producto, la notebook se actualice.
    */

    setInterval(
        cargarCuentas,
        5000
    );
