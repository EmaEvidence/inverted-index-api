
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
   * @return {object}  description
   */
  createIndex() {
    const file = this.fileContent;
    let token = '';
    const wordToken = {};
    if (this.checkIfArrayIsValid(file) === true) {
      file.forEach((indFile) => {
        token += indFile.text + ' ';
      });
      token = token.replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
      let fileIndex = 0;
      file.forEach((indFile) => {
        token.forEach((indToken) => {
          if (!wordToken.hasOwnProperty(indToken) && indToken !== '') {
            const searchResult = (indFile.text).toLowerCase().search(indToken);
            if (searchResult >= 0) {
              wordToken[indToken] = [fileIndex];
            }
          } else if (wordToken.hasOwnProperty(indToken) && indToken !== '') {
            const searchResult = (file.text).toLowerCase().search(indToken);
            if (searchResult >= 0) {
              const alreadyIndex = wordToken[indToken];
              wordToken[indToken] = Array.from(new Set(alreadyIndex.concat([fileIndex])));
            }
          }
        });
        fileIndex += 1;
      });
    }
    this.indexObject = wordToken;
    return wordToken;
  }


  /**
   * searchIndex - searches for the presence of supplied term(s) in the created index.
   *
   * @param  {object} index    index created by createIndex method.
   * @param  {string} fileName optional the name of file to search from.
   * @param  {array} ...terms words to search for
   * @return {object}          result of the search.
   */
  searchIndex(index, fileName, ...terms) {
    this.index = this.indexObject;
    this.fileName = fileName;
    const searchTerms = [];
    const searchIndexResult = {};
    terms.forEach((indTerm) => {
      if (typeof indTerm === 'string') {
        searchTerms.push(indTerm);
      } else {
        if ((typeof indTerm === 'number' || indTerm.length === 'undefined')) {
          throw new Error('Invalid search Term');
        }
        indTerm.forEach((indTermInArray) => {
          searchTerms.push(indTermInArray);
        });
      }
    });
    searchTerms.forEach((term) => {
      if (this.index.hasOwnProperty(term)) {
        searchIndexResult[term] = this.index[term];
      } else {
        searchIndexResult[term] = '-';
      }
    });
    return searchIndexResult;
  }
  }
