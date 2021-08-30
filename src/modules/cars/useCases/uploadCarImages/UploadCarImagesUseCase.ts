import { inject, injectable } from "tsyringe";

import { IUploadCarsImageDTO } from "@modules/cars/dtos/IUploadCarsImageDTO";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_name }: IUploadCarsImageDTO): Promise<void> {
    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
