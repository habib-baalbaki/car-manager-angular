import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Car } from "./car";
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class CarService {
   private apiServerUrl = environment.apiBaseUrl;
   
    constructor(private http: HttpClient) { }

    public getCars():Observable<Car[]>{
        return this.http.get<Car[]>(`${this.apiServerUrl}/car/all`);
    }

   /* 
   public getEmployees(): Observable<Car[]> {
        return this.http.get<Car[]>(`${this.apiServerUrl}/employee/all`);
      }
*/
    public addCar(car: Car):Observable<Car>{
        return this.http.post<Car>(`${this.apiServerUrl}/car/add`,car);
    }

    public updateCar(car: Car):Observable<Car>{
        return this.http.put<Car>(`${this.apiServerUrl}/car/update`,car);
    }

    public deleteCar(carId: number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/car/delete/${carId}`);
    }

}