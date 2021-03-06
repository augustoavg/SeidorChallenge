import { Request, Response } from 'express';
import CreateDriverService from '../services/CreateDriverService';
import UpdateDriverService from '../services/UpdateDriverService';
import DeleteDriverService from '../services/DeleteDriverService';
import FindDriverService from '../services/FindDriverService';
import FindDriverByNameService from '../services/FindDriverByNameService';

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { taxId } = request.params;

    const deleteDriver = new DeleteDriverService();

    const driver = await deleteDriver.execute({
      taxId,
    });

    return response.json(driver);
  }

  public async findByTaxId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { taxId } = request.params;

    const findDriver = new FindDriverService();

    const driver = await findDriver.execute({
      taxId,
    });

    return response.json(driver);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const findDriverByName = new FindDriverByNameService();

    const driver = await findDriverByName.execute({
      data,
    });

    return response.json(driver);
  }
}

export default DriverController;
