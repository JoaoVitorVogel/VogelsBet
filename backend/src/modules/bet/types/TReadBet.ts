type TReadBetReturn = {
    register: number,
    name: string,
    cpf: string,
    numbers: number[],
    BetEdition_id: string
}[]

type TReadFirstBet = {
    register: number,
    name: string,
    cpf: string,
    numbers: number[],
    BetEdition_id: string
}

export {TReadBetReturn, TReadFirstBet}