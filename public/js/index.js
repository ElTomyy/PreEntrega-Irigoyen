const socket = io()

const deleteButton = document.getElementById("deleteButton")

deleteButton.addEventListener("click", () =>{
    const id = deleteButton.value 

    alert("porducto eliminado")
    console.log("Click de eliminar")
    socket.emit("deleteProduct", id)

    
})