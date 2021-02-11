function validarProduto(nomeProduto, codigoProduto, qntd){
    let idNome = document.getElementById(nomeProduto).value;
    let idCodigo = document.getElementById(codigoProduto).value;
    let idQntd = document.getElementById(qntd).value;

    if(idNome == ""){
        alert("Nome em branco favor preenche-lo!");
    }else if(idCodigo == ""){
        alert("Código em branco favor preenche-lo!");
    }
    else cadastrarProduto(idNome, idCodigo, parseInt(idQntd));
}

function cadastrarProduto(idNome, idCodigo, idQntd){
    let novoProduto = {
        nome: idNome,
        codigo: idCodigo,
        quantidade: idQntd
    };

    if(typeof(Storage) !== "undefined"){ /*verifica se a versao do navegador é compativel com o localstorage*/
        let produtos = localStorage.getItem("produtos");
        if(produtos == null) produtos = []; /*nenhum produto no cadastro*/
        else produtos = JSON.parse(produtos); /*transforma em uma estrutura json*/
        produtos.push(novoProduto); /*Adciona um novo produto*/
        localStorage.setItem("produtos", JSON.stringify(produtos));/*transforma em string novamente*/
        alert(`Produtos cadastrados com sucesso - ${idQntd} unidades de ${idNome}`);
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    }
    else alert("A versão do seu navegador é muito antiga, não será possivel concluir a aplicação...");
}

function atualizarTotalEstoque(idCampoEstoque){
    localStorage.setItem("totalEstoque",++document.getElementById(idCampoEstoque).innerHTML)
}

function carregarTotalEstoque(IdCampoEstoque){
    if(typeof(Storage) !== undefined){
        let totalEstoque = localStorage.getItem("totalEstoque")
        if(totalEstoque == null){
            totalEstoque = 0;
        }else  document.getElementById(IdCampoEstoque).innerHTML = totalEstoque;
    }else{
        alert("Versão do navegador muito antiga");
    }
}

function listarEstoque(){
    if(typeof(Storage) !== undefined){
        let produtos = localStorage.getItem("produtos");
        let total = 0;
        document.write("<h1>Estoque</h1>")
        if(produtos == null){
            document.write("<h3>Não há produtos no estoque</h3>");
            document.body.style.background = "#ccc";
            document.body.style.fontFamily = "Trebuchet MS"
        }else{
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do produto: "+produto.nome+"</li>");
                document.write("<li>Código do produto: "+produto.codigo+"</li>");
                document.write("<li>Quantidade: "+produto.quantidade+"</li>");
                document.write('</ul>');
                document.body.style.background = "#ccc";
                document.body.style.fontFamily = "Trebuchet MS"
                total = produto.quantidade + total;
            });
            document.write("<h3>Número total de produtos no estoque: "+total+" produtos.</h3>");
            document.write('<button onclick="limparEstoque()">Limpar Estoque</button>')
        }
    }
}



/* arr.map(conteudo => {
      tr += `
			<tr>
					<td>${conteudo.nome}</td>
					<td>${conteudo.email}</td>
					<td>${conteudo.imagem}</td>
					<td>${conteudo.repositorio}</td>
				</tr>`


    })
    tBody.innerHTML = tr; */

/*function listarEstoque(){
    let produtos = localStorage.getItem("produtos");
    if(produtos == null){
        document.write("<h3>Não há produtos no estoque</h3>");
    }else{
        produtos = JSON.parse(produtos);
        let tr = "";
        produtos.map(produto => {
            tr += `<tr>
                        <td>${produto.nome}</td>
                        <td>${produto.codigo}</td>
                        <td>${produto.quantidade}</td>
                    </tr>`
        })
        tbody.innerHTML = tr;
    }
}*/

function limparEstoque(){
        if (confirm('Você tem certeza que deseja limpar o Estoque?')) {
           localStorage.clear();
        }
}


