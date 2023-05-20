import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ang-calculator';

  calValue: number;
  operator: any;
  calNumber: string;

  firstNumber: number;
  secondNumber: number;

  constructor() {
    this.calValue = 0;//то что я выписываю
    this.operator = 'NoFunction';//оператор
    this.calNumber = 'noValue';//я принимаю все как строку но потом то что храню в этой строке перевожу  в float и помещаю в calValue 
    this.firstNumber = 0;
    this.secondNumber = 0;
  }

  onClickValue(val: string, type: any) {
    console.log(val, type);
    if (type === 'number')//если то на что я кликнул это число то идем дальше
    {
      this.onNumberClick(val);//и передаем эту строку в функцию для чисел
    } 
    else if (type === 'function')//но если это оператор
    {
      this.onFunctionClick(val);//и передаем эту строку в функцию для расчета
    }
  }

  onNumberClick(val: string)//принимаю строку чисел
  {
    if (this.calNumber != 'noValue')//если вывод(строка) хранит все себе число то мы добавляем к числа не как плюс а как символы
    {
      this.calNumber += val;
    } 
    else
    {
      this.calNumber = val;//если пустая то мы записываем новое значение
    }
    this.calValue = parseFloat(this.calNumber);//в любом случае переводим все что мы вписали из строки в числа
  }

  onFunctionClick(val: string) 
  {
    if (this.operator === 'C')//чистим и все в дефолт
    {
      this.clearAll();   
    } 
    if (this.operator == 'NoFunction') 
    {
      this.firstNumber = this.calValue;//сохраняет значение, которое было введено пользователем
      this.calValue = 0;
      this.calNumber = 'noValue';
      this.operator = val;//сохраняется текущий оператор 
    } 
    else if (this.operator != 'NoFunction')
    {
      this.secondNumber = this.calValue;//сохраняет текущее значение 
      
      this.valueCalculate(val);//начнем считать
    }
  }
  valueCalculate(val: string) {
    if (this.operator == '+') {
      const Total = this.firstNumber + this.secondNumber;//расчитывает
      this.totalAssingParameters(Total, val);//идем в фун что все обработате 
    }
    if (this.operator == '-') {
      const Total = this.firstNumber - this.secondNumber;
      this.totalAssingParameters(Total, val);
    }
    if (this.operator == '*') {
      const Total = this.firstNumber * this.secondNumber;
      this.totalAssingParameters(Total, val);
    }
    if (this.operator == '/') {
      const Total = this.firstNumber / this.secondNumber;
      this.totalAssingParameters(Total, val);
    }
    if (this.operator == '%') {
      const Total = this.firstNumber % this.secondNumber;
      this.totalAssingParameters(Total, val);
    }
  }
  totalAssingParameters(Total: number, val: string) 
  {
    this.calValue = Total;//вывод равен расчету двух чисел
    this.firstNumber = Total;//сохраняем вывод в первое число
    this.secondNumber = 0;//сбрасываем значение для второг числа
    this.calNumber = 'noValue';//это значит что мы будем не добавлять знаки к нулю что во втором числе а будем переписывать число
    this.operator = val;//оператор в дефол полож
    if (val == '=') {this.onEqualPress(Total)}//вывод будет полько почле нажатия на эту кнопку
  }

  onEqualPress(Total:number) {
    this.firstNumber = Total;
    this.secondNumber = 0;
    this.operator = 'NoFunction';
    this.calNumber = 'noValue';
  }

  clearAll() {
    this.calValue = 0;
    this.operator = 'NoFunction';
    this.calNumber = 'noValue';
    this.firstNumber = 0;
    this.secondNumber = 0;
  }
}
