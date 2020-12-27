import { Request, Response } from 'express';
import CreateAutomobileUsageService from '../services/CreateAutomobileUsageService';
import UpdateAutomobileUsageService from '../services/UpdateAutomobileUsageService';

class AutoMobileUsageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { driver, automobilePlate, reason } = request.body;

    const createAutomobile = new CreateAutomobileUsageService();

    const automobile = await createAutomobile.execute({
      driver,
      automobilePlate,
      reason,
    });

    return response.json(automobile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { taxId } = request.params;

    const updateAutomobile = new UpdateAutomobileUsageService();

    const automobile = await updateAutomobile.execute({
      taxId,
    });

    return response.json(automobile);
  }
}

export default AutoMobileUsageController;
