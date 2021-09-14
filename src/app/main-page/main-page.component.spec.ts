import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should test data init", async () => {
    if(component.teachers.length < 0){
      component.teachers = [];
    }
    component.teachers.push(      {
      photoPath: "assets/images/holovatskyy-removebg-preview.png",
      name: "Test",
      answers: [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.teachers.length).toBeGreaterThan(0);
    }); 
  });


  it("should test random", async () => {
    const value = component.getRandom();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.questionNumber).toBeGreaterThanOrEqual(0);
    }); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
