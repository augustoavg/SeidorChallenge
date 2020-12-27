import { Request, Response } from 'express';
import CreateDriverService from '../services/CreateDriverService';
import UpdateDriverService from '../services/UpdateDriverService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { taxId } = request.params;
    const { name } = request.body;

    const updateDriver = new UpdateDriverService();

    const driver = await updateDriver.execute({
      taxId,
      name,
    });

    return response.json(driver);
  }
}

export default DriverController;
