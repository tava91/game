
export class character {
    constructor(name, race, diet, bond, lv, stats, classes, skills, equip, spells) {
        this.name       = name;
        this.race       = race;
        this.diet       = diet;
        this.bond       = bond;
        this.lv         = lv;
        this.stats      = stats;
        this.classes    = classes;
        this.skills     = skills;
        this.equip      = equip;
        this.spells     = spells;
    }
    ATTACK = function(obj,sWeapon){
        //trovo l'arma nella tabella
        //obj.Equipment.Weapons['Weapons List']['Martial Melee Weapons'].table
        let aWeaponList = obj.Equipment.Weapons['Weapons List'];
        let oTable;
        let weaponIndex;

        for(let weaponType  in aWeaponList){
            let obj = aWeaponList[weaponType];
            if(weaponIndex)break;
            for(let i=0; i< obj.table.Name.length;i++){
                if(obj.table.Name[i] == sWeapon){
                    oTable = obj.table;
                    weaponIndex = i;
                    break;
                }
            }
        }

        if (weaponIndex){
            let sWeaponDpsDesc        = oTable.Damage[weaponIndex];//1d8 piercing
            let sWeaponPropertiesDesc = oTable.Properties[weaponIndex];//Finesse
            let sWeaponDpsDices       = sWeaponDpsDesc.split(' ')[0];//'1d8'
            let sWeaponDpsType        = sWeaponDpsDesc.split(' ')[1];//'piercing'
            let iWeaponDpsDicesNumber = sWeaponDpsDices.split('d')[0];//'1'
            let iWeaponDpsDicesType   = sWeaponDpsDices.split('d')[1];//'8'
            let iProf = this.getProficency(this.lv);
            let iStat;

            switch(sWeaponPropertiesDesc){
                case "Finesse" || "Finesse, light" ||"Finesse, reach":
                    iStat = this.getMod(this.stats.dex);
                break;
                default: iStat = this.getMod(this.stats.str); break;
            }

            let r = iStat + iProf + this.rollDice(iWeaponDpsDicesType,iWeaponDpsDicesNumber);
            console.log('tot: '+ r);
            return r;
        }
        else{
            console.log('Nessuna arma equipaggiata!');
            return 'nessuna arma equipaggiata!'
        }
    };

    CA = function(){
        //obj.equipJson.Equipment.Armor['Armor List']['Medium Armor'].table.Armor[2]
    };

    TxC = function(){

    }

    getMod = function(stat){
        let r = Math.floor((stat - 10)/2);
        console.log('mod: '+ r);
        return r;

    };

    getProficency = function(lv){
        let r =  Math.ceil( 1 + (lv/4));
        console.log('prof: '+ r);
        return r;
    };

    rollDice = function(dice,number) {
        let r = 0;
        for(let i=0;i<number;i++){
            r = r +Math.round(Math.random()*dice+1);
        }
        console.log('dice score: '+ r);
        return r;
    }
  }


class Hero {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    // Adding a method to the constructor
    greet() {
        return `${this.name} says hello.`;
    }
}


