import { Request, Response } from 'express';
import CreateDriverService from '../services/CreateDriverService';

class DriverController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { taxId, name } = request.body;

    const createDriver = new CreateDriverService();

    const driver = await createDriver.execute({
      taxId,
      name,
    });

    return response.json(driver);
  }
}

export default DriverController;