import React from "react";

const EditaProduto = ({editarFormProduto, editarProdutoFormChange, editarCancelaClick}) => {
    return(
        <tr>
            <td>
                <label>Nome Produto</label>
                <input type='text' name='nomeProduto' required='required' placeholder='Nome do Produto' onChange={editarProdutoFormChange} value={editarFormProduto.nomeProduto}></input>
            </td>
            <td>
                <label>Valor Produto R$</label>
                <input type='number' name='valorProduto' required='required' placeholder='valor do Produto' onChange={editarProdutoFormChange} value={editarFormProduto.valorProduto}></input>
            </td>
            <td>
                <label>Disponível</label>
                <p>
                  <input type='radio' name='disponivelProduto' value='S' checked={editarFormProduto.disponivelProduto === 'S'} onChange={editarProdutoFormChange}  />Sim
                  <input type='radio' name='disponivelProduto' value='N' checked={editarFormProduto.disponivelProduto === 'N'} onChange={editarProdutoFormChange}  />Não
                </p>
            </td>
            <td>
                <label>Descrição do Produto</label>
                <input type='text' name='descricaoProduto' required='required' cols='40' onChange={editarProdutoFormChange} value={editarFormProduto.descricaoProduto}></input>
            </td>
            <td>
                <button type='submit'>Salvar</button>
                <button type="button" onClick={editarCancelaClick}>Cancelar</button>    
            </td>
            
            </tr>
    )
}

export default EditaProduto;