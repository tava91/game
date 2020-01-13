export class sheetRecap {
    constructor(id,State){
        this.id = id,
        this.State = State
    }
    render = (id)=>{
        document.getElementById(id)
        .innerHTML = (
            `<h1>${this.State.Character.Name} Statistiche</h1>
            <article>
                <h3>${this.State.Character.Name}</h3>
                <h4><em>${this.State.Character.Race}</em></h4>
                <h5><b>${this.State.Character.Lv}</b></h5>
    
                <h3>Background</h3>
                <ul>
                    <li>${this.State.Character.Diet}</li>
                    <li>${this.State.Character.Bond}</li>
                </ul>
    
                <h3>Vita</h3>
                <ul>
                    <li>${this.State.Character['Life dice'].type}</li>
                    <li>${this.State.Character['Life dice'].number}</li>
                </ul>
    
                <h3>Caratteristiche</h3>
                <ul>
                    <li>${this.State.Character.Stats.str}</li>
                    <li>${this.State.Character.Stats.dex}</li>
                    <li>${this.State.Character.Stats.cos}</li>
                    <li>${this.State.Character.Stats.int}</li>
                    <li>${this.State.Character.Stats.wis}</li>
                    <li>${this.State.Character.Stats.cha}</li>
                </ul>
    
                <h3>Classi</h3>
                <ul>
                    ${this.State.Character.Classes.map(item => 
                        `<li>${item}</li>`
                    ).join('')}
                </ul>
                
                <h3>Equipaggiamento</h3>
                <ul>
                    <li>${this.State.Character.Equip.armor}</li>
                    <li>${this.State.Character.Equip.leftHand}</li>
                    <li>${this.State.Character.Equip.rightHand}</li>
                </ul>
            </article>`
        );
    }
};

    
