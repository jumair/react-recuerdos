from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Configuración Local
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'pracdevcamp'

mysql = MySQL(app)

@app.route('/api/usuarios')
@cross_origin()
def getAllUsers():
    cur = mysql.connection.cursor()
    cur.execute('SELECT id, nombre, email, password, perfil FROM usuarios')
    data = cur.fetchall()
    result = []
    for row in data:
        content = { 'id':row[0], 'nombre':row[1], 'email':row[2], 'password':row[3], 'perfil':row[4] }
        result.append(content)

    return jsonify(result)

@app.route('/api/auth', methods=['POST'])
@cross_origin()
def auth_usuario():
    nombre = request.json['user']['nombre']
    password = request.json['user']['password']

    cur = mysql.connection.cursor()
    cur.execute('SELECT id, nombre, email, perfil FROM usuarios where nombre="' + nombre + '" and password="' + password + '"')
    data = cur.fetchall()

    result = []
    for row in data:
        content = { 'id':row[0], 'nombre':row[1], 'email':row[2], 'perfil':row[3] , 'auth':'OK' }
        result.append(content)

    return jsonify(result)

@app.route('/api/fotos', methods=['POST'])
@cross_origin()
def getAllFotos():
    limit = request.json['fotos']['limit']
    offset = request.json['fotos']['offset']

    cur = mysql.connection.cursor()
    cur.execute('SELECT id, url_foto, titulo, descripcion, estado_foto, fecha_foto, fecha_foto_subida, usuario_id '
                'FROM fotos LIMIT ' + limit + ' OFFSET ' + offset)
    data = cur.fetchall()

    result = []
    for row in data:
        content = { 'id':row[0], 'url_foto':row[1], 'titulo':row[2], 'descripcion':row[3], 'estado_foto':row[4]
                    , 'fecha_foto':row[5], 'fecha_foto_subida':row[6], 'usuario_id':row[7]}
        result.append(content)

    cur1 = mysql.connection.cursor()
    cur1.execute('SELECT COUNT(id) as totalregistros FROM fotos')
    regtotal = cur1.fetchall()

    fotos = { 'reg_totales':regtotal[0][0], 'datos':result }

    return jsonify(fotos)
    #return 'Devuelve todas las Fotos paginadas'

@app.route('/api/foto/id/<id>')
@cross_origin()
def getFotoById(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT id, url_foto, titulo, descripcion, estado_foto, fecha_foto, fecha_foto_subida, usuario_id '
                'FROM fotos WHERE id=' + id)
    data = cur.fetchall()

    result = []
    for row in data:
        content = { 'id':row[0], 'url_foto':row[1], 'titulo':row[2], 'descripcion':row[3], 'estado_foto':row[4]
            , 'fecha_foto':row[5], 'fecha_foto_subida':row[6], 'usuario_id':row[7]}
        result.append(content)

    return jsonify(result)
    #return 'Devuelve la Foto del ID'

@app.route('/api/fotos_mas_populares')
@cross_origin()
def getFotosMasPopulares():
    cur = mysql.connection.cursor()
    cur.execute('SELECT id, url_foto, titulo, descripcion, estado_foto, fecha_foto, fecha_foto_subida, usuario_id '
                'FROM fotos ORDER BY fecha_foto DESC LIMIT 5')
    data = cur.fetchall()

    result = []
    for row in data:
        content = { 'id':row[0], 'url_foto':row[1], 'titulo':row[2], 'descripcion':row[3], 'estado_foto':row[4]
            , 'fecha_foto':row[5], 'fecha_foto_subida':row[6], 'usuario_id':row[7]}
        result.append(content)

    return jsonify(result)
    #return 'Devuelve las 5 Fotos mas antiguas'

