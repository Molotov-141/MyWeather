# MyWeather
Projet étudiant sur la création d'un site internet pour récupérer les données météo en temps réel d'une ville en fonction du code postal.
## Utilisation des APIs
### geo.api.gouv
curl 'https://geo.api.gouv.fr/communes?codePostal=[int]'
On récupère un dictionnaire avec les informations qu'on a récupéré de l'API sous la forme d'un fichier JSON.
