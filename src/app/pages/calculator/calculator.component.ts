import { IHolidays } from './../../interfaces/holiday';
import { Component, NgModule, OnInit } from '@angular/core';
import { CalculatorModel } from 'src/app/interfaces/calculator';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  caculator = new CalculatorModel();
  total: number = 0;
  result: number = 0;
  delayMonthtly: number = 0;
  totalAmount: number = 0;

  // unidad
  totalSelect: number = 0;
  interstSelect: number = 0;
  payment_amountSelect: number = 0;
  listPayments: any[] = []; // calendary list
  selectDate: any;

  intervals: any = [
    { label: 'Daily', value: 365 },
    { label: 'Weekly', value: 52 },
    { label: 'Monthly', value: 12 },
  ];
  days: any = '';
  weeks: any;
  holidays: IHolidays[] = [];
  alert: any;
  activated: boolean = false;
  show: boolean = false;
  selectInterval: any = this.intervals[0].value; // por defecto será daily

  showInstallments: any[] = []

  constructor(private _apiService: ApiService) {
    this.getHolidays();
    this.holidays;
    this.alert;
  }

  ngOnInit(): void {}

  calculator(calculator: CalculatorModel) {
    const i = calculator.interest / 100;

    const total = (calculator.capital * calculator.interest) / 100 + calculator.capital;

    this.total = total;

    this.delayMonthtly = this.total / calculator.interval; // quantidade de parcelas

    this.totalAmount = this.total / calculator.payment_amount;

    this.result = this.total; // total payment

    this.totalSelect = calculator.payment_amount - calculator.interest;
    this.interstSelect = calculator.interest;
    this.payment_amountSelect = calculator.payment_amount;
    this.selectDate = calculator.date;

    console.log('Holidays', this.holidays);
    for (let holiday of this.holidays) {
      if (holiday.date === this.selectDate) {
        this.alert = holiday.name;
        this.show = true;
      }
      this.activated = true;
    }

    console.log(this.selectDate);
    this.showResultCalculator();
  }

  getHolidays() {
    this._apiService.getHoliday().subscribe((response: any) => {
      this.holidays = response;
      return;
    });
  }

  showResultCalculator() {
    for (let index = 0; index < this.totalAmount; index++) {
      let currentDay = moment(this.newDate).format('MM/DD/YYYY');
      let day: number = moment(this.newDate).day();
      let nextDay: any;

      // logic interval

      if (this.selectInterval == 365) {
        //dayly
        if (day == 0) {
          // sunday
          nextDay = moment(currentDay).add(1, 'days').format('MM/DD/YYYY'); // Monday
        } else if (day == 6) {
          // satuday
          nextDay = moment(currentDay).add(2, 'days').format('MM/DD/YYYY'); // Tuesday
        } else if (day == 5) {
          // friday
          nextDay = moment(currentDay).add(3, 'days').format('MM/DD/YYYY'); // Monday
        } else {
          // others day
          nextDay = moment(currentDay).add(1, 'days').format('MM/DD/YYYY'); // others day
        }
      }

      if (this.selectInterval == 52) {
        // weeks
        if (day == 0) {
          // sunday
          nextDay = moment(currentDay).add(8, 'days').format('MM/DD/YYYY'); // Monday next week
        } else if (day == 6) {
          // satuday
          nextDay = moment(currentDay).add(9, 'days').format('MM/DD/YYYY');
        } else {
          // others days
          nextDay = moment(currentDay).add(7, 'days').format('MM/DD/YYYY');
        }
      }

      if (this.selectInterval == 12) {
        // months
        let month = moment(currentDay).add(1, 'months').format('MM/DD/YYYY');
        let checkinDays: number = moment(month).day();
        console.log('day valid:', checkinDays);
        if (checkinDays == 0) {
          nextDay = moment(month).add(1, 'days').format('MM/DD/YYYY');
        } else if (checkinDays == 6) {
          nextDay = moment(month).add(2, 'days').format('MM/DD/YYYY');
        } else {
          nextDay = month;
        }
      }
      this.newDate = nextDay;
      // console.log(index + 1 + ' -- Payment date', nextDay);
      
      
      let payments: any[] = Object.keys(nextDay).map(() => {
        return nextDay
      });
      
      let newArray = payments[0]
      console.log('neww',this.showInstallments.push([newArray]));
      
    }
  }

  newDate: any;
  setDate(date: any) {
    this.newDate = date;
  }

  listPaymentsTable(nextDay: any){
    Object.keys(nextDay).map(function() {
      return nextDay
    });
  }

  
}
