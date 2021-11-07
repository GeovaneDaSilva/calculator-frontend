import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ApiService {

  baseUrl_api = 'https://public-holiday.p.rapidapi.com'
  path = '/2021/US'
  provider = 'public-holiday.p.rapidapi.com'
  key = '4f571e2f08msh12e86e257ec5184p16bdd2jsnb412038e090b'
  
  constructor(private http: HttpClient) { }


  getHoliday () {
    const headers = new HttpHeaders({
      "x-rapidapi-host": this.provider,
      "x-rapidapi-key": this.key
    });
    return this.http.get(`${this.baseUrl_api}/${this.path}`, {headers})
  }
}
