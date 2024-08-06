module.exports = function (creep) {

    if(creep.energy == 0) {
            var spwn = creep.pos.findClosest(FIND_MY_SPAWNS);
            creep.moveTo(spwn);
                if((spwn) > [199]) {
                spwn.transferEnergy(creep);
                }}
        else{
    
    var SR = creep.pos.findClosest(FIND_STRUCTURES, {
                       filter: function(object){
                           if(object.structureType != STRUCTURE_ROAD ) {
                               return false;
                           }
                           if(object.hits > object.hitsMax / 3) {
                            return false;
                          }
                           return true;
                       } 
                    });     
        creep.moveTo(SR);
        creep.repair(SR);} 
        };