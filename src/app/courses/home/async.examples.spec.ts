import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { count } from "console";
import { promise } from "protractor";

fdescribe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;

    //  Por padrão nosso código assíncrono é executado somente após o término do teste
    //  Fazendo com que tenhamos sucesso na operação porém com um erro devido a falta de execução do expect
    //  Por isso, uma solução acaba sendo o uso da callback done, que é executada após o término
    //  Do método assíncrono
    setTimeout(() => {
      test = true;

      console.log("running assertions");

      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Asynchronous test examples - setTimeout()", fakeAsync(() => {
    let test = false;

    //  Uma alternativa a callback done é o fakeAsync, que criar um cenário onde é possível simular a passagem do tempo

    setTimeout(() => {});
    setTimeout(() => {
      test = true;

      console.log("running assertions");

      expect(test).toBeTruthy();
    }, 1000);

    //   A função tick pode ser substituída pela função flush, que executa os timeouts pendentes
    flush();
  }));

  it("Asynchronous test example - plain Promise", fakeAsync(() => {
    let test = false;

    //   Como podemos ver em um cenário de microtasks operações do tipo setTimeout são executadas somente
    //   após a execução de promises

    console.log("Creating a promise");

    Promise.resolve()
      .then(() => {
        console.log("Promise first then() evalueted successfully");

        return Promise.resolve();
      })
      .then(() => {
        test = true;
        console.log("Promise second then() evalueted successfully");
      });

    console.log("Running test assertions");
    flushMicrotasks(); //Executa todas as microtasks antes de considerar o teste como concluido

    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - plain Promise + setTimeout", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    // Podemos combinar o flushMicrotasks com o tick para pegar momentos exatos entre as execuções de microtasks e
    //  códigos assíncronos como setTimout, setInterval, browserAnimations e etc...
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));
});
