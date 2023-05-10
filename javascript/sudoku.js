// import { isEqualArray } from "../javascript/useful_functions";

function isEqualArray(a, b){
    if (a instanceof Array && b instanceof Array) {
        if (a.length !== b.length) {
            return false;
        }
 
        for (let i = 0; i < a.length; i++) {
            if (!isEqualArray(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    return a === b;
}

function copyGrille(maGrille){
let grilleReturn = JSON.parse(JSON.stringify(maGrille));//[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
//[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

    // for(let i=0;i<9;i++){
    //     // for(let j=0;j<9;j++){
    //     //     grilleReturn[i][j]=maGrille[i][j];
    //     // }
    //     grilleReturn.push(maGrille[i]);
    // }
    return grilleReturn;
}


let grille = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

let grilleOrigin=[];

let grilleCellulesEffacees = [];//[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

let grilleSolver = [];//[[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
// [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

let grillePlayer = [];


//création des 9 blocks et attribution des valeurs
const block1 = [[0,0,0],[0,0,0],[0,0,0]];
const block2 = [[0,0,0],[0,0,0],[0,0,0]];
const block3 = [[0,0,0],[0,0,0],[0,0,0]];
const block4 = [[0,0,0],[0,0,0],[0,0,0]];
const block5 = [[0,0,0],[0,0,0],[0,0,0]];
const block6 = [[0,0,0],[0,0,0],[0,0,0]];
const block7 = [[0,0,0],[0,0,0],[0,0,0]];
const block8 = [[0,0,0],[0,0,0],[0,0,0]];
const block9 = [[0,0,0],[0,0,0],[0,0,0]];

function genererValeursBlocks(){
    for(let x=0; x<3 ;x++){
        for(let y=0; y<3 ; y++){
            block1[x][y]=grille[x][y];
            block2[x][y]=grille[x][y+3];
            block3[x][y]=grille[x][y+6];
            block4[x][y]=grille[x+3][y];
            block5[x][y]=grille[x+3][y+3];
            block6[x][y]=grille[x+3][y+6];
            block7[x][y]=grille[x+6][y];
            block8[x][y]=grille[x+6][y+3];
            block9[x][y]=grille[x+6][y+6];
        }
    }
}

//fonction qui donne le block en fonction du x et y reel
function blockValue(x,y,maGrille){
    let block=[[0,0,0],[0,0,0],[0,0,0]];
    for(let lig=0; lig<3 ;lig++){
        for(let col=0; col<3 ; col++){
            if(x>=0 && x<=2 && y>=0 && y<=2 ){
                block[lig][col]=maGrille[lig][col];
            } else if(x>=3 && x<=5 && y>=0 && y<=2){
                block[lig][col]=maGrille[lig+3][col];
            } else if(x>=6 && x<=8 && y>=0 && y<=2){
                block[lig][col]=maGrille[lig+6][col];
            } else if(x>=0 && x<=2 && y>=3 && y<=5){
                block[lig][col]=maGrille[lig][col+3];
            } else if(x>=3 && x<=5 && y>=3 && y<=5){
                block[lig][col]=maGrille[lig+3][col+3];
            } else if(x>=6 && x<=8 && y>=3 && y<=5){
                block[lig][col]=maGrille[lig+6][col+3];
            } else if(x>=0 && x<=2 && y>=6 && y<=8){
                block[lig][col]=maGrille[lig][col+6];
            } else if(x>=3 && x<=5 && y>=6 && y<=8){
                block[lig][col]=maGrille[lig+3][col+6];
            } else if(x>=6 && x<=8 && y>=6 && y<=8){
                block[lig][col]=maGrille[lig+6][col+6];
            }
        }
    }
    return block;
}

//fonction qui la coordonnée x dans le block en fonction du x et y reel
function xBlockValue(x,y){
    let xBlock="";
    if(x>=0 && x<=2 && y>=0 && y<=2 ){
        xBlock=x;
    } else if(x>=3 && x<=5 && y>=0 && y<=2){
        xBlock=x-3;
    } else if(x>=6 && x<=8 && y>=0 && y<=2){
        xBlock=x-6;
    } else if(x>=0 && x<=2 && y>=3 && y<=5){
        xBlock=x;
    } else if(x>=3 && x<=5 && y>=3 && y<=5){
        xBlock=x-3;
    } else if(x>=6 && x<=8 && y>=3 && y<=5){
        xBlock=x-6;
    } else if(x>=0 && x<=2 && y>=6 && y<=8){
        xBlock=x;
    } else if(x>=3 && x<=5 && y>=6 && y<=8){
        xBlock=x-3;
    } else if(x>=6 && x<=8 && y>=6 && y<=8){
        xBlock=x-6;
    }
    return xBlock;
}

//fonction qui la coordonnée xmin dans le block en fonction du x et y reel
function xMinBlockValue(x){
    let xMinBlock="";
    if(x>=0 && x<=2){
        xMinBlock=0;
    } else if(x>=3 && x<=5){
        xMinBlock=3;
    } else if(x>=6 && x<=8){
        xMinBlock=6;
    } 
    return xMinBlock;
}

//fonction qui la coordonnée xmax dans le block en fonction du x et y reel
function xMaxBlockValue(x){
    let xMaxBlock="";
    if(x>=0 && x<=2){
        xMaxBlock=2;
    } else if(x>=3 && x<=5){
        xMaxBlock=5;
    } else if(x>=6 && x<=8){
        xMaxBlock=8;
    } 
    return xMaxBlock;
}


//fonction qui donne la coordonnée y dans le block en fonction du x et y reel
function yBlockValue(x,y){
    let yBlock="";
    if(x>=0 && x<=2 && y>=0 && y<=2 ){
        yBlock=y;
    } else if(x>=3 && x<=5 && y>=0 && y<=2){
        yBlock=y;
    } else if(x>=6 && x<=8 && y>=0 && y<=2){
        yBlock=y;
    } else if(x>=0 && x<=2 && y>=3 && y<=5){
        yBlock=y-3;
    } else if(x>=3 && x<=5 && y>=3 && y<=5){
        yBlock=y-3;
    } else if(x>=6 && x<=8 && y>=3 && y<=5){
        yBlock=y-3;
    } else if(x>=0 && x<=2 && y>=6 && y<=8){
        yBlock=y-6;
    } else if(x>=3 && x<=5 && y>=6 && y<=8){
        yBlock=y-6;
    } else if(x>=6 && x<=8 && y>=6 && y<=8){
        yBlock=y-6;
    }
    return yBlock;
}

//fonction qui la coordonnée ymin dans le block en fonction du x et y reel
function yMinBlockValue(y){
    let yMinBlock="";
    if(y>=0 && y<=2 ){
        yMinBlock=0;
    } else if(y>=3 && y<=5){
        yMinBlock=3;
    } else if(y>=6 && y<=8){
        yMinBlock=6;
    }
    return yMinBlock;
}

//fonction qui la coordonnée ymax dans le block en fonction du x et y reel
function yMaxBlockValue(y){
    let yMaxBlock="";
    if(y>=0 && y<=2 ){
        yMaxBlock=2;
    } else if(y>=3 && y<=5){
        yMaxBlock=5;
    } else if(y>=6 && y<=8){
        yMaxBlock=8;
    } 
    return yMaxBlock;
}

//------------------------------------------------------------------------

//fonction qui retourne un entier entre min et max (1 et 9)
function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-----------------------------------------------------------------

function genererPremiereLigne(){
    //on commence par générer la première ligne avec une valeur aléatoire entre 1 et 9
        // une valeur présente ne doit pas être répétée
        for(let y=0 ; y <9 ; y++){
            //on crée un nombre aléatoire entre 1 et 9
            let nbAleatoire = entierAleatoire(1,9);
              //on vérifie si le nombre aléatoire est déjà présent dans notre ligne
            let presenceChiffre = false;
            do {
                presenceChiffre = false;
                nbAleatoire = entierAleatoire(1,9);
                for(let i=0;i<y;i++){
                   
                    if(nbAleatoire===grille[0][i]){
                        presenceChiffre=true;
                    }
                    // console.log(nbAleatoire + " " + grille[0][i] + " " + presenceChiffre);
                }
                    
            } while (presenceChiffre===true);
               
           // si le nombre aléatoire n'était pas présent on l'ajoute
           if(presenceChiffre==false){
            grille[0][y]= nbAleatoire;
           } 
        };
        //pour finir on remplit les valeurs des blocks pour futures comparaisons
        genererValeursBlocks();
    }

//------------------------------------------------------------------------

function genererValeursInterdites(lig, col, maGrille){
    let listeExiste=[];
    // on regarde les valeurs présentes dans la ligne
    for(let i=0 ; i <9 ; i++){
        let valeurPresente = false;
        for(let iList in listeExiste){
            if(maGrille[lig][i]===listeExiste[iList]){
                valeurPresente =true;
                // console.log(valeurPresente);
            };
        };
        if(valeurPresente===false){
            // console.log("lig " + maGrille[lig][i]);
        listeExiste.push(maGrille[lig][i]);
        }
    }

    // on regarde les valeurs présentes dans la colonne
    for(let i=0 ; i <9 ; i++){
        let valeurPresente = false;
        for(let iList in listeExiste){
            if(maGrille[i][col]===listeExiste[iList]){
                valeurPresente =true;
            };
        };
        if(valeurPresente===false){
            // console.log("col " + maGrille[i][col]);
        listeExiste.push(maGrille[i][col]);
        }
    }

    //on regarde maintenant dans le bloc adequat
    const block = blockValue(lig,col,maGrille);
    for(let i in block){
        for(let j in block){
            let valeurPresente = false;
            for(let iList in listeExiste){
                if(block[i][j]===listeExiste[iList]){
                    valeurPresente =true;
                };
            };
            if(valeurPresente===false){
                // console.log("block " + block[i][j]);
            listeExiste.push(block[i][j]);
            }
        }
    }

    return listeExiste;
}

//--------------------------------------------------------------------
function valMinListeExiste(lig,col,min,maGrille){
    const listeExiste = genererValeursInterdites(lig,col,maGrille);
    let valMin = 0;
    for(let i in listeExiste){
        if(Math.round(listeExiste[i])===min){
            valMin=min;
            return valMin;
        }
    }
    if(valMin===0){
        return valMinListeExiste(lig,col,min+1,maGrille);
    }
    
}

function valMaxListeExiste(lig,col,max,maGrille){
    const listeExiste = genererValeursInterdites(lig,col,maGrille);
    let valMax = 0;
    for(let i in listeExiste){
        if(Math.round(listeExiste[i])===max){
            valMax=max;
            return valMax;
        }
    }
    if(valMax===0){
        return valMaxListeExiste(lig,col,max-1,maGrille);
    }
    
}

function valMinAleatoire(lig,col,min,maGrille){
    const listeExiste = genererValeursInterdites(lig,col,maGrille);
    let valMin = 0;
    let presence=0;
    if(listeExiste.length===10){
        return 9;
    }

    for(let i in listeExiste){
        if(Math.round(listeExiste[i])===min){
            presence++;
        }
    }
    if(presence===0){
        valMin=min;
        return valMin;
    } else{
        return valMinAleatoire(lig,col,min+1,maGrille);
    } 
}

function valMaxAleatoire(lig,col,max,maGrille){
    const listeExiste = genererValeursInterdites(lig,col,maGrille);
    let valMax = 0;
    let presence=0;
    if(listeExiste.length===10){
        return 9;
    }

    for(let i in listeExiste){
        if(Math.round(listeExiste[i])===max){
            presence++;
        }
    }
    if(presence===0){
        valMax=max;
        return valMax;
    } else{
        return valMaxAleatoire(lig,col,max-1,maGrille);
    } 
}

    //------------------------------------------------------------------------

    //fonction qui retourne un entier entre min et max (1 et 9) avec valeurs interdites
function entierAleatoireRestrictif(min, max, lig, col, maGrille, valeursTestees) //rajouter en argument valeursTestees
{
    const valAleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
    const listeExiste = genererValeursInterdites(lig,col,maGrille);
    if(typeof(valeursTestees) != "undefined"){
        for(let val of valeursTestees){
            listeExiste.push(val);
        }
    }
    // console.log(listeExiste);
    if(listeExiste.length===10){
        return 0;
    }else{
        let presenceChiffre=false;
        for(let i in listeExiste){
            if(Math.round(valAleatoire)===Math.round(listeExiste[i])){
                presenceChiffre=true;
            }
        }
        if(presenceChiffre===false){
            return valAleatoire;
        } else {
            // console.log(min +" " + max +" " + lig + " " + col + " " + valAleatoire);
           return entierAleatoireRestrictif(min, max, lig, col, maGrille);
        }
    }

}

//------------------------------------------------------------------------

function genererautresLignes(premiereLigne,nbEssai){
    for (let x=premiereLigne ; x<9 ; x++){
        for(let y=0 ; y <9 ; y++){
            let valeurAleatoire = 0;
            valeurAleatoire=entierAleatoireRestrictif(valMinAleatoire(x,y,1,grille),valMaxAleatoire(x,y,9,grille),x,y,grille);
                if(valeurAleatoire===0){
                //on recommence à générer toutes la ligne en appelant un return de la fonction
                //d'abord on efface les valeurs de la ligne
                        for(let col=0;col<9;col++){
                            grille[x][col]=0;
                            genererValeursBlocks();
                            
                        }
                    //puis on sort de la boucle et de la fonction par un return
                    // console.log(`ligne ${x+1} Nok , nbEssai = ` + nbEssai);
                    if(x>2){nbEssai++;}
                    if(nbEssai<100){
                        return genererautresLignes(x,nbEssai);
                    } else {
                        //on efface la grille sauf la ligne 1
                        for(let lig=1;lig<x+1;lig++){
                            for(let col=0;col<9;col++){
                                grille[lig][col]=0;
                                genererValeursBlocks();
                                
                            }
                        }
                        //et on recommence à générer à partir de la 2eme ligne
                        return genererautresLignes(1,0); 
                    }
                    
                } else {
                //    if(y===8){console.log(`ligne ${x+1} ok`);}
                    grille[x][y]=valeurAleatoire;
                    genererValeursBlocks();
                } 
        }       
    }
    
    grilleOrigin=JSON.parse(JSON.stringify(grille));
}
//------------------------------------------------------------------------


function genererGrille(){
    genererPremiereLigne();
     genererautresLignes(1,0);
}


//------------------------------------------------------------------------
grilleCellulesEffacees =  grille;//copyGrille(grille); //JSON.parse(JSON.stringify(grille));

function effacerCellules(nbCelluleEfface){
    //on choisit une cellule aléatoire à effacer (à faire nbCelluleEfface fois)
        //on regarde si elle est vide ou pas
         //si elle n'est pas vide on lance le solveur pour voir s'il y a 1 ou plusieurs solutions au sudoku si on efface
    // si 1 seule solution au sudoku on efface
    //-----------------------------------------------------------------------------------------------
        
    if (nbCelluleEfface===0){return;} //on arrete la fonction quand il n'y a plus de case à effacer
    
        let x = entierAleatoire(0,8);
        let y = entierAleatoire(0,8);

        if(grilleCellulesEffacees[x][y]===null){
            // si la cellule est déjà vide on relance la fonction à partir d'ou on en est (on annule quoi)
            return effacerCellules(nbCelluleEfface);
        } else {
            //on enregistre la valeur de la cellule dans une variable
            let valeurCelluleEnregistree = grilleCellulesEffacees[x][y];
            // on efface la valeur
            grilleCellulesEffacees[x][y]=null;
            //----------------------------------
            //on crée la liste de cases effacées à donner comme entrée au solver
            let listeCasesEffacees=positionCasesVides(grilleCellulesEffacees);
            //on lance le solver MAINTENANT

            const nbSolution = solverSudoku(grilleCellulesEffacees);//A programmer
            
            //on attribue une valeur aléatoire à la cellule grace à entierAleatoireRestrictif
            //let valeurAleatoire = entierAleatoireRestrictif(1,9,x,y,grilleCellulesEffacees,valeursTestees);
            //maintenant on vérifie qu'il y a bien 1 seule solution au sudoku en lançant le solver

            //...........//
            //----------------------------------------
           
            


            //s'il y a bien une seule solution on passe à la suite en relançant la fonction avec nbCelluleEfface-1
                if(nbSolution===1){
                return effacerCellules(nbCelluleEfface-1);
                } else {
                    //sinon on garde la position testée en mémoire pour ne pas recommencer --> PAS BESOIN
                //puis on réatribue la valeur enregistrée à grilleCellulesEffacees[x][y]
                grilleCellulesEffacees[x][y]=valeurCelluleEnregistree;
                //et enfin on relance la fonction avec return effacerCellules(nbCelluleEfface);
                return effacerCellules(nbCelluleEfface);
                }
        }
    
}
//---------------------------------------------------------------------

function positionCasesVides(maGrille){
    let listeCasesEffacees=[];
    //on balaye maGrille
    //dès qu'on repère une valeur "" on push une nouvelle position dans listeCasesEffacees
    for(let x=0;x<9;x++){
        for(let y=0;y<9;y++){
            let caseEffacee =[];
            if(maGrille[x][y]===null){
                caseEffacee.push(x,y);
                // caseEffacee.push(y);
                listeCasesEffacees.push(caseEffacee);
            }
        }
    }
    return listeCasesEffacees;
}

//--------------------------------------------------------
//fonction qui retourne toutes les valeurs possibles de chaque position libre
function valeursPossiblesToutesPositions(maGrille,positionsVides){
let listeValeursPossiblesPositions=[];
for(let position of positionsVides){
    let valeursInterdites=[];
    let valeursPossibles=[];
    let lig= position[0];
    let col= position[1];
    // console.log(`lig ${lig} col ${col}`)
    valeursInterdites =genererValeursInterdites(lig,col,maGrille);
    // console.log(valeursInterdites);
    for(let i=1;i<10;i++){
        
        let presenceChiffre=false;
        for(let valeur in valeursInterdites){
            if(valeursInterdites[valeur]===i){
                presenceChiffre=true;
            }
        }
        if(presenceChiffre===false){
            valeursPossibles.push(i);
        }
    }
     listeValeursPossiblesPositions.push(valeursPossibles);
}
//genererValeursInterdites()

 return listeValeursPossiblesPositions;
}

//--------------------------------------------------------------------
function solverSudoku(maGrille){
    //le but de la fonction est de retourner le nombre de solutions possibles de la grille
    let nbSolution=1;
    grilleSolver= copyGrille(maGrille); //JSON.parse(JSON.stringify(maGrille));
    let positionsVides=positionCasesVides(grilleSolver);
    // console.log("positionsVides avant resolve1Possibilité");
    // console.log(positionsVides);
    let valeursPossiblesParPosition = valeursPossiblesToutesPositions(grilleSolver,positionsVides);
    let nbPositionsVides;
    //on balaye toutes les positions vides de grille solver
    // si le nombre de valeur possible est de 1 on remplit la valeur
    // on va boucler la résolution jusqu'à ce qu'il n'y ait plus une seule case avec une seule solution
    //pour cela on recommence l'opération tant qu'il y a une cellule avec 1 seule possibilité
    //vu qu'on remplit une position dès qu'il y a 1 seule possibilité, le nombre de cellule vide diminue à chaque itération
    //on peut donc arrêter la boucle lorsque le nombre de cellules vides n'a pas bougé
    function resolve1Possibilite(){
        do {
            positionsVides=positionCasesVides(grilleSolver);
            nbPositionsVides=positionsVides.length;
            valeursPossiblesParPosition = valeursPossiblesToutesPositions(grilleSolver,positionsVides);
            
            for(let position in positionsVides){
                // console.log(position);
                let lig = positionsVides[position][0];
                let col = positionsVides[position][1];
                let valeursPossibles=valeursPossiblesParPosition[position];
                // console.log(`lig ${lig} col ${col}`);
                // console.log(valeursPossibles);
                if(valeursPossibles.length===1){
                    grilleSolver[lig][col]=valeursPossibles[0];
                }
            }
            
            positionsVides=positionCasesVides(grilleSolver);
            
        } while (nbPositionsVides > positionsVides.length);

        return grilleSolver;
    }
    //---------------------------------------------
    resolve1Possibilite();

    // console.log("positionsVides après resolve1Possibilité");
    // console.log(positionsVides);
    
    // console.log("grille cases effacees")
    // console.log(maGrille);

    // console.log("grilleSolver après resolve1Possibilité")
    // console.log(grilleSolver);

    // let grilleSolver2= resolve1Possibilite();
    // console.log("grilleSolver2")
    // console.log(grilleSolver2);
    // let positionsVides2=positionCasesVides(grilleSolver2);
    // console.log("positionsVides2 après resolve1Possibilité");
    // console.log(positionsVides2);
    // console.log("valeursPossiblesParPosition après resolve1Possibilité");
    // console.log(valeursPossiblesParPosition);
    // console.log("resolve1Possibilite terminé");
    // console.log(positionsVides);

    //on va maintenant regarder le cas où dans 1 ligne, 1 colonne ou 1 block, un chiffre n'est possible que sur 1 case
    //dans ce cas cette case à forcement ce chiffre et on la remplit
    //on relancera ensuite resolve1Possibilité pour résoudre ce qui est possible

    //on va commencer par boucler sur chaque cellule vide de chaque ligne (puis colonne, puis block)
    // on boucle aussi sur tous les chiffres de 1 à 9
    //on boucle sur toutes les valeurs possibles de chaque cellule
    //si le chiffre est présent on note la position et on incrémente un compteur de 1
    //si le chiffre possible est retrouvé dans la ligne, le compteur augmente encore donc le chiffre ne répond pas à la condition
    //on passe donc au chiffre suivant
    //lorsqu'un chiffre est présent 1 seule fois dans les possibilités de la ligne(colonne ou block)
    //on l'inscrit à la position relevée



    //----------------------------------------
    function resolve1PossibiliteLigneColonne(){
        valeursPossiblesParPosition = valeursPossiblesToutesPositions(grilleSolver,positionsVides);
        let compteurSuppression=0;
        for(let x=0;x<9;x++){ //boucle sur la valeur des lignes

            for(let chiffre=1;chiffre<10;chiffre++){//on recherche chaque chiffre dans les valeurs possible des positions vides
                let compteurChiffreLig=0;
                let compteurChiffreCol=0;
                let positionChiffreLig=[];
                let positionChiffreCol=[];
                for(let position in positionsVides){ //boucle sur chaque positionsVides
                    let lig = positionsVides[position][0];
                    let col = positionsVides[position][1];
                    // console.log("valeursPossiblesParPosition[position]");
                    // console.log(valeursPossiblesParPosition[position]);
                    for(let valeurPosition in valeursPossiblesParPosition[position]){ //on boucle sur toutes les valeurs possibles de la position
                        let valeur=valeursPossiblesParPosition[position][valeurPosition];
                        // console.log("valeur : " +valeur);
                        if(lig===x && valeur===chiffre){ //si la ligne de positionVide correspond à la ligne recherchée et le chiffre est présent à la position
                            if(compteurChiffreLig===0){
                                // console.log("positionsVides[position]");
                                // console.log(positionsVides[position]);
                                positionChiffreLig=positionsVides[position];
                            }
                            compteurChiffreLig++;
                        }
                        if(col===x && valeur===chiffre){ //si la colonne de positionVide correspond à la colonne recherchée et le chiffre est présent à la position
                            if(compteurChiffreCol===0){
                                // console.log("positionsVides[position]");
                                // console.log(positionsVides[position]);
                                positionChiffreCol=positionsVides[position];
                            }
                            compteurChiffreCol++;
                        }

                    }
                }
                if(compteurChiffreLig===1){
                    // console.log("chiffre lig : " + chiffre);
                    // console.log(positionChiffreLig);
                    

                    grilleSolver[positionChiffreLig[0]][positionChiffreLig[1]]=chiffre;
                    compteurSuppression++;
                    resolve1Possibilite();
                    // console.log(grilleSolver);
                }
                if(compteurChiffreCol===1){
                    // console.log("chiffre col : " + chiffre);
                    // console.log(positionChiffreCol);
                    

                    grilleSolver[positionChiffreCol[0]][positionChiffreCol[1]]=chiffre;
                    compteurSuppression++;
                    resolve1Possibilite();
                    // console.log(grilleSolver);
                }
            }

        }
        if(compteurSuppression>0){
            return resolve1PossibiliteLigneColonne();
        }
    }

    resolve1PossibiliteLigneColonne();

    // console.log("recherche solution unique dans ligne + colonne");
    // console.log(valeursPossiblesParPosition);
    // console.log(grilleSolver);
   // --------------------------------------






    
    // console.log("positionsVides initial");
    // console.log(positionsVides);
    // console.log("length position vide initial : " + positionsVides.length);
    valeursPossiblesParPosition = valeursPossiblesToutesPositions(grilleSolver,positionsVides);
    // console.log("valeursPossiblesParPosition");
    // console.log(valeursPossiblesParPosition);
    //regardons maintenant dans le block
    //pour chaque position [lig,col] il faut déterminer dans quel block on est
    function resolve1PossibiliteBlock(){
        let compteurSuppression=0;
        for(let position=0;position<positionsVides.length;position++){ //boucle sur chaque positionsVides
            
            
            // console.log("positionsVides boucle");
            // console.log(positionsVides);
            // console.log("positionsVides[position]")
            // console.log(positionsVides[position]);
            // console.log("position : " + position);
            // console.log(positionsVides[position][0]);
            // console.log(positionsVides[position][1]);
            // console.log("valeurs par position");
            // console.log(valeursPossiblesParPosition);
            // console.log("length positionvide boucle : " + positionsVides.length);
            // console.log("length positionvide[position] boucle : " + positionsVides[position].length);
            
            // console.log("compteurtest : " + compteurtest);

            if(positionsVides.length>0){
                if(positionsVides[position].length>0){
                
                // console.log("length position vide boucle if : " + positionsVides.length);
                let lig = positionsVides[position][0];
                let col = positionsVides[position][1];
                let blockChiffre =blockValue(lig,col,grilleSolver);
                let compteurChiffreBlock=0;
                let positionChiffreBlock=[];

                // console.log("blockChiffre");
                // console.log(blockChiffre);
                
                for(let chiffre=1;chiffre<10;chiffre++){
                    compteurChiffreBlock=0;
                    for(let positionTest in positionsVides){
                        let ligTest =positionsVides[positionTest][0];
                        let colTest =positionsVides[positionTest][1];
                        let blockTest =blockValue(ligTest,colTest,grilleSolver);
                        // compteurChiffreBlock=0;

                        // console.log(blockTest);

                        for(let valeurPosition in valeursPossiblesParPosition[positionTest]){ //on boucle sur toutes les valeurs possibles de la position
                            let valeur=valeursPossiblesParPosition[positionTest][valeurPosition];
                            //console.log("valeur : " + valeur + " chiffre : " + chiffre);
                            // console.log("blocktest");
                            // console.log(blockTest);
                            // console.log("blockChiffre");
                            // console.log(blockChiffre);
                            if(isEqualArray(blockTest,blockChiffre) && valeur===chiffre){
                                // console.log("blockTest = blockChiffre");
                                if(compteurChiffreBlock===0){
                                    positionChiffreBlock=positionsVides[positionTest];
                                }
                                compteurChiffreBlock++;
                            }
                        }
                        
                        
                    }
                    //VERIFIER QUE C'EST BIEN LA QU'IL FAUT LE METTRE
                    // console.log("compteurChiffreBlock : " + compteurChiffreBlock);
                    if(compteurChiffreBlock===1){
                    // console.log("chiffre block : " + chiffre);
                    // console.log(positionChiffreBlock);
                

                grilleSolver[positionChiffreBlock[0]][positionChiffreBlock[1]]=chiffre;

                compteurSuppression++;
                // console.log("compteur suppression : " + compteurSuppression);
                positionsVides=positionCasesVides(grilleSolver);
            valeursPossiblesParPosition=valeursPossiblesToutesPositions(grilleSolver,positionsVides);
                resolve1Possibilite();
                resolve1PossibiliteLigneColonne();
                // console.log(grilleSolver);
                    }
                }
            
            }}
        }
        if(compteurSuppression>0){
            return resolve1PossibiliteBlock();
        }
    }

    resolve1PossibiliteBlock();

    // console.log("recherche solution unique dans block");
    // console.log(valeursPossiblesParPosition);





///////////////////////////////////////////////////////////////
    //il reste maintenant moins de cases vides mais il faut maintenant déterminer si ce qui reste donne 1 seule et unique 
    //solution ou plusieurs (dans ce cas c'est pas bon)



    //on balaye toutes les cellules effacées
    // à chaque position on commence par créer une valeur aléatoire possible
    //on enregistre cette valeur dans valeursTestées pour ne pas la retester plus tard
    //on boucle ensuite sur les autres positions en essayant une valeur aléatoire

 ///////////////////////////////////////////////////////////////////////////////
    
    
    //si on trouve aucune valeur possible on revient à la case précédente...
const positionsVidesFinSolver=positionCasesVides(grilleSolver);
    if(positionsVidesFinSolver.length===0){
        nbSolution=1;
    } else {
        nbSolution=0;
    }
// console.log("nb case vides fin solversudoku");
// console.log(positionsVides.length);
    return nbSolution;
}

//-----------------------------------------------------------------------

function afficherGrille(){
    for(let x=0 ; x < 9 ; x++){
        for(let y=0 ; y<=8 ; y++){
            const myCell = document.getElementById(`cel-l${x+1}c${y+1}`);
            // console.log(myCell)
            myCell.innerHTML = grille[x][y];
            myCell.value = grille[x][y];
            // console.log(grille[x][y]);
        }
    };
}

//------------------------------------------------------------------------

//-------------------------------------------------------------------------
//créons une fonction qui va chronométrer le temps passé pour réaliser le suduku
const chronoElement=document.getElementById("temps");
const chronoElement2=document.getElementById("temps2");
let temps=0;
let estArrete=false;
let time;
function augmenterTemps(){
    let minutes =parseInt(temps/60,10);
    let secondes=parseInt(temps % 60,10);
minutes=minutes <10 ? "0" + minutes:minutes;
secondes=secondes <10 ? "0" + secondes:secondes;

    chronoElement.innerHTML="Temps écoulé : " + minutes + ":" + secondes;
    chronoElement2.innerHTML="Temps écoulé : " + minutes + ":" + secondes;
    temps++;
    console.log(temps);


    if(estArrete===false){
    time=setTimeout(augmenterTemps,1000);
    }
}
augmenterTemps();
//-----------------------------------------------------------------------



genererGrille();
effacerCellules(45);
afficherGrille();



//------------------------------------------------------------------------
//fonction donnant la position de toutes les cases déjà remplies d'une grille
function positionCasesRemplies(maGrille){
    let listeCasesRemplies=[];
    //on balaye maGrille
    //dès qu'on repère une valeur "" on push une nouvelle position dans listeCasesEffacees
    for(let x=0;x<9;x++){
        for(let y=0;y<9;y++){
            let caseRemplie =[];
            let nombre=maGrille[x][y];
            // console.log(nombre);
            if(Number.isInteger(nombre)){
                caseRemplie.push(x,y);
                // caseEffacee.push(y);
                listeCasesRemplies.push(caseRemplie);
            }
        }
    }
    return listeCasesRemplies;
}

//-------------------------------------------------------------
//grisons maintenant toutes les cases avec valeur sur la grille générée
function griserCases(){
    const grilleEffacee=(JSON.parse(JSON.stringify(grilleCellulesEffacees)));
    let positionsAGriser = positionCasesRemplies(grilleEffacee);
    let positionsBlanches=positionCasesVides(grilleEffacee);
    
    //toutes les cases sont disabled=false
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            let cellule= document.getElementById(`cel-l${i+1}c${j+1}`);
            cellule.disabled = false; 
        }
    }


    //toutes les cases qu'on peut remplir sont blanches
    for(let position in positionsBlanches){
        let lig = positionsBlanches[position][0];
        let col = positionsBlanches[position][1];
        // console.log(postionsVidesAGriser[position]);
        let cellule= document.getElementById(`cel-l${lig+1}c${col+1}`);
        cellule.style.background='rgb(255,255,255)';
        cellule.style.color='black';
    }
    
    //les cases de la grille fournie sont grises et disabled
    for(let position in positionsAGriser){
        let lig = positionsAGriser[position][0];
        let col = positionsAGriser[position][1];
        // console.log(postionsVidesAGriser[position]);
        let cellule= document.getElementById(`cel-l${lig+1}c${col+1}`);
        cellule.disabled = true;
        cellule.style.background='rgb(240,240,240)';
        cellule.style.color='black';
    }
}
griserCases();
//----------------------------------------------------------------


//-------------------------------------------------
//fonction permettant de colorer toutes les cases du chiffre sélectionné
function colorerCasesChiffreSelectionne(chiffre,maGrille){
    griserCases();
    // console.log("chiffre : " + chiffre);
    // console.log(maGrille);
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(maGrille[i][j]==chiffre){
                document.getElementById(`cel-l${i+1}c${j+1}`).style.background='rgb(221, 246, 255)';
            }
        }
    }
}

