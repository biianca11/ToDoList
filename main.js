// Selección de elementos HTML necesarios para manipularlos en el código
const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')

// Clases utilizadas para alternar estados visuales de las tareas
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let LIST// Array que almacenará las tareas
let id // Identificador único para cada tarea

// Mostrar la fecha actual formateada
const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'})


// Función para agregar una nueva tarea a la lista
function agregarTarea( tarea,id,realizado,eliminado) {
     // Si la tarea está marcada como eliminada, no se procesa
    if(eliminado) {return} 
    // Determinar el estado visual de la tarea según si está realizada o no
    const REALIZADO = realizado ? check : uncheck

    const LINE = realizado ? lineThrough : '' 

    // Crear el HTML dinámico para una tarea y añadirlo a la lista
    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}


// Función para alternar el estado de "realizada" de una tarea
function tareaRealizada(element) {
     // Cambiar las clases para mostrar visualmente si está realizada
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
     // Actualizar el estado de la tarea en la lista
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true 
}
// Función para eliminar una tarea de la lista
function tareaEliminada(element){
     // Eliminar el elemento visualmente
    element.parentNode.parentNode.removeChild(element.parentNode)
    // Marcar la tarea como eliminada en la lista
    LIST[element.id].eliminado = true
    console.log(LIST)
}

// Evento para añadir una nueva tarea al hacer clic en el botón
botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST)) // Guardar tareas en LocalStorage
        id++
        input.value = '' // Limpiar el campo de entrada
    }

})
// Evento para añadir una nueva tarea al presionar Enter
document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
     
        input.value = '' // Limpiar el campo de entrada
        id++
        console.log(LIST)
        }
    }
    
})

// Evento para manejar acciones sobre las tareas (realizar o eliminar)
lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    // Guardar cambios en LocalStorage
    localStorage.setItem('TODO',JSON.stringify(LIST))
})
// Cargar tareas guardadas en LocalStorage al iniciar la app
let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}
// Función para cargar tareas desde un array y mostrarlas en la lista
function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}