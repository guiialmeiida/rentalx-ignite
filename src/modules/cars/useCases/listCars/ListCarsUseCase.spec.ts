import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car1",
            "description": "car_description",
            "daily_rate": 110,
            "license_plate": "DEF-1234",
            "fine_amount": 40,
            "brand": " car_brand",
            "category_id": "category_id"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car1",
            "description": "car_description",
            "daily_rate": 110,
            "license_plate": "DEF-1234",
            "fine_amount": 40,
            "brand": " car_brand_test",
            "category_id": "category_id"
        });

        const cars = await listCarsUseCase.execute({
            brand: "car_brand_test",
        });

        expect(cars).toEqual([car]);
    })
});