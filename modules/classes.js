
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
            let iWeaponDpsDicesNumber = +(sWeaponDpsDices.split('d')[0]);//'1'
            let iWeaponDpsDicesType   = +(sWeaponDpsDices.split('d')[1]);//'8'
            let iProf                 = this.getProficency(this.lv);
            let diceScore             = this.rollDice(iWeaponDpsDicesType,iWeaponDpsDicesNumber)
            let iStat;

            switch(sWeaponPropertiesDesc){
                case "Finesse" || "Finesse, light" || "Finesse, reach":
                    iStat = this.getMod(this.stats.dex);
                break;
                default: iStat = this.getMod(this.stats.str); break;
            }

            let r = iStat + iProf + diceScore;
            console.log('stat('+iStat+') + '+'prof('+iProf+') + '+'score dado('+diceScore+') + '+' => DPS tot: '+ r);

            return r;
        }
        else{
            console.log('Nessuna arma equipaggiata!');
            return 'nessuna arma equipaggiata!'
        }
    };

    CA = function(obj){
        //obj.equipJson.Equipment.Armor['Armor List']['Medium Armor'].table.Armor[2]
        let aArmorList   = obj.Equipment.Armor['Armor List'];
        let iDexBonus    = this.getMod(this.stats.dex);
        let iShieldBonus = this.equip.leftHand == 'Shield' || this.equip.rightHand == 'Shield' ? 2 : 0;
        let sArmorType;
        let oTable;
        let iArmorDex;
        let armorIndex;
        let armorScore;

        for(let armor  in aArmorList){
            let obj = aArmorList[armor];
            if(armorIndex)break;
            for(let i=0; i< obj.table.Armor.length;i++){
                if(obj.table.Armor[i] == this.equip.armor){
                    oTable = obj.table;
                    armorIndex = i;
                    sArmorType = armor;
                    break;
                }
            }
        }

        //se sArmorType ha un valore vuol dire che indossa un armatura
        //se non indossa armature il valore di default della ca è 10
        //"12 + Dex modifier (max 2)" => ["12","Dex modifier (max 2)"]=> "12"
        armorScore = sArmorType ? +(oTable["Armor Class (AC)"][armorIndex].split(' + ')[0]) : 10;

        //a seconda del tipo di armatura assegno il bonus di destrezza
        //case 'Heavy Armor'  => non usufruisce di nessun bonus alla destrezza
        //case 'Medium Armor' => usufruisce di massimo 2 punti bonus di destrezza
        //case 'Medium light' o senza armatura => usufruisce di tutto il bonus di destrezza
        switch(sArmorType){
            case 'Heavy Armor' : iArmorDex = 0; break;
            case 'Medium Armor': iArmorDex = iDexBonus > 2 ? 2 : iDexBonus; break;
            default:             iArmorDex = iDexBonus; break;
        }

        //sommo bonus ca, bonus scudo e bonus destrezza
        let r = armorScore + iArmorDex + iShieldBonus;
        console.log('ca('+armorScore+') + '+'iArmorDex('+armorScore+') + '+'scudo('+iShieldBonus+') + '+' => CA tot: '+ r);
        return r;
    };

    ST = function(oClassesModel,sSaves){
        let aSaves    = oClassesModel[this.classes[0]]['Class Features'].Proficiencies.content[3].split('** ')[1].split(', ');
        let saveStat  = sSaves.slice(0,3).toLowerCase();
        let iProf     =  this.getProficency(this.lv);
        let saveProf  = aSaves.includes(sSaves) ? iProf : 0;
        let statBonus = this.getMod( this.stats[saveStat]);
        let r         = statBonus + saveProf;
        console.log('sat('+statBonus+') +' + 'prof('+saveProf+') => ST tot: '+ r)
        return r;
    }

    HP = function(oClassesModel){
        let sDiceDescPerLv = oClassesModel[this.classes[0]]['Class Features']["Hit Points"].content[3].split('** ')[1].slice(0,4);
        let iDiceNumberPerLv = sDiceDescPerLv.split('d')[1].trim();
        let iDiceTypePerLv = sDiceDescPerLv.split('d')[0];
    }

    TxC = function(){

    }

    getMod = function(stat){
        let r = Math.floor((stat - 10)/2);
        return r;
    };

    getProficency = function(lv){
        let r =  Math.ceil( 1 + (lv/4));
        return r;
    };

    rollDice = function(dice,number) {
        let r = 0;
        for(let i=0;i<number;i++){
            r = r +Math.round(Math.random()*dice+1);
        }
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


