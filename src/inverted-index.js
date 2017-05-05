/* eslint linebreak-style: ["error", "windows"]*/
/**
 * the inverted index class that creates indices from supplied JSON Array objects.
 */
class InvertedIndex {
  /**
   * constructor - creates containers for datas created in the class to be stored and accessed.
   *
   * @return {type}  empty containers, empty objects
   */
  constructor() {
    this.fileName = '';
    this.fileContent = '';
    this.CreatedIndexObject = {};
    this.searchIndexResult = {};
  }

  /**
   * checkIfArrayIsValid - checks the validity of the JSON Array supplied to the class.
   *
   * @param  {object} data the JSON array
   * @return {boolean} the result of the validity check.
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
   * createIndex - creates indices from supplied JSON Array Object and stores it in a container.
   *
   * @param  {string} fileName    the name of the file to create index from
   * @param  {JSON} fileContent the file to create index from
   * @return {JSON}             the result of the created Array.
   */
  createIndex(fileName, fileContent) {
    this.fileName = fileName;
    this.fileContent = fileContent;
    let token = '';
    const wordToken = {};
    if (this.checkIfArrayIsValid(fileContent) === true) {
      fileContent.forEach((fileCont) => {
        token += `${fileCont.text}`;
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
   * validateIndex - validates the created index.
   *
   * @param  {JSON} data the index to br validated
   * @return {boolean}     the result of he validity test true means valid;
   */
  validateIndex(data) {
    let result = true;
    for (const book in data) {
      if (Object.prototype.hasOwnProperty.call(data, book)) {
        for (const token in data[book]) {
          if (Object.prototype.hasOwnProperty.call(data[book], token)) {
            result = Array.isArray(data[book][token]);
            if (result === false) {
              return false;
            }
          }
        }
      }
      return result;
    }
  }
  /**
   * resolveTerms -Processes the parameters to be sought for in the created Index
   *
   * @param  {array} terms the supplied search parameters
   * @return {array}       processed array
   */
  resolveTerms(terms) {
    const searchTerms = [];
    if (terms.length === 1) {
      terms = terms[0];
    }
    terms.forEach((indTerm) => {
      if (typeof indTerm === 'string' || typeof indTerm === 'number') {
        searchTerms.push(indTerm.toLowerCase());
      } else {
        if ((indTerm.length === 'undefined')) {
          throw new Error('Invalid search Term');
        }
        indTerm.forEach((indTermInArray) => {
          searchTerms.push(indTermInArray.toLowerCase());
        });
      }
    });
    return searchTerms;
  }
  /**
   * search - searches thrugh the created index.
   *
   * @param  {JSON} base  the JSON object to search from
   * @param  {array} terms the search parameters
   * @return {object}      result of the branch
   */
  search(base, terms) {
    const searchIndexResult = [];
    terms.forEach((term) => {
      if (Object.prototype.hasOwnProperty.call(base, term)) {
        searchIndexResult[term] = base[term];
      } else {
        searchIndexResult[term] = '-';
      }
    });
    return searchIndexResult;
  }

  /**
   * searchIndex - generates the search index from parameters
   *
   * @param  {array} index    the index to search from
   * @param  {string} fileName the name of the file to search from optional
   * @return {JSON}          search index
   */
  searchIndex(index, fileName, ...terms) {
    let searchIndexResults = '';
    const indexValidity = this.validateIndex(index);
    if (indexValidity) {
      if (arguments.length === 3) {
        const searchTerms = this.resolveTerms(terms);
        const searchBase = index[fileName];
        searchIndexResults = this.search(searchBase, searchTerms);
      } else {
        const searchTerms = this.resolveTerms(fileName);
        const searchIndexResult = {};
        for (const book in index){
          if (Object.prototype.hasOwnProperty.call(index, book)) {
            const searchBase = index[book];
            const tempSearchResult = this.search(searchBase, searchTerms);
            searchIndexResult[book] = tempSearchResult;
          }
        }
        searchIndexResults = searchIndexResult;
      }
    }
    return searchIndexResults;
  }
}

export default InvertedIndex;
