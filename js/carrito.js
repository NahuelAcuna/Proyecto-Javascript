//########################//
//###Variables globales###//
//########################//
let carrito = []
let productos = []

let contenedorCarrito = document.getElementById('contenedorCarrito')
let contenedorProductos = document.getElementById('contenedorProductos')
let categorias = document.getElementById('categorias')

let totalCarrito = document.getElementById('precioTotal')
let totalProductos = document.getElementById('productosTotal')

let searchBar = document.getElementById('searchBar')
let filtroPrecio = document.getElementById('filtroPrecio')

//cargarProductos(listaProductos)
Categorias()

//###################################################//
//###Carga de productos en HTML desde productos.js###//
//###################################################//
fetch('js/productos.json')
    .then(response => response.json())
    .then(data => {
        data.sort((a) => {
            if (a.stock == 'si') {
                return -1
            } else {
                return 1
            }
        })
        cargarProductos(data)
        data.forEach(el => productos.push(el))
        recuperar()
    })
    .catch(error => console.log(error))
    

function cargarProductos(array) {
    contenedorProductos.innerHTML = '';
    for (const producto of array) {
        let div = document.createElement('div');
        let stock = producto.stock;
        div.className = 'producto';
        if (stock == 'si') {
            div.innerHTML = `<img src="${producto.img}"></img>
                            <h5>${producto.nombre}</h5>
                            <div>
                                <p>Precio: $${producto.precio}</p>
                                <a id="agregarCarrito${producto.id}"><i class="fa-solid fa-xl fa-plus"></i></a>
                            </div>
                            <span class="disponible">En stock</span>`
        } else {
            div.innerHTML = `<img src="${producto.img}"></img>
                            <h5>${producto.nombre}</h5>
                            <p>Precio: $${producto.precio}</p>
                            <a id="agregarCarrito${producto.id}" class="invisible"></a>
                            <span class="no-disponible">Sin stock</span>`
        }
        contenedorProductos.appendChild(div);
        let agregarBtn = document.getElementById(`agregarCarrito${producto.id}`)
        agregarBtn.addEventListener('click', () => {
            agregarCarrito(producto.id)
        })
    }
    filtradoPrecio(array)
}

//##################################//
//###Agregar productos al carrito###//
//##################################//
function agregarCarrito (id) {
    let productoRepetido = carrito.find(el => el.id == id)
    if (productoRepetido) {
        productoRepetido.cantidad = productoRepetido.cantidad + 1
        document.getElementById(`cantidad${productoRepetido.id}`).innerHTML = `<p id="cantidad${productoRepetido.id}">${productoRepetido.cantidad}</p>`
        actualizarCarrito()
        Toastify({
            text: `${productoRepetido.nombre} agregado al carrito`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #8036c5, #b028da)",
                fontFamily: "'Barlow', sans-serif"
              }
        }).showToast();
    }
    else {
        let agregarProd = productos.find(el => el.id == id)
        carrito.push(agregarProd)
        actualizarCarrito()
        let div = document.createElement('div')
        div.className = 'carritoProd'
        div.innerHTML = `<p>${agregarProd.nombre}</p>
                        <p>$${agregarProd.precio}</p>
                        <p id="cantidad${agregarProd.id}">${agregarProd.cantidad}</p>
                        <a class ="del" id="quitarCarrito${agregarProd.id}"><i class="fa-solid fa-minus"></i></a>`
        contenedorCarrito.appendChild(div)

        let eliminarBtn = document.getElementById(`quitarCarrito${agregarProd.id}`)
        eliminarBtn.addEventListener('click', () => {
            eliminarBtn.parentElement.remove()
            carrito = carrito.filter(el => el.id != agregarProd.id)
            actualizarCarrito()
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
        Toastify({
            text: `${agregarProd.nombre} agregado al carrito`,
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #8036c5, #b028da)",
                fontFamily: "'Barlow', sans-serif"
              }
        }).showToast();
    }        
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

//############################################//
//###Actualizar el precio total del carrito###//
//############################################//
function actualizarCarrito () {
    totalProductos.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0)
    totalCarrito.innerText = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    //Muestra el contador cuando tiene 1 o más productos.
    carritoModal()
    //parseInt(totalProductos.textContent) >= 1 ? totalProductos.style.display = 'flex' : totalProductos.style.display = 'none'
}

