import json
from random import *
answers = []
missions = ["Tu dois le/la faire chanter une musique du film Harry Potter",
"Fais-le/la imiter dobby. Il/elle peut par exemple se taper la tête contre une lampe...",
"Mets une pierre philosophale dans sa poche. Il/elle ne doit pas s'en apercevoir...",
"Incite-le/la à voler sur un balais",
"Incite-le/la à se mettre un chapeau pointu sur la tête",
"Fais-lui porter des lunettes (rondes de préférence) qui ne sont pas les siennes",
"Sers-lui trois potions de suite. Il/elle doit les boire",
"Fais-le/la rire (pas sourire) avec une blague qui comporte le nom d'un personnage d'Harry Potter",
"Fais-le/la insulter ouvertement sa propre maison",
"Fais-le/la foncer contre un mur en criant \"9 3/4\"",
"Incite ta cible à te montrer une photo d'elle plus jeune, puis dis-lui : \"tu étais beau/belle quand tu étais encore moldu\"",
"Fais-le/la révéler sa mission puis dis-lui \"Imperium\"",
"Quand ta cible allumera une lumière, dis-lui \"Lumos\" et elle mourra. Fonctionne avec une lampe dans une salle, une lampe torche ou le flash d'un téléphone.",
"Fais en sorte qu'il/elle t'envoie une photo ou image de rat par message, puis réponds-lui : \"Soleil jonquille mimosa que ce gros vilain rat en jaune soit\"",
"Fais-le/la répéter 3 fois quelque chose puis dis-lui \"silencio\"",
"Dis \"Wingardium leviosa\" alors que ta cible lance un avion en papier",
"Echange ton bracelet de maison avec ta cible. Quand elle enfile ton bracelet, elle meurt",
"Incite-le/la à se mettre un drap sur la tête, puis dis-lui \"Expecto patronum\". Fonctionne aussi avec un duvet",
"Incite ta cible à te donner une mèche de ses cheveux pour la potion polynectar. Attention c'est ta cible qui doit se couper les cheveux de plein gré",
"Fais-le/la traduire le nom d'au moins 4 maisons de l'école",
"Fais-le/la dire les noms des 8 maisons de l'école à la suite",
"Fais-le/la imiter l'animal emblême de sa maison",
"Fais-le/la lister les noms de 7 personnages d'Harry Potter",
"Fais-le/la imiter un des personnages d'Harry Potter",
"Fais-le/la dire le nom des 7 livres Harry Potter à la suite",
"Fais-le/la dire le nom de 3 acteurs d'Harry Potter",
"Incite ta cible à te dessiner une cicatrice d'Harry Potter sur ton front",
"Incite ta cible à te donner une chaussette"]

with open('C:/Users/Elysean/bdeecn/private/answers.txt','rb') as f:
    for ln in f:
        decoded=False
        line=''
        for cp in ('utf-8','utf8'):
            try:
                line = ln.decode(cp)
                decoded=True
                break
            except UnicodeDecodeError:
                pass
        if decoded:
            answers.append(line[:-2].split('\t'))

def iswellshuffled(players):
    for k in range(len(players)-1):
        if players[k]["famille"]==players[k+1]["famille"]:
            return k
    return -1

def echange(t,k,j):
    t[k],t[j] = t[j],t[k]
    
def killershuffle(players):
    k=0
    while k < len(players) - 1:
        while players[k]["famille"] == players[k+1]["famille"]:
            echange(players, k+1, randrange(k+1,len(players)))
        k+=1
        print(k)
    return players
    
def generate_players(answers):
    out=[]
    for item in answers:
        inner={}
        inner["prenom"]=item[0]
        inner["nom"]=item[1]
        inner["famille"]=item[2]
        inner["key"]=item[3]
        out.append(inner)
    return out

def generate_k(answers): #Generation of killer.json
    out={}
    for item in answers:
        inner = {}
        inner["prenom"]=item[0]
        inner["nom"]=item[1]
        inner["famille"]=item[2]
        inner["dead"]=False
        inner["haskilled"]=False
        inner["key"]=item[3]
        out[item[3]] = inner
    return out
    
def generate_def(players): #Generation of killer.json
    out = {}
    inner = players[-1]
    inner["dead"]=False
    inner["haskilled"]=False
    inner["cible"]={"prenom": players[0]["prenom"], "nom": players[0]["nom"], "key": players[0]["key"], "mission":missions[randrange(28)]}
    out[players[-1]["key"]] = inner
    for k in range(len(players)-1):
        inner = players[k]
        inner["dead"]=False
        inner["haskilled"]=False
        inner["cible"]={"prenom": players[k+1]["prenom"], "nom": players[k+1]["nom"], "key": players[k+1]["key"], "mission":missions[randrange(28)]}
        out[players[k]["key"]] = inner
    return out
    
def generate_f(answers): #Generation of famillesKiller.json
    out={"Dragonwing":{},"Foxpaw":{},"Eaglescream":{},"Tigerblood":{},"Lionskin":{},"Phoenixtear":{},"Owlclaw":{},"Wolfeye":{}}
    for item in answers:
        inner = {}
        inner["prenom"]=item[0]
        inner["nom"]=item[1]
        inner["famille"]=item[2]
        inner["dead"]=False
        inner["haskilled"]=False
        out[item[2]].append(inner)
    return out

def write_json(data,path): #C:/Users/Elysean/bdeecn/private/answers.txt
    with open(path, 'w', encoding="utf8") as f:
        json.dump(data,f,indent=4,ensure_ascii=False)