



import { classesList, stats, skills, skillsProf, skillsExp, equip, spells} from '/modules/objects.js';
import {character} from '/modules/classes.js';

export const onInit = function(obj){
    const hero1 = new character('', '', '', '', '', stats, classesList, skills, equip, spells);

    hero1.name              = 'Tavalas';
    hero1.race              = 'Human';
    hero1.lv                = 5;
    hero1.stats.str         = 8;
    hero1.stats.dex         = 14;
    hero1.stats.cos         = 14;
    hero1.stats.int         = 8;
    hero1.stats.wis         = 14;
    hero1.stats.cha         = 14;
    hero1.classes[0]        = 'Rogue';
    hero1.classes[1]        = 'Rogue';
    hero1.classes[2]        = 'Rogue';
    hero1.classes[3]        = 'Bard';
    hero1.classes[4]        = 'Bard';
    hero1.equip.armor       = 'Scale Mail';
    hero1.equip.leftHand    = 'Shield';
    hero1.equip.rightHand   = 'Rapier';

    hero1.ATTACK(obj, 'Rapier', 11)
    
    console.log(hero1);
}


  
 