//##############################################################//
//###Recuperar el array de los productos agregados al carrito###//
//###################Uso de localStorage########################//
//##############################################################//
function recuperar () {
    let recuperarCarrito = JSON.parse(localStorage.getItem('carrito'))
    if(recuperarCarrito) {
        recuperarCarrito.forEach(el => {
            agregarCarrito(el.id)
        })
    }
}
 

//######################//
//###Filtro de precio###//
//######################//
function filtradoPrecio (array) {
    filtroPrecio.addEventListener('change', () => {
        //cuando filtran por precio quita de la lista los que estan sin stock.
        let filtroStock = array.filter(el => el.stock == 'si')
        if (filtroPrecio.value == "mayor") {
            filtroStock.sort((a, b) => {
                if (a.precio > b.precio) {
                    return 1
                }
                else {
                    return -1
                }
            })
            cargarProductos(filtroStock)
        } else {
            filtroStock.sort((a, b) => {
                if (a.precio < b.precio) {
                    return 1
                }
                else {
                    return -1
                }
            })
            cargarProductos(filtroStock)
        }
    })
}

//###########################//
//###Buscador de productos###//
//###########################//
searchBar.addEventListener('input', () => {
    if (searchBar.value == "") {
        cargarProductos(productos)
    }else{
        cargarProductos(productos.filter(el => el.nombre.toLowerCase().includes(searchBar.value.toLowerCase())))
    }
})

//###########################//
//###Filtro de categoría#####//
//###########################//
//recorre el array filtrando las categorias y devolviendolas sin duplicados,  
//con eso se genera una lista con cada categoría que filtran los productos según la opción.
function Categorias() {
    const filtradoCategoria = listaProductos.reduce((acc,item)=>{
        if(!acc.includes(item.cat)){
            acc.push(item.cat);
        }
        return acc;
    },[])
    categorias.innerHTML = ''
    let li = document.createElement('li');
    li.className = 'categoria important';
    li.innerHTML = `<a href="javascript:cargarProductos(listaProductos)">Todos los productos</a>`
    categorias.appendChild(li)
    for (const producto of filtradoCategoria) {
        let li = document.createElement('li');
        li.className = 'categoria';
        li.innerHTML = `<a id="categoria-${producto}"href="javascript:Categorias()">${producto}</a>`
        categorias.appendChild(li)
        let cargarCategoria = document.getElementById(`categoria-${producto}`)
        cargarCategoria.addEventListener('click', () => {
            cargarCategoria = cargarCategoria.textContent
            let contenedorCat = []
            contenedorCat = listaProductos.filter(el => el.cat == cargarCategoria)
            cargarProductos(contenedorCat)
            filtradoPrecio(contenedorCat)
        })
    }
}

//###############################################//
//###Cambios visuales en el modal de carrito#####//
//###############################################//
function carritoModal () {
    let finalizarCompra = document.getElementById('finalizar')
    let sinProductos = document.getElementById('sinProductos')
    if (parseInt(totalProductos.textContent) >= 1) {
        totalProductos.style.display = 'flex'
        finalizarCompra.disabled = false
        sinProductos.style.display = 'none'
    }
    else {
        totalProductos.style.display = 'none'
        finalizarCompra.disabled = true
        sinProductos.style.display = 'block'
    }
}

//##################################//
//###Abrir y cerrar ventana modal###//
//##################################//
function modal () {
    let modal = document.getElementById('modal')
    modal.style.opacity="1"
    modal.style.visibility="visible"
}
function closeModal () {
    let modal = document.getElementById('modal')
    modal.style.opacity="0"
    modal.style.visibility="hidden"
}

