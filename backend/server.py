from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Get the script's current directory
script_dir = os.path.dirname(os.path.realpath(__file__))

# Define the dog_data directory path relative to the script's directory
dog_data_dir = os.path.join(script_dir, 'dog_data')

# Create the dog_data directory if it doesn't exist
if not os.path.exists(dog_data_dir):
    os.makedirs(dog_data_dir)

def save_to_json_file(data):
    # Use global variables
    name = "Alfie"
    date = "0510"
    experiment = "prompt"
    
    # Create a filename based on name and date
    filename = os.path.join(dog_data_dir, f"{name}_{date}_{experiment}.json")

    try:
        # Open the file in append mode to ensure we don't overwrite existing entries
        with open(filename, 'a') as file:
            # Write the new data as a JSON object on a new line
            json.dump(data, file, separators=(',', ':'))
            file.write('\n')  # Add a newline after writing each JSON object

        print(f"Data successfully saved to {filename}")
        
    except Exception as e:
        print(f"Error while saving to JSON file: {e}")



@app.route('/', methods=['GET', 'POST'])
def receive_data():
    if request.method == 'POST':
        if request.content_type == 'application/json':
            data = request.get_json()
            print(f"Received data: {data}")
            # Save the received data to the JSON file
            save_to_json_file(data)
            return jsonify({"status": "success", "data": data}), 200
        else:
            return "Unsupported Media Type", 415
    else:
        return "Woof Band server working as expected. This route expects a POST request with JSON data.", 200



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