//----------------------------------------------

//----------------------------------------------
//fonction qui colorie toutes les cellules en rapport avec la case sélectionnée
function colorerCasesEnRapportCelluleSelectionnee(lig,col){
    for(let i=1;i<10;i++){
        let couleurCol=document.getElementById(`cel-l${i}c${col}`).style.background;
        let couleurLig=document.getElementById(`cel-l${lig}c${i}`).style.background;
        if( couleurCol!='rgb(221, 246, 255)' && couleurCol !='rgb(240, 240, 240)'){
                document.getElementById(`cel-l${i}c${col}`).style.background='rgb(255, 255, 200)';
            } else if(couleurCol ==='rgb(240, 240, 240)'){
                document.getElementById(`cel-l${i}c${col}`).style.background='rgb(240, 240, 225)';
            }

            if(couleurLig != 'rgb(221, 246, 255)' && couleurLig != 'rgb(240, 240, 240)'){
            document.getElementById(`cel-l${lig}c${i}`).style.background='rgb(255, 255, 200)';
            } else if(couleurLig ==='rgb(240, 240, 240)'){
                document.getElementById(`cel-l${lig}c${i}`).style.background='rgb(240, 240, 225)';
            }
    }

    let xmin=xMinBlockValue(lig-1);
    let xmax=xMaxBlockValue(lig-1)+1;
    let ymin=yMinBlockValue(col-1);
    let ymax=yMaxBlockValue(col-1)+1;

    

    for(let i=xmin;i<xmax;i++){
        for(let j=ymin;j<ymax;j++){
            let couleurCel=document.getElementById(`cel-l${i+1}c${j+1}`).style.background; 
            if( couleurCel!='rgb(240, 240, 225)' && couleurCel !='rgb(255, 255, 200)'){   
                if( couleurCel!='rgb(221, 246, 255)' && couleurCel !='rgb(240, 240, 240)'){
                    document.getElementById(`cel-l${i+1}c${j+1}`).style.background='rgb(255, 255, 200)';
                } else if(couleurCel ==='rgb(240, 240, 240)'){
                    document.getElementById(`cel-l${i+1}c${j+1}`).style.background='rgb(240, 240, 225)';
                }
            }
        }
    }
}

