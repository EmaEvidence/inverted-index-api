
/**
 *
 */
class InvertedIndex {

  /**
   * constructor - description
   *
   * @param  {type} fileName    description
   * @param  {type} fileContent description
   * @return {type}             description
   */
  constructor(fileName, fileContent) {
    this.fileName = fileName;
    this.fileContent = fileContent;
    this.indexObject = {};
  }

  /**
   * checkIfArrayIsValid - description
   *
   * @return {type}  description
   */
   checkIfArrayIsValid(data) {
     let result = '';
       if (typeof data === 'object'){
         if (data.length === undefined && data[0] === undefined){
           result = false;
           throw new Error ('An Object but not a JSON Array')
         }
         else{
           if (data.length === 0) {
             result = false;
             throw new Error('Book is Empty');
           } else {
             data.forEach(function(file){
               let fileType = typeof file.text;
               if (fileType != 'string'){
               result = 'Malformed Array';
               throw new Error('file is malformed');
           }
           else {
               result = true;
           }
         });
           }
         }
       }else {
         result = false;
         throw new Error ('Not an Object');
       }
       return result;
     }

  createIndex(){
    const file = this.fileContent;
    let token = '';
     if (this.checkIfArrayIsValid(file) === true){
      console.log(file);
    file.forEach(function(file){
        token += (file.text)+' ';
       });
       token = token.replace(/[^a-zA-Z]/gi, ' ');
    }
    return token;
  }
  }
