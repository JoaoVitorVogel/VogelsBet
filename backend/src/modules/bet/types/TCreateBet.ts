type TCreateBet = {
    register: number,
    name: string,
    cpf: string,
    numbers: number[],
    BetEdition_id: string
}

type TCreateBetReturn = {
    
}

export { TCreateBet, TCreateBetReturn}