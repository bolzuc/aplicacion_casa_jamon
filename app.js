// Declaración de variables, constantes y arrays
const menu = [
    { id: 1, nombre: 'Jamón Ibérico', precio: 15000 },
    { id: 2, nombre: 'Queso Manchego', precio: 12000 },
    { id: 3, nombre: 'Chorizo Español', precio: 8000 }
];

let pedido = [];

// Función para mostrar el menú
function mostrarMenu() {
    console.log("Menú de La Casa del Jamón:");
    menu.forEach(item => {
        console.log(`ID: ${item.id} - ${item.nombre} - $${item.precio}`);
    });
}

// Función para agregar un ítem al pedido
function agregarAlPedido() {
    const itemId = prompt("Ingrese el ID del producto que desea agregar al pedido (1 para Jamón Ibérico, 2 para Queso Manchego, 3 para Chorizo Español):");
    
    if (itemId === null) {
        alert("Debe ingresar un ID para continuar.");
        return; // Salir de la función si no se ingresa nada
    }

    const item = menu.find(producto => producto.id === parseInt(itemId));

    if (item) {
        pedido.push(item);
        alert(`${item.nombre} ha sido agregado a su pedido.`);
    } else {
        alert("Producto no encontrado.");
    }
}

// Función para mostrar el total del pedido
function mostrarTotal() {
    if (pedido.length === 0) {
        alert("No ha agregado ningún producto al pedido.");
        return;
    }

    let total = pedido.reduce((acc, item) => acc + item.precio, 0);
    let detallePedido = "Su pedido:\n";
    pedido.forEach(item => {
        detallePedido += `${item.nombre} - $${item.precio}\n`;
    });

    alert(detallePedido + `Total a pagar: $${total}`);
}

// Función principal para gestionar el pedido
function gestionarPedido() {
    mostrarMenu(); // Mostrar el menú antes de comenzar a agregar productos
    let continuar = true;

    while (continuar) {
        agregarAlPedido();
        continuar = confirm("¿Desea agregar otro producto al pedido?");
    }

    mostrarTotal();
}

// Llamada a la función principal para iniciar el simulador
gestionarPedido();