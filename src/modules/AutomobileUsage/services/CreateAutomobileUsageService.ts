import AutomobileUsage, {
  IAutomobileUsageInterface,
} from '../infra/mongoose/schemas/AutomobileUsage';
import Automobile from '../../Automobile/infra/mongoose/schemas/Automobile';
import Driver from '../../Driver/infra/mongoose/schemas/Driver';
import AppError from '../../../shared/errors/AppError';

interface IRequestDTO {
  driver: string;
  automobilePlate: string;
  reason: string;
}

class CreateAutomobileUsageService {
  public async execute({
    driver,
    automobilePlate,
    reason,
  }: IRequestDTO): Promise<IAutomobileUsageInterface> {
    const findAutomible = await Automobile.findOne({
      licensePlate: automobilePlate,
    });

    if (!findAutomible) {
      throw new AppError('Automobile does not exist.');
    }

    const findDriver = await Driver.findOne({ taxId: driver });

    if (!findDriver) {
      throw new AppError('Driver does not exist.');
    }

    const automobileAlreadyUsed: IAutomobileUsageInterface | null = await AutomobileUsage.findOne(
      {
        automobile: automobilePlate,
      },
    );

    if (automobileAlreadyUsed && !automobileAlreadyUsed.endDate) {
      throw new AppError('Automobile is already being used by other driver.');
    }

    const driverAlreadyBusy: IAutomobileUsageInterface | null = await AutomobileUsage.findOne(
      {
        driver,
      },
    );

    if (driverAlreadyBusy && !driverAlreadyBusy.endDate) {
      throw new AppError('Driver is already using other automobile.');
    }

    const automobile = await AutomobileUsage.create({
      driver,
      automobile: automobilePlate,
      reason,
      startDate: dataAtualFormatada(),
    });

    return automobile;
  }
}

function dataAtualFormatada() {
  const data = new Date();
  const dia = data.getDate().toString();
  const diaF = dia.length === 1 ? `0${dia}` : dia;
  const mes = (data.getMonth() + 1).toString();
  const mesF = mes.length === 1 ? `0${mes}` : mes;
  const anoF = data.getFullYear();
  return `${diaF}/${mesF}/${anoF}`;
}

export default CreateAutomobileUsageService;
