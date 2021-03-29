import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const caterogiesRepository = null;
const importCategoryUseCase = new ImportCategoryUseCase(caterogiesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController };

