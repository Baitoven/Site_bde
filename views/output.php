<!--DOCTYPE HTML-->
<html>
	<head>
		<title>Generateur de Status de liste</title>
		<meta charset='UTF-8'>
	</head>
	<body>
		<h1 style='text-decoration: underline;'>STATUTS ASSOCIATION <?php echo $_POST['association']?></h1>
		<h2>Article 1 - NOM</h2>
		<p>Il est fondé entre les adhérents aux présents statuts une association régie par la loi du 1 er  juillet 1901 et le décret du 16 août 1901, ayant pour titre : <?php echo $_POST['association']?></p>
		<h2>Article 2 - OBJET</h2>
		<p>Cette association a pour objet de préparer les campagnes des listes BDX de l'école Centrale de Nantes de décembre 2018.</p>
		<h2>Article 3 - SIEGE SOCIAL</h2>
		<p>Le siège social est fixé à : </p>
		<?php echo $_POST['nasso']." ".$_POST['rasso'].'</br>'?>
		<?php echo $_POST['dasso'].'</br>'?>
		<?php echo "Chez ".$_POST['chezasso']." ".'</br>'?>
		<?php echo $_POST['cpasso']." ".$_POST['vasso'].'</br>'?>
		<p>Il pourra être transféré par simple décision du bureau.</p>
		<h2>Article 4 - DUREE</h2>
		<p>La durée de l'association est illimitée.</p>
		<h2>Article 5 - COMPOSITION</h2>
		<p>L'association se compose de :</br>
			a) Membres</br>
			b) Soutiens (qui sortiront de l'association en cas de victoire aux campagnes)</p>
		<h2>ARTICLE 6 - ADMISSION</h2>
		<p>La liste des membres a été décidée à la création de l'association.</br> A titre exceptionnel, l'ajout d'un membre devra être accepté à l'issue d'un vote.</p>
		<h2>ARTICLE 7 - MEMBRES - COTISATIONS</h2>
		<p>Il n'y a pas de cotisation.</p>
		<h2>ARTICLE 8 - RADIATIONS</h2>
		<p>La qualité de membre se perd par :</br>
		a) La démission </br>
		b) Le décès</br>
		c) En cas de motif grave, la radiation prononcée par le bureau après un vote de tous les membres.</p>
		<h2>ARTICLE 9. - AFFILIATION</h2>
		<p>Aucune affiliation.</p>
		<h2>ARTICLE 10. - RESSOURCES</h2>
		<p>Les ressources de l'association comprennent :</br>
1) Fonds venant des membres si la demande est acceptée.</br>
2) Aides des éventuels partenaires.</br>
3) Toutes les ressources autorisées par les lois et règlements en vigueur.</br>
 
L'association exercera des activités économiques comme :</br>
- l'organisation de spectacles</br>
- l'organisation de rassemblements festifs</p>
<h2>ARTICLE 11 - ASSEMBLEE GENERALE ORDINAIRE</h2>
<p>L'assemblée générale ordinaire comprend tous les membres de l'association à quelque titre qu'ils soient.</br>
Elle se réunit tous les ans.</br>
Les décisions sont prises à la majorité des voix des membres présents ou représentés.</br>
</p>
<h2>ARTICLE 12 - CONSEIL D'ADMINISTRATION</h2>
<p>Pas de conseil d'administration.</p>
<h2>ARTICLE 13 - LE BUREAU</h2>
<p>Le bureau a été fixé à la création de l'association, il est composé de :</br>
1) Un-e- président-e- ;</br>
2) Deux vices-président-e-s- ;</br>
3) Un-e- secrétaire général et, s'il y a lieu, un-e- secrétaire adjoint-e- ;</br>
4) Un-e- trésorier-e-, et, si besoin est, des trésorier-e-s- adjoint-e-s-.</br>
</p>
<h2>ARTICLE 14 - INDEMNITES</h2>
<p>Toutes les fonctions sont bénévoles. </br>
</br>Les remboursements de frais en lien avec une activité de l'association doivent être validés par</br>
 le président et le trésorier, voire par l'ensemble du bureau s'il s'agit d'une somme importante.</p>
 <h2>ARTICLE - 15 - REGLEMENT INTERIEUR</h2>
<p> Un règlement intérieur peut être établi par le bureau, qui le fait alors approuver par l'assemblée générale.</br> Ce règlement éventuel est destiné à fixer les divers points non prévus par les présents statuts, notamment</br>
ceux qui ont trait à l'administration interne de l'association.</p>
<h2>ARTICLE - 16 - DISSOLUTION</h2>
<p>En cas de dissolution prononcée par le bureau, le bureau est en charge de la liquidation.</p>
<p><< Fait à Nantes, le <?php echo date('d-M-Y');?> >></p>
<?php echo $_POST['nprez']." ".$_POST['pprez']?></br>
<p>Président</p>

