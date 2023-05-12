//---------FONCTIONS UTILITAIRES------------------------------

//fonction qui retourne un entier aléatoire entre 2 valeurs
function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ligMini= (lig, niveau) => {
    let ligMin;
    if(lig===0){
        ligMin=0;
    } else if(lig===nbLigne(niveau)-1){
        ligMin=lig-1;
    } else {
        ligMin=lig-1;
    }
    return ligMin;
}

const ligMaxi= (lig, niveau) => {
    let ligMax; 
    if(lig===0){
        ligMax=lig+2;
    } else if(lig===nbLigne(niveau)-1){
        ligMax=lig+1;
    } else {
        ligMax=lig+2;
    }
    return ligMax;
}

const colMini= (col, niveau) => {
    let colMin;
    if(col===0){
        colMin=0;
    } else if(col===nbColonnes(niveau)-1){
        colMin=col-1;
    } else {
        colMin=col-1;
    }
    return colMin;
}

const colMaxi= (col, niveau) => {
    let colMax; 
    if(col===0){
        colMax=col+2;
    } else if(col===nbColonnes(niveau)-1){
        colMax=col+1;
    } else {
        colMax=col+2;
    }
    return colMax;
}

const ligCellule = (identifiant) => {
    return parseInt(identifiant.substr(5,1));
}

const colCellule = (identifiant) => {
    return parseInt(identifiant.substr(7,1));
}


/////////////////////////////////////////////////////////////////////////
                // let ligCell=ligCellule(cellule.id);
                // let colCell=colCellule(cellule.id);
                // console.log(cellule.id,ligCell);
                const afficherCellulesZeroMine = (ligCell,colCell) => {

                    let compteurMineAutour=0;
                    for(let lig=ligMini(ligCell,niveau);lig<ligMaxi(ligCell,niveau);lig++){
                        for(let col=colMini(colCell,niveau);col<colMaxi(colCell,niveau);col++){
                            let celluleAutour=document.getElementById(`cel-l${lig}c${col}`);
                            if(celluleAutour.value==="mine"){
                                compteurMineAutour++;
                            }
                        }
                    }

                    if(compteurMineAutour===0){ //si pas de mine autour on affiche toutes les cellules qui ne sont pas affichées
                        for(let lig=ligMini(ligCell,niveau);lig<ligMaxi(ligCell,niveau);lig++){
                            for(let col=colMini(colCell,niveau);col<colMaxi(colCell,niveau);col++){
                                let celluleAutour=document.getElementById(`cel-l${lig}c${col}`);
                                let ligCelluleAutour=ligCellule(celluleAutour.id);
                                let colCelluleAutour=colCellule(celluleAutour.id);
                                
                                //if(celluleAutour.dataset.class != "active"){ //si la cellule n'a pas encore été cliquée

                                


                                    if(celluleAutour.dataset.class !== "active"){
                                        console.log("dataset dataClass active");
                                        console.log("ligCelluleAutour", ligCelluleAutour,"colCelluleAutour",colCelluleAutour);
                                        if(celluleAutour.value==="null"){
                                            // console.log("null");
                                            celluleAutour.style.border="1px solid lightgray";
                                            celluleAutour.dataset.class="active";
                                            //A SUPPRIMER APRES TESTS
                                            celluleAutour.style.color="gray";
                                            
                                        } else {
                                            // console.log("valeur");
                                            celluleAutour.innerHTML=celluleAutour.value;
                                            celluleAutour.style.border="1px solid lightgray";
                                            celluleAutour.dataset.class="active";
                                            //A SUPPRIMER APRES TESTS
                                            celluleAutour.style.color="gray";
                                        }
                                        //on relance la fonction à partir de la cellule actuelle pour continuer le cycle
                                        afficherCellulesZeroMine(ligCelluleAutour,colCelluleAutour);
                                    }
                            }
                        }
                    }

                }

                //afficherCellulesZeroMine(ligCell,colCell);
                /////////////////////////////////////////////////////////////////


//---------------------------------------------------------


