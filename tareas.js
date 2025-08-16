
const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const texto_input = document.querySelector('#texto')
const agregar = document.querySelector('#agregar')
const check ='fa-check-circle'
const uncheck = 'fa-circle'
const subrayado = 'subrayado'
let id 
let store 
// console.log(texto_input)


// Función de la fecha

const date = new Date()
fecha.innerHTML=date.toLocaleDateString('es-CL', {weekday:'long', month:'short', day:'numeric'})



// Función de agregar objetivo o tarea

const agregar_tarea = (tarea, id, realizado, eliminado) => {

    if (eliminado) {
        return
    }

    let hechoClase;   // clase para el ícono
    let lineaClase;   // clase para el texto

    if (realizado) {
        hechoClase = check;     // "fa-check-circle"
        lineaClase = subrayado; // "subrayado"
    } else {
        hechoClase = uncheck;   // "fa-circle"
        lineaClase = "";        // sin clase
    }
   


    const elemento = `<li id="elemento">
                    <i class="far ${hechoClase}" data="hecho" id="${id}"></i>
                    <p class="text ${lineaClase}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                </li>`

    lista.insertAdjacentHTML("beforeend", elemento)

}


agregar.addEventListener('click', () => {

    // console.log(agregar)

    const tarea = texto_input.value.trim() //trim elimina los espacios al inicio y al final de la cadena de strings
    if (tarea) {
        agregar_tarea(tarea, id, false, false)
        store.push({  //empujar o meter elementos dentro de un array
            nombre:tarea,
            id:id,
            hecho:false,
            eliminado:false

        })
        localStorage.setItem('TODO',JSON.stringify(store))
        texto_input.value = "" //Limpia el input de forma automática
        alert("Tarea agregada con éxito")
        id++
        


    } else {

        agregar.value = ''
        alert("Debe insertar texto")

    }


})


//Función agregar tarea con evento keyup con la tecla Enter
document.addEventListener('keyup', function (event) {

    if (event.key == 'Enter') {
        const tarea = texto_input.value
        if (tarea) {
            agregar_tarea(tarea, id, false, false)
            store.push({
                nombre:tarea,
                id:id,
                hecho:false,
                eliminado:false
            })
            localStorage.setItem('TODO',JSON.stringify(store))
            alert("Tarea agregada con éxito")
            id++
          
        }
        texto_input.value = '' //Se limpian los espacios luego de agregar la tarea
    }

})



//Función de tarea completada

const tareaCompletada = (element) =>{

    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(subrayado);
    store[element.id].hecho = !store[element.id].hecho;

}

//Función de tarea eliminada
const tareaEliminada = (element) =>{

    element.parentNode.parentNode.removeChild(element.parentNode)
    store[element.id].eliminado = true;

}


lista.addEventListener('click', function(event){

    const element = event.target
    const elementData = element.attributes.data.value
   
    if (elementData==='hecho') {
        tareaCompletada(element)
        // console.log(tareaCompletada)
    }
    else if (elementData==='eliminado'){
        
        let confirmar = confirm("¿Estás seguro de eliminar la tarea?")
        if (confirmar) {
            tareaEliminada(element)
            alert("Tarea eliminada")
        }
    }

    localStorage.setItem('TODO',JSON.stringify(store))
})


//local storage get item
function cargarLista(DATA) {
    DATA.forEach(function(i) {
        agregar_tarea(i.nombre, i.id, i.hecho, i.eliminado)
    });
}
let data = localStorage.getItem('TODO')
if (data) {
    store=JSON.parse(data)
    id = store.length
    cargarLista(store)
}else{
    store = []
    id=0
}




//localStorage.setItem('TODO',JSON.stringify(LIST))

//localStorage.setItem('TODO')