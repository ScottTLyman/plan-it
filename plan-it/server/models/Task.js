import { Schema } from "mongoose";

export const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    projectId: { type: Schema.Types.ObjectId, required: true },
    sprintId: { type: Schema.Types.ObjectId, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
    isComplete: { type: Boolean, required: true, default: false },
    completedOn: { type: Date },
    assignedTo: { type: [Schema.Types.ObjectId] }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})