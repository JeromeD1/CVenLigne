//---------FONCTIONS UTILITAIRES------------------------------

//fonction qui retourne un entier aléatoire entre 2 valeurs
function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

//--------------------------------------
//4 fonctions retournant les lig col min et max des cellules autour de la cellule cliquée
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
//-----------------------------------

//------------------------------
//--fonctions retournant le numéro de la ligne ou de la colonne en fonction de l'identifiant de la cellule
const ligCellule = (identifiant) => {
    if(identifiant.length===8){
        return parseInt(identifiant.substr(5,1));
    } else {
        if(isNaN(identifiant.substr(6,1))){
            return parseInt(identifiant.substr(5,1));
        } else {
            return parseInt(identifiant.substr(5,2));
        }
    }
}
// console.log("cel-l11c8",ligCellule("cel-l11c8"),"cel-l11c22",ligCellule("cel-l11c22"));
// console.log("cel-l1c18",ligCellule("cel-l1c18"),"cel-l2c22",ligCellule("cel-l2c22"));

//cel-l11c8
//cel-l11c22

const colCellule = (identifiant) => {
    if(identifiant.length===8){
        return parseInt(identifiant.substr(7,1));
    } else if(identifiant.length===9){
        if(isNaN(identifiant.substr(6,1))){
            return parseInt(identifiant.substr(7,2));
        } else {
            return parseInt(identifiant.substr(8,1));
        }
    } else {
        return parseInt(identifiant.substr(8,2));
    }
}
//-------------------------

//fonction permettant d'afficher toutes les mines autour de la cellule sur laquelle une mine a été positionnée par erreur
const vraiePositionMine = (ligCell,colCell) => {
    for(let lig=ligMini(ligCell,niveau);lig<ligMaxi(ligCell,niveau);lig++){
        for(let col=colMini(colCell,niveau);col<colMaxi(colCell,niveau);col++){
            let celluleAutour=document.getElementById(`cel-l${lig}c${col}`);
            if(celluleAutour.value==="mine" && celluleAutour.dataset.mine !=="vrai"){
                celluleAutour.style.backgroundImage= 'url("../Images/explosion.gif")';
            }
        }
    }
}


/////////////////////////////////////////////////////////////////////////

