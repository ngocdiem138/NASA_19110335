const launches = new Map();

const axios = require('axios');
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

let lastestFlightNumber = 100;

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('November 20, 2022'),
    target: 'Kepler-442 b',
    customers: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

async function populateLaunches() {
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });
    if (response.status !== 200) {
        console.log('Problem downloading');
        throw new Error('Load failed');
    }

    const launchDocs = response.data.docs;
    if (launchDocs) {
        for (const launchDoc of launchDocs) {
            const payloads = launchDoc['payloads'];
            const customers = payloads.flatMap((payload) => {
                return payload['customers'];
            });

            const launch = {
                flightNumber: launchDoc['fligth_number'],
                mission: launchDoc['name'],
                rocket: launchDoc['rocket']['name'],
                launchDate: launchDoc['date_local'],
                upcoming: launchDoc['upcoming'],
                success: launchDoc['success'],
                customers,
            }
            await saveLaunch(launch);
        }
    }
}

async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    });
}

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    if (firstLaunch) {
        console.log('Launch data already loaded');
    } else {
        await populateLaunches();
    }
}

async function existsLaunchWithId(launchId) {
    return await findLaunch({
        flightNumber: launchId,
    });
}

async function getLastestFlightNumber() {
    const lastestLaunch = await launchesDatabase.findOne().sort('-flightNumber');

    if (!lastestLaunch) {
        return lastestFlightNumber;
    }
    return lastestLaunch.flightNumber;
}

launches.set(launch.flightNumber, launch);
function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

async function addNewLaunche(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (planet) {
        throw new Error('No matching planet')
    }
    const newFlightnumber = await getLastestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA', 'Diem'],
        flightNumber: newFlightnumber,
    });

    await saveLaunch(newLaunch);
}


async function abortLaunch(launchId) {
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming : false,
        success : false,
    });

    return aborted.modifiedCount == 1;
}

async function getAllLaunches(skip, limit) {
    return await launchesDatabase
    .find({}, { '_id': 0, '_v': 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
}

module.exports = {
    getAllLaunches,
    addNewLaunche,
    existsLaunchWithId,
    abortLaunch,
    loadLaunchData,
}