import {model, models, Schema} from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String, 
            required: true, 
            unique: true
        },
        avatar: {
            data: {
                type: Buffer,
                required: false // Adjust avatar field to be optional
            },
            contentType: {
                type: String,
                required: false
            },
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);
export const User = models?.User || model('User', UserSchema);