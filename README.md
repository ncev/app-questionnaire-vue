dernier cours

durant ce cours, l'administration a pu être finalisé, comprenant:

-> ajout, modification et suppresion d'entreprise
-> ajout, modification et suppresion de questions
-> ajout, modification et suppresion des réponses aux questions

est également pris en charge la gestion des scores pour les questions ainsi que la visualisation des réponses

pour finir diffèrents bugs ont pu être résolu durant cette session:

-> bugs de rafraichissement de l'écran après mises à jour des données des questions
-> bugs d'affichage de synchronisation avec couchDb

ici le fichier .json contenant les questions est conservé, toutefois il n'est pas utilisé, ainsi il va nécessité l'utilisation de couchDB

pour cela, il vous est nécessaire de créer deux base de données:

-> app-questionnaire: ne nécessite rien de spécial, si ce n'est d'être accesible

-> app-questionnaire-questions: nécessite de contenir UN document, nommé 'questions', contenant les données du fichier .json dans ressources/quest.json, voir EDIT (bas de page)

lien: ncev.github.io

NB sur le lien, l'application tourne mais nécessite CouchDb local car l'application ne se base pas sur un fichier .json mais sur une base de données CouchDB

EDIT: ajouter "data" en attribut parent dans le document 'questions' pour les contenu des questions
