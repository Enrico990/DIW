
var operacao = prompt("escolha entre: 1-soma, 2-subtração, 3-multiplicação, 4-divisão");
op = parseInt(operacao);
if (op == 1) // Soma
{
    let resultado = 0;
    let x = [];
    x[0] = parseInt(prompt("Valor 1: "));
    x[1] = parseInt(prompt("Valor 2: "));
    resultado = x[0] + x[1];
    prompt("resultado: " + resultado);
}
else if (op == 2) // Subtracao
{
    let resultado = 0;
    let x = [];
    x[0] = parseInt(prompt("Valor 1: "));
    x[1] = parseInt(prompt("Valor 2: "));
    resultado = x[0] - x[1];
    prompt("resultado: " + resultado);
}
else if (op == 3) // Multiplicacao
{
    let resultado = 0;
    let x = [];
    x[0] = parseInt(prompt("Valor 1: "));
    x[1] = parseInt(prompt("Valor 2: "));
    resultado = x[0] * x[1];
    prompt("resultado: " + resultado);
}
else if (op == 4) // Divisao
{
    let resultado = 0;
    let x = [];
    x[0] = parseInt(prompt("Valor 1: "));
    x[1] = parseInt(prompt("Valor 2: "));
    resultado = x[0] / x[1];
    prompt("resultado: " + resultado);
}