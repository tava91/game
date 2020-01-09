



import { classesList, stats, skillsProf, skillsExp, equip, spells} from '/modules/objects.js';
import {character} from '/modules/classes.js';


const onModelsLoad = ()=>{
   let  aUrls = ['/models/equipment.json', '/models/classes.json']
   let  aModels = []
    loadJson(aUrls,aModels)
};


const loadJson = (aUrls,models)=>{
    let url = aUrls[0];
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        console.log('Output: ', out);
        models.push(out);
        let newaUrl = aUrls.filter(v=>v != url);
        if(newaUrl.length > 0) loadJson(newaUrl,models);
        else  return onInit(models);
    }).catch(err => console.error(err));
}

export function onInit(oModel){
    const oEquipModel = oModel[0];
    const oClassesModel = oModel[1];
    const hero1 = new character(
        'Tavalas',
        'Human',
        null,
        null,
        5,
        {str: 8, dex: 14, cos: 14, int: 8, wis: 14, cha: 14},
        ['Rogue','Rogue','Rogue','Bard','Bard'],
        null,
        {armor:'Scale mail', leftHand:'Shield', rightHand:'Rapier'},
        null
    );
   console.log(hero1);

    hero1.ATTACK(oEquipModel, 'Rapier', 11);
    hero1.CA(oEquipModel);
    hero1.ST(oClassesModel,'Dexterity');
}

onModelsLoad();




  
 