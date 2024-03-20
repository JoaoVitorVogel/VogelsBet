type TGenerateNumbers = {
    BetEdition_id: string,
    numbersDrawn: number[]
}

type TGenerateExtraNumber = {
    BetEdition_id: string,
}

type TGenerateNumbersReturn = {
    
}

type TGetNumbers ={
    BetEdition_id: string
}

export { TGenerateNumbers, TGenerateNumbersReturn, TGetNumbers, TGenerateExtraNumber}