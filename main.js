const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    clearFields()
}

const getLocalStorage = () => [JSON.parse(localStorage.getItem('db_client'))] ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client",JSON.stringify(dbClient)) 

//CRUD - Create Read Update Delete

const deleteCliente = (index) =>{
    const dbClient = readCliente()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}

const updateCliente = (index,client) => {
    const dbClient = readCliente()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const readCliente = () => getLocalStorage()

const createCliente = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}   

//Interação com o Layout

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const  fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value 
        }
        createCliente(client)
        clearFields()
        closeModal()
    }
}

const createRow = (client) => {
    const newRow =  document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
        </td>
    `

    document.querySelector('#tableClient>tbody').appendChild(newRow)
}


 
//Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click',openModal)

document.getElementById('modalClose')
    .addEventListener('click',closeModal)

document.getElementById('salvar')   
    .addEventListener('click',saveClient)