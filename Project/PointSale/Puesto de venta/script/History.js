/*
=====================================================
    History.js
    HISTORIAL DE VENTAS
=====================================================
*/

let ventas = [];


/*
=====================================================
    INICIO
=====================================================
*/

function iniciarHistory() {

    console.log("History iniciado");

    cargarHistorial();
    configurarEventos();
}


/*
=====================================================
    CARGAR HISTORIAL
=====================================================
*/

async function cargarHistorial() {

    const contenedor = document.getElementById("historialVentas");

    if (!contenedor) {
        console.error("No existe #historialVentas");
        return;
    }

    try {

        const respuesta = await fetch("api/history.php");

        if (!respuesta.ok) {
            throw new Error("Error HTTP: " + respuesta.status);
        }

        ventas = await respuesta.json();

        console.log("Historial:", ventas);

        mostrarHistorial();

    } catch (error) {

        console.error("Error cargando historial:", error);

        contenedor.innerHTML = `
            <tr>
                <td colspan="6" class="historial-vacio">
                    No se pudo cargar el historial.
                </td>
            </tr>
        `;
    }
}


/*
=====================================================
    MOSTRAR HISTORIAL
=====================================================
*/

function mostrarHistorial() {

    const contenedor = document.getElementById("historialVentas");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    const ventasFiltradas = obtenerVentasFiltradas();

    if (ventasFiltradas.length === 0) {

        contenedor.innerHTML = `
            <tr>
                <td colspan="6" class="historial-vacio">
                    No hay ventas para mostrar.
                </td>
            </tr>
        `;

        return;
    }


    /*
    =============================================
        AGRUPAR POR FECHA
    =============================================
    */

    const grupos = {};

    ventasFiltradas.forEach(venta => {

        const fecha = obtenerFecha(venta.date_close);

        if (!grupos[fecha]) {
            grupos[fecha] = [];
        }

        grupos[fecha].push(venta);

    });


    /*
    =============================================
        MOSTRAR LOS DÍAS
    =============================================
    */

    Object.keys(grupos)
        .sort((a, b) => b.localeCompare(a))
        .forEach(fecha => {

            // Separador del día
            const separador = document.createElement("tr");

            separador.className = "dia-separador";

            separador.innerHTML = `
                <td colspan="6">
                    ${formatoFecha(fecha)}
                </td>
            `;

            contenedor.appendChild(separador);


            // Ventas del día
            grupos[fecha].forEach(venta => {

                const fila = crearFilaVenta(venta);

                contenedor.appendChild(fila);

            });

        });
}


/*
=====================================================
    CREAR FILA
=====================================================
*/

function crearFilaVenta(venta) {

    const fila = document.createElement("tr");

    const fecha = obtenerFecha(venta.date_close);
    const hora = obtenerHora(venta.date_close);

    fila.innerHTML = `
        <td>#${venta.history_id}</td>

        <td>
            ${formatoFechaCorta(fecha)}
        </td>

        <td>
            ${hora}
        </td>

        <td>
            ${venta.table_}
        </td>

        <td>
            ${venta.waiter_}
        </td>

        <td>
            ${formatoMoneda(venta.total_)}
        </td>
    `;

    return fila;
}


/*
=====================================================
    FILTROS
=====================================================
*/

function obtenerVentasFiltradas() {

    const inputFecha = document.getElementById("fecha");
    const inputBusqueda = document.getElementById("buscarVenta");

    const fechaSeleccionada = inputFecha
        ? inputFecha.value
        : "";

    const busqueda = inputBusqueda
        ? inputBusqueda.value.trim().toLowerCase()
        : "";


    return ventas.filter(venta => {

        /*
        =========================================
            FILTRO POR FECHA
        =========================================
        */

        if (fechaSeleccionada) {

            const fechaVenta = obtenerFecha(venta.date_close);

            if (fechaVenta !== fechaSeleccionada) {
                return false;
            }
        }


        /*
        =========================================
            BÚSQUEDA POR ID
        =========================================
        */

        if (busqueda) {

            const id = String(venta.history_id).toLowerCase();

            if (!id.includes(busqueda)) {
                return false;
            }
        }


        return true;

    });
}


/*
=====================================================
    EVENTOS
=====================================================
*/

function configurarEventos() {

    const fecha = document.getElementById("fecha");
    const buscar = document.getElementById("buscarVenta");
    const limpiar = document.getElementById("btnLimpiarFiltros");


    if (fecha) {

        fecha.addEventListener("change", () => {

            mostrarHistorial();

        });

    }


    if (buscar) {

        buscar.addEventListener("input", () => {

            mostrarHistorial();

        });

    }


    if (limpiar) {

        limpiar.addEventListener("click", () => {

            if (fecha) {
                fecha.value = "";
            }

            if (buscar) {
                buscar.value = "";
            }

            mostrarHistorial();

        });

    }

}


/*
=====================================================
    FECHA
=====================================================
*/

function obtenerFecha(fechaHora) {

    if (!fechaHora) {
        return "";
    }

    return String(fechaHora).substring(0, 10);
}


/*
=====================================================
    HORA
=====================================================
*/

function obtenerHora(fechaHora) {

    if (!fechaHora) {
        return "--:--";
    }

    return String(fechaHora).substring(11, 16);
}


/*
=====================================================
    FECHA COMPLETA
=====================================================
*/

function formatoFecha(fecha) {

    if (!fecha) {
        return "Fecha desconocida";
    }

    const partes = fecha.split("-");

    if (partes.length !== 3) {
        return fecha;
    }

    const fechaObj = new Date(
        Number(partes[0]),
        Number(partes[1]) - 1,
        Number(partes[2])
    );

    return fechaObj.toLocaleDateString("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}


/*
=====================================================
    FECHA CORTA
=====================================================
*/

function formatoFechaCorta(fecha) {

    if (!fecha) {
        return "";
    }

    const partes = fecha.split("-");

    if (partes.length !== 3) {
        return fecha;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


/*
=====================================================
    MONEDA
=====================================================
*/

function formatoMoneda(valor) {

    return new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(Number(valor));

}


/*
=====================================================
    INICIAR
=====================================================
*/

iniciarHistory();