import fs from "fs"
const fileName = "./src/data/cart.json"

async function CreateFile(ArrayObject){
    try {
        fs.promises.writeFile(fileName, JSON.stringify(ArrayObject))
        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

async function ReadFile(){

    try {
        const data = JSON.parse(await fs.promises.readFile(fileName, "utf-8"))
        return data   
    } catch (error) {
        console.log(error)
        return false
    }
}

async function UpdateFile(object){
    
    await fs.promises.appendFile(fileName, JSON.stringify(object))
}

async function DeleteFile(){

}

export {CreateFile, ReadFile, UpdateFile, DeleteFile}