//----------FONCTIONS DE CONFIGURATION EN FONCTION DU NIVEAU DE DIFFICULTE-----------------
const nbMine = (niveau) => {
    let nombre;
    
    if(niveau==="facile"){
        nombre=10;
    } else if(niveau==="intermediaire"){
        nombre=40;
    } else if(niveau==="difficile"){
        nombre=99;
    }

    return nombre;
}

const nbLigne = (niveau) => {
    let nombre;
    
    if(niveau==="facile"){
        nombre=8;
    } else if(niveau==="intermediaire"){
        nombre=16;
    } else if(niveau==="difficile"){
        nombre=16;
    }

    return nombre;
}

const nbColonnes = (niveau) => {
    let nombre;
    
    if(niveau==="facile"){
        nombre=8;
    } else if(niveau==="intermediaire"){
        nombre=16;
    } else if(niveau==="difficile"){
        nombre=30;
    }

    return nombre;
}


//Création d'une constante récupérant la section démineur dans le HTML
const plateauDemineur = document.getElementById("demineur");
console.log(plateauDemineur);
plateauDemineur.style.border ="1px solid blue";


const creationPlateauDemineur = (niveau) => {
    const nombreMines = nbMine(niveau);
    const nombreLignes = nbLigne(niveau);
    const nombreColonnes = nbColonnes(niveau);

    

    //creation de chaque cellule de type button
    for(let lig=0; lig<nombreLignes;lig++){
        for(let col=0; col<nombreColonnes;col++){
            //création du bouton
            let newCell=document.createElement("BUTTON");
            //attribution d'un identifiant et d'une valeur nulle au bouton
            let identifiant=`cel-l${lig}c${col}`
            newCell.id=identifiant;
            newCell.value=null;
            newCell.className="cell";
            newCell.dataset.mine="faux";
            //propriétés CSS du bouton (longueur largeur boxSizing color border)
            newCell.style.width="100%";
            newCell.style.height="100%";
            newCell.style.border="4px outset #c0c0c0";

            //intégration du bouton à l'intérieur de la grille demineur
            plateauDemineur.appendChild(newCell);
        }
    }


    //attribution des propriétés de grille au plateauDemineur (grid-template-rows grid-template-columns)
    plateauDemineur.style.display="grid";
    plateauDemineur.style.boxSizing="border-box";
    plateauDemineur.style.borderCollapse="Collapse";
    if(niveau==="facile"){
        plateauDemineur.style.grid = `repeat(${nombreLignes},44px) / repeat(${nombreColonnes},44px)`;
        plateauDemineur.style.width=`calc(${nombreColonnes} * 44px)`;
    } else {
        plateauDemineur.style.grid = `repeat(${nombreLignes},22px) / repeat(${nombreColonnes},22px)`;
        plateauDemineur.style.width=`calc(${nombreColonnes} * 22px)`;
    }
    plateauDemineur.style.margin = "50px auto 50px auto";


    //fonction récursive pour le placement aléatoire des mines
    const placementDesMines = (nbMines) => {
        if(nbMines===0){return;}
        
        let x=entierAleatoire(0,nombreLignes-1);
        let y=entierAleatoire(0,nombreColonnes-1);
        let caseMine=document.getElementById(`cel-l${x}c${y}`);

        if(caseMine.value==="mine"){
            return placementDesMines(nbMines);
        } else {
            caseMine.value="mine"
            return placementDesMines(nbMines-1)
        }
    }
    //appel de la fonction de placement des mines
    placementDesMines(nombreMines);


    //fonction permettant d'attribuer à chaque case 1 valeur en fonction du nombre de mines qui l'entourent
    const setNombreMineAutour= () => {
        for(let lig=0; lig<nombreLignes;lig++){
            let ligMin = ligMini(lig,niveau);
            let ligMax = ligMaxi(lig,niveau);


            for(let col=0; col<nombreColonnes;col++){

                let colMin = colMini(col,niveau);
                let colMax = colMaxi(col,niveau);
                let caseLigCol=document.getElementById(`cel-l${lig}c${col}`);
                
                if(caseLigCol.value !="mine"){
                    let compteurMine=0;
                    for(let ligAutour=ligMin; ligAutour<ligMax;ligAutour++){
                        for(let colAutour=colMin; colAutour<colMax;colAutour++){
                            let caseAutour=document.getElementById(`cel-l${ligAutour}c${colAutour}`);
                            // console.log("caseAutour", caseAutour);
                            // console.log("caseAutour.value", caseAutour.value);
                            if(caseAutour.value==="mine" && caseAutour != caseLigCol){
                                compteurMine++;
                            }
                        }
                    }
                    if(compteurMine>0){
                        caseLigCol.value=compteurMine;
                    }
                }
                //A SUPPRIMER APRES LES ESSAIS
                caseLigCol.innerHTML=caseLigCol.value;
            }
        }
    }
    //appel de la fonction d'attribution des valeurs des cases
    setNombreMineAutour();

}

