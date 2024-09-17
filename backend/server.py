from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET','POST'])
def receive_data():
    data = request.json
    print(request.content_type)
    print('\n')
    print(f"Received data: {data}")
    return jsonify({"status": "success", "data": data}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)