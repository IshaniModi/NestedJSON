var JSONOutputs = {};
//used module.export to encapsulate the function.. Only functions declared in module.export are accessed by the outside class
module.exports = {
     TraverseJson : function(data){
       var rootElement = Object.keys(data)[0];
        data[rootElement].forEach(function (k){
            ParsingNestedJson(rootElement, k, null, null);   //traversing from root element - Starting point
        })
    },
   GetParsedOutput : function(){ return JSONOutputs; }
}


/*
ParsingNestedJson parses the nested json in a recursive form and checks if any key contains array of values
or object. Also, it creates seperate output object normalize the JSON
It takes 4 parameters
strPropertyName : key of the array / object or property.
obj : Json array or object
id : to set the parent Id of any object or array
index: to traverse if any element is an array can count the number of elements in an array
*/
function ParsingNestedJson(strPropertyName, obj, id, index) {
    var output = {};
    //setting the Id as a reference key for seperate nested json
    if (id !== null) output["id"] = id;
    //setting the Index if an element has arrays.
    if (index !== null) output["__index"] = index;
    //if any nested contains Id set the id to parse the internal elements.
    if (obj["id"]) id = obj["id"];
    Object.keys(obj).forEach(function (key) {
        var val = obj[key];
       if (Array.isArray(val)){ 
        val.forEach(function (elem, i){
            ParsingNestedJson(strPropertyName + "_" + key, elem, id, i);
        });
      } else if (typeof val === "object" && val !== null) {
        ParsingNestedJson(strPropertyName + "_" + key, val, id, null);
      } else { 
            output[key] = val;
      }
    });

    //setting the output object to the global output object.
    if (!JSONOutputs[strPropertyName]) JSONOutputs[strPropertyName] = [];
    JSONOutputs[strPropertyName].push(output);
    
}
   