creationPlateauDemineur("facile");
//--------------------------------------------------------------------------------

const niveau="facile";

//--------INTERRACTION AVEC LES BOUTONS---------------------------------
const buttonMineFirst=document.getElementById("mineFirst");
const buttonValeurFirst=document.getElementById("valeurFirst");
const buttonCellDemineur=document.querySelectorAll('button[class="cell"]');

//actions si le bouton MineFirst est sélectionné
buttonMineFirst.addEventListener("focus", (event) =>{
    event.target.style.boxShadow="2px 2px 2px rgb(255, 119, 0)"
    event.target.style.border= "5px inset #c0c0c0";
    buttonValeurFirst.style.boxShadow="none";
    buttonValeurFirst.style.border= "5px outset #c0c0c0"

    buttonCellDemineur.forEach(cellule => {
        cellule.addEventListener("click", () => {
            console.log(cellule);
            let ligCell=ligCellule(cellule.id);
            let colCell=colCellule(cellule.id);

            if(cellule.dataset.class != "active"){ //si la cellule n'a pas encore été cliquée
                    if(cellule.dataset.mine != "vrai"){
                    cellule.style.backgroundImage = 'url("../Images/positionMine.jpg")';
                    cellule.dataset.mine = "vrai";
                    cellule.style.backgroundSize = "cover";
                    } else {
                        cellule.style.backgroundImage = 'none';
                    cellule.dataset.mine = "faux";
                    }

                
                } else {
                    afficherCellulesZeroMine(ligCell,colCell);
                }
            
        })
    })
    
})





buttonValeurFirst.addEventListener("click", (event) =>{
    event.target.style.boxShadow="2px 2px 2px rgb(255, 119, 0)"
    event.target.style.border= "5px inset #c0c0c0";
    buttonMineFirst.style.boxShadow="none";
    buttonMineFirst.style.border= "5px outset #c0c0c0"

    buttonCellDemineur.forEach(cellule => {
        cellule.addEventListener("click", () => {
            console.log(cellule);
            let ligCell=ligCellule(cellule.id);
            let colCell=colCellule(cellule.id);

            if(cellule.dataset.class != "active"){ //si la cellule n'a pas encore été cliquée
                if(cellule.value === "mine"){
                    // console.log("mine");
                    cellule.style.backgroundImage = 'url("../Images/mine.jpg")';
                } else if(cellule.value==="null"){
                    // console.log("null");
                    cellule.style.border="1px solid lightgray";
                    cellule.dataset.class="active";
                    //A SUPPRIMER APRES TESTS
                    cellule.style.color="gray";

                    afficherCellulesZeroMine(ligCell,colCell);
                    
                } else {
                    // console.log("valeur");
                    cellule.innerHTML=cellule.value;
                    cellule.style.border="1px solid lightgray";
                    cellule.dataset.class="active";
                    //A SUPPRIMER APRES TESTS
                    cellule.style.color="gray";
                }
            } else { //si la valeur est déjà affichée affiche les cases autour s'il n'y a pas de mine
                

                afficherCellulesZeroMine(ligCell,colCell);
                // /////////////////////////////////////////////////////////////////
            }
        })
    })

})

//-----------------------------------------------------------------

