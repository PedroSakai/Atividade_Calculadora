var numInicial = '';
var operacao = "";
var negativo = false;
var decimal = false;

function numeroDigitado(id){

    if(id == '.' && decimal == true)
    {
        alert("Erro de Sintaxe!");
        limpar();
        return;
    }

    if(id == '.' && document.getElementById("visorPrincipal").value == '')
    {
        alert("Erro de Sintaxe!");
        limpar();
        return;
    }

    if(id == '.')
    {
        decimal = true;
    }

    document.getElementById("visorPrincipal").value += id;
}

function limpar()
{
    document.getElementById("visorPrincipal").value = '';
    document.getElementById("visorSecundario").value = '';
    numInicial='';
    operacao='';
    decimal=false;
    negativo=false;
}

function defineOperador(op){

    numInicial = parseFloat(document.getElementById("visorPrincipal").value);

    decimal = false;

    if(op == 'potencia' && negativo == false)
    {
        
        var potencia = Math.pow(numInicial,2);

        document.getElementById("visorPrincipal").value =  potencia;

        return;
    }

    if(op == 'raiz'){
        
        if(isNaN(numInicial)){
            alert("Não existe raiz de numeros negativos!");
            limpar();
            return;
        }

        var raiz = Math.sqrt(numInicial);

        if(raiz % 1 != 0){
            alert("O resultado da raiz não é inteiro!");
            limpar();
            return;
        }

        document.getElementById("visorPrincipal").value =  raiz;

        return;
    }

    if(negativo == true)
    {
        negativo = false;

        numNegativo = document.getElementById("visorPrincipal").value.toString();

        if(numNegativo == '(-'){   
            alert("Sintaxe errada!");
            return;
        }

        if(op == 'potencia'){
            numNegativo = numNegativo.replace("(", "");
            
            document.getElementById("visorPrincipal").value =  Math.pow(numNegativo,2);;

            return;
        }

        document.getElementById("visorSecundario").value += numNegativo + ')' + op;

        operacao += numNegativo + ')' + op;

        document.getElementById("visorPrincipal").value = "";

        return;
    }

    if(op == '-' && isNaN(numInicial) && document.getElementById("visorPrincipal").value.charAt(0) != '('){

        document.getElementById("visorPrincipal").value += '(-';
        negativo = true;
        return;
    }

    if(isNaN(numInicial))
    {
        alert("Primeiro numero invalido!");
        limpar();
        return;
    }

    document.getElementById("visorSecundario").value = numInicial + op;

    operacao += "" + numInicial + op;

    document.getElementById("visorPrincipal").value = "";
    
}

function igual(){

    if(numInicial == ''){
        alert("Primeiro valor não informado!");
        limpar();
        return;
    }

    var numFinal = document.getElementById("visorPrincipal").value.toString();

    if(numFinal.charAt(0) == '('){
        
        operacao += numFinal + ')';
        negativo = false;
    }
    else {
        operacao += numFinal;
    }

    document.getElementById("visorPrincipal").value = eval(operacao);
    document.getElementById("visorSecundario").value = '';
    numInicial='';
    operacao='';
    negativo=false;
    decimal=false;

}

function apagarUltimo(){
    input = document.getElementById("visorPrincipal").value.toString();

    newInput = input.substring(0,input.length-1);

    document.getElementById("visorPrincipal").value = newInput;
}