import { Schema } from "mongoose";

export const SprintSchema = new Schema(
  {
    name: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    projectId: { type: Schema.Types.ObjectId, required: true, }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})