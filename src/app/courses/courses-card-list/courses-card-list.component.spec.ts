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

    })
  }))


  it("should create the component", () => {
    expect(component).toBeTruthy()
    console.log(component)

  });


  it("should display the course list", () => {

    component.courses = setupCourses()
    const cards = debugElement.queryAll(By.css('.course-card'))

    expect(cards).toBeTruthy("Could not find courses")
    expect(cards.length).toBe(12, "Unexpect number of courses")

  });


  it("should display the first course", () => {

      pending();

  });


});


