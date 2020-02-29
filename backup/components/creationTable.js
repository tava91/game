export class editSheetTable {  
    constructor(id,State){
        this.id = id,
        this.State = State
    }

    render = (id)=>{
        document.getElementById(id)
        .innerHTML = (
            `<form action="/api" method="post">
                <fieldset>
                    <h4>Background</h4>
                    <label>Nome</label>
                    <input class="info" value="" placeholder="Nome Pg" name="Name" required>
                    <label>Razza</label>
                    <input class="info" value="" placeholder="Razza" name="Race" required>
                    <label>Divinità</label>
                    <input class="info" value="" placeholder="Divinità" name="Diet" >
                    <label>Ideale</label>
                    <input class="info" value="" placeholder="Ideale" name="Bond" >
                    </fieldset>
                    <fieldset>
                    <h4>Statistiche</h4>
                    <label>Forza</label>
                    <input class="info" value="8" type="number" min="8" max="20" placeholder="Forza"        name="Stats.str" required>
                    <label>Destrezza</label>
                    <input class="info" value="8" type="number" min="8" max="20" placeholder="Destrezza"    name="Stats.dex" required>
                    <label>Costituzione</label>
                    <input class="info" value="8" type="number" min="8" max="20" placeholder="Costituzione" name="Stats.cos" required>
                    <label>Intelligenza</label>
                    <input class="info" value="8" type="number" min="8" max="20" placeholder="intelligenza" name="Stats.int" required>
                    <label>Saggezza</label>
                    <input class="info" value="8" type="number" min="8" max="20" placeholder="Saggezza"     name="Stats.wis" required>
                    <label>Carisma</label>
                    <input class="info" value="8" type="number" min="8" max="20" placeholder="Carisma"      name="Stats.cha" required>
                </fieldset>
                <fieldset>
                    <label>Classe</label>
                    <select class="info" placeholder="Seleziona una classe" name="Classes[0]">
                        <option value="">Seleziona una classe</option>
                        ${this.State.Classes.map(item => 
                            `<option name="${item}" value="${item}">${item}</option>`
                        ).join('')}
                </select>
                </fieldset>
                <fieldset>
                    <h4>Equipaggiamento</h4>
                    <label>Armatura</label>
                    <select class="info" placeholder="Seleziona un armatura" name="Equip.armor">
                        <option value="">Senza armatura</option>
                        <option value="">Padded (Armature leggere)</option>
                        <option value="">Leather (Armature leggere)</option>
                        <option value="">Studded leather (Armature leggere)</option>
                        <option value="">Armature medie</option>
                        <option value="Hide">Hide (Armature medie)</option>
                        <option value="Chain shirt">Chain shirt (Armature medie)</option>
                        <option value="Scale mail">Scale mail (Armature medie)</option>
                        <option value="Breastplate">Breastplate (Armature medie)</option>
                        <option value="Half plate">Half plate (Armature medie)</option>
                        <option value="">Armature pesanti</option>
                        <option value="Ring mail">Ring mail (Armature pesanti)</option>
                        <option value="Chain mail">Chain mail (Armature pesanti)</option>
                        <option value="Splint">Splint (Armature pesanti)</option>
                        <option value="Plate">Plate (Armature pesanti)</option>
                    </select>
            
                    <label>Mano destra</label>
                    <select class="info" placeholder="Seleziona un equipaggiamento" name="Equip.rightEnd">
                        <option value="">Mano destra vuota</option>
                        <option value="Shield">Scudo</option>
                        <option value="Club">Club (Arma leggera)</option>
                        <option value="Dagger">Dagger (Arma leggera)</option>
                        <option value="Greatclub">Greatclub (Arma leggera)</option>
                        <option value="Handaxe">Handaxe (Arma leggera)</option>
                        <option value="Javelin">Javelin (Arma leggera)</option>
                        <option value="Light hammer">Light hammer (Arma leggera)</option>
                        <option value="Mace">Mace (Arma leggera)</option>
                        <option value="Quarterstaff">Quarterstaff (Arma leggera)</option>
                        <option value="Sickle">Sickle (Arma leggera)</option>
                        <option value="Spear">Spear (Arma leggera)</option>
                        <option value="Battleaxe">Battleaxe (Arma da guerra)</option>
                        <option value="Flail">Flail (Arma da guerra)</option>
                        <option value="Glaive">Glaive (Arma da guerra)</option>
                        <option value="Greataxe">Greataxe (Arma da guerra)</option>
                        <option value="Greatsword">Greatsword (Arma da guerra)</option>
                        <option value="Halberd">Halberd (Arma da guerra)</option>
                        <option value="Lance">Lance (Arma da guerra)</option>
                        <option value="Longsword">Longsword (Arma da guerra)</option>
                        <option value="Maul">Maul (Arma da guerra)</option>
                        <option value="Morningstar">Morningstar (Arma da guerra)</option>
                        <option value="Pike">Pike (Arma da guerra)</option>
                        <option value="Rapier">Rapier (Arma da guerra)</option>
                        <option value="Scimitar">Scimitar (Arma da guerra)</option>
                        <option value="Shortsword">Shortsword (Arma da guerra)</option>
                        <option value="Trident">Trident (Arma da guerra)</option>
                        <option value="War pick">War pick (Arma da guerra)</option>
                        <option value="Warhammer">Warhammer (Arma da guerra)</option>
                        <option value="Whip">Whip (Arma da guerra)</option>
                        <option value="Blowgun">Blowgun (Arma a distanza da guerra)</option>
                        <option value="Crossbow">Crossbow, han (Arma a distanza da guerra)</option>
                        <option value="Crossbow">Crossbow, heavy (Arma a distanza da guerra)</option>
                        <option value="Longbow">Longbow (Arma a distanza da guerra)</option>
                        <option value="Net">Net (Arma a distanza da guerra)</option>
                        <option value="Crossbow, light">Crossbow, light (Arma a distanza leggera)</option>
                        <option value="Dart">Dart (Arma a distanza leggera)</option>
                        <option value="Shortbow">Shortbow (Arma a distanza leggera)</option>
                        <option value="Sling">Sling (Arma a distanza leggera)</option>
                    </select>

                    <label>Mano sinistra</label>
                    <select class="info" placeholder="Seleziona un equipaggiamento" name="Equip.leftHand">
                        <option value="">Mano sinistra vuota</option>
                        <option value="Shield">Scudo</option>
                        <option value="Club">Club (Arma leggera)</option>
                        <option value="Dagger">Dagger (Arma leggera)</option>
                        <option value="Greatclub">Greatclub (Arma leggera)</option>
                        <option value="Handaxe">Handaxe (Arma leggera)</option>
                        <option value="Javelin">Javelin (Arma leggera)</option>
                        <option value="Light hammer">Light hammer (Arma leggera)</option>
                        <option value="Mace">Mace (Arma leggera)</option>
                        <option value="Quarterstaff">Quarterstaff (Arma leggera)</option>
                        <option value="Sickle">Sickle (Arma leggera)</option>
                        <option value="Spear">Spear (Arma leggera)</option>
                        <option value="Battleaxe">Battleaxe (Arma da guerra)</option>
                        <option value="Flail">Flail (Arma da guerra)</option>
                        <option value="Glaive">Glaive (Arma da guerra)</option>
                        <option value="Greataxe">Greataxe (Arma da guerra)</option>
                        <option value="Greatsword">Greatsword (Arma da guerra)</option>
                        <option value="Halberd">Halberd (Arma da guerra)</option>
                        <option value="Lance">Lance (Arma da guerra)</option>
                        <option value="Longsword">Longsword (Arma da guerra)</option>
                        <option value="Maul">Maul (Arma da guerra)</option>
                        <option value="Morningstar">Morningstar (Arma da guerra)</option>
                        <option value="Pike">Pike (Arma da guerra)</option>
                        <option value="Rapier">Rapier (Arma da guerra)</option>
                        <option value="Scimitar">Scimitar (Arma da guerra)</option>
                        <option value="Shortsword">Shortsword (Arma da guerra)</option>
                        <option value="Trident">Trident (Arma da guerra)</option>
                        <option value="War pick">War pick (Arma da guerra)</option>
                        <option value="Warhammer">Warhammer (Arma da guerra)</option>
                        <option value="Whip">Whip (Arma da guerra)</option>
                        <option value="Blowgun">Blowgun (Arma a distanza da guerra)</option>
                        <option value="Crossbow">Crossbow, han (Arma a distanza da guerra)</option>
                        <option value="Crossbow">Crossbow, heavy (Arma a distanza da guerra)</option>
                        <option value="Longbow">Longbow (Arma a distanza da guerra)</option>
                        <option value="Net">Net (Arma a distanza da guerra)</option>
                        <option value="Crossbow, light">Crossbow, light (Arma a distanza leggera)</option>
                        <option value="Dart">Dart (Arma a distanza leggera)</option>
                        <option value="Shortbow">Shortbow (Arma a distanza leggera)</option>
                        <option value="Sling">Sling (Arma a distanza leggera)</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label>Conferma</label>
                    <input id="submitCharacterSheet" value="Salva" type="submit"  name="Button Submit">
                </fieldset>
            </form>`
        );
    }
   
    submit = (event)=>{
        event.preventDefault();
        let aInfos = document.getElementsByClassName('info');
        let shadowObj={};
        let obj={};
        let fakeObj;

        for (let info of aInfos){
            let aName = info.name.split('.');
            let value = info.value;
            if(value == 'Bardo')debugger;

            for (let i=0;i < aName.length;i++){
                let v = aName[i].split('[');
                let isArray = v.length > 1;
                v = v[0];
                let aIndex = isArray ? +(v[1].slice(0, -1)) : false;
                if(i != aName.length -1){
                    //salvo l'oggetto solo se non esiste ancora
                    if(!obj[v]){
                        obj[v]={};
                    };
                    fakeObj = true;
                    shadowObj = shadowObj[v];
                } 
                else {
                    if(fakeObj){
                        shadowObj[v] = value;
                        obj[aName[0]]= shadowObj;
                        shadowObj = obj;
                        fakeObj = false;
                    }
                    else{
                        if(isArray && !obj[v]) obj[v] = [];
                        if(aIndex === ']' || aIndex === 0) obj[v].push(value) 
                        else obj[v] = typeof aIndex === 'number' ? obj[v][aIndex].push(value) : value;
                        shadowObj = obj;
                        break;
                    }
                }
            };
        }
        console.log('obj => '+obj);

        fetch('../server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            //mode: 'no-cors',
            body: JSON.stringify(obj)
        }).then(function(response) {
            debugger;

            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(function(data) {
            console.log(data);
        });
            
    };
    
};


