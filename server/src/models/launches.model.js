const launches = new Map();

let lastestFlightNumber = 100;

const launch  = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 20, 2022'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);
function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function addNewLaunche(launch){
    lastestFlightNumber++;
    launches.set(
        lastestFlightNumber, 
        Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'Diem'],
        flightNumber: lastestFlightNumber,
        })
    );
}

function abortLaunch(launchId){
    const aborted = launches.get(launchId)
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

function getAllLaunches(){
    return Array.from(launches.values());
}

module.exports = {
    getAllLaunches,
    addNewLaunche,
    existsLaunchWithId,
    abortLaunch,
}