
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

class Contenedor {

    constructor( file ) {
        this.file = file
    }


    async save(product) {
        const productos = await this.getAll()
        try {
            let idGen = uuidv4()

            const prodNuevo = { id: idGen, ...product }
            productos.push(prodNuevo)
            await this.saveFile(productos)
            return idGen

        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }


    async saveFile( productos) {
        try {
            await fs.promises.writeFile(
                this.file, JSON.stringify(productos, null, 2)
            )
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }


    async getById(id) {
        const productos = await this.getAll()
        try {
            const prod = productos.find(item => item.id === id)
            return prod ? prod : null

        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }
    

    async getAll() {
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8')
            return JSON.parse(productos)

        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }


    async deleteById(id) {
        let productos = await this.getAll()

        try {
            productos = productos.filter(item => item.id != id)
            await this.saveFile(this.file, productos)

        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }


    async deleteAll() {
        await this.saveFile(this.file, [])
    }

}



const products = new Contenedor('../data/products.txt')
const chat = new Contenedor('../data/chat.txt')


module.exports = { products, chat }