<!DOCTYPE html>
<html>
<head>
    <title>Contact | Jerome Desouches - Développeur Web</title>
    <meta charset="utf-8"/>
    <!--  <meta name="viewport" content="width=device-width, initial-scale=1.0"> Pour que les @media fonctionnent avec tous les smartphones -->
    <link rel="styleSheet" href="Styles/style.css" />
    <link rel="styleSheet" href="Styles/contact.css" />
    <link rel="styleSheet" href="Styles/navigation.css" />
    <link rel="shortcut icon" href="Images/favicon.ico" type="image/x-icon">
    <script type="module" src="./javascript/navigation.js"></script>
    <!-- -----pour le captcha--------- -->
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content=
        "width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="Styles/captcha.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css"
        integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk"
        crossorigin="anonymous">
    <script src="javascript/captcha.js"></script> -->
    <!-- --------------------------- -->
</head>

<body onload="generate()">
    <header>
        <div class="ligne1">
            <div class="logos">
                <a  target="_blank" href="https://www.linkedin.com/in/j%C3%A9r%C3%B4me-desouches-a7bb85104?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bgdcv7TdVR8me%2BmJRVwhudA%3D%3D" 
                class="lienContainerPhoto"><img src="Images/logo-linkedin.png" 
                alt="logo-linkedin" title="Retrouvez moi sur Linkedin"></a>
                <a  target="_blank" href="https://github.com/JeromeD1" 
                class="lienContainerPhoto"><img src="./Images/logo-github.png" 
                alt="logo-gitHub" title="Retrouvez moi sur Github"></a>
                <a href="" class="lienContainerPhoto">
                    <img src="Images/logo-facebook.png" alt="logo-facebook">
                    <img src="Images/croix.png" class="logoHover" alt="croix" title="Pas de compte Facebook à consulter. C'est là pour faire joli !">
                </a>
                <a href="" class="lienContainerPhoto">
                    <img src="Images/logo-twitter.png" alt="logo-twitter">
                    <img src="Images/croix.png" class="logoHover" alt="croix" title="Pas de compte Twitter à consulter. C'est là pour faire joli !">
                </a>
                <a href="" class="lienContainerPhoto">
                    <img src="Images/logo-instagram.png" alt="logo-instagram">
                    <img src="Images/croix.png" class="logoHover" alt="croix"  title="Pas de compte Instagram à consulter. C'est là pour faire joli !">
                </a>
            </div>


            <div class="infoContact">
                <p>&#x2706; | 06 16 71 74 40</p>
                <p>&#x1F4E7; : jerome.desouches@hotmail.com</p>
            </div>
        </div>
        <div class="moi">
            <p id="monNom">Jérôme Desouches</p>
            <p id="monMetier">Développeur web</p>
        </div>  
        
    </header>

    <nav>
        <video id="background-video" autoplay loop muted poster="Images/vague2.png"><source src="Videos/vague2.mp4" type="video/mp4"></video>
            <div class="burger">
                <ul class="nav">
                    <li class="menu"><a class="lienMenu" href="index.html">Développement web</a></li>
                    <li class="menu"><a class="lienMenu" href="background.html">Mes expériences</a></li>
                    <li class="menu deroulant">
                        <div class="containerDeroulant">
                            <a class="lienMenu" href="mesJeux.html">Mes jeux &nbsp;</a>
                            <div class="flecheMenu"></div>
                        </div>
                            <ul class="sousMenu">
                                <li class="liSousMenu"><a class="lienSousMenu" href="sudoku.html">Sudoku</a></li>
                                <li><a class="lienSousMenu" href="demineur.html">Démineur</a></li>
                            </ul>
                    </li>
                    <li class="menu deroulant">
                        <div class="containerDeroulant">
                            <a class="lienMenu" href="mesProjets.html">Mes projets &nbsp;</a>
                            <div class="flecheMenu"></div>
                        </div>
                            <ul class="sousMenu">
                                <li class="liSousMenu"><a class="lienSousMenu" target="_blank" href="./ProjetLabo/html/home.html">Le Labo</a></li>
                                <li><a class="lienSousMenu" target="_blank" href="#">Hackaton n°1</a></li>
                                <li><a class="lienSousMenu" target="_blank" href="#">Projet n°2</a></li>
                            </ul>
                    </li>
                    <li class="menu"><a class="lienMenu" href="contact.php">Contact</a></li>
                </ul>
            </div>
            <img src="./Images/menu-burger.png" alt="icone menu hamburger" class="imageBurger"/>
    </nav>

    <main>
       
        <section id="introContact">
            <p>Vous êtes une <u>entreprise</u> sur Orléans à la <u>recherche</u> d'un <u>apprenti</u> motivé en développement web.</p>
            <p><span class="modernColor">Super !</span></p>
            <p>Alors n'hésitez pas à me contacter, par téléphone, email, ou via le formulaire ci dessous.</p>
        </section>
        <form method="post">
            <fieldset>
            <legend>Formulaire de contact</legend>
            <div class="nomPrenom">
                <div>
                    <!-- <label for="lastname">Nom</label><br> -->
                    <p class="mandatory">*</p>
                    <input type="text" name="lastname" id="lastname" placeholder="Nom" required>
                </div>
                <div>
                    <!-- <label for="firstname">Prénom</label><br> -->
                    <p class="mandatory">*</p>
                    <input type="text" name="firstname" id="firstname" placeholder="Prenom" required>
                </div>
            </div>
            <div id="blockEmail">
                <p class="mandatory">*</p>
                <input type="email" name="email" id="email" placeholder="email - ex : tom.hanks@hollywood.com" required>
            </div>
            <div id="blockTextarea">
                <!-- <label for="message">Message</label><br> -->
                <p class="mandatory">*</p>
                <textarea id="message" rows="10" name="message" placeholder="Votre message..." required></textarea>
            </div>
        </fieldset>
            <input type="submit" name="send" id="send" value="Envoyer">
        </form>


        <!-- ------PHP pour envoi mail----------- -->
        <?php
    //il faut faire héberger son site. OVH est un hébergeur pas cher

    //Attention, si aucune condition, le code PHP s'exécute dès l'ouverture de la page (donc avant l'envoi du formulaire)
     //Vérification que les variables existent avec le fonction isset

