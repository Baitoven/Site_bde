
window.onload = function()
{

    var selecteur = document.getElementById("select");
	var data = JSON.parse('[{"Colloc": "Le terminal","Habitants": "Robin Sylvain Vincent","Statut": 1,"Horaires": "20h-2h","MDP": "test","Adresse": "9 rue de la bleterie","Interphone": "C2","Divers": "Respect des voisins svp","N":47.214834,"E":-1.554844}]')
	var st1 = L.icon({
    iconUrl: 'Statut1.png',
    iconSize:     [38, 42], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var st2 = L.icon({
    iconUrl: 'Statut2.png',
    iconSize:     [38, 42], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var st3 = L.icon({
    iconUrl: 'Statut3.png',
    iconSize:     [38, 42], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
var kro = L.icon({
    iconUrl: 'kro.png',
    iconSize:     [50, 54], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
	
	for (i=0;i<data.length;i++){
		var node = document.createElement("option");
		var texte = document.createTextNode(data[i]["Colloc"]);
		node.appendChild(texte);
		selecteur.appendChild(node);
	}
	var mymap = L.map('mapid').setView([47.214099, -1.555422], 15);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoicm9iaW4tdHJvZXNjaCIsImEiOiJjam14aGFtdWIzaGw1M3BvZXdzN2E4OTd2In0.GEpXIj6HIbouU2_Bv29zTg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoicm9iaW4tdHJvZXNjaCIsImEiOiJjam14aGFtdWIzaGw1M3BvZXdzN2E4OTd2In0.GEpXIj6HIbouU2_Bv29zTg'
}).addTo(mymap);
for (i=0;i<data.length;i++){
	if (data[i]["Statut"]==1){
		var marker = L.marker([data[i]["N"], data[i]["E"]],{icon: st1}).addTo(mymap);
		marker.bindPopup(data[i]["Colloc"]+"</br>Actuellement ouvert"+"</br>Hotes :"+data[i]["Habitants"]+"</br>Adresse :"+data[i]["Adresse"]+"</br>"+data[i]["Divers"]);
	}
	if (data[i]["Statut"]==2){
		var marker = L.marker([data[i]["N"], data[i]["E"]],{icon: st2}).addTo(mymap);
		marker.bindPopup(data[i]["Colloc"]+"</br>Beaucoup de monde actuellement"+"</br>Hotes :"+data[i]["Habitants"]+"</br>Adresse :"+data[i]["Adresse"]+"</br>"+data[i]["Divers"]);
	}
	if (data[i]["Statut"]==3){
		var marker = L.marker([data[i]["N"], data[i]["E"]],{icon: st3}).addTo(mymap);
		marker.bindPopup(data[i]["Colloc"]+"</br>Actuellement fermé"+"</br>Hotes :"+data[i]["Habitants"]+"</br>Adresse :"+data[i]["Adresse"]+"</br>"+data[i]["Divers"]);
	}
	if (data[i]["Statut"]==4){
		var marker = L.marker([data[i]["N"], data[i]["E"]],{icon: kro}).addTo(mymap);
		marker.bindPopup(data[i]["Colloc"]+"</br>Actuellement en train de stackser.</br>Bières bienvenues."+"</br>Hotes :"+data[i]["Habitants"]+"</br>Adresse :"+data[i]["Adresse"]+"</br>"+data[i]["Divers"]);
	}
}

}
