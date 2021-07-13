const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const listaCursos = document.querySelector("#lista-cursos"); 
let articulosCarrito = [];

cargarEventlistener();
function cargarEventlistener () {
    // cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);
    // elimina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);
    // vaciar carrito
    vaciarCarrito.addEventListener("click", () => {
        articulosCarrito = [];
        limpiarHTML(); // eliminamos todo el html
    })
}

// Funciones

function agregarCurso (e) {
    e.preventDefault(); //esto para que no vaya al vinculo #
    if (e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
}
}

// elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        articulosCarrito.forEach(curso => {
            if (curso.id === cursoId) {
                if (curso.cantidad > 1) {
                    curso.cantidad--
                }; carritoHTML();
            }
            //elimina del arreglo articulosCarrito por el data-id
            else {articulosCarrito = articulosCarrito.filter ( curso => curso.id !== cursoId);
            carritoHTML();}
        })
        }        
}

// lee el contenido del html al que le dimos click y extrae info del curso

function leerDatosCurso (curso) {

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

    //revisa si un eleemnto ya existe enl carrito
    const existe = articulosCarrito.some ( curso => curso.id === infoCurso.id);
    if(existe) {
        // actualizamos la cantidad 
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // retorna objeto actualizado
            } else 
            { return curso; // retorna objetos que non son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } 
    else {
        // agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

}
console.log(articulosCarrito);
carritoHTML();
    }


// muestra el carrit de compras en el html
function carritoHTML () {

    // limpirar el html
    limpiarHTML();

    // recorre carrito y general el html
    articulosCarrito.forEach( (curso) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td> ${curso.precio} </td>
            <td> ${curso.titulo} </td>
            <td> ${curso.cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a> </td>
                    `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    } )
}

// elimina los cursos del tbody

function limpiarHTML () {
    //forma lenta
    // contenedorCarrito.innerHTML = ""

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild )
    }
}