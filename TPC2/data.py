import json

def ordCidade(cidade):
    return cidade['nome']

f = open("TPC1/mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']

cidades.sort(key=ordCidade)
cidadeID = {}
idCidades = {}
for c in cidades:
    cidadeID[c['id']] = c['nome']
    idCidades[c['nome']] = c['id']


ligacoes = mapa['ligações']
ligacaoFinal = {}
for lig in ligacoes:
    origem = lig['origem']
    destino = lig['destino']
    distancia = lig['distância']

    tuple = (destino,distancia)
    
    if origem not in ligacaoFinal:
        lista = [tuple]
        ligacaoFinal[origem] = lista
    
    else:
        lista = ligacaoFinal[origem]
        lista.append(tuple)

distritos = {}
for c in cidades:
    distrito = c['distrito']
    nome = c['nome']
    if distrito not in distritos:
        distritos[distrito] = [nome]
    else:
        distritos[distrito].append(nome)

distritos = dict(sorted(distritos.items()))


# Index
pagHTML = """
<!DOCTYPE html>

<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
"""

for distrito in distritos:
    pagHTML += f"""
    <b>{distrito}</b>
    <ul>"""
    for cidade in distritos[distrito]:
        idCidade = idCidades[cidade]
        pagHTML += f"""
        <li><a href="http://localhost:7777/{idCidade}">{cidade}</a></li>
        """

    pagHTML += "</ul>"

pagHTML += """
    </body>
</html>
"""

filename = "TPC2/htmlPages/index.html"
file = open(filename, 'w')
file.write(pagHTML)
file.close()

# Pagina das Cidades
for c in cidades:
    pagHTML = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>{c['nome']}</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>{c['nome']}</h2>
            <p><b>Distrito:</b> {c['distrito']}</p>
            <p><b>População:</b> {c['população']}</p>
            <p><b>Descrição:</b> {c['descrição']}</p>
    """

    if c['id'] in ligacaoFinal:
        pagHTML += f"""
        <h4>Ligações da cidade {c['nome']}</h4>
        <ul>
        """

        listaDestinos = ligacaoFinal[c['id']]
        for destino in listaDestinos:
            pagHTML += f"""<li><b>Destino: </b> <a href="http://localhost:7777/{destino[0]}"> {cidadeID[destino[0]]} </a> <b>Distância: </b> {destino[1]}</li>"""

    pagHTML += """
            </ul>
            <a href="http://localhost:7777/">Voltar ao Indice</a>
        </body>
    </html>
    """

    filename = f"TPC2/htmlPages/{c['id']}.html"
    file = open(filename, 'w')
    file.write(pagHTML)
    file.close()