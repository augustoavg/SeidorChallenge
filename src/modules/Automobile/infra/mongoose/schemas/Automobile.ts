import { Schema, Document, model, Model } from 'mongoose';

export interface IAutomobileInterface {
  color: string;
  licensePlate: string;
  carBrand: string;
}

export type AutomobileDocument = Document & IAutomobileInterface;

type AutomobileModel = Model<AutomobileDocument>;

const AutomobileSchema = new Schema(
  {
    licensePlate: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    carBrand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Automobile = model<AutomobileDocument, AutomobileModel>(
  'Automobile',
  AutomobileSchema,
  'Automobile',
);

export default Automobile;
