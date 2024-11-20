// Extraindo variáveis do HTML
const button = document.getElementById("submit");
const logradouro = document.getElementById("logradouro");
const estado = document.getElementById("estado");
const cep = document.getElementById("cep");
const bairro = document.getElementById("bairro");
const uf = document.getElementById("uf");

// Ação realizada ao clica no butão de submit
button.addEventListener("click",e=>{

    // Ao enviar o fomulário não atualizar a página
    e.preventDefault();
    // Chamando função principal para buscar cep via API (via cep)
    buscaCep()
})

function formataCep(input){

    // Qualquer valor que seja um não digito, será trocado por um espaço vazio
    let valor = input.value.replace(/\D/g,'')
    // Valor sempre terá o tamanho de 8 caracteres
    valor = valor.slice(0,8);
    // Adiciona um "-" quando chegar na posição 5 dao aporte númerico
    if (valor.length > 5){
        valor = valor.slice(0,5)+'-'+valor.slice(5);
    }
    //atribui ao input o valor depois das verificações
    input.value = valor;

}

async function buscaCep(){

    // Atribui a variável o valor do input
    let cep_forms = cep.value;
    // Retira o "-" para realizar a requisição do input apenas com os números digitados
    cep_forms = cep_forms.replace("-","");
    const regexCep = /^\d{8}$/;
    //Regex para realizar a verificação se existe apenas valores numéricos
    if(!regexCep.test(cep_forms)){ 
        logradouro.value ="";
        cep.value = "";
        bairro.value = "";
        estado.value = "";
        uf.value = "";
        alert("Digite um cep valido");
        return;
    }
    // Url para realizar a requisição
    let url =`https://viacep.com.br/ws/${cep_forms}/json/`;

    try{
        const response = await fetch(url);
        if(!response.ok){
            // Caso haja um erro na requisição
            console.log("erro");
            throw new Error(`Repo status: ${response.status}`);
        }
        const json = await response.json();
        if(json.cep == undefined){
            logradouro.value ="";
            cep.value = "";
            bairro.value = "";
            estado.value = "";
            uf.value = "";
            alert("Cep não encontrado");
            return
        }
        // Se tudo der certo, ele trocará os campos pelo valor dos dados recebidos na requisição
        logradouro.value = json.logradouro;
        cep.value = json.cep;
        bairro.value = json.localidade;
        estado.value = json.estado;
        uf.value = json.uf

    }
    catch(error){
        console.log(error)
    }
}
