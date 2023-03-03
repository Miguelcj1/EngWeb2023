import json

with open("dataset-extra1.json", 'r', encoding="utf-8") as f:
    data = json.load(f)

pessoas = data['pessoas']
id = 1
for pessoa in pessoas:
    pessoa['id'] = "p" + str(id)
    id += 1

with open("dataset-extra1-ID.json", "w") as file:
    json.dump(data, file, indent=2, ensure_ascii = False)