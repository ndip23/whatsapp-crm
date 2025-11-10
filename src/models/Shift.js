import mongoose from "mongoose";

const shiftSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    }, // e.g. "Morning Shift"
    startTime: { 
        type: String, 
        required: true 
    }, // e.g. "08:00"
    endTime: { 
        type: String, 
        required: true 
    },   // e.g. "16:00"
    isActive: { 
        type: Boolean, 
        default: true 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shift", shiftSchema);
