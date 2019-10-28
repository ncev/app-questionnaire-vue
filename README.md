Travail effectué:

 -> Développement de l'interface de question
 -> calcul du résultat
 -> développement de pools
 -> sauvegardes des résultats
 
Pour ce faire j'ai utiliser un Mixin, qui centralise la communication avec PouchDB,
une base de données, CouchDb nommé 'app-questionnaire'.

au final trois component coexistent:

 * neHome (accueil, l'utilisateur se connecte et choisi son entreprise)
 * neQuestion (l'utilisateur répond aux diffèrentes questions, pour une question il y a de 1 à N, tel que specifié dans le .JSON)
 * neResult (affichage des résultats)

et un Mixin: pouchDbManager


à faire:

 -> affichage des résultats
 -> administration: (gestion des entreprises, des résultats et des questions (CRUD))