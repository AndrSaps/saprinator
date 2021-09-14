import { Component, OnInit } from '@angular/core';

export interface PersonModel {
  photoPath: string,
  name: string,
  answers: number[]
}

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  questions: string[] = []
  teachers: PersonModel[] = []

  currentState: any;
  previousState: any;

  questionNumber: number;
  prevNumber: number;
  finishGame = 'start';

  questionStack: number[] = [];

  phrases = ["Хмммм...", "А може...", "Ага! Моє наступне питання!", "А що якщо...", "От зараз точно..."]
  currentPhrase: number;

  count = 0;

  constructor() { }

  ngOnInit(): void {
    this.questions.push(
      "Чи  має бороду?",
      "Чи лякає студентів?",
      "Чи звертає увагу на оформлення звіту?",
      "Чи великі брови має?",
      "Чи цікаві методички?",
      "Чи розказує смішні історії?",
      "Чи пояснює на прикладах з життя?",
      "Чи з старої школи?",
      "Чи лисий/полісілий?",
      "Чи співав на парах?",
      "Чи має власний сайт?",
      "Називає студентів кицями?",
      "Слухає рок і грає на гітарі?",
      "Вчить студентів варити борщ?",
      "Проводить кр замість захисту лаб?",
    )
    this.teachers.push({
      photoPath: "assets/images/andrushchak-removebg-preview.png",
      name: "Андрущак Назар",
      answers: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
    },
      {
        photoPath: "assets/images/denysyuk-removebg-preview.png",
        name: "Денисюк Павло",
        answers: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        photoPath: "assets/images/holovatskyy-removebg-preview.png",
        name: "Головацький Руслан",
        answers: [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        photoPath: "assets/images/ivantsiv-removebg-preview.png",
        name: "Іванців Роман",
        answers: [0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]
      },
      {
        photoPath: "assets/images/panchak-removebg-preview.png",
        name: "Панчак Роман",
        answers: [0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        photoPath: "assets/images/jaworski-removebg-preview.png",
        name: "Яворський Назар",
        answers: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0]
      },
      {
        photoPath: "assets/images/marikutsa-removebg-preview.png",
        name: "Марікуца Уляна",
        answers: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0]
      },
      {
        photoPath: "assets/images/mazur-removebg-preview.png",
        name: "Мазур Віталій",
        answers: [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0]
      },
      {
        photoPath: "assets/images/pleskanka-removebg-preview.png",
        name: "Плесканка Назар",
        answers: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
      },
      {
        photoPath: "assets/images/shcherbovskykh-removebg-preview.png",
        name: "Щербовських Сергій",
        answers: [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1]
      },
      {
        photoPath: "assets/images/sokolovsky-removebg-preview.png",
        name: "Соколовський Ярослав",
        answers: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
      },
      {
        photoPath: "assets/images/tymoshchuk-removebg-preview.png",
        name: "Тимощук Павло",
        answers: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        photoPath: "assets/images/yurchak-removebg-preview.png",
        name: "Юрчак Ірина",
        answers: [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0]
      },
      {
        photoPath: "assets/images/Kernytsky-removebg-preview.png",
        name: "Керницький Андрій",
        answers: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
      },
    )
    this.currentPhrase = Math.floor(Math.random() * this.phrases.length);
    this.currentState = this.teachers;
    this.questionNumber = null;
    this.getRandom()
  }


  getRandom(): number {
    if (this.questionStack.length == this.questions.length) {
      return
    }
    let numb;
    do {
      numb = Math.floor(Math.random() * this.questions.length);
    }
    while (this.questionStack.indexOf(numb) != -1)
    this.questionStack.push(numb);
    this.prevNumber = this.questionNumber;
    this.questionNumber = numb;
  }

  Answer(value: string) {
    this.currentPhrase = Math.floor(Math.random() * this.phrases.length);
    if (this.questionStack.length == this.questions.length) {
      this.finishGame = 'error';
      return
    }
    this.count += 1;
    this.previousState = this.currentState;
    if (value == 'Yes') {
      this.currentState = this.currentState.filter(x => x.answers[this.questionNumber] == 1)
    }
    else if (value == 'No') {
      this.currentState = this.currentState.filter(x => x.answers[this.questionNumber] == 0)
    }
    if (this.currentState.length == 1) {
      this.finishGame = 'success';
      return
    }
    this.checkQuestions();
    this.getRandom()
  }

  goBack() {
    let ind = this.questionStack.indexOf(this.questionNumber);
    this.questionStack.splice(ind, 1)
    this.currentState = this.previousState;
    this.previousState = null;
    this.questionNumber = this.prevNumber;
    this.count -= 1;
  }

  checkQuestions() {
    this.questions.forEach((el, i) => {
      if (this.questionStack.indexOf(i) == -1) {
        let initilaAnswer = this.currentState[0].answers[i]
        debugger
        this.currentState.forEach(element => {
          if (initilaAnswer != element.answers[i]) {
            initilaAnswer = -1;
          }
        });
        if (initilaAnswer != -1) {
          this.questionStack.push(i)
        }
      }
    })
  }

}