//----------------------------------------------
function borderCellNormales(){
    for(let x=1;x<10;x++){
        for(let y=1;y<10;y++){
            document.getElementById(`cel-l${x}c${y}`).style.border='1px solid lightgray';
        }
    }
}
//----------------------------------------------
function chiffreDejaPresent(chiffre,lig,col,maGrille){
    //on commence par remettre toutes les bordures à leur état normal
    borderCellNormales();
    
    //on regarde si le chiffre est présent dans la ligne ou dans la colonne
    for(let i=0;i<9;i++){ 
        if( i !== col && maGrille[lig][i]===chiffre){
                document.getElementById(`cel-l${lig+1}c${i+1}`).style.border='5px solid rgb(255,0,0)';
                return false;
            }
        if( i !== lig && maGrille[i][col]===chiffre){
            document.getElementById(`cel-l${i+1}c${col+1}`).style.border='5px solid rgb(255,0,0)';
            return false;
        }   
    }

    let xmin=xMinBlockValue(lig);
    let xmax=xMaxBlockValue(lig);
    let ymin=yMinBlockValue(col);
    let ymax=yMaxBlockValue(col);

    //on regarde si le chiffre est présent dans le bloc
    for(let i=xmin;i<xmax+1;i++){
        for(let j=ymin;j<ymax+1;j++){
            
                console.log("i" + i + " j" +j);
                if(i !== lig && j !== col && maGrille[i][j]===chiffre){
                    document.getElementById(`cel-l${i+1}c${j+1}`).style.border='5px solid rgb(255,0,0)';
                    return false;
                }
        }
    }


    return true;
}