//fonction permettant d'afficher toutes les cellules qui n'ont pas de mine lorsqu'on clique sur une cellule déjà activée
//les cellules arrêtent de s'afficher s'il y a une mine non repérée à proximité
//si une mine a été placée à une mauvaise position la partie est perdue
const afficherCellulesZeroMine = (ligCell,colCell) => {

    let compteurMineAutour=0;
    for(let lig=ligMini(ligCell,niveau);lig<ligMaxi(ligCell,niveau);lig++){
        for(let col=colMini(colCell,niveau);col<colMaxi(colCell,niveau);col++){
            // console.log("ligmini",ligMini(ligCell,niveau),"ligmax",ligMaxi(ligCell,niveau),"colmini",colMini(colCell,niveau),"colmax",colMaxi(colCell,niveau));
            let celluleAutour=document.getElementById(`cel-l${lig}c${col}`);
            
            if(celluleAutour.value !=="mine" && celluleAutour.dataset.mine ==="vrai"){
                //si le joueur a placé une mine au mauvais endroit autour de la cellule cliquée : partie perdue
                partiePerdue();
                //l'image de la mine mal placée est barrée (chargement d'une image barrée)
                celluleAutour.style.backgroundImage = 'url("../Images/positionMinePerdu.png")';
                //le placement réel de la mine est affiché
                const ligCellAutour = ligCellule(celluleAutour.id);
                const colCellAutour = colCellule(celluleAutour.id);
                vraiePositionMine(ligCellAutour,colCellAutour);
                return;
            }
            else if(celluleAutour.value==="mine" && celluleAutour.dataset.mine !=="vrai"){
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
                        // console.log("dataset dataClass active");
                        // console.log("ligCelluleAutour", ligCelluleAutour,"colCelluleAutour",colCelluleAutour);
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

    
                
//créons une fonction qui va chronométrer le temps passé pour réaliser le suduku
const chronoElement=document.getElementById("tempsEcoule");
let temps=0;
let estArrete=false;
let time;
function augmenterTemps(){
    let minutes =parseInt(temps/60,10);
    let secondes=parseInt(temps % 60,10);
minutes=minutes <10 ? "0" + minutes:minutes;
secondes=secondes <10 ? "0" + secondes:secondes;

    chronoElement.innerHTML= minutes + ":" + secondes;
    temps++;


    if(estArrete===false){
    time=setTimeout(augmenterTemps,1000);
    }
}
augmenterTemps();


//fonction décrivant ce qu'il se passe quand le joueur perd la partie
const partiePerdue = () => {
    
    //les cellules ne sont plus cliquables
    buttonCellDemineur.forEach( (cellule) => {
        cellule.disabled=true;
        });

    const imagePerdu = document.createElement("img");
    imagePerdu.src="../Images/emoticone-moqueur.gif";
    imagePerdu.id="imagePerdu";
    plateauDemineur.appendChild(imagePerdu);
    plateauDemineur.style.position="relative";
    imagePerdu.style.transition="transform 5s";
    imagePerdu.style.transform="scale(5)";
    buttonNouvellePartie.style.backgroundImage='url("../Images/emoticone-perdu.png")';

    clearTimeout(time);
}




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
plateauDemineur.className="plateauDemineur";

// création d'une constante pour récupérer le bandeau superieur et le formDifficulté
const bandeauSuperieur=document.getElementById("bandeauSuperieur");
const formDifficulte=document.querySelector("form");
//création constante pour récupérer la difficulté
const difficulte=document.querySelectorAll('input[name="niveau"]');
// console.log(difficulte);
// console.log(difficulte.length);
let niveau;
for(let i=0;i<difficulte.length;i++){
    // console.log(difficulte[i].value);
    if(difficulte[i].checked===true){
        niveau=difficulte[i].value;
    }
}
//création constante pour récupérer le bouton nouvelle partie
const buttonNouvellePartie = document.getElementById("buttonNouvellePartie");

// console.log(niveau);
// console.log(niveau.value);


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
            // newCell.style.width="100%";
            // newCell.style.height="100%";
            // newCell.style.border="4px outset #c0c0c0";

            //intégration du bouton à l'intérieur de la grille demineur
            plateauDemineur.appendChild(newCell);
        }
    }


    //attribution des propriétés de grille au plateauDemineur (grid-template-rows grid-template-columns)

    if(niveau==="facile"){
        if(window.matchMedia("(max-width: 600px)").matches) {
            plateauDemineur.style.grid = `repeat(${nombreLignes},40px) / repeat(${nombreColonnes},40px)`;
            plateauDemineur.style.width=`calc(${nombreColonnes} * 40px)`;
            plateauDemineur.style.height=`calc(${nombreLignes} * 40px)`;
            bandeauSuperieur.style.width=`calc(${nombreColonnes} * 40px)`;
            formDifficulte.style.width=`calc(${nombreColonnes} * 40px)`;
        }
        else {
            plateauDemineur.style.grid = `repeat(${nombreLignes},50px) / repeat(${nombreColonnes},50px)`;
            plateauDemineur.style.width=`calc(${nombreColonnes} * 50px)`;
            plateauDemineur.style.height=`calc(${nombreLignes} * 50px)`;
            bandeauSuperieur.style.width=`calc(${nombreColonnes} * 50px)`;
            formDifficulte.style.width=`calc(${nombreColonnes} * 50px)`;
        }

    } else if (niveau==="intermediaire"){
        if(window.matchMedia("(max-width: 600px)").matches) {
            plateauDemineur.style.grid = `repeat(${nombreLignes},30px) / repeat(${nombreColonnes},30px)`;
            plateauDemineur.style.width=`calc(${nombreColonnes} * 20px)`;
            plateauDemineur.style.overflowX="scroll";
            plateauDemineur.style.overflowY="scroll";
            bandeauSuperieur.style.width="320px";
            formDifficulte.style.width="320px";
        } else if(window.matchMedia("(min-width: 600px)").matches) {
            plateauDemineur.style.grid = `repeat(${nombreLignes},30px) / repeat(${nombreColonnes},30px)`;
            plateauDemineur.style.width=`calc(${nombreLignes} * 30px)`;
            bandeauSuperieur.style.width=`calc(${nombreLignes} * 30px)`;
            formDifficulte.style.width=`calc(${nombreLignes} * 30px)`;
         } 
        
    } else {
        if(window.matchMedia("(max-width: 600px)").matches) {
            plateauDemineur.style.grid = `repeat(${nombreLignes},30px) / repeat(${nombreColonnes},30px)`;
            plateauDemineur.style.width="320px";
            plateauDemineur.style.overflowX="scroll";
            plateauDemineur.style.overflowY="scroll";
            bandeauSuperieur.style.width="320px";
            formDifficulte.style.width="320px";
        } else if(window.matchMedia("(max-width: 800px)").matches) {
            plateauDemineur.style.grid = `repeat(${nombreLignes},30px) / repeat(${nombreColonnes},30px)`;
            plateauDemineur.style.width="570px";
            plateauDemineur.style.overflowX="scroll";
            plateauDemineur.style.overflowY="scroll";
            bandeauSuperieur.style.width="570px";
            formDifficulte.style.width="570px";
        }  else if(window.matchMedia("(max-width: 920px)").matches) {
            plateauDemineur.style.grid = `repeat(${nombreLignes},30px) / repeat(${nombreColonnes},30px)`;
            plateauDemineur.style.width="770px";
            plateauDemineur.style.overflowX="scroll";
            plateauDemineur.style.overflowY="scroll";
            bandeauSuperieur.style.width="770px";
            formDifficulte.style.width="770px";
        } else {
            plateauDemineur.style.grid = `repeat(${nombreLignes},30px) / repeat(${nombreColonnes},30px)`;
            plateauDemineur.style.width=`calc(${nombreColonnes} * 30px)`;
            bandeauSuperieur.style.width=`calc(${nombreColonnes} * 30px)`;
            formDifficulte.style.width=`calc(${nombreColonnes} * 30px)`;
        }
    }
   


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

creationPlateauDemineur(niveau);
console.log(plateauDemineur);
//--------------------------------------------------------------------------------







//--------INTERRACTION AVEC LES BOUTONS---------------------------------
const buttonMineFirst=document.getElementById("mineFirst");
const buttonValeurFirst=document.getElementById("valeurFirst");
let buttonCellDemineur=document.querySelectorAll('button[class="cell"]');
let boutonUtilise = "valeurFirst";
localStorage.setItem("boutonUtilise","valeurFirst");

//créons une variable pour compter les mines restantes sur le plateau
let compteurMineRestante =nbMine(niveau);
//affichons cette valeur dans le compteur du plateau demineur
const compteurPlateauDemineur=document.getElementById("compteurMine");
compteurPlateauDemineur.innerHTML=compteurMineRestante;


//actions si le bouton MineFirst est sélectionné
buttonMineFirst.addEventListener("focus", (event) =>{
    event.target.style.boxShadow="2px 2px 2px rgb(255, 119, 0)"
    event.target.style.border= "5px inset #c0c0c0";
    buttonValeurFirst.style.boxShadow="none";
    buttonValeurFirst.style.border= "5px outset #c0c0c0";
    // buttonValeurFirst.removeEventListener("focus",(event));
    // buttonValeurFirst.onclick();
    boutonUtilise="mineFirst";
    localStorage.setItem("boutonUtilise","mineFirst");
    console.log("buttonMineFirst" ,boutonUtilise);
    console.log("localstorage mine first:", localStorage.getItem("boutonUtilise"));
})



//Actions quand on clique sur le bouton valeur FIRST
    buttonValeurFirst.addEventListener("focus", (event) =>{
    event.target.style.boxShadow="2px 2px 2px rgb(255, 119, 0)"
    event.target.style.border= "5px inset #c0c0c0";
    buttonMineFirst.style.boxShadow="none";
    buttonMineFirst.style.border= "5px outset #c0c0c0";
    // buttonMineFirst.removeEventListener("focus",(event));
    boutonUtilise="valeurFirst";
    localStorage.setItem("boutonUtilise","valeurFirst");
    console.log("buttonValeurFirst" ,boutonUtilise);
    console.log("localstorage valeur first:", localStorage.getItem("boutonUtilise"));
    })

//-----------------------------------------------------------------
    //fonction décrivant ce qui se passe quand on clique sur une case
    const actionClickCase = (cellule) => {
        let ligCell=ligCellule(cellule.id);
            let colCell=colCellule(cellule.id);
            boutonUtilise = localStorage.getItem("boutonUtilise");

             console.log('bouton utilisé : ' + boutonUtilise);
             if(boutonUtilise==="mineFirst"){
                if(cellule.dataset.class==="active" && cellule.dataset.mine==="faux"){
                    afficherCellulesZeroMine(ligCell,colCell);
                }
                else if(cellule.dataset.class != "active"){ //si la cellule n'a pas encore été cliquée
                        if(cellule.dataset.mine != "vrai"){
                        cellule.style.backgroundImage = 'url("../Images/positionMine.jpg")';
                        cellule.dataset.mine = "vrai";
                        cellule.style.backgroundSize = "cover";
                        //on décrémente le compteurmine
                        compteurMineRestante--;
                        compteurPlateauDemineur.innerHTML=compteurMineRestante;
                        } else {
                            cellule.style.backgroundImage = 'none';
                            cellule.dataset.mine = "faux";
                            //on incremente le compteurmine
                            compteurMineRestante++;
                            compteurPlateauDemineur.innerHTML=compteurMineRestante;
                        }
                } else if(cellule.class="mine"){
                    cellule.dataset.class = "desactive";
                    cellule.style.backgroundImage = 'none';
                    cellule.dataset.mine = "faux";

                } else {
                    afficherCellulesZeroMine(ligCell,colCell);
                }
             } else if(boutonUtilise==="valeurFirst"){
                if(cellule.dataset.class != "active"){ //si la cellule n'a pas encore été cliquée
                    if(cellule.value === "mine"){
                        // console.log("mine");
                        cellule.style.backgroundImage = 'url("../Images/explosion.gif")';
                        partiePerdue();
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

             }
    }
//-----------------------------------

//-----------------------------------------------------------------
    //fonction décrivant ce qui se passe quand on clique DROIT sur une case
    const actionClickDroitCase = (cellule) => {
        let ligCell=ligCellule(cellule.id);
            let colCell=colCellule(cellule.id);
            boutonUtilise = localStorage.getItem("boutonUtilise");

             console.log('bouton utilisé : ' + boutonUtilise);
             if(boutonUtilise==="valeurFirst"){
                if(cellule.dataset.class==="active" && cellule.dataset.mine==="faux"){
                    afficherCellulesZeroMine(ligCell,colCell);
                }
                else if(cellule.dataset.class != "active"){ //si la cellule n'a pas encore été cliquée
                        if(cellule.dataset.mine != "vrai"){
                        cellule.style.backgroundImage = 'url("../Images/positionMine.jpg")';
                        cellule.dataset.mine = "vrai";
                        cellule.style.backgroundSize = "cover";
                        //on décrémente le compteurmine
                        compteurMineRestante--;
                        compteurPlateauDemineur.innerHTML=compteurMineRestante;
                        } else {
                            cellule.style.backgroundImage = 'none';
                            cellule.dataset.mine = "faux";
                            //on incremente le compteurmine
                            compteurMineRestante++;
                            compteurPlateauDemineur.innerHTML=compteurMineRestante;
                        }
                } else if(cellule.class="mine"){
                    cellule.dataset.class = "desactive";
                    cellule.style.backgroundImage = 'none';
                    cellule.dataset.mine = "faux";

                } else {
                    afficherCellulesZeroMine(ligCell,colCell);
                }
             } else if(boutonUtilise==="mineFirst"){
                if(cellule.dataset.class != "active"){ //si la cellule n'a pas encore été cliquée
                    if(cellule.value === "mine"){
                        // console.log("mine");
                        cellule.style.backgroundImage = 'url("../Images/explosion.gif")';
                        partiePerdue();
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

             }
    }
//-------------------------------------------------



//ajout d'un event listener au click gauche à chaque cellule du plateau demineur
    buttonCellDemineur.forEach(cellule => {
        cellule.addEventListener("click", () => {
            actionClickCase(cellule);
        })
    })

//ajout d'un event listener au click droit à chaque cellule du plateau demineur
buttonCellDemineur.forEach(cellule => {
    cellule.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        actionClickDroitCase(cellule);
    })
})



//---------------------------------------
//Ajout d'une action quand on clique sur le bouton nouvelle partie
buttonNouvellePartie.addEventListener("click" , () => {
    
    localStorage.setItem("boutonUtilise","valeurFirst");
    
    //on remet toutes les cellules en abled    
    buttonCellDemineur.forEach( (cellule) => {
        cellule.disabled=false;
        });

    //on efface le gif moqueur
    const imagePerdu = document.createElement("img");
    imagePerdu.innerHTML="";

    //on réinitialise le temps
    clearTimeout(time);
    temps=0;
    augmenterTemps();


    //on remodifie l'image du bouton NouvellePartie
    buttonNouvellePartie.style.backgroundImage='url("../Images/emoticone-reflexion.png")';
    
    //on supprime le plateauDemineur existant avant d'en créer un nouveau 
     plateauDemineur.innerHTML="";

    //on réinitialise le niveau de difficulté
    for(let i=0;i<difficulte.length;i++){
        console.log(difficulte[i].value);
        if(difficulte[i].checked===true){
            niveau=difficulte[i].value;
        }
    }

    //on réinitialise le compteur de mines
    compteurMineRestante =nbMine(niveau);
    //affichons cette valeur dans le compteur du plateau demineur
    compteurPlateauDemineur.innerHTML=compteurMineRestante;

    //on crée un nouveau plateau de jeu
    creationPlateauDemineur(niveau);
    console.log(plateauDemineur);

    //on redéfinit ce que sont les cellules (car les anciennes ont été effacées et n'existent plus)
    buttonCellDemineur=document.querySelectorAll('button[class="cell"]');


    //on réapplique des event listener aux cellules
    buttonCellDemineur.forEach(cellule => {
        cellule.addEventListener("click", () => {
            actionClickCase(cellule);
        })
    })
    //et l'évênement au click droit
    buttonCellDemineur.forEach(cellule => {
        cellule.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        actionClickDroitCase(cellule);
        })
    })

})
