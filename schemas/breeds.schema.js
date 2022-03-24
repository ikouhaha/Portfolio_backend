module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/breed",
    "title": "Breed",
    "description": "dog's breed",
    "type": "object",
    "properties": {
        "weight": {
            "description": "the weight of the dog",
            "type": "object",
            "properties": {
                "imperial": { "type": "string" },
                "metric": { "type": "string" },
            }


        },
        "height": {
            "description": "the height of the dog",
            "type": "object",
            "properties": {
                "imperial": { "type": "string" },
                "metric": { "type": "string" },
            }

        },
        "name": {
            "description": "the name of breed",
            "type": "string"
        },
        "breed_group": {
            "description": "the group of the breed",
            "type": "string"
        },
        "life_span": {
            "description": "the life expectancy of the dog",
            "type": "string"
        },
        "temperament": {
            "description": "the temperament of the dog ",
            "type": "string",
        },
        "origin": {
            "description": "the place of orgin for the dog ",
            "type": "string",
        },
    },
    "additionalProperties": false,


    "minItems": 1,

}