@app.route('/api/num_megusta/<foto_id>')
@cross_origin()
def getFotosNumMeGusta(foto_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT COUNT(foto_id) AS nummegusta FROM megusta WHERE foto_id = ' + foto_id)
    regtotal = cur.fetchall()

    result = { 'num_megusta':regtotal[0][0] }

    return jsonify(result)
    #return 'Devuelve el numero de megusta'

@app.route('/api/megusta/<foto_id>')
@cross_origin()
def getFotosMeGusta(foto_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT usuarios.nombre FROM megusta '
                'JOIN usuarios '
                'ON megusta.usuario_id = usuarios.id '
                'WHERE megusta.foto_id = ' + foto_id)
    data = cur.fetchall()

    result = []
    for row in data:
        content = { 'nombre':row[0] }
        result.append(content)

    return jsonify(result)
    #return 'Devuelve los nombres de los usuarios a los que les gusta la foto'

@app.route('/api/num_quienes/<foto_id>')
@cross_origin()
def getFotosNumQuienes(foto_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT COUNT(foto_id) AS nummquienes FROM quienes WHERE foto_id = ' + foto_id)
    regtotal = cur.fetchall()

    result = { 'num_quienes':regtotal[0][0] }

    return jsonify(result)
    #return 'Devuelve el numero de quienes salen en la foto'

@app.route('/api/quienes/<foto_id>')
@cross_origin()
def getFotosQuienes(foto_id):
    cur = mysql.connection.cursor()
    """cur.execute('SELECT usuarios.nombre FROM quienes '
                'JOIN usuarios '
                'ON quienes.usuario_id = usuarios.id '
                'WHERE quienes.foto_id = ' + foto_id)"""

    cur.execute('SELECT u.nombre FROM quienes q '
                'JOIN usuarios u '
                'ON q.usuario_id = u.id '
                'WHERE q.foto_id = ' + foto_id)

    data = cur.fetchall()

    result = []
    for row in data:
        content = { 'nombre':row[0] }
        result.append(content)

    return jsonify(result)
    #return 'Devuelve los nombres de los usuarios que están etiquetados en la foto'

@app.route('/api/num_usuarios')
@cross_origin()
def getFotosNumUsuarios():
    cur = mysql.connection.cursor()
    cur.execute('SELECT COUNT(id) AS nummusuarios FROM usuarios')
    regtotal = cur.fetchall()

    result = { 'num_usuarios':regtotal[0][0] }

    return jsonify(result)
    #return 'Devuelve el numero de usuarios de la aplicación'

@app.route('/api/fotos/usuario_id/<id>')
@cross_origin()
def getFotosDeUsuario(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT id, url_foto, titulo, descripcion, estado_foto, fecha_foto, fecha_foto_subida, usuario_id '
                'FROM fotos WHERE usuario_id = ' + id + ' ORDER BY id DESC')
    data = cur.fetchall()

    result = []
    for row in data:
        content = { 'id':row[0], 'url_foto':row[1], 'titulo':row[2], 'descripcion':row[3], 'estado_foto':row[4]
            , 'fecha_foto':row[5], 'fecha_foto_subida':row[6], 'usuario_id':row[7]}
        result.append(content)

    return jsonify(result)
    #return 'Devuelve las Fotos de unusuario en concreto'

@app.route('/api/legusta/<foto_id>/<usuario_id>')
@cross_origin()
def getLeGusta(foto_id, usuario_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT COUNT(id) AS legusta FROM megusta WHERE foto_id = ' + foto_id + ' AND usuario_id = ' + usuario_id)
    data = cur.fetchall()

    result = { 'le_gusta':data[0][0] }

    return jsonify(result)
    #return 'Devuelve si una foto le gusta a un usuario'

@app.route('/api/pon_quita_megusta', methods=['POST'])
@cross_origin()
def ponQuitaMeGusta():
    resultado = ""

    cur = mysql.connection.cursor()
    if request.form['operacion'] == "1":
        cur.execute("INSERT INTO `megusta` (`id`, `foto_id`, `usuario_id`) VALUES (NULL, %s,%s)",(request.form['foto_id'], request.form['usuario_id']))
        resultado = 'Añadido Me Gusta'
    else:
        cur.execute("DELETE FROM megusta WHERE foto_id = " + request.form['foto_id'] + " AND usuario_id = " + request.form['usuario_id'])
        resultado = 'Quitado Me Gusta'
    mysql.connection.commit()

    return resultado
    #return 'Pone o quita un megusta a una foto de un usuario'

@app.route('/api/foto_nueva', methods=['POST'])
@cross_origin()
def addFoto():
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO `fotos` (`id`, `titulo`, `descripcion`, `url_foto`, `estado_foto`, `fecha_foto`, `fecha_foto_subida`, `usuario_id`) "
                "VALUES (NULL, %s, %s, %s, %s, %s, %s, %s)",
               (request.form['titulo'], request.form['descripcion'], request.form['url_foto'], request.form['estado_foto'],
                request.form['fecha_foto'], request.form['fecha_foto_subida'], request.form['usuario_id']))

    cur.execute("SELECT LAST_INSERT_ID()")
    last_id = cur.fetchall()
    mysql.connection.commit()

    data = json.loads(request.form['etiquetas'])
    cur1 = mysql.connection.cursor()
    for elem in data:
        if str(elem['etiquetado']) == "1":
            cur1.execute("INSERT INTO `quienes` (`id`, `foto_id`, `usuario_id`) VALUES (NULL, %s, %s)", (last_id[0][0], elem['id']))
    mysql.connection.commit()

    return "Recuerdo guardado"
    # Inserta la nueva foto y quienes están etiquetados en la foto

@app.route('/api/foto_modifica/<int:fotoId>', methods=['PUT'])
@cross_origin()
def updateFoto(fotoId):
    cur = mysql.connection.cursor()
    cur.execute("UPDATE `fotos` SET `titulo`=%s, `descripcion`=%s, `url_foto`=%s, `estado_foto`=%s, `fecha_foto`=%s, `fecha_foto_subida`=%s, `usuario_id`=%s "
                "WHERE id = " + str(fotoId),
                (request.form['titulo'], request.form['descripcion'], request.form['url_foto'], request.form['estado_foto'],
                 request.form['fecha_foto'], request.form['fecha_foto_subida'], request.form['usuario_id']))
    mysql.connection.commit()

    data = json.loads(request.form['etiquetas'])
    cur1 = mysql.connection.cursor()
    cur1.execute("DELETE FROM quienes WHERE foto_id = " + str(fotoId))

    for elem in data:
        if str(elem['etiquetado']) == "1":
            cur1.execute("INSERT INTO `quienes` (`id`, `foto_id`, `usuario_id`) VALUES (NULL, %s, %s)", (fotoId, elem['id']))
    mysql.connection.commit()

    return "Recuerdo modificado"
    # Modifica datos de la fotos y quienes están etiquetados. NO MODIFICA la foto

@app.route('/api/foto_borra/<int:fotoId>', methods=['DELETE'])
@cross_origin()
def removeFoto(fotoId):
    cur1 = mysql.connection.cursor()
    cur1.execute('DELETE FROM quienes WHERE foto_id = ' + str(fotoId))
    mysql.connection.commit()

    cur1 = mysql.connection.cursor()
    cur1.execute('DELETE FROM megusta WHERE foto_id = ' + str(fotoId))
    mysql.connection.commit()

    cur1 = mysql.connection.cursor()
    cur1.execute('DELETE FROM historias WHERE foto_id = ' + str(fotoId))
    mysql.connection.commit()

    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM fotos WHERE fotos.id = ' + str(fotoId))
    mysql.connection.commit()

    return "Recuerdo eliminado"
    #Borrar en cascada de las demás TABLAS en el orden correcto (quienes, megusta e historias)

@app.route('/api/historias/foto_id/<foto_id>')
@cross_origin()
def getHistoriasFoto(foto_id):
    cur = mysql.connection.cursor()
    #cur.execute('SELECT id, historia, fecha_historia, foto_id, usuario_id '
     #           'FROM historias WHERE foto_id = ' + foto_id + ' ORDER BY fecha_historia DESC')
    cur.execute('SELECT h.id, h.historia, h.fecha_historia, h.foto_id, h.usuario_id, u.nombre '
                'FROM historias h JOIN usuarios u '
                'ON h.usuario_id = u.id '
                'WHERE h.foto_id = ' + foto_id + ' ORDER BY h.fecha_historia DESC, h.id DESC')
    data = cur.fetchall()

    result = []
    for row in data:
        #content = { 'id':row[0], 'historia':row[1], 'fecha_historia':row[2], 'foto_id':row[3], 'usuario_id':row[4] }
        content = { 'id':row[0], 'historia':row[1], 'fecha_historia':row[2], 'foto_id':row[3], 'usuario_id':row[4], 'usuario_nombre':row[5] }
        result.append(content)

    return jsonify(result)
    #return 'Devuelve las historias de una foto'

@app.route('/api/historia_nueva', methods=['POST'])
@cross_origin()
def addHistoria():
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO `historias` (`id`, `historia`, `fecha_historia`, `foto_id`, `usuario_id`) "
                "VALUES (NULL, %s, %s, %s, %s)",
                (request.form['historia'], request.form['fecha_foto'], request.form['foto_id'], request.form['usuario_id']))
    mysql.connection.commit()

    return "Historia guardada"
    # Inserta la nueva historia de la foto

@app.route('/api/historia_borra/<int:historiaId>', methods=['DELETE'])
@cross_origin()
def removeHistoria(historiaId):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM historias WHERE id = ' + str(historiaId))
    mysql.connection.commit()

    return "Historia eliminada"
    #Borra la historia de Id que le paso

@app.route('/api/num_historias/<foto_id>')
@cross_origin()
def getFotosNumHistorias(foto_id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT COUNT(foto_id) AS nummhistorias FROM historias WHERE foto_id = ' + foto_id)
    regtotal = cur.fetchall()

    result = { 'num_historias':regtotal[0][0] }

    return jsonify(result)
    #return 'Devuelve el numero de historias que tiene una foto'

@app.route('/')
def index():
    return "Hola Mundo desde NO ORM"

if __name__ == '__main__':
    app.run(None, 3001, True)
