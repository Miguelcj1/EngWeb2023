import json

def ordCidade(cidade):
    return cidade['nome']


f = open("mapa.json")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)

cidadeID = {}
for c in cidades:
    cidadeID[c['id']] = c['nome']


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



pagHTML = """
<!DOCTYPE html>

<html>
    <head>
        <title> Mapa Virtual</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!--Coluna do Indice-->
                <td width="30%"valign="top">
                <a name="Indice">
                    <h3>Indice</h3>
                    <ol>
"""

for c in cidades:
    pagHTML += f"""                        <lI><a href="#{c['id']}">{c['nome']}</a></lI>
"""

pagHTML += """
                    </ol>
                </td>

                <!--Coluna do conteudo-->
                <td>
"""

for c in cidades:
    pagHTML += f"""
                        <a name="{c['id']}">
                        <h3>{c['nome']}</h3>
                        <p><b>Distrito:</b> {c['distrito']}</p>
                        <p><b>População:</b> {c['população']}</p>
                        <p><b>Descrição:</b> {c['descrição']}</p>
                        """

    if c['id'] in ligacaoFinal:
        pagHTML += f"""
                        <h4>Ligações da cidade {c['nome']}: </h4>
                        <ul>
        """
        listaDestinos = ligacaoFinal[c['id']]
        for destino in listaDestinos:
            pagHTML += f"""                     <li><b>Destino: </b> <a href="#{destino[0]}"> {cidadeID[destino[0]]} </a> <b>Distância: </b> {destino[1]}</li>"""


    pagHTML += """
                            </ul>
                            <a href="#Indice">Voltar ao Indice</a>
                            <centre>
                                <hr width="80%"/>
                            </centre>
        """

pagHTML += f"""
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)