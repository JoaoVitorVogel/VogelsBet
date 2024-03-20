type TReadBetEditionReturn = {
    id_e: string;
    name: string;
}[]

type TGetBetEditionReturn = {
    id_e: string,
    name: string,
    finish: boolean,
    value: string,
    numbersDrawn: number[],
    status: string
}

export {TReadBetEditionReturn, TGetBetEditionReturn}