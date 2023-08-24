import { Fragment, useEffect, useState } from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'
import './style/style.css';


//import axios para fazer requisões post e get
import axios from 'axios';

//import de componentes auxiliares para listar os produtos na tabela e editar ao clicar editar
import ListaProdutos from './componentes/ListaProdutos'
import EditaProduto from './componentes/EditaProduto';

function App() {
  //arrays getter/setter auxiliares para armazenamento dos dados sendo respectivamente usados para: 
  // 1-Listar os produtos do arquivo json, 2-armazenar os dados do cadastro de produto, 3-armazenar os dados ao editar o produto, 4-armazenar o id do produto a ser editado
  const[produtos, setProdutos] = useState([]);
  const[addFormProduto, setAddFormProduto] = useState({nomeProduto: "", valorProduto: "", disponivelProduto: "", descricaoProduto: ""});
  const[editarFormProduto, setEditarFormProduto] = useState({nomeProduto: "", valorProduto: "", disponivelProduto: "", descricaoProduto: ""});
  const[editarProdutoId, setEditarProdutoId] = useState(null);

  //url padrão para busca de produtos (utilizar " npx json-server --watch dados.json --port 3030 " para inicializar o json server)
  const url = "http://localhost:3030/produtos/";

  //função para carregar os dados pelos axios
  async function carregaProdutos(){
    await axios.get(url).then(res => setProdutos(res.data));
  }

  //useeffet para carregar os dados
  useEffect(() => {
    carregaProdutos();
  }, [])

  //função de onChange de adicionar produto
  const addProdutoFormChange = e => {
    e.preventDefault();

    //recebe os valores digitados no campo
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    //copia os dados do respectivo array de cadastro do produto
    const newFormDados = {...addFormProduto};

    //adiciona o dado no campo do array modificado
    newFormDados[fieldName] = fieldValue;

    //adiciona os dados modificados no array de adicionar produto
    setAddFormProduto(newFormDados);

  }

  //função de onChange de editar produto
  const editarProdutoFormChange = e => {
    e.preventDefault();

    //recebe os valores digitados no campo
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    //copia os dados do respectivo array de editar do produto
    const editarFormDados = {...editarFormProduto};

    //adiciona o dado no campo do array modificado
    editarFormDados[fieldName] = fieldValue;

    //adiciona os dados modificados no array de editar produto
    setEditarFormProduto(editarFormDados);

  }

  //função de submit de adicionar produto
  const addProdutoFormSubmit = e => {
    e.preventDefault();

    const ultimoId = produtos.slice(-1);
    //cria array com as informações digitadas em cadastro de produto
    const novoProduto = {
      id: parseInt(ultimoId[0].id) + 1, 
      nomeProduto: addFormProduto.nomeProduto, 
      valorProduto: addFormProduto.valorProduto, 
      disponivelProduto: addFormProduto.disponivelProduto, 
      descricaoProduto: addFormProduto.descricaoProduto
    };

    //copia os dados dos produtos já cadastrados e concatena com o novo gerado por cadastrar produto
    const todosProdutos = [...produtos, novoProduto];
    axios.post(url,novoProduto);

    setProdutos(todosProdutos);
  }

  //função de submit de editar produto
  const editarProdutoFormSubmit = e => {
    e.preventDefault();

    //cria array com as informações digitadas em editar de produto
    const editadoProduto = {
      id: editarFormProduto.id,
      nomeProduto: editarFormProduto.nomeProduto,
      valorProduto: editarFormProduto.valorProduto,
      disponivelProduto: editarFormProduto.disponivelProduto,
      descricaoProduto: editarFormProduto.descricaoProduto
    }

    //copia os dados dos produtos já cadastrados
    const novoEditadoProduto = [...produtos];

    //cria um indice para buscar no array de produtos cadastrados aquele com id igual ao desejado a editar
    const ii = produtos.findIndex((produto) => produto.id === editarProdutoId);
    //modifica os dados dos campos alterados no array cadastrados
    novoEditadoProduto[ii] = editadoProduto;

    axios.put(url + editarProdutoId, novoEditadoProduto[ii])
    setProdutos(novoEditadoProduto);
    //seta o produtoId como null para terminar a edição
    setEditarProdutoId(null);
  }

  //função de ação de editar ao clicar em editar
  const editarProdutoClick = (e, produto) => {
    e.preventDefault();
    //modifica o array de produtoId com id do produto selecionado
    setEditarProdutoId(produto.id);

    //cria array com os dados do produto selecionado
    const valores = {nomeProduto: produto.nomeProduto, valorProduto: produto.valorProduto, disponivelProduto: produto.disponivelProduto, descricaoProduto: produto.descricaoProduto};
    setEditarFormProduto(valores);
  }

  const editarCancelaClick = e =>{
    e.preventDefault();
    //seta o produtoId como null para terminar a edição
    setEditarProdutoId(null);
  }

  const deletarProdutoClick = (e, produtoId) => {
    e.preventDefault();

    //copia a array dos produtos ja criados
    const novaListaProduto = [...produtos];
    //cria indice do id do produto selecionado para a deleção
    const ii = produtos.findIndex((produto)=>produto.id === produtoId);
    //remove da lista o produto a partir do indice
    novaListaProduto.splice(ii,1);
    axios.delete(url+produtoId);
    setProdutos(novaListaProduto);

  }

  return (
    <div className='content'>
      <div className="container">
        <div className="App">
          <div className='table-responsive'>
            <form onSubmit={editarProdutoFormSubmit}>
              <table className="table custom-table">
                <thead>
                  <tr>
                    <th>Nome Produto</th>
                    <th>Valor</th>
                    <th>Disponível</th>
                    <th>Descrição</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map((produto)=> (
                    <Fragment>
                      {editarProdutoId === produto.id ? (<EditaProduto editarFormProduto={editarFormProduto} editarProdutoFormChange={editarProdutoFormChange} editarCancelaClick={editarCancelaClick} />) : (<ListaProdutos produto={produto} editarProdutoClick={editarProdutoClick} deletarProdutoClick={deletarProdutoClick} />)}
                    </Fragment>
                    
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <div className='table'>
          <h2>Cadastro de produto</h2>
          <form onSubmit={addProdutoFormSubmit}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Nome Produto</label>
                    <input type='text' name='nomeProduto' required='required' placeholder='Nome do Produto' onChange={addProdutoFormChange} value={addFormProduto.nomeProduto}></input>
                  </td>
                  <td>
                    <label>Valor Produto R$</label>
                    <input type='number' name='valorProduto' required='required' placeholder='valor do Produto' onChange={addProdutoFormChange}></input>
                  </td>
                  <td>
                    <label>Produto Disponível</label>
                    <p>
                    <input type='radio' name='disponivelProduto' value='S' checked={addFormProduto.disponivelProduto === 'S'} onChange={addProdutoFormChange}  />Sim
                    <input type='radio' name='disponivelProduto' value='N' checked={addFormProduto.disponivelProduto === 'N'} onChange={addProdutoFormChange}  />Não
                    </p>
                  </td>
                  <td>
                    <label>Descrição do Produto</label>
                    <input type='text' name='descricaoProduto' required='required' cols='40' onChange={addProdutoFormChange}></input>
                  </td>
                  <td><button type='submit'>Salvar</button></td>
                  
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
