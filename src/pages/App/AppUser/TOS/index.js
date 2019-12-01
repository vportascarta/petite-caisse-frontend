import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: "10vh",
    marginBottom: "10vh"
  }
}));

const TOS = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Politique de confidentialit&eacute;.</h1>
      <p>
        <strong>Introduction</strong>
        <br />
        Devant le d&eacute;veloppement des nouveaux outils de communication, il
        est n&eacute;cessaire de porter une attention particuli&egrave;re
        &agrave; la protection de la vie priv&eacute;e. C'est pourquoi, nous
        nous engageons &agrave; respecter la confidentialit&eacute; des
        renseignements personnels que nous collectons.
      </p>
      <hr />
      <h2>Collecte des renseignements personnels</h2>
      <p>Nous collectons les renseignements suivants :</p>
      <ul>
        <li>Nom</li>
        <li>Pr&eacute;nom</li>
        <li>Adresse &eacute;lectronique</li>
      </ul>

      <p>
        Les renseignements personnels que nous collectons sont recueillis au
        travers de formulaires et gr&acirc;ce &agrave; l'interactivit&eacute;
        &eacute;tablie entre vous et notre site Web. Nous utilisons
        &eacute;galement, comme indiqu&eacute; dans la section suivante, des
        fichiers t&eacute;moins et/ou journaux pour r&eacute;unir des
        informations vous concernant.
      </p>
      <hr />
      <h2>Formulaires et interactivit&eacute;:</h2>
      <p>
        Vos renseignements personnels sont collect&eacute;s par le biais de
        formulaire, &agrave; savoir :
      </p>
      <ul>
        <li>Formulaire d'inscription au site Web</li>
        <li>Formulaire de commande</li>
      </ul>
      <p>
        Nous utilisons les renseignements ainsi collect&eacute;s pour les
        finalit&eacute;s suivantes :
      </p>
      <ul>
        <li>Suivi de la commande</li>
        <li>Statistiques</li>
      </ul>
      <hr />
      <h2>Fichiers journaux et t&eacute;moins </h2>
      <p>
        Nous recueillons certaines informations par le biais de fichiers
        journaux (log file) et de fichiers t&eacute;moins (cookies). Il s'agit
        principalement des informations suivantes :
      </p>
      <ul>
        <li>Heure et jour de connexion</li>
      </ul>

      <br />
      <p>Le recours &agrave; de tels fichiers nous permet :</p>
      <ul>
        <li>Suivi de commande</li>
      </ul>
      <hr />
      <h2>Droit d'opposition et de retrait</h2>
      <p>
        Nous nous engageons &agrave; vous offrir un droit d'opposition et de
        retrait quant &agrave; vos renseignements personnels.
        <br />
        Le droit d'opposition s'entend comme &eacute;tant la possiblit&eacute;
        offerte aux internautes de refuser que leurs renseignements personnels
        soient utilis&eacute;es &agrave; certaines fins mentionn&eacute;es lors
        de la collecte.
        <br />
      </p>
      <p>
        Le droit de retrait s'entend comme &eacute;tant la possiblit&eacute;
        offerte aux internautes de demander &agrave; ce que leurs renseignements
        personnels ne figurent plus, par exemple, dans une liste de diffusion.
        <br />
      </p>
      <p>
        Pour pouvoir exercer ces droits, vous pouvez : <br />
        Courriel : deathos.pub@hotmail.fr
        <br /> Section du site web : https://caisse.nivtech.ovh/
        <br />{" "}
      </p>
      <hr />
      <h2>Droit d'acc&egrave;s</h2>
      <p>
        Nous nous engageons &agrave; reconna&icirc;tre un droit d'acc&egrave;s
        et de rectification aux personnes concern&eacute;es d&eacute;sireuses de
        consulter, modifier, voire radier les informations les concernant.
        <br />
        L'exercice de ce droit se fera :<br />
        Courriel : deathos.pub@hotmail.fr
        <br /> Section du site web : https://caisse.nivtech.ovh/
        <br />{" "}
      </p>
      <hr />
      <h2>S&eacute;curit&eacute;</h2>
      <p>
        Les renseignements personnels que nous collectons sont conserv&eacute;s
        dans un environnement s&eacute;curis&eacute;. Les personnes travaillant
        pour nous sont tenues de respecter la confidentialit&eacute; de vos
        informations.
        <br />
        Pour assurer la s&eacute;curit&eacute; de vos renseignements personnels,
        nous avons recours aux mesures suivantes :
      </p>
      <ul>
        <li>Protocole SSL (Secure Sockets Layer)</li>
        <li>Gestion des acc&egrave;s - personne autoris&eacute;e</li>
        <li>Gestion des acc&egrave;s - personne concern&eacute;e</li>
        <li>Sauvegarde informatique</li>
        <li>Identifiant / mot de passe</li>
        <li>Pare-feu (Firewalls)</li>
      </ul>

      <p>
        Nous nous engageons &agrave; maintenir un haut degr&eacute; de
        confidentialit&eacute; en int&eacute;grant les derni&egrave;res
        innovations technologiques permettant d'assurer la
        confidentialit&eacute; de vos transactions. Toutefois, comme aucun
        m&eacute;canisme n'offre une s&eacute;curit&eacute; maximale, une part
        de risque est toujours pr&eacute;sente lorsque l'on utilise Internet
        pour transmettre des renseignements personnels.
      </p>
    </div>
  );
};

export default TOS;
