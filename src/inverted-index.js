
/**
 * inverted-index class
 */
class InvertedIndex {

  /**
   * constructor - description
   *
   * @param  {string} fileName    the name of uploaded file
   * @param  {object} fileContent JSON array
   * @return {type}             description
   */
  constructor(fileName, fileContent) {
    this.fileName = fileName;
    this.fileContent = fileContent;
    this.indexObject = {};
  }


   /**
    * checkIfArrayIsValid - checks the validity of the supplied JSON array;
    *
    * @param  {object} data the file to be tested
    * @return {boolean}      the result of the test
    */
  checkIfArrayIsValid(data) {
    let result = '';
    if (typeof data === 'object') {
      if (data.length === undefined && data[0] === undefined) {
        result = false;
        throw new Error('An Object but not a JSON Array');
      } else {
        if (data.length === 0) {
          result = false;
          throw new Error('Book is Empty');
        } else {
          data.forEach((file) => {
            const fileType = typeof file.text;
            if (fileType !== 'string') {
              result = 'Malformed Array';
              throw new Error('file is malformed');
            } else {
              result = true;
            }
          });
        }
      }
    } else {
      result = false;
      throw new Error('Not an Object');
    }
    return result;
  }

  /**
   * createIndex - creates an index from the supplied JSON array
   *
   * @return {type}  description
   */
  createIndex() {
    const file = this.fileContent;
    let token = '';
    let wordToken = {};
    if (this.checkIfArrayIsValid(file) === true) {
      file.forEach((indFile) => {
        token += (indFile.text) + ' ';
      });
      token = token.replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
      let fileIndex = 0;
      file.forEach((indFile) => {
        token.forEach((indToken) => {
          if (!wordToken.hasOwnProperty(indToken) && indToken !== '') {
            const searchResult = (indFile.text).toLowerCase().search(indToken);
            if (searchResult >= 0) {
              wordToken[indToken].push(fileIndex); //= fileIndex;
            }
          }
        });
        fileIndex += 1;
      });
    }
    return wordToken;
  }
  }
