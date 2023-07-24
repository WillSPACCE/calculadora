    // Seleciona os elementos HTML com os IDs "previous-operation" e "current-operation"
    const previousOperationText = document.querySelector("#previous-operation");
    const currentOperationText = document.querySelector("#current-operation");

    // Seleciona todos os elementos de botão dentro do contêiner com o ID "buttons-container"
    const buttons = document.querySelectorAll("#buttons-container button");

    // Define a classe Calculadora
    class Calculadora {
    // Função construtora para inicializar o objeto da calculadora
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Método para adicionar um dígito à tela da calculadora
    addDigit(digit) {
        console.log(digit);
        // Verifica se o número já possui um ponto decimal
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
        return;
        }

        this.currentOperation = digit; // Atualiza a operação atual com o novo dígito
        this.updateScreen(); // Atualiza a tela da calculadora
    }

    // Método para processar todas as operações da calculadora
    processOperation(operation) {
        // Verifica se o valor atual está vazio e se a operação não é "C" (Limpar)
        if (this.currentOperationText.innerText === "" && operation !== "C") {
        // Muda a operação se houver uma operação anterior
        if (this.previousOperationText.innerText !== "") {
            this.changeOperation(operation);
        }
        return;
        }

        // Obtém os valores atuais e anteriores
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {
        case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue, operation, current, previous);
            break;
        case "DEL":
            this.processDelOperator();
            break;
        case "CE":
            this.processClearCurrentOperator();
            break;
        case "C":
            this.processClearOperator();
            break;
        case "=":
            this.processEqualOperator();
            break;
        default:
            return;
        }
    }

    // Método para atualizar os valores na tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
        // Adiciona o número ao valor atual
        this.currentOperationText.innerText += this.currentOperation;
        } else {
        // Verifica se o valor anterior é zero, se for, adiciona apenas o valor atual
        if (previous === 0) {
            operationValue = current;
        }
        // Adiciona o valor atual ao valor anterior
        this.previousOperationText.innerText = `${operationValue} ${operation}`;
        this.currentOperationText.innerText = "";
        }
    }

    // Método para mudar a operação matemática
    changeOperation(operation) {
        const mathOperations = ["*", "-", "+", "/"];

        if (!mathOperations.includes(operation)) {
        return;
        }

        this.previousOperationText.innerText =
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Método para apagar um dígito
    processDelOperator() {
        this.currentOperationText.innerText =
        this.currentOperationText.innerText.slice(0, -1);
    }

    // Método para limpar a operação atual
    processClearCurrentOperator() {
        this.currentOperationText.innerText = "";
    }

    // Método para limpar todas as operações
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // Método para processar uma operação
    processEqualOperator() {
        let operation = this.previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);
    }
    }

    const calc = new Calculadora(previousOperationText, currentOperationText);

    buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
        console.log(value);
        calc.addDigit(value);
        } else {
        calc.processOperation(value);
        }
    });
    });
