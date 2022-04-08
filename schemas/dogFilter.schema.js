module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/dog",
    "title": "Dog Filter",
    "description": "the request data of filter",
    "type": "object",
    "properties": {
      "page": {
        "description": "The page of data",
        "type": "integer",
        "minimum": 1
      },
      "limit": {
        "description": "the number of data show in each page",
        "type": "integer",
        "minimum": 1
      },
      "order": {
        "description": "the sorting by specified field and sorting descending/ascending",
        "type": "object"
      },
      "filterData": {
        "description": "the filter field and data of the dogs",
        "type": "object",
        "properties": {
          "name": {
            "description": "The name of dog ",
            "type": "string"
          },
          "companyCode": {
            "description": "The code of company ",
            "type": "string"
          },
          "breedID": {
            "description": "The id of dog's breed ",
            "type": "integer"
          }
        }
      }
    },
    "required": [
      "page",
      "limit"
    ]
  }