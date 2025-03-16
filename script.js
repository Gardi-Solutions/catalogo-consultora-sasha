let capturas = [];

function cargarCatalogo(nombreArchivo) {
  const visor = document.getElementById("visorPDF");
  visor.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=./archivos/${nombreArchivo}`;
}

function capturarVista() {
  const producto = prompt("Escribe el nombre o código del producto que deseas agregar a la bolsa:");
  if (!producto) return;
  capturas.push(producto);
  alert("Producto agregado a la bolsa.");
  actualizarContadorBolsa();
}

function mostrarBolsa() {
  const bolsa = document.getElementById("bolsaProductos");
  const contenedor = document.getElementById("contenedorCapturas");
  contenedor.innerHTML = "";

  if (capturas.length === 0) {
    contenedor.innerHTML = "<p>No hay productos en la bolsa.</p>";
  } else {
    capturas.forEach((producto, index) => {
      const div = document.createElement("div");
      div.className = "itemCaptura";

      const texto = document.createElement("p");
      texto.innerText = producto;

      const eliminar = document.createElement("button");
      eliminar.innerText = "Eliminar";
      eliminar.onclick = () => eliminarCaptura(index);

      div.appendChild(texto);
      div.appendChild(eliminar);
      contenedor.appendChild(div);
    });

    const enviarBtn = document.createElement("button");
    enviarBtn.innerText = "Enviar pedido por WhatsApp";
    enviarBtn.onclick = enviarPorWhatsapp;
    contenedor.appendChild(enviarBtn);
  }

  bolsa.style.display = "block";
}

function cerrarBolsa() {
  document.getElementById("bolsaProductos").style.display = "none";
}

function eliminarCaptura(index) {
  capturas.splice(index, 1);
  mostrarBolsa();
  actualizarContadorBolsa();
}

function enviarPorWhatsapp() {
  if (capturas.length === 0) {
    alert("No hay productos para enviar.");
    return;
  }
  let mensaje = "Hola, deseo consultar por estos productos del catálogo:%0A";
  capturas.forEach((item) => {
    mensaje += `◍ ${item}%0A`;
  });
  const url = `https://wa.me/51982790343?text=${mensaje}`;
  window.open(url, "_blank");
}

function actualizarContadorBolsa() {
  const contador = document.getElementById("contadorBolsa");
  if (contador) contador.innerText = ` (${capturas.length})`;
}
