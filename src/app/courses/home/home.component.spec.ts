import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { DebugElement } from "@angular/core";

import { HomeComponent } from "./home.component";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CoursesService } from "../services/courses.service";
import { HttpClient } from "@angular/common/http";
import { COURSES } from "../../../../server/db-data";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { click } from "../common/test-utils";

describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    (course) => course.category === "BEGINNER"
  );

  const advancedCourses = setupCourses().filter((course) => {
    return course.category === "ADVANCED";
  });

  //Como temos animações na nossa tela, mas que não serão executadas no teste usamos o NoopAnimationsModule
  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj("CoursesService", [
      "findAllCourses",
    ]);

    TestBed.configureTestingModule({
      imports: [CoursesModule, NoopAnimationsModule],
      providers: [
        {
          provide: CoursesService,
          useValue: coursesServiceSpy,
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      });
  }));

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display both tabs", () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    expect(tabs.length).toBe(2, "Expected to find 2 tabs");
  });

  // Com a ajuda do fakeAsync podemos escrever testes assíncronos como se fossem
  // síncronos, o que torna os nosso códigos mais legiveis e mais fáceis de serem
  // mantidos
  fit("should display advanced courses when tab clicked", fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    click(tabs[1]);

    fixture.detectChanges();

    // Nesse caso, como o que torna o nosso código assíncrono é uma animação do browser
    // poderiamos usar o tick, passando 16 milisegundos como parâmetro, já que esse é valor
    // que a callback demora para retornar, mas usar esse função acaba se tornando mais complexo
    // porque exige um conhecimento específico
    // tick(16)
    flush();

    const cardTitles = el.queryAll(
      By.css(".mat-tab-body-active .mat-card-title")
    );
    expect(cardTitles.length).toBeGreaterThan(0);
    expect(cardTitles[0].nativeElement.textContent).toContain(
      "Angular Security Course"
    );
  }));
});
