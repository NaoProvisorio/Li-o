let porcentagemSelecionada = 0;

function setPorcentagem(porcentagem) {
    porcentagemSelecionada = porcentagem; // Define a porcentagem global
}

function calcular() {
    let valorConta = parseFloat(document.getElementById('valorConta').value);

    if (!isNaN(valorConta) && porcentagemSelecionada > 0) {
        let resultado = calcularGorjeta(valorConta, porcentagemSelecionada);
        document.getElementById('resultadoGorjeta').value = resultado.gorjeta.toFixed(2);
        document.getElementById('resultadoTotal').value = resultado.total.toFixed(2);
    } else {
        alert("Por favor, insira um valor válido para a conta e selecione uma porcentagem.");
    }
}

function calcularGorjeta(valorConta, porcentagemGorjeta) {
    // Cálculo incorreto intencional: Multiplicar ao invés de somar
    let gorjeta = (valorConta * porcentagemGorjeta) / 100; // Cálculo correto
    let total = valorConta * gorjeta; // ERRO INTENCIONAL

    return {
        gorjeta: gorjeta,
        total: total
    };
}


const { Builder, By, until } = require('selenium-webdriver');

(async function testCalculoGorjeta() {
    // Inicializa o WebDriver
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navega até a página da aplicação (substitua pelo URL da sua aplicação)
        await driver.get('http://localhost:3000'); // Altere para o seu URL

        // Insere um valor no campo da conta
        await driver.findElement(By.id('valorConta')).sendKeys('100');

        // Seleciona uma porcentagem de gorjeta (ex: 15%)
        await driver.findElement(By.xpath("//button[contains(text(), '15%')]")).click();

        // Clica no botão "Calcular"
        await driver.findElement(By.className('calculate')).click();

        // Espera pelo resultado
        await driver.wait(until.elementLocated(By.id('resultadoGorjeta')), 10000);

        // Verifica o valor calculado
        let resultadoGorjeta = await driver.findElement(By.id('resultadoGorjeta')).getAttribute('value');
        let resultadoTotal = await driver.findElement(By.id('resultadoTotal')).getAttribute('value');

        // Valores esperados
        let gorjetaEsperada = (100 * 15) / 100; // 15
        let totalEsperado = 100 * gorjetaEsperada; // ERRO: deveria ser 100 + 15

        // O teste deve falhar, pois o cálculo está incorreto
        if (resultadoGorjeta !== `${gorjetaEsperada.toFixed(2)}` || resultadoTotal !== `${totalEsperado.toFixed(2)}`) {
            console.log('Teste falhou como esperado devido a erro na lógica de cálculo.');
        } else {
            console.log('Teste passou, o que não era esperado.');
        }

    } catch (error) {
        console.error('Erro durante o teste:', error);
    } finally {
        // Encerra o WebDriver
        await driver.quit();
    }
})();

