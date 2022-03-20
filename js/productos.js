let listaProductos = [
    {id: 0, nombre: 'NVIDIA RTX 3060', cat: 'CPU', precio: 120000, img:'assets/img/1660super.png', stock: 'si', cantidad: 1},
    {id: 1, nombre: 'NVIDIA RTX 3070', cat: 'CPU', precio: 150000, img:'assets/img/1660super.png', stock: 'no', cantidad: 1},
    {id: 2, nombre: 'NVIDIA RTX 3080', cat: 'CPU', precio: 200000, img:'assets/img/1660super.png', stock: 'si', cantidad: 1},
    {id: 3, nombre: 'NVIDIA RTX 3090', cat: 'GPU', precio: 250000, img:'assets/img/1660super.png', stock: 'no', cantidad: 1},
    {id: 4, nombre: 'RADEON RX 6700 XT', cat: 'GPU', precio: 170000, img:'assets/img/1660super.png', stock: 'si', cantidad: 1},
    {id: 5, nombre: 'RADEON RX 6800 XT', cat: 'GPU', precio: 220000, img:'assets/img/1660super.png', stock: 'no', cantidad: 1},
    {id: 6, nombre: 'RADEON RX 6900 XT', cat: 'MEMORIA', precio: 270000, img:'assets/img/1660super.png', stock: 'si', cantidad: 1},
    {id: 7, nombre: 'NVIDIA GTX 1660', cat: 'GABINETE', precio: 80000, img:'assets/img/1660super.png', stock: 'si', cantidad: 1},
    {id: 8, nombre: 'NVIDIA GTX 1660 SUPER', cat: 'MEMORIA', precio: 120000, img: 'assets/img/1660super.png', stock: 'si', cantidad: 1},
    {id: 9, nombre: 'NVIDIA GTX 1660 TI', cat: 'MEMORIA', precio: 125000, img:'assets/img/1660super.png', stock: 'si', cantidad: 1}
]

//#################################################################################//
//###Ordeno el array para que los productos sin stock figuren al final del array###//
//#################################################################################//
listaProductos.sort((a) => {
    if (a.stock == 'si') {
        return -1
    } else {
        return 1
    }
})



