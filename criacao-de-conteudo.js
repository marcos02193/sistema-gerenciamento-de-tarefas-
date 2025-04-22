import fs from "fs/promises"
import PromptSync from "prompt-sync"
const prompt = PromptSync()
const caminhodoArquivo = "./tarefas.json"

export async function lertarefa (){
    try {
        const dadosLidos = await fs.readFile(caminhodoArquivo, "utf-8")
        return JSON.parse(dadosLidos)
    } catch (error) {
        console.error(`erro ao ler as tarefas! ${error}`)
    }
}
async function escrevenoarquivo(tarefas) {
    await fs.writeFile(caminhodoArquivo, JSON.stringify(tarefas, null, 2), `utf-8`)
}
async function visualizatarefas() {
    const vertudo = await lertarefa()
    console.log(vertudo)
}
async function criartarefas() {
    const titulo = prompt("digite o titulo: ")
    const descricao = prompt("digite sua descrição: ")
    const tarefas = await lertarefa()
    const id = tarefas.length + 1 
    
    const novatarefa = {id, titulo, descricao,  concluido: false}
    tarefas.push(novatarefa)
    await escrevenoarquivo(tarefas)
    console.log("tarefa atualizada com sucesso")
}
async function tarefasconcluidas() {
    const tarefas = await lertarefa()
    const salvo = tarefas.filter((tarefas) => tarefas.concluido == true)
    console.log(salvo)
}
async function tarefasnaoconcluidas() {
    const tarefas = await lertarefa()
    const naosalvo = tarefas.filter((tarefas) => tarefas.concluido == false)
    console.log(naosalvo)
}
async function concluirtarefa() {
    const atualizarID = prompt("digite o ID para colocar em verdadeiro: ")

    const tarefas = await lertarefa()

    const indicetarefa = tarefas.findIndex((tarefa) => tarefa.id === parseInt(atualizarID))
    if(indicetarefa !== -1){
        tarefas[indicetarefa].concluido = true
        await escrevenoarquivo(tarefas)
        console.log("tarefa finalizada")
    }else {
        console.log("tarefa não finalizada")
    }
}

async function opcoesdemenu() {
    while(true){
    console.log(`\n--- menu de opções ---`)
    console.log("1- Criar uma nova tarefa")
    console.log("2- Visualizar todas as tarefas")
    console.log("3- Visualizar apenas tarefas concluídas")
    console.log("4- Visualizar apenas tarefas não concluídas")
    console.log("5- Concluir uma tarefa")
    console.log("6- Sair")
    const opcoes = prompt("digite sua opção: ")
    switch(opcoes){
        case `1`:
            await criartarefas()
            break;
        case `2`:
            await visualizatarefas()
            break;
        case "3":
            await tarefasconcluidas()
            break;
        case "4":
            await tarefasnaoconcluidas()
            break;
        case "5":
            await concluirtarefa()
            break;
        case `6`:
            return;
            default:
            console.log("opção invalida")

    }
    }
}

opcoesdemenu()