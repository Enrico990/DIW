
// Identificacao de dados

var x = '0';
var y = '0';
var resultado = 0;

function RefreshDisplay()
{
    $("#Resultado").text(x); 
}

$(document).ready(function () {
    let oping = 0;  // Operando
    let op = ["0"]; // Operador
    let FT = 1;

    // mostrar dados
    $(".num").click(function(){
    
    if (FT === 1)
        {x = ''; FT = 0;}
        x += parseInt($(this).prop("value")); // Ler numero
        RefreshDisplay();
});

    // Operadores
    $("#minus").click(function(){
        op = "-";
        oping = 1;
        x += "-"
        RefreshDisplay();
    })
    $("#plus").click(function(){
        op = "+";
        oping = 1;
        x += "+"
        RefreshDisplay();
    })
    $("#div").click(function(){
        op = "/";
        oping = 1;
        x += "/"
        RefreshDisplay();
    })
    $("#mult").click(function(){
        op = "*";
        oping = 1;
        x += "*"
        RefreshDisplay();
    })

    // Botao limpar
    $("#ac").click(function(){
        oping = 0;
        x = '0';
        FT = 1;
        RefreshDisplay();
    })

    $("#equals").click(function(){
        if (op === "+")
        {
            resultado = parseInt(x) + parseInt(y+1);
        }
        x = '0';
        FT = 1;
        $("#Resultado").text(resultado);
    })
});


