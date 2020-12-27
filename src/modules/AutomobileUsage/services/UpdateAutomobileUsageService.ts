import AutomobileUsage, {
  IAutomobileUsageInterface,
} from '../infra/mongoose/schemas/AutomobileUsage';
import Driver from '../../Driver/infra/mongoose/schemas/Driver';
import AppError from '../../../shared/errors/AppError';

interface IRequestDTO {
  taxId: string;
}

class UpdateAutomobileUsageService {
  public async execute({
    taxId,
  }: IRequestDTO): Promise<IAutomobileUsageInterface> {
    const driver = await Driver.findOne({ taxId });

    if (!driver) {
      throw new AppError('Driver does not exist.');
    }

    const updateAutomobileUsage = await AutomobileUsage.findOneAndUpdate(
      {
        driver: taxId,
        endDate: undefined,
      },
      {
        endDate: dataAtualFormatada(),
      },
      {
        new: true,
      },
    );

    if (!updateAutomobileUsage) {
      throw new AppError('Driver is not using any automobile.');
    }

    return updateAutomobileUsage;
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

export default UpdateAutomobileUsageService;
