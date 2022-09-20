import { fakeAsync, tick } from "@angular/core/testing";

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

    setTimeout(() => {
      test = true;

      console.log("running assertions");

      expect(test).toBeTruthy();
    }, 1000);

    // Com a função tick podemos estabelecer o tempo decorrido em milisegundos
    tick(500);
    tick(499);
    tick(1);
  }));
});
