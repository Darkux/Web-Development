async function login() {

    const user_id = document.getElementById("user_id").value;
    const password = document.getElementById("password").value;
    const response = await fetch("API/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: user_id,
            password: password
        })
    });

    const data = await response.json();
    if (data.success) {

        console.log("Usuario válido:");
        console.log(data);

        // Guardar usuario
        localStorage.setItem(
            "usuario",
            JSON.stringify(data)
        );

        // Ir al dashboard
        window.location.href = "dashboard.html";

    } else {

        console.log(data.message);

    }
}

