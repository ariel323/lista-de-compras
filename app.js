const listaDeCompras = JSON.parse(localStorage.getItem("listaDeCompras")) || {};

// Función para agregar un alimento a la lista
function agregarAlimento() {
  let alimento = document.getElementById("alimento").value;
  let categoria = document.getElementById("categoria").value.toLowerCase();

  if (!listaDeCompras[categoria]) {
    listaDeCompras[categoria] = [];
  }

  listaDeCompras[categoria].push(alimento);
  guardarLista();
  mostrarLista();
}

// Función para mostrar la lista de compras organizada
function mostrarLista() {
  const listaElement = document.getElementById("lista");
  listaElement.innerHTML = "";

  for (let categoria in listaDeCompras) {
    const categoriaElement = document.createElement("h3");
    categoriaElement.innerText = categoria.toUpperCase();
    listaElement.appendChild(categoriaElement);

    const alimentosElement = document.createElement("ul");
    listaDeCompras[categoria].forEach((alimento) => {
      const alimentoElement = document.createElement("li");
      alimentoElement.innerText = alimento;
      alimentosElement.appendChild(alimentoElement);
    });
    listaElement.appendChild(alimentosElement);
  }
}

// Función para eliminar un alimento de la lista
function eliminarAlimento() {
  let alimento = document.getElementById("alimento").value;
  let categoria = document.getElementById("categoria").value.toLowerCase();

  if (listaDeCompras[categoria]) {
    let indice = listaDeCompras[categoria].indexOf(alimento);
    if (indice !== -1) {
      listaDeCompras[categoria].splice(indice, 1);
      if (listaDeCompras[categoria].length === 0) {
        delete listaDeCompras[categoria];
      }
      guardarLista();
      mostrarLista();
    } else {
      alert("El alimento no se encuentra en la categoría especificada.");
    }
  } else {
    alert("La categoría especificada no existe.");
  }
}

// Función para guardar la lista en localStorage
function guardarLista() {
  localStorage.setItem("listaDeCompras", JSON.stringify(listaDeCompras));
}

// Evento para el botón de agregar
document
  .getElementById("agregarBtn")
  .addEventListener("click", agregarAlimento);

// Evento para el botón de eliminar
document
  .getElementById("eliminarBtn")
  .addEventListener("click", eliminarAlimento);

// Mostrar la lista al cargar la página
mostrarLista();
