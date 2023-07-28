const Station = require('../models/station');

//create station

exports.createStation = async (req,res) =>{
    try {
        const newStation = new Station({
            name:req.body.name
        });
        await newStation.save();
        res.status(201).json(newStation);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}


exports.getAllStations = async (req,res) =>{
    console.log(req.cookies)
    try {
        const station = await Station.find();
        const data = station.map((x)=>{
            return{
                label:x?.name,
                value:x?._id
            }
        })

        res.status(200).send(data)
    } catch (error) {
        res.status(500).json({error:error});
    }
}


exports.getStationById = async (req,res) =>{
    try {
        const station = await Station.findById(req.params.id);
        if(!station){
            res.status(500).json({error:"Station Not Found"});
        }
        res.status(200).json(station);
    } catch (error) {
        res.status(500).json({error:error});
    }
}


exports.updateStationById = async (req,res) =>{
    try {
        const updateStation = await Station.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        })
        if(!updateStation){
            res.status(404).json({error:"Statation Not Found !"});
        }
        res.status(200).json(updateStation);
    } catch (error) {
        res.status(500).json({error:error});
    }

}


exports.deleteStation = async (req,res)=>{
    const deleteStation = await Station.findByIdAndDelete(req.params.id);
   try {
    if(!deleteStation){
        res.status(404).json({error:'Station Not Found'})
    }
    res.status(200).json({message:"Statuion deleted successfully"});
   } catch (error) {
     res.status(500).json({error:error});
   }
}