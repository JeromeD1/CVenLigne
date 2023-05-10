<?php
    //il faut faire héberger son site. OVH est un hébergeur pas cher

// Attention, si aucune condition, le code PHP s'exécute dès l'ouverture de la page (donc avant l'envoi du formulaire)
// Vérification que les variables existent avec le fonction isset

if (isset($_POST["message"])) {
    // Création d'une variable message avec un récapitulatif des infos entrées dans le formumaire
    $message = "Ce message est envoyé via le formulaire de votre site Jérôme Desouches - Développeur Web
    Nom : " . $_POST["nom"] . "
    Prénom : " . $_POST["prenom"] . "
    Email : " . $_POST["email"] . "
    
    Message : 
    " . $_POST["message"];

    $sujet = "Contact de mon site - " . $_POST["prenom"] . " " . $_POST["nom"];

    
    //envoi mail. Les arguments sont : 1)mail du destinataire ; 2)Sujet ; 3)Message ; 4)Mail de l'expéditeur (l'hébergeur)
    mail("jerome.desouches@gmail.com" , $sujet , $message ,"Reply-to:" . $_POST["email"]);

    if ($retour) {
        echo "<p>L'email a bien été envoyé.</p>";
    }
}
?>