import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  it("should add two numbers", () => {
    const logger = new LoggerService();

    // O Jasmine nos permite criar um espião que irá monitorar determinado objeto, esse espião recebe como parâmetro
    // um método, esse método será substitudo por um novo método que faz chamadas ao método original, além de contar o número de
    // vezes que o método original é chamado
    spyOn(logger, "log");
    const calculator = new CalculatorService(logger);

    const result = calculator.add(2, 2);

    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");
  });
});
