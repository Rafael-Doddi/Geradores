from gerador import Gerador
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)
gerador = Gerador()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gerar_usuario', methods=['GET', 'POST'])
def gen_usuario():
    if request.method == 'GET':
        return render_template('gerar_usuario.html')
    elif request.method == 'POST':
        try:
            data = request.get_json()
            tamanho = int(data['tamanho'])
            digitos = int(data['digitos'])
        except KeyError:
            return jsonify(status='erro', err='faltando parâmetro(s).')
    usuario = gerador.usuario(tamanho, digitos)
    return jsonify(status='ok', usuario=usuario)

@app.route('/gerar_senha', methods=['GET', 'POST'])
def gen_senha():
    if request.method == 'GET':
        return render_template('gerar_senha.html')
    elif request.method == 'POST':
        try:
            data = request.get_json()
            tamanho = int(data['tamanho'])
            digitos = int(data['digitos'])
            upper = int(data['upper'])
            lower = int(data['lower'])
            punctuation = int(data['punctuation'])
        except KeyError:
            return jsonify(status='erro', err='faltando parâmetro(s).')
    password = gerador.password(tamanho, digitos, upper, lower, punctuation)
    return jsonify(status='ok', password=password)

@app.route('/gerar_cpf', methods=['GET', 'POST'])
def gen_cpf():
    if request.method == 'GET':
        return render_template('gerar_cpf.html')
    elif request.method == 'POST':
        cpf = gerador.gen_cpf()
        cpf_pontuacao = '%s%s%s.%s%s%s.%s%s%s-%s%s' % tuple(cpf)
        return jsonify(status='ok', cpf=cpf, cpf_pontuacao=cpf_pontuacao, local=gerador.local_cpf(cpf), valido=gerador.valida_cpf(cpf))

@app.route('/validar_cpf', methods=['GET', 'POST'])
def val_cpf():
    if request.method == 'GET':
        return render_template('valida_cpf.html')
    elif request.method == 'POST':
        try:
            data = request.get_json()
            return str(gerador.valida_cpf(data['cpf']))
        except KeyError:
            return jsonify(status='erro', err='faltando parâmetro(s).')

@app.route('/local_cpf', methods=['GET', 'POST'])
def local_cpf():
    if request.method == 'GET':
        return render_template('local_cpf.html')
    elif request.method == 'POST':
        data = request.get_json()
        return jsonify(status='ok', local=gerador.local_cpf(data['cpf']))

if __name__ == "__main__":
    app.run()
    # app.run(debug=1, port=80)