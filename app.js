


let baseurl = 'http://tavarelli91.altervista.org/dnd/';

import { classesList, stats, skillsProf, skillsExp, equip, spells} from "http://tavarelli91.altervista.org/dnd/modules/objects.js";
import {Day, character} from "http://tavarelli91.altervista.org/dnd/modules/classes.js";
import {editSheetTable} from "http://tavarelli91.altervista.org/dnd/components/creationTable.js";
import {sheetRecap} from "http://tavarelli91.altervista.org/dnd/components/sheetReCap.js";


const onModelsLoad = ()=>{
    let self = this;

    let  aUrls = [`${baseurl}models/equipment.json`, `${baseurl}models/classes.json`, `${baseurl}DB/Tavalas/character.json`]
    let  aModels = [];
    getJson(aUrls,aModels)
};

export const getJson = (aUrls,models)=>{
    let url =  typeof aUrls === 'string' ? aUrls : aUrls[0];
    fetch(url)
    .then(res => res.json())
    .then((out) => {
        console.log('Output: ', out);
        models.push(out);
        let newaUrl = aUrls.filter(v=>v != url);
        if(newaUrl.length > 0) getJson(newaUrl,models);
        else  return onInit(models);
    }).catch(err => console.error(err));
}

export const onInit = (oModel)=>{


    //..............
    //models
        const oEquipModel   = oModel[0];
        const oClassesModel = oModel[1];
        const oTavasModel   = oModel[2];
        const aClasses      = ['Barbarian','Bard','Cleric','Druid','Fighter','Monk','Paladin','Rogue','Ranger','Sorcerer','Warlok','Wizard'];
    //..............


     //..............
    //render components 
    const oTabella = new editSheetTable('sheetTable',{
        Classes: {list:aClasses,desc:oClassesModel},
        Character: oTavasModel
    },this);
    const oRiepilogo = new sheetRecap('sheetReCap', { 
        Character: oTavasModel
    },this);
    oTabella.render('sheetTable');
    oRiepilogo.render('sheetReCap');
    //..............


    //..............
    //classes
        const newDay = new Day(
            new Date(2020,1,1,9,0),
            new Date(),
            new Date(2020,1,9,23,0),
            null
        );

        const hero1 = new character(
            oTavasModel.Name,
            oTavasModel.Race,
            oTavasModel.Diet,
            oTavasModel.Bond,
            oTavasModel.Lv,
            oTavasModel['Life dice'],
            oTavasModel.State,
            oTavasModel.Stats,
            oTavasModel.Classes,
            oTavasModel.Skills,
            oTavasModel.Equip,
            oTavasModel.Spells,           
        );
        console.log(hero1);
    //..............


    //..............
    //Events

    let btn = document.getElementById('submitCharacterSheet');
    btn.addEventListener('click',oTabella.submit,false);

    newDay.dayCicle();
    hero1.ATTACK(oEquipModel, 'Rapier');
    hero1.ST(oClassesModel,'Dexterity');
    //hero1.setNewHP(oClassesModel);
    //hero1.REST(2,newDay,2);
    //..............
}

onModelsLoad();




  
 