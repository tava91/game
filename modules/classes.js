
export class Day {
    constructor(startDate, currentDate, previusDate, endDate){
        this.startDate   = startDate;
        this.currentDate = currentDate;
        this.previusDate = previusDate;
        this.endDate    = endDate;
    }
    dayCicle = function(){
        setInterval(()=>{
          let newHour =  this.currentDate.getHours() +1;
          console.log('ora corrente : '+ this.currentDate.getDate() +'/'+ this.currentDate.getMonth() +'/'+this.currentDate.getFullYear() +'/  '+this.currentDate.getHours()+ '::'+this.currentDate.getMinutes());
          return this.currentDate.setHours(newHour);
         },60000);
    }
};

export class character {
    constructor(name, race, diet, bond, lv, lifeDice, state, stats, classes, skills, equip, spells) {
        this.name       = name;
        this.race       = race;
        this.diet       = diet;
        this.bond       = bond;
        this.lv         = lv;
        this.lifeDice   = lifeDice;
        this.state       = state;
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
        let hitScore              = this.rollDice(20,1);;
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

        if (weaponIndex && hitScore != 1){
            let sWeaponDpsDesc        = oTable.Damage[weaponIndex];//1d8 piercing
            let sWeaponPropertiesDesc = oTable.Properties[weaponIndex];//Finesse
            let sWeaponDpsDices       = sWeaponDpsDesc.split(' ')[0];//'1d8'
            let sWeaponDpsType        = sWeaponDpsDesc.split(' ')[1];//'piercing'
            let iWeaponDpsDicesNumber = +(sWeaponDpsDices.split('d')[0]);//'1'
            let iWeaponDpsDicesType   = +(sWeaponDpsDices.split('d')[1]);//'8'
            let iProf                 = this.getProficency(this.lv);
            let diceScore             = hitScore == 20 ? this.rollDice(iWeaponDpsDicesType,iWeaponDpsDicesNumber) : this.rollDice(iWeaponDpsDicesType,iWeaponDpsDicesNumber +1);
            let iStat;
          
            switch(sWeaponPropertiesDesc){
                case "Finesse" || "Finesse, light" || "Finesse, reach":
                    iStat = this.getMod(this.stats.dex);
                break;
                default: iStat = this.getMod(this.stats.str); break;
            }

            let r = iStat + iProf + diceScore;

            if(hitScore == 20 ) console.log('D20 =>' + hitScore + ' CRITICO!');         
            else                console.log('D20 =>' + hitScore);  
            console.log('stat('+iStat+') + '+'prof('+iProf+') + '+'score dado('+diceScore+') + '+' => DPS tot: '+ r);
            return r;
        }
        else if (weaponIndex && hitScore == 1){
            console.log('D20 =>' + hitScore + ' TIRO FALLITO!'); 
            return 'Uno naturale, TIRO FALLITO!!'
        }
        else{
            console.log('Nessuna arma equipaggiata!');
            return 'nessuna arma equipaggiata!'
        }
    };


    AC = function(obj){
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
        let aProfs     = oClassesModel[this.classes[0]]['Class Features'].Proficiencies.content;
        let sSkillDesc = aProfs.filter(item => item.substring(2,8) == 'Skills');
        let aSaves    = sSkillDesc[0].split('** ')[1].split(', ');
        let saveStat  = sSaves.slice(0,3).toLowerCase();
        let iProf     =  this.getProficency(this.lv);
        let saveProf  = aSaves.includes(sSaves) ? iProf : 0;
        let statBonus = this.getMod( this.stats[saveStat]);
        let r         = statBonus + saveProf;
        console.log('sat('+statBonus+') +' + 'prof('+saveProf+') => ST tot: '+ r)
        return r;
    };

    lifeDace = (oClassesModel,sClass)=>{
        //"**Hit Dice:** {{0}}d{{00}} per {{classname}} level"
            let list         = oClassesModel[sClass]
            let aHitpoints   = list[sClass]['Class Features']['Hit Points'].content;
            let sHitDiceDesc = aHitpoints.filter(item => item.substring(2,10) == 'Hit Dice');
            let sDice        = sHitDiceDesc[0].split('** ')[1].substring(0,4);
            let iType        = sDice.substring(2,4);
            let iNumber      = sDice.substring(0,1);
            console.log([iType,iNumber]);
    }


