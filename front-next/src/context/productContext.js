"use client";
import React, {createContext, useState} from 'react';
import { ServerResponse, request } from '@/services/request';
import { requisicao } from '@/services/requisicao';

export const ProductContext = createContext({});

export const ProductContextProvider = ( { children } ) => {
    const [produtos, setProdutos] = useState();

    const adicionarProduto = (_id, nome, quantidade, categoria, preco, descricao) => {
        let produtoNovo = {
            _id: _id,
            name: nome,
            qtd: quantidade,
            category: categoria,
            preco: preco,
            description: descricao
        }
        setProdutos([...produtos, produtoNovo]);
    };

    const deletarProduto = async (_id) => {
        let res = await requisicao(`http://127.0.0.1:5000/products/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxIiwidXNlcm5hbWUiOiJDYXJvbGluZSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzE4MTEzMzk0fQ.J8uH7BVAXE9YSGEWB5GMo7QWLE78MVyYjjIJEVUbhHQ',
                'isAdmin': 'true'
            },
            referrerPolicy: 'no-referrer',
            cache: 'no-store'
        }, false)
    }

    const removerProduto = async (_id) => {
        setProdutos(produtos.filter((produto, index) =>
            _id !== index
        ))
    };

    const mudarCategoria = (_id, categoriaNova) => {
        produtos[_id].category = categoriaNova;
    };

    return (
        <ProductContext.Provider value={{ produtos, adicionarProduto, removerProduto, mudarCategoria, deletarProduto }}>
            {children}
        </ProductContext.Provider>
    );
}