// #region imports
import mongoose, {Schema, Document} from "mongoose";
// #endregion imports

export interface IOperation extends Document {
    operation: string,
    inputs: string,
    result: string,
    responseTime: number,
}

const OperationSchema: Schema = new Schema(
    {
        operation: {
            type: String,
            require: true,
            trim: true
        },
        inputs: {
            type: String,
            require: true,
            trim: true
        },
        result: {
            type: String,
            require: true,
            trim: true
        },
        responseTime: {
            type: Number,
            require: true,
            default: 0
        }
    }, 
    {
        timestamps: true
    }
);

const Operation = mongoose.model<IOperation>('Operations', OperationSchema);

export default Operation;