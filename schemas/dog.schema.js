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
        "imageBase64":{
            "description": "The base64 format of image",
            "type": "string"
        },
        "breedID":{
            "description": "The breed id of dog",
            "type": "integer"
        },
        "createdBy":{
            "description": "The dog information create by",
            "type": "integer"
        },
        "companyCode":{
            "description": "The code of the company and the dog available at their company ",
            "type": "string"
        },
    },
    "required": ["name", "about","breed_id","imageBase64","createdBy","companyCode"]
}
