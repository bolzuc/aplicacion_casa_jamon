// Declaración de variables, constantes y arrays
const menu = [
    { id: 1, nombre: 'Jamón Ibérico', precio: 15000 },
    { id: 2, nombre: 'Queso Manchego', precio: 12000 },
    { id: 3, nombre: 'Chorizo Español', precio: 8000 },
    { id: 4, nombre: 'Salchichón de Vic', precio: 10000 },
    { id: 5, nombre: 'Paté de Foie', precio: 18000 },
    { id: 6, nombre: 'Aceitunas Españolas', precio: 5000 },
    { id: 7, nombre: 'Turrón de Alicante', precio: 7000 }
];

// Recuperar el pedido desde localStorage, agregando una validación para la cantidad
let pedido = JSON.parse(localStorage.getItem('pedido')) || [];
pedido = pedido.map(item => ({ ...item, cantidad: item.cantidad || 1 })); // Asegurarse de que todos tengan cantidad

// Función para mostrar el menú dinámicamente en el HTML
function mostrarMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';

    menu.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('menu-item');
        div.innerHTML = `
            <p>${item.nombre} - $${item.precio}</p>
            <button onclick="agregarAlPedido(${item.id})">Agregar al pedido</button>
        `;
        menuContainer.appendChild(div);
    });
}

// Función para agregar un ítem al pedido
function agregarAlPedido(id) {
    const item = menu.find(producto => producto.id === id);
    const itemEnPedido = pedido.find(producto => producto.id === id);

    if (itemEnPedido) {
        // Si el producto ya está en el pedido, incrementar la cantidad
        itemEnPedido.cantidad += 1;
    } else {
        // Si no está en el pedido, agregarlo con cantidad 1
        pedido.push({ ...item, cantidad: 1 });
    }

    localStorage.setItem('pedido', JSON.stringify(pedido));
    alert(`${item.nombre} ha sido agregado a tu pedido.`);
    mostrarPedido();
}

// Función para eliminar un ítem del pedido
function eliminarDelPedido(id) {
    const itemEnPedido = pedido.find(producto => producto.id === id);

    if (itemEnPedido) {
        if (itemEnPedido.cantidad > 1) {
            itemEnPedido.cantidad -= 1;
        } else {
            pedido = pedido.filter(producto => producto.id !== id);
        }
        localStorage.setItem('pedido', JSON.stringify(pedido));
        mostrarPedido();
    }
}

// Función para mostrar el pedido actual en el HTML
function mostrarPedido() {
    const pedidoContainer = document.getElementById('pedido-container');
    
    if (pedido.length === 0) {
        pedidoContainer.innerHTML = '<p>No has agregado ningún producto aún.</p>';
    } else {
        let detallePedido = '<ul>';
        let total = 0;
        pedido.forEach(item => {
            detallePedido += `<li>${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
                <button onclick="eliminarDelPedido(${item.id})">Eliminar</button></li>`;
            total += item.precio * item.cantidad;
        });
        detallePedido += `</ul><p>Total a pagar: $${total}</p>`;
        pedidoContainer.innerHTML = detallePedido;
    }
}

// Evento para finalizar pedido
document.getElementById('finalizar-pedido').addEventListener('click', () => {
    if (pedido.length > 0) {
        alert("Pedido finalizado con éxito.");
        pedido = [];
        localStorage.removeItem('pedido');
        mostrarPedido();
    } else {
        alert("No tienes productos en tu pedido.");
    }
});

// Inicialización del menú y pedido
document.addEventListener('DOMContentLoaded', () => {
    mostrarMenu();
    mostrarPedido();
});