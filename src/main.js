var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    var tower = Game.getObjectById('4c49472eab63c468fb84fec2');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgraders.length);
    
    if(upgraders.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Main building'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Main building'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    
                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builders.length);
    
    if(builders.length < 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Main building'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builders.length);
    
    if(builders.length < 6) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Main building'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'builder'}});
    }
    
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgraders.length);
    
    if(upgraders.length < 5) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Main building'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 4) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Main building'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});
    }
    

    
    if(Game.spawns['Main building'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Main building'].spawning.name];
        Game.spawns['Main building'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Main building'].pos.x + 1, 
            Game.spawns['Main building'].pos.y, 
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