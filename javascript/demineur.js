//---------FONCTIONS UTILITAIRES------------------------------

//fonction qui retourne un entier aléatoire entre 2 valeurs
function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
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
            let ligMin;
            let ligMax;
            if(lig===0){
                ligMin=0;
                ligMax=lig+2;
            } else if(lig===nombreLignes-1){
                ligMin=lig-1;
                ligMax=lig+1;
            }
            else {
                ligMin=lig-1;
                ligMax=lig+2;
            }

            for(let col=0; col<nombreColonnes;col++){

                let colMin;
                let colMax;
                if(col===0){
                    colMin=0;
                    colMax=col+2;
                } else if(col===nombreColonnes-1){
                    colMin=col-1;
                    colMax=col+1;
                }
                else {
                    colMin=col-1;
                    colMax=col+2;
                }

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
            }
        }
    }
    //appel de la fonction d'attribution des valeurs des cases
    setNombreMineAutour();

}

creationPlateauDemineur("facile");
//--------------------------------------------------------------------------------

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

    
})


buttonValeurFirst.addEventListener("click", (event) =>{
    event.target.style.boxShadow="2px 2px 2px rgb(255, 119, 0)"
    event.target.style.border= "5px inset #c0c0c0";
    buttonMineFirst.style.boxShadow="none";
    buttonMineFirst.style.border= "5px outset #c0c0c0"

    buttonCellDemineur.forEach(cellule => {
        cellule.addEventListener("click", (eventCel) => {
            console.log(cellule);
            if(cellule.dataset.class != "active"){
                if(cellule.value === "mine"){
                    console.log("mine");
                    cellule.style.backgroundImage = 'url("../Images/mine.jpg")';
                } else if(cellule.value==="null"){
                    console.log("null");
                    cellule.style.border="1px solid lightgray";
                    
                } else {
                    console.log("valeur");
                    cellule.innerHTML=cellule.value;
                    cellule.style.border="1px solid lightgray";
                    cellule.dataset.class="active";
                }
            } else {
                console.log("active");
            }
        })
    })

})

//-----------------------------------------------------------------