if (isset($_POST["message"])) {
    // Création d'une variable message avec un récapitulatif des infos entrées dans le formumaire
    $message = "Ce message a été envoyé via le formulaire de votre site Jérôme Desouches - Développeur Web

    Nom : " . $_POST["lastname"] . "
    Prénom : " . $_POST["firstname"] . "
    Email : " . $_POST["email"] . "
    
    Message : 
    " . $_POST["message"];

    $sujet = "Contact - " . $_POST["firstname"] . " " . $_POST["lastname"];

    
    //envoi mail. Les arguments sont : 1)mail du destinataire ; 2)Sujet ; 3)Message ; 4)Mail de l'expéditeur (l'hébergeur)
    $retour = mail("jerome.desouches@gmail.com" , $sujet , $message ,"Reply-to:" . $_POST["email"]);

    $color = 'white';
    if ($retour) {
        echo "<p  style='color: <?php echo $color; ?>;'>L'email a bien été envoyé.</p>";
    }
}
?>
        <!-- -------------------------------------- -->


<!-- ----------- pour le captcha--------------- -->
        <!-- <div id="user-input" class="inline">
            <input type="text" id="submit"
                placeholder="Captcha code" />
        </div>
     
        <div class="inline" onclick="generate()">
            <i class="fas fa-sync"></i>
        </div>
     
        <div id="image" class="inline" selectable="False">
        </div>
        <input type="submit" id="btn" onclick="printmsg()" />
     
        <p id="key"></p> -->
<!-- ------------------------------------------------- -->

    </main>

    <aside>


    </aside>

    <footer>
        <div class="lastInfo">
            <div class="footerPartie1">
                <img src="Images/logoJD.png" alt="logoJD">
                <p> Développeur web junior en recherche d'une alternance sur Orléans.</p>
            </div>

            <div class="footerPartie2">
                <p>&#x2706; | 06 16 71 74 40</p>
                <p>&#x1F4E7; : jerome.desouches@hotmail.com</p>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2023 - Tous droits réservés - Jérôme Desouches</p>
        </div>
    </footer>

</body>
</html>