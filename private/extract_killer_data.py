import json
answers = []

with open('C:/Users/Damien/bdeecn/private/answers.txt','rb') as f:
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
    
def generate_dict(answers):
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

def write_json(data):
    with open('C:/Users/Damien/bdeecn/private/killer.json', 'w', encoding="utf8") as f:
        json.dump(data,f,indent=4,ensure_ascii=False)