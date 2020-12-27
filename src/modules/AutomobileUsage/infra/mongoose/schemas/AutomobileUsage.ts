import { Schema, Document, model, Model } from 'mongoose';

export interface IAutomobileUsageInterface {
  reason: string;
  automobile: string;
  driver: string;
  startDate?: string;
  endDate?: string;
}

export type AutomobileUsageDocument = Document & IAutomobileUsageInterface;

type AutomobileUsageModel = Model<AutomobileUsageDocument>;

const AutomobileUsageSchema = new Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    automobile: {
      type: String,
      required: true,
      ref: 'Automobile',
    },
    driver: {
      type: String,
      required: true,
      ref: 'Driver',
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

const AutomobileUsage = model<AutomobileUsageDocument, AutomobileUsageModel>(
  'AutomobileUsage',
  AutomobileUsageSchema,
  'AutomobileUsage',
);

export default AutomobileUsage;
