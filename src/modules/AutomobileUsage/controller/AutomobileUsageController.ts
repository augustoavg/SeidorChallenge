import { Request, Response } from 'express';
import CreateAutomobileUsageService from '../services/CreateAutomobileUsageService';

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
}

export default AutoMobileUsageController;
