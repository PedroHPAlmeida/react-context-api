import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "@/reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho"

const estadoInicial = [];

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, dispatch] = useReducer(carrinhoReducer, estadoInicial);
    const [quantidade, setQuantidade] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);

    const { totalTemp, quantidadeTemp } = useMemo(() => {
        return carrinho.reduce((acc, produto) => {
            return {
                totalTemp: acc.totalTemp + (produto.preco * produto.quantidade),
                quantidadeTemp: acc.quantidadeTemp + produto.quantidade
            }
        }, { totalTemp: 0, quantidadeTemp: 0 });
    }, [carrinho]);

    useEffect(() => {
        setValorTotal(totalTemp);
        setQuantidade(quantidadeTemp);
    });

    return (
        <CarrinhoContext.Provider value={{ carrinho, dispatch, quantidade, valorTotal }}>
            {children}
        </CarrinhoContext.Provider>
    );
};
