import requests
import json

with open('dataset-extra1.json') as file:
    pessoas = json.load(file)['pessoas']

for pessoa in pessoas:
    pessoa['_id'] = pessoa['id']
    del pessoa['id']
    response = requests.post('http://localhost:7777/persons', json=pessoa)
    print(response)