    setNewHP = function(oClassesModel){
        /*esempio di oggetto hit points:
            MODEL['Nome classe']['Class Features']["Hit Points"]
            .content[2] =  "**Hit Points at Higher Levels:** 1d8 (or 5) + your Constitution modifier per rogue level after 1st";
        */
       /*
        let sDiceDescPerLv    = oClassesModel[this.classes[0]]['Class Features']["Hit Points"].content[2].split('** ')[1].slice(0,4);
        let iDiceNumberPerLv  = +(sDiceDescPerLv.split('d')[0]);
        let iDiceTypePerLv    = +(sDiceDescPerLv.split('d')[1].trim());
        */
        let iCosBonus         = this.getMod(this.stats.cos);
        let iHpScorePerLv     = this.state.hp.max > 0 ? this.rollDice(this.lifeDice.type,this.lifeDice.number) : this.lifeDice.type*his.lifeDice.number;
        let r                 = this.state.hp.max + iCosBonus + iHpScorePerLv;
        console.log('currentHp('+this.state.hp.max+') + cosBonus('+iCosBonus+') + hpScore('+ iHpScorePerLv+') => HP tot: '+ r)
        return this.state.hp.max = r;
    };

    REST = function(iOre,oDay,iNumberLifeDice){
        //è lungo o breve?
            //se lungo:
                // ho già fatto un riposo lungo nelle ultime 24 ore ?
                    //se si=> errore
                    //se no: 
                        //il pg indossa un armatura normale o media?
                            //sei si =>recuperi solo 1/4 dei dice life spesi + ts cos (cd 10) per soffrire non soffrire di 1 lv di esaustione
                            //se no =>ristora tutti i hp, tutte le spell e meta dei life dice
            //se breve
                // ho già fatto 2 riposi brevi nelle ultime 24 ore ?
                    //se si => errore
                    //se no:
                        //il pg indossa un armatura normale o media?
                            //se no => recupero dadi vita in base a quanti dad vita spendo ( max lv)
                            //se si => bho

        let toDay           = oDay.currentDate;
        let tomorrow        = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate(), toDay.getHours() + iOre, toDay.getMinutes());
        let longRest        = iOre >= 8 && tomorrow.getHours() >=  oDay.previusDate.getHours() + 24;
        let shortRest   = this.state.restSlot == 2 || longRest ? false : true;
    
        if(longRest){
            let currentLifeDice = this.state.lifeDice;
            let totLifeDice     = this.lv;

            //mando avanti di un giorno lo state dell'oggetto giorno e 
            //salvo il giorno corrente come giorno passato
            oDay.previusDate    = toDay;
            oDay.currentDate    = tomorrow;

            //essendo un nuovo giorno resetto gli slot usati di short rest
            this.state.restSlot = 0;
            this.state.lifeDice = currentLifeDice + (totLifeDice/2) > totLifeDice ? totLifeDice : currentLifeDice + (totLifeDice/2);

            //salvo il nuovo valore nei temporary hp
            console.log('HP: '+this.state.hp.temporary+', dadi vita:'+this.stat.lifeDice+', rest slot: '+this.state.restSlot)
            return this.state.hp.temporary = this.state.hp.max;
        } 
        else if(shortRest){
            let expendedSlotDiceLife = this.state.lifeDice >= iNumberLifeDice ? iNumberLifeDice : this.state.lifeDice
            let roll = this.rollDice(this.lifeDice.type, this.lifeDice.number * expendedSlotDiceLife);
            let point = roll + this.getMod(this.stats.cos);

            //spendo gli slot usati di short rest
            this.state.lifeDice = this.state.hp.temporary == this.state.hp.max ? this.state.lifeDice : this.state.lifeDice - expendedSlotDiceLife;

            //salvo il nuovo valore nei temporary hp
            this.state.hp.temporary = this.setRecoveredHP(point);
            console.log('HP: '+this.state.hp.temporary+', dadi vita:'+this.state.lifeDice+', rest slot: '+this.state.restSlot)
            return this.state.hp.temporary;

        } else{
            console.log('spiacente non hai più riposi disponibili!')
        }

    };

    setRecoveredHP = function(newHp){
        return this.state.hp.temporary + newHp >= this.state.hp.max ? this.state.hp.max : this.state.hp.temporary + newHp;
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
            let min = Math.ceil(1);
            let max = Math.floor(dice);
            r = r + Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso 
        }
        return r;
    }
  }


