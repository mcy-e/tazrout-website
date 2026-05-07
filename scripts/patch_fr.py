import json, pathlib

p = pathlib.Path(r'd:\tazrout-website\messages\fr.json')
d = json.loads(p.read_text(encoding='utf-8'))

d['Hero']['description'] = (
    'Des cartes dans la terre, une passerelle LoRa sur le toit du hangar, '
    'un moteur IA local qui commande les vannes, '
    'et un ecran en arabe ou en francais qui montre ce qui s est passe. '
    'Pas d internet. Pas de facture cloud. Tout cable par nous.'
)

d['Pitch']['value_local_desc'] = (
    'Des cultures differentes, des coins de terrain differents. '
    'Chaque zone a ses propres regles d arrosage.'
)

d['System']['stops']['0']['desc'] = (
    'Le systeme Tazrout connecte les capteurs de terrain, l alimentation en eau, '
    'la radio LoRa et un serveur IA central, le tout sans internet.'
)

d['FutureFeatures']['description'] = (
    'Le systeme tourne en labo. L objectif c est dix fermes d ici 2028.'
)
d['FutureFeatures']['phases']['1']['description'] = (
    'Agreger les donnees terrain anonymisees dans une plateforme que le '
    'ministere de l Agriculture peut vraiment interroger. '
    'Des lectures de sol transformees en quelque chose qui oriente la politique de l eau.'
)
d['FutureFeatures']['phases']['2']['description'] = (
    'Les previsions meteo de demain alimentent le planning d arrosage d aujourd hui. '
    'Le modele voit l orage arriver et saute le cycle du matin.'
)
d['FutureFeatures']['phases']['3']['description'] = (
    'Les noeuds surveillent les pics thermiques. Si les chiffres disent incendie, '
    'toutes les vannes ferment et la pression d eau tient pour ce qui compte.'
)
d['FutureFeatures']['phases']['4']['description'] = (
    'Une appli telephone pour l agriculteur de l autre cote du champ. '
    'Statut des zones, alertes et bouton stop. Tourne sur le WiFi de la ferme.'
)
d['FutureFeatures']['phases']['5']['description'] = (
    'Cameras et capteurs d entree sur le meme reseau. '
    'Si quelqu un touche un noeud qui ne devrait pas l etre, le tableau de bord le sait en premier.'
)
d['FutureFeatures']['phases']['6']['subtitle'] = 'Tu gardes la main'
d['FutureFeatures']['phases']['6']['description'] = (
    'L IA gere le planning de 3h du matin. '
    'Tu reprends le controle quand tu en as besoin. Un bouton suffit.'
)
d['FutureFeatures']['phases']['7']['description'] = (
    'Boitiers etanches, panneaux solaires, connecteurs industriels. '
    'Du materiel qui ne flanche pas quand Batna atteint 42 degres en juillet.'
)
d['FutureFeatures']['phases']['8']['description'] = (
    'Alertes audio en arabe et en tamazight. '
    'Un agriculteur qui ne lit pas l ecran entend quand meme ce qui s est passe.'
)
d['FutureFeatures']['phases']['9']['description'] = (
    'Des capteurs qui detectent la maladie avant qu elle soit visible sur les feuilles. '
    'Construit avec des chercheurs qui etudient ca de pres.'
)

d['Install']['business_body'] = (
    'Commencer par le Plan 1 : on vient sur ton terrain, on cable les noeuds, '
    'on tire les fils et on te remet un ecran qui marche. '
    'Tu paies une fois pour le materiel et notre travail.\n\n'
    'Le Plan 2 c est un passage annuel : on recalibre les capteurs, '
    'on pousse les mises a jour logiciel et on garde le systeme honnete. '
    'Quinze a vingt pour cent de ce que tu as paye pour le materiel.\n\n'
    'Si tu veux pas d abonnement, le Plan 3 c est du pay-per-panne : '
    'on vient quand quelque chose lache, tu paies la visite.\n\n'
    'Rien ne contacte l exterieur. Aucune facture d un serveur que tu n as jamais vu.'
)

d['PitchDeck']['closing_body'] = (
    'Un terrain pilote, 200 a 500 metres carres. '
    'Un contact avec l INRAA ou une cooperative prete a laisser planter des noeuds dans de la vraie terre. '
    'C est ca la demande.\n\n'
    'D ici 2028 : dix sites qui tournent, une plateforme de donnees que le ministere '
    'peut vraiment interroger, et un cout assez bas pour que n importe quel agriculteur algerien puisse se l offrir.'
)

d['PitchDeck']['competitive_rows'][0]['us'] = (
    'Fonctionne hors ligne. Vannes pilotees par l IA locale. '
    'Entraine sur des donnees en climat aride algerien. Ton cout materiel, pas un abonnement cloud.'
)
d['PitchDeck']['competitive_rows'][1]['us'] = (
    'Moteur IA complet sur ton LAN. Aucune dependance cloud. '
    'Pas de facture recurrente pour des donnees qui t appartiennent.'
)
d['PitchDeck']['competitive_rows'][2]['us'] = (
    'Pilote par les capteurs, controle par le modele. '
    'Plusieurs zones chacune avec ses propres regles. Fini les minuteries, fini les suppositions.'
)

p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding='utf-8')
print('fr.json patched')
