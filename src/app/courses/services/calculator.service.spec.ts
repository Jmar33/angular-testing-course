import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  it("should add two numbers", () => {
    // O Jasmine tbm nos permite criar uma inmstância totalmente fake de um determinado objeto
    // para tanto devemos passar o nome do objeto, e os métodos que o mesmo deve possuir
    const logger = jasmine.createSpyObj("LoggerService", ["log"]);

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
