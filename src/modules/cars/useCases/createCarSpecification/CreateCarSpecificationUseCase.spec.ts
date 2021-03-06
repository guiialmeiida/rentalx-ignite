import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInmemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createSpecificationCarUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createSpecificationCarUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    })

    it("should not be able to add a new specification to a now-existent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"]

        await expect(createSpecificationCarUseCase.execute({
            car_id,
            specifications_id
        })
        ).rejects.toEqual(new AppError("Car does not exists!"));
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category",
        });

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test",
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createSpecificationCarUseCase.execute({
            car_id: car.id,
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1);
    });
})