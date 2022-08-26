import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  let calculator: CalculatorService, loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    // Podemos usar o TestBed para mockar uma espécie de módulo contendo nossos serviços, por exemplo
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });

    // E assim podemos usar o próprio serviço de injeção do TestBed ao invés de inciarmos uma instância de forma manual
    calculator = TestBed.inject(CalculatorService);
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
