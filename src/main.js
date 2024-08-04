var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var MAIN_SPAWN_NAME = 'Spawn1'

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns[MAIN_SPAWN_NAME].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + harvesters.length);

    if(upgraders.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns[MAIN_SPAWN_NAME].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(Game.spawns[MAIN_SPAWN_NAME].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[MAIN_SPAWN_NAME].spawning.name];
        Game.spawns[MAIN_SPAWN_NAME].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[MAIN_SPAWN_NAME].pos.x + 1,
            Game.spawns[MAIN_SPAWN_NAME].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}