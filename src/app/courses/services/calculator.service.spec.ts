import { CalculatorService } from "./calculator.service";

describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;

  // O beforeEach é uma função que executa um bloco de código toda vez que um código irá rodar
  // Assim, nesse bloco podemos colocar configurações ou criar instâncias que sejam comuns a todos os testes
  // Evitando duplicações de código e tornando nosso código mais limpo
  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
    calculator = new CalculatorService(loggerSpy);
  });

  it("should add two numbers", () => {
    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");
  });
});