//-----------------------------------
function chiffreTermine(chiffre,magrille,lig,col,valeurCelluleCliquee){
    console.log("lig" + lig + " col" + col + " valeur" + magrille[lig][col]);
    
    if(isNaN(chiffre)===false){
        let compteur=0;
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(magrille[i][j]===chiffre){
                    compteur++;
                }
            }
        }
        console.log("compteur : " + compteur + "   valeurBouton : " + chiffre);
        // console.log("maGrille");
        // console.log()
        if(compteur===9){
            console.log("test9");
            document.getElementById(`button${chiffre}`).style.background="pink";
        } else{
            console.log(document.getElementById(`button${chiffre}`).style.background);
            if(document.getElementById(`button${chiffre}`).style.background !=="lightblue"){
                console.log("valueLightblue" + document.getElementById(`button${chiffre}`).value);
                document.getElementById(`button${chiffre}`).style.background="rgb(230, 230, 230)"; 
            }
        }
    } else {
        let valeurEffacee=parseInt(valeurCelluleCliquee);
        console.log("valeur effacee" + valeurEffacee);
        document.getElementById(`button${valeurEffacee}`).style.background="rgb(230, 230, 230)";  
    }
}

//--------------------------------

//---------------------------------------------

grillePlayer=copyGrille(grilleCellulesEffacees);
console.log("grillePlayer");
console.log(grillePlayer);
//ajoutons des events à nos boutons

