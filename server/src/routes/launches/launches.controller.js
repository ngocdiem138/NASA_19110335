const {
    getAllLaunches,
    addNewLaunche,
    existsLaunchWithId,
    abortLaunch,
} = require('../../models/launches.model')

const { getPagination} = require('../../services/query')

async function httpGetAllLaunches(req, res){
    const {skip, limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res){
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error: 'Missing required launch property',
        });
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error: 'Invalid launch date',
        });
    }
    console.log(addNewLaunche(launch));
    await addNewLaunche(launch);
    
    return res.status(201).json(launch);
}
async function httpAbortLaunch(req,res){
    console.log("(req.params.id)", req.params.id)
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);
    if(!existsLaunch)
    {
        return res.status(404).json({
            error: 'Launch not found'
        });
    }
    const aborted = await abortLaunch(launchId);

    return res.status(200).json(aborted)
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};