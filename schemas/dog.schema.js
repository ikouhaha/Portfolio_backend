module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/dog",
    "title": "Dog",
    "description": "dog's information",
    "type": "object",
    "properties": {
        "name":{
            "description": "The name of dog",
            "type": "string"
        },
        "about":{
            "description": "The description of dog",
            "type": "string"
        },
        "breedID":{
            "description": "The breed id of dog",
            "type": "integer"
        },
        "userID":{
            "description": "The dog information create by",
            "type": "integer"
        },
    },
    "required": ["name", "about","breed_id"]
}