const tousButtonValue = document.querySelectorAll('button[class="buttonValue"]');
const toutesCellules = document.querySelectorAll('button[class="cel"]');

// console.log(toutesCellules);

let valeurBouton;

tousButtonValue.forEach(button => {
    button.addEventListener("focus", (event) =>{
        //on commence par remettre toutes les bordures à leur état normal
        borderCellNormales();
        
        //------------------------------
        //lorsqu'on clique sur un bouton chiffre en bas de la page, sa couleur change mais pas celle des autres boutons
        tousButtonValue.forEach(button => {
            if(button.style.background !== "pink" && button.style.background !== "lightBlue"){
                button.style.background = "rgb(230, 230, 230)"
            }
        });
        if(event.target.style.background !== "pink"){    
            event.target.style.background = "lightBlue";
        }

        //on récupère la valeur du bouton sélectionné
        valeurBouton=button.value;
        //--------------------------------------

        //--------------------------------------
        //Toutes les cellules contenant le chiffre sélectionné changent de couleur pour donner un repère
        colorerCasesChiffreSelectionne(parseInt(valeurBouton),grillePlayer);
        //-------------------------------------



        //maintenant si on clique sur une cellule, la cellule se remplit avec la valeur du bouton
        toutesCellules.forEach(input => {
            input.addEventListener("click", (eventCel) => { 
                
                //on récupère la ligne et la colonne de la cellule pour traiter les valeurs de la grille
                let nomCellule=eventCel.target.name;
                let lig = nomCellule[5]-1;
                let col=nomCellule[7]-1;
                console.log("lig : " + lig + " col : " + col + " valeurBouton : " + parseInt(valeurBouton));
                

                //changement de couleur du bouton chiffre si le joueur en a terminé avec ce chiffre
                const grilleCelluleCliquee=copyGrille(grillePlayer);
                const valeurCelluleCliquee= grilleCelluleCliquee[lig][col];
                chiffreTermine(parseInt(valeurBouton),grillePlayer,lig,col,valeurCelluleCliquee);

                if(chiffreDejaPresent(parseInt(valeurBouton),lig,col,grillePlayer)){
                    //on applique la valeur à la grille
                    eventCel.value = valeurBouton;
                    eventCel.target.innerHTML=valeurBouton;

                    //on attribue la valeur à grillePlayer
                    grillePlayer[lig][col]=parseInt(valeurBouton);
                    console.log(grillePlayer);

                    //Toutes les cellules contenant le chiffre sélectionné changent de couleur pour donner un repère
                    colorerCasesChiffreSelectionne(parseInt(valeurBouton),grillePlayer);
                    colorerCasesEnRapportCelluleSelectionnee(lig+1,col+1);

                    //vérification si la grille est complétee ou non
                    let compteurCasesBonnes=0;
                    for(let i=0;i<9;i++){
                        for(let j=0;j<9;j++){
                            if(grillePlayer[i][j]===grilleOrigin[i][j]){
                                compteurCasesBonnes++;
                            }
                        }
                    }
                    if(compteurCasesBonnes===81){
                        //on affiche que c'est gagné
                        document.querySelector('h2[class="gagne"]').innerHTML="Bravo, vous avez gagné !";
                        //on arrete le chrono
                        // clearInterval(time);
                        clearTimeout(time);
                        estArrete=true;
                    }
                 } 
            })
        });

    });
});

