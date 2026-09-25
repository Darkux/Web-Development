const contenido = document.getElementById("contenido");


async function upload_innerHTML(pagina) {

    // Asegurarnos de que recibimos un string
    if (typeof pagina !== "string" || pagina.trim() === "") {

        console.error("ERROR: pagina debe ser un string válido");

        return;
    }

    // Limpiamos espacios
    pagina = pagina.trim();

    // Construimos las rutas
    const web = `${pagina}.html`;
    const script = `${pagina}.js`;

    // Verificar que exista el contenedor
    if (!contenido) {

        console.error(
            "ERROR: No existe #contenido en dashboard.html"
        );

        return;
    }

    try {

        // ==========================================
        // CARGAR HTML
        // ==========================================

        const respuesta = await fetch(web);

        // Prevención de 404 y otros errores HTTP
        if (!respuesta.ok) {

            if (respuesta.status === 404) {

                throw new Error(
                    `La página "${web}" no existe (404)`
                );

            }

            throw new Error(
                `No se pudo cargar "${web}". HTTP ${respuesta.status}`
            );
        }

        const html = await respuesta.text();

        contenido.innerHTML = html;


        // ==========================================
        // CARGAR JAVASCRIPT
        // ==========================================

        const scriptElement = document.createElement("script");

        scriptElement.src = `script/${script}`;

        scriptElement.onload = () => {

            console.log(
                `${script} cargado correctamente`
            );

        };

        scriptElement.onerror = () => {

            console.error(
                `No se pudo cargar ${script}`
            );

        };

        document.body.appendChild(scriptElement);


    } catch (error) {

        console.error(error);

        contenido.innerHTML = `

            <div class="error-carga">

                <h2>
                    Error al cargar la página
                </h2>

                <p>
                    ${error.message}
                </p>

            </div>

        `;
    }
}

// esta iniciada una sesion
function recibirDatos() {
    const datosJSON = localStorage.getItem("usuario");

    if (!datosJSON) {
        window.location.href = "login.html";
        console.log("datos no enviados");
        return null;
    }

    return JSON.parse(datosJSON);
}


// Cargar cuentas al entrar al dashboard
recibirDatos();
//upload_innerHTML("notebook"); este funciona 
//upload_innerHTML("TakeOnNewOrder");//  este funciona 
upload_innerHTML("History");//
