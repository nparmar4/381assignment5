from flask import Flask, request, jsonify

app = Flask(__name__)

users = [
]

products = [
    {
    "id": 1,
    "name": "Product 1",
    "description": "Description for Product 1",
    "price": 10.99,
    "image": 'images/product1.png'
    },
    {
    "id": 2,
    "name": "Product 2",
    "description": "Description for Product 2",
    "price": 20.99,
    "image": 'images/product2.jpg'
    },
    {
    "id": 3,
    "name": "Product 3",
    "description": "Description for Product 3",
    "price": 10.99,
    "image": 'images/product3.jpg'
    },
    {
    "id": 4,
    "name": "Product 4",
    "description": "Description for Product 4",
    "price": 10.99,
    "image": 'images/product4.jpg'
    },
    {
    "id": 5,
    "name": "Product 5",
    "description": "Description for Product 5",
    "price": 10.99,
    "image": 'images/product5.jpg'
    },
    {
    "id": 6,
    "name": "Product 6",
    "description": "Description for Product 6",
    "price": 10.99,
    "image": 'images/product6.jpg'
    },
    {
    "id": 7,
    "name": "Product 7",
    "description": "Description for Product 7",
    "price": 10.99,
    "image": 'images/product7.jpg'
    },
    {
    "id": 8,
    "name": "Product 8",
    "description": "Description for Product 8",
    "price": 10.99,
    "image": 'images/product8.jpg'
    },
    {
    "id": 9,
    "name": "Product 9",
    "description": "Description for Product 9",
    "price": 10.99,
    "image": 'images/product9.jpg'
    },
    {
    "id": 10,
    "name": "Product 10",
    "description": "Description for Product 10",
    "price": 10.99,
    "image": 'images/product10.jpg'
    }
]

# User registration API endpoint
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    confirm_password = data.get('confirmPassword')
    
    # Check if all fields are provided
    if not (username and password and email and confirm_password):
        return jsonify({'error': 'All fields are required!'}), 400
    
    # Check if password matches confirmPassword
    if password != confirm_password:
        return jsonify({'error': 'Passwords do not match!'}), 400
    
    # Check if username already exists
    for user in users:
        if user['username'] == username:
            return jsonify({'error': 'Username already exists'}), 400
    print(users)
    users.append({"username": username, "password": password, "email": email})
    print(users)
    return jsonify({'message': 'User signed up successfully!'}), 201
    
# User authentication API endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Check if user exists and password is correct
    for user in users:
        if user['username'] == username and user['password'] == password:
            return jsonify({'message': 'Login successful'}), 200
    return jsonify({'error': 'Incorrect username or password'}), 401

# Product API endpoint
@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)