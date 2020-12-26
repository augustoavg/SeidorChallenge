import { Request, Response } from 'express';
import CreateAutomobileService from '../services/CreateAutomobileService';

class AutoMobileController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { color, licensePlate, carBrand } = request.body;

    const createAutomobile = new CreateAutomobileService();

    const automobile = await createAutomobile.execute({
      color,
      licensePlate,
      carBrand,
    });

    return response.json(automobile);
  }
}

export default AutoMobileController;
