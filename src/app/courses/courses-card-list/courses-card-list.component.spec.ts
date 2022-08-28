import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {COMPILER_OPTIONS, DebugElement, QueryList} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';





describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent,
  fixture: ComponentFixture<CoursesCardListComponent>,
  debugElement: DebugElement

  // Como a criação de componentes é uma promisse a mesma acaba sendo resolvida somente
  // após a excução do bloco beforeEach, fazendo com que a princípios os nossos testes falhem
  // mas isso pode ser corrigido com o comando 'waitForAsync'
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[CoursesModule]
    })
    .compileComponents()
    .then(() =>{
      fixture = TestBed.createComponent(CoursesCardListComponent)
      component = fixture.componentInstance
      debugElement = fixture.debugElement

    })
  }))


  it("should create the component", () => {
    expect(component).toBeTruthy()

  });


  it("should display the course list", () => {

    component.courses = setupCourses()

    // Por padrão o angular não atualiza a DOM após a atualização dos dados
    // para forçarmos esse comportamento devemos usar a chamada para o método
    // detectChanges
    fixture.detectChanges()

    console.log(debugElement.nativeElement.outerHTML)

    const cards = debugElement.queryAll(By.css('.course-card'))

    expect(cards).toBeTruthy("Could not find courses")
    expect(cards.length).toBe(12, "Unexpect number of courses")

  });


  it("should display the first course", () => {

      pending();

  });


});


