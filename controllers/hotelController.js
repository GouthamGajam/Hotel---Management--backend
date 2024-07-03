import express from "express";
import hotelModel from '../models/hotelmodel.js'
import mongoose from "mongoose";
const router = express.Router();


//get all hotels
router.get("/",async(req,res)=>{
    try {
        let hotels = await hotelModel.find({});
        console.log(hotels);
        res.status(200).json(hotels)
    } catch (error) {
        console.log(error);
    }
});
// register new hotel via /hotels/register/
router.post("/register", async(req,res) => {
    try {
        const HotelName = req.body;

        // learn object desucrutunfg
        if(!HotelName) {
            res.status(400);
            throw new Error("Enter Valid HOtel Name");
        }
        const Hotel = await hotelModel.create(HotelName);
        res.status(200).json({Hotel});
    } catch (error) {
        console.log(error);
    }
});
// get specific hotel via id -  /hotels/id
router.get("/get/:id", async (req, res) => {
    try{
        const hotel = await hotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404);
            throw new Error("Hotel not found");
        }
        res.status(200).json(hotel);
    } catch (err) {
        console.log(err);
    }
});

// update specific hotel via id by put -  /hotels/id

router.put("/edit/:id", async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404);
            throw new Error("Hotel not found");
        }
        const updatedHotel = await hotelModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({message: updatedHotel});
    } catch(err) {
        console.log(err);
    }
});

// delete a specific hotel via id by put -  /hotels/id

router.delete("/delete/:id", async (req, res) => {
    try {
        const hotel = await hotelModel.findById(req.params.id);
        if(!hotel) {
            res.status(404);
            throw new Error("Hotel not found");
        }
        await hotelModel.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({message: "Hotel successfully deleted."});
    } catch(err) {
        console.log(err);
    }
});

//delete all hotels
router.delete("/delall", async(req, res) => {
    try {
        await hotelModel.deleteMany();
        res.status(200).json({message: "All hotels deleted successfully."});
    } catch(err) {
        console.log(err);
    }
});

//insert many
router.post("/insertmany", async (req, res) => {
    const docs = req.body;
    if (!Array.isArray(docs)) {
        return res.status(400).send('Input should be an array of documents');
    }
    try {
        const result = await hotelModel.insertMany(docs);
        res.status(200).json({message: `Added ${docs.length} new hotels.`});
    } catch (err) {
        console.log(err);
    }
});

export default router;