//----------------------------------------------------
//lancons une nouvelle partie quand on clique sur le bouton nouvelle partie

//gérons le bouton nouvelle partie et le niveau de difficulté
const boutonNouvellePartie= document.querySelector('button[class="nouvellePartie"]');
const difficulte=document.querySelectorAll('input[type="radio"]');

boutonNouvellePartie.addEventListener("click", (event) => {
    let valeurDifficulte;
    for(let i=0;i<difficulte.length;i++){
        if(difficulte[i].checked===true){
            valeurDifficulte=difficulte[i].value;
            break;
        }
    }
    // console.log(valeurDifficulte);

    let nbCasesASupprimer=45;

    switch(valeurDifficulte){
        case "facile":
            nbCasesASupprimer=46;
            break;
        case "intermediaire":
            nbCasesASupprimer=49;
            break;
        case "difficile":
            nbCasesASupprimer=52;
            break;
        case "extreme":
            nbCasesASupprimer=55;
            break;
    }

    // console.log("nb cases à supprimer : " + nbCasesASupprimer);


    //maintenant on recrée une grille avec le nombre de cases à supprimer
    grille = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

grilleOrigin=[];

grilleCellulesEffacees = [];

grilleSolver = [];

grillePlayer = [];
    genererGrille();
    console.log("grille generée")
    grilleCellulesEffacees =  grille;
    effacerCellules(nbCasesASupprimer);
    console.log("cellules effacees")
    grillePlayer=copyGrille(grilleCellulesEffacees);
    afficherGrille();
    griserCases();

    //on efface le vous avez gagné
    document.querySelector('h2[class="gagne"]').innerHTML="";

    //on remet tout les boutons en gris
    tousButtonValue.forEach(button => {
        button.style.background="rgb(230,230,230)";
    })

    //on remet le chrono à 0
    estArrete=true;
    temps=0;
    estArrete=false;
    clearTimeout(time);
    // time =setInterval(augmenterTemps,1000);
    augmenterTemps();

});





console.log(grilleSolver);
 
console.log(grilleCellulesEffacees);
console.log(grille);
console.log(grilleOrigin);