<h1>Procès-Verbal Assemblée Constituante <?php echo $_POST['association'];?></h1>
<p>Le <?php echo date("d-m-Y")?> à 20h, à l’école Centrale de Nantes, s’est réunie l’assemblée constituante ci relaté.</p>
<p>Il a été établi une feuille de présence signée par chaque membre de l’assemblée en séance, ci-annexée.</p>
<p><?php echo $_POST['nprez']." ".$_POST['pprez']?>, préside la séance.</p>
<p><?php echo $_POST['nvprez1']." ".$_POST['pvprez1']?>, exerce les fonctions de secrétaire de séance.</p>
Le président de séance met à la disposition des membres de l’assemblée constituante :</br>
- la feuille de présence certifiée exacte et sincère ;</br>
- les statuts de l’association <?php echo $_POST['association'];?></p>
<p>Le président de séance aborde successivement les questions figurant à l’ordre du jour.</br>
<h3>1. Première résolution Approbation des statuts</h3>
Les statuts de l’association sont approuvés par l’assemblée constituante.</br>
Cette résolution est adoptée à l’unanimité.</br>
<h3>2. Election du bureau</h3>
La liste du bureau donnée en annexe est élue.</br>
Cette résolution est approuvée à l’unanimité.</br>
<h3>3. Election</h3>
Le bureau donne tous pouvoirs au président de l'association pour prendre les mesures nécessaires en application des présentes résolutions.</br>
Cette résolution est adoptée à l’unanimité.</br>
 
<h3>4. Pouvoirs bancaires</h3>
L’assemblée constituante donne le pouvoir de créer et de gérer au quotidien un compte bancaire au nom de l’association, au président, trésorier et vices trésoriers.</br>
 
L'ordre du jour étant épuisé et personne ne demandant plus la parole, la séance est levée à 21 heures.</br>
En foi de quoi a été dressé le présent procès-verbal, paraphé et signé par le président de séance et le secrétaire de séance.</p>
<p>Le président de séance									Le secrétaire de séance</p>
<p><?php echo $_POST['nprez']." ".$_POST['pprez']?>									<?php echo $_POST['nvprez1']." ".$_POST['pvprez1']?></p>
<h2>ANNEXE 1/2 Feuille de présence</h2>
<p><?php echo $_POST['nprez']." ".$_POST['pprez']?></br><?php echo $_POST['nvprez1']." ".$_POST['pvprez1']?></br><?php echo $_POST['nvprez2']." ".$_POST['pvprez2']?></br><?php echo $_POST['nsecg']." ".$_POST['psecg']?></br><?php echo $_POST['ntrez']." ".$_POST['ptrez']?></br><p/>
<h2>ANNEXE 2/2 Constitution du bureau</h2>
<p>Président : <?php echo $_POST['nprez']." ".$_POST['pprez']?>, étudiant de nationalité française demeurant au </br>
<?php echo $_POST['nrprez']." ".$_POST['rprez']?></br>
<?php echo $_POST['dprez']?></br>
<?php echo $_POST['cpprez']." ".$_POST['viprez']?></p>
<p>Vice-Président : <?php echo $_POST['nvprez1']." ".$_POST['pvprez1']?>, étudiant de nationalité française demeurant au </br>
<?php echo $_POST['nrvprez1']." ".$_POST['rvprez1']?></br>
<?php echo $_POST['dvprez1']?></br>
<?php echo $_POST['cpvprez1']." ".$_POST['vivprez1']?></p>
<?php if (isset($_POST['nvprez2']))
{
	echo "<p>Vice-Président : ".$_POST['nvprez2']." ".$_POST['pvprez2']." ".", étudiant de nationalité française demeurant au </br>". $_POST['nrvprez2']." ".$_POST['rvprez2']."</br>". $_POST['dvprez2']."</br>". $_POST['cpvprez2']." ".$_POST['vivprez2']."</p>";
}
?>
<p>Secrétaire général : <?php echo $_POST['nsecg']." ".$_POST['psecg']?>, étudiant de nationalité française demeurant au </br>
<?php echo $_POST['nrsecg']." ".$_POST['rsecg']?></br>
<?php echo $_POST['dsecg']?></br>
<?php echo $_POST['cpsecg']." ".$_POST['visecg']?></p>
<?php if (isset($_POST['nvsecg'])){
	echo "<p>Secretaire adjoint : ".$_POST['nvsecg']." ".$_POST['pvsecg']." ".", étudiant de nationalité française demeurant au </br>". $_POST['nrvsecg']." ".$_POST['rvsecg']."</br>". $_POST['dvsecg']."</br>". $_POST['cpvsecg']." ".$_POST['vivsecg']."</p>";
}
?>
<p>Trésorier : <?php echo $_POST['ntrez']." ".$_POST['ptrez']?>, étudiant de nationalité française demeurant au </br>
<?php echo $_POST['nrtrez']." ".$_POST['rtrez']?></br>
<?php echo $_POST['dtrez']?></br>
<?php echo $_POST['cptrez']." ".$_POST['vitrez']?></p>
<?php if (isset($_POST['nvtrez'])){
	echo "<p>Secretaire adjoint : ".$_POST['nvtrez']." ".$_POST['pvtrez']." ".", étudiant de nationalité française demeurant au </br>". $_POST['nrvtrez']." ".$_POST['rvtrez']."</br>". $_POST['dvtrez']."</br>". $_POST['cpvtrez']." ".$_POST['vivtrez']."</p>";
}
?>




	</body>
</html>