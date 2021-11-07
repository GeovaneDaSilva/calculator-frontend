import { IHolidays } from './../../interfaces/holiday';
import { Component, NgModule, OnInit } from '@angular/core';
import { CalculatorModel } from 'src/app/interfaces/calculator';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})


export class CalculatorComponent implements OnInit {

  caculator =  new CalculatorModel()
  total: number = 0
  result: number = 0
  delayMonthtly: number = 0
  totalAmount: number = 0

  // unidad
  totalSelect: number = 0
  interstSelect: number = 0
  payment_amountSelect: number = 0
  listPayments: any [] = [] // calendary list
  selectDate: any

  intervals: any  = [
    {label: 'Daily', value: 365},
    {label: 'Weekly', value: 52},
    {label: 'Monthly', value: 12}
  ]
  
  holidays: IHolidays[] = []
  alert: any
  activated: boolean = false
  show: boolean = false
  constructor(private _apiService: ApiService) {
    this.getHolidays()
    this.getWeekDays()
    this.holidays
    this.alert
   }

  ngOnInit(): void {
  }
  

  calculator ( calculator: CalculatorModel ) {
    const i = calculator.interest / 100
  
    const total = calculator.capital * calculator.interest / 100 + calculator.capital

    this.total = total
  
    this.delayMonthtly = this.total / calculator.interval // quantidade de parcelas
    
    this.totalAmount = this.total / calculator.payment_amount
    
    this.result = this.total // total a pagar

    const fee = calculator.capital / ((1 - Math.pow(i + 1, - calculator.interval)))
    console.log('feee', fee);
    
    // UNIT
    this.totalSelect = calculator.payment_amount - calculator.interest
    this.interstSelect = calculator.interest
    this.payment_amountSelect = calculator.payment_amount
    this.selectDate = calculator.date 

 
    console.log('Holidays',this.holidays);
    for(let holiday of this.holidays){
      
      if(holiday.date === this.selectDate){
        this.alert = holiday.name
        this.show = true
      }
      this.activated = true
    }
    
    console.log(this.selectDate);
    
  }
  
  getHolidays() {
    this._apiService.getHoliday().subscribe((response: any) => {
       this.holidays = response
       return
    })
  }

  getWeekDays () {
    
    
    
  }


}
