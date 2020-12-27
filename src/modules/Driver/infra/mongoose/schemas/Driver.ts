import { Schema, Document, model, Model } from 'mongoose';

export interface IDriverInterface {
  taxId: string;
  name: string;
}

export type DriverDocument = Document & IDriverInterface;

type DriverModel = Model<DriverDocument>;

const DriverSchema = new Schema(
  {
    _id: {
      type: String,
    },
    taxId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Driver = model<DriverDocument, DriverModel>(
  'Driver',
  DriverSchema,
  'Driver',
);

export default Driver;
