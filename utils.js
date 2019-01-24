
var fs = require('fs');
var JS = require('./JSONParse');
module.exports ={
    readJsonFile : function(filePath) 
    {
        try{
            const parsedata = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            JS.TraverseJson(parsedata);
            return  JS.GetParsedOutput();
        }
        catch(err){
            console.log(err);
        }
        
      },
      writeJsonFile : function( filePath) {
           var outputs = JS.GetParsedOutput();
           Object.keys(outputs).forEach(function(file) {
            fs.writeFileSync(file + ".json", JSON.stringify(outputs[file]));
          });
       
      },
      
}

