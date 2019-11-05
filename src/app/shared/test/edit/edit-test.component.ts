import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../../model/test';
import { TestItem } from '../../model/test-item';
import { TestService } from '../shared/test.service';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  test: Test;
  isEdit: boolean;
  isScrollbarVisible: boolean;

  @ViewChild('questionForm', {static: false})
  questionForm: NgForm;

  labels = {
    createTitle: 'Создать тест',
    editTitle: 'Редактировать тест',
    name: 'Название',
    question: {
      title: 'Вопрос №',
      correctAnswer: 'Правильный ответ'
    },
    subtitle: 'Список вопросов'

  };
  placeholders = {
    name: 'Название теста',
    expression: 'Введите описание вопроса',
    correctAnswer: 'Введите правильный ответ',
    option: 'Неправильный ответ'
  };
  buttons = {
    addItem: 'Добавить вопрос',
    deleteQuestion: 'Удалить',
    createTest: 'Создать тест',
    editTest: 'Сохранить изменения'
  };
  summary = {
    edit: 'Тест успешно изменён',
    create: 'Тест успешно создан'
  };

  constructor(private testService: TestService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef) {
    this.test = new Test();
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = Boolean(id);
    if (id) {
      const aee = combineLatest(this.testService.getTestInfo(id),
        this.testService.getTestItems(id))
        .subscribe(res => {
          this.test = res[0];
          this.test.items = res[1]._embedded.testItems;
        });
    }
  }

  createTest() {
    if (!this.questionForm.valid) {
      return;
    }

    this.test.active = false;
    this.testService.createTest(this.test).subscribe(test => {
      this.messageService.add({severity: 'success', summary: 'Тест успешно создан', detail: 'ID - ' + test.id});
      this.router.navigate([`test/edit/${test.id}`]);
    });
  }

  updateTest() {
    if (!this.questionForm.valid) {
      return;
    }

    console.log(this.test);
      this.testService.createTest(this.test)
      .subscribe(res => {
        this.messageService.add({severity: 'success', summary: 'Тест успешно изменён', detail: 'ID - ' + res.id});
      });
  }

  addTestItem() {
    this.test.items.push(new TestItem());
    this.scrollbarVisible();
  }

  deleteOption(j: number, options: string[]) {
    options.splice(j, 1);
    this.scrollbarVisible();
    this.cd.detectChanges();
  }

  addOption(allOptions: string[]) {
    allOptions.push('');
    this.scrollbarVisible();
    this.cd.detectChanges();
  }

  trackByIndex(index, item) {
    return index;
  }

  deleteQuestion(i: number) {
    this.test.items.splice(i, 1);
    this.scrollbarVisible();
    this.cd.detectChanges();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  scrollToBottom() {
    window.scrollTo(0, document.documentElement.scrollHeight);
  }

  scrollbarVisible() {
    this.isScrollbarVisible =  document.documentElement.scrollHeight > document.documentElement.clientHeight;
  }

  scrollTo(k: number) {
    document.getElementById('item' + k).scrollIntoView();
    document.documentElement.scrollTop += -50;
  }
}
