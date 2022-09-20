import { fakeAsync, flush, tick } from "@angular/core/testing";
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

  fit("Asynchronous test example - plain Promise", () => {
    let test = false;

    //   Como podemos ver em um cenário de microtasks operações do tipo setTimeout são executadas somente
    //   após a execução de promises

    console.log("Creating a promise");

    setTimeout(() => {
      console.log("setTimeout() first callback triggered");
    });

    setTimeout(() => {
      console.log("setTimeout() second callback triggered");
    });

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
    expect(test).toBeTruthy();
  });
});
