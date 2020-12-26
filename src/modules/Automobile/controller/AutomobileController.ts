import { Request, Response } from 'express';
import CreateAutomobileService from '../services/CreateAutomobileService';
import UpdateAutomobileService from '../services/UpdateAutomobileService';
import DeleteAutomobileService from '../services/DeleteAutomobileService';
import FindByLicensePlateAutomobileService from '../services/FindByLicensePlateAutomobileService';
import FindAutomobileService from '../services/FindAutomobileService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { licensePlate } = request.params;
    const { color, carBrand } = request.body;

    const updateAutomobile = new UpdateAutomobileService();

    const automobile = await updateAutomobile.execute({
      licensePlate,
      color,
      carBrand,
    });

    return response.json(automobile);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { licensePlate } = request.params;

    const deleteAutomobile = new DeleteAutomobileService();

    const automobile = await deleteAutomobile.execute({
      licensePlate,
    });

    return response.json(automobile);
  }

  public async findByLicensePlate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { licensePlate } = request.params;

    const findAutomobileByLicensePlate = new FindByLicensePlateAutomobileService();

    const automobile = await findAutomobileByLicensePlate.execute({
      licensePlate,
    });

    return response.json(automobile);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const findAutomobile = new FindAutomobileService();

    const automobile = await findAutomobile.execute({
      data,
    });

    return response.json(automobile);
  }
}

export default AutoMobileController;
