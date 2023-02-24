import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { CarService } from './car.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  onDeleteEmloyee(arg0: any) {
    throw new Error('Method not implemented.');
  }

  //  [x: string]: any;


  public cars !: Car[];
  public editCar !: Car;
  public deleteCar !: Car;
  public addForm !: NgForm;


  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  public getCars(): void {
    this.carService.getCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        console.log("cars.response: " + this.cars);
      },
      (error: HttpErrorResponse) => { alert(error.message); }
    );
  }

  public onAddCar(addForm: NgForm): void {
    document.getElementById('add-car-form')!.click();
    this.carService.addCar(addForm.value).subscribe({
      next:
        (response: Car) => {
          console.log(response);
          this.getCars();
          // addForm.reset();
        },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        // addForm.reset();
      }
      ,complete: ()=> (addForm.reset())
    });
  }

  public onUpdateCar(car: Car): void {
    this.carService.updateCar(car).subscribe(
      (response: Car) => {
        console.log(response);
        this.getCars();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteCar(carId: number): void {

    this.carService.deleteCar(carId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCars();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(car: Car, mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCarModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateCarModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteCarModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public searchCars(key: string): void {
    console.log(key);
    const results: Car[] = [];
    for (const car of this.cars) {
      if (car.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.vin.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.year.toString().toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(car);
      }
    }
    this.cars = results;
    if (results.length === 0 || !key) {
      this.getCars();

    }
  }
}
