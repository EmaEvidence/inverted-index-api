
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
  constructor() {
    this.fileName = '';
    this.fileContent = '';
    this.CreatedIndexObject = {};
    this.searchIndexResult = {};
  }

   /**
    * checkIfArrayIsValid - checks the validity of the supplied JSON array;
    *
    * @param  {object} data the file to be tested
    * @return {boolean}      the result of the test
    */
  checkIfArrayIsValid(data = this.fileContent) {
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
            const fileTitleType = typeof file.title;
            const fileTitle = file.title;
            const fileTextType = typeof file.text;
            const fileText = file.text;
            if ((fileTitleType !== 'string' || fileTitle === ' ') || (fileTextType !== 'string' || fileText === ' ')) {
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
   * createIndex - description
   *
   * @param  {type} fileName    description
   * @param  {type} fileContent description
   * @return {type}             description
   */
  createIndex(fileName, fileContent) {
    this.fileName = fileName;
    this.fileContent = fileContent;
    let token = '';
    const wordToken = {};
    if (this.checkIfArrayIsValid(fileContent) === true) {
        // console.log(fileContent);
      fileContent.forEach((fileCont) => {
        token += `${fileCont.text} `;
      });
      token = token.replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
      let fileIndex = 0;
      fileContent.forEach((fileCont) => {
        token.forEach((indToken) => {
          if (!Object.prototype.hasOwnProperty.call(wordToken, indToken) && indToken !== '') {
            const searchResult = (fileCont.text).toLowerCase().search(indToken);
            if (searchResult >= 0) {
              wordToken[indToken] = [fileIndex];
            }
          } else if (Object.prototype.hasOwnProperty.call(wordToken, indToken) && indToken !== '') {
            const searchResult = (fileCont.text).toLowerCase().search(indToken);
            if (searchResult >= 0) {
              const alreadyIndex = wordToken[indToken];
              wordToken[indToken] = Array.from(new Set(alreadyIndex.concat([fileIndex])));
            }
          }
        });
        fileIndex += 1;
      });
    }
      // this.indexObject = wordToken;
      // return token;
    this.CreatedIndexObject[this.fileName] = wordToken;
      // return wordToken;
    const indexObject = this.CreatedIndexObject;
    return indexObject;
  }

  /**
   * searchIndex - searches for the presence of supplied term(s) in the created index.
   *
   * @param  {object} index    index created by createIndex method.
   * @param  {string} fileName optional the name of file to search from.
   * @param  {array} terms words to search for
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
      if (Object.prototype.hasOwnProperty.call(this.index, term)) {
        searchIndexResult[term] = this.index[term];
      } else {
        searchIndexResult[term] = '-';
      }
    });
    return searchIndexResult;
  }
  }
export default InvertedIndex;
