export default function numberToBRL(amount: number) {
    return amount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}
