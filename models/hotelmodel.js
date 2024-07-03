import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
    {
      HotelName: {
        type: String,
        required: [true, "Please add the hotel name"],
      },
    }
  );

const hotelModel = mongoose.model("hotel", hotelSchema);
export default hotelModel;