import { Request, Response } from 'express';
import CreateAutomobileUsageService from '../services/CreateAutomobileUsageService';
import UpdateAutomobileUsageService from '../services/UpdateAutomobileUsageService';
import FindAutomobileUsageService from '../services/FindAutomobileUsageService';

class AutoMobileUsageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { driver, automobilePlate, reason } = request.body;

    const createAutomobileUsage = new CreateAutomobileUsageService();

    const automobileUsage = await createAutomobileUsage.execute({
      driver,
      automobilePlate,
      reason,
    });

    return response.json(automobileUsage);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { taxId } = request.params;

    const updateAutomobile = new UpdateAutomobileUsageService();

    const automobileUsage = await updateAutomobile.execute({
      taxId,
    });

    return response.json(automobileUsage);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const findAutomobile = new FindAutomobileUsageService();

    const automobileUsage = await findAutomobile.execute();

    return response.json(automobileUsage);
  }
}

export default AutoMobileUsageController;
