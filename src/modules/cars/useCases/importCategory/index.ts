import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const caterogiesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(caterogiesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };

