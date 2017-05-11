/* eslint linebreak-style: ["error", "windows"]*/
/**
 *  The InvertedIndex class that creates indices from supplied JSON Array objects.
 */
class InvertedIndex {
  /**
   * constructor - creates containers for datas created in the class to be stored and accessed.
   *
   * @return {type}  empty containers, empty objects
   */
  constructor() {
    this.CreatedIndexObject = {};
    this.searchIndexResult = {};
  }

  /**
   * checkIfArrayIsValid - checks the validity of the JSON Array supplied to the class.
   *
   * @param  {object} data the JSON array
   * @return {boolean} result of the validity check.
   */
  static checkIfArrayIsValid(data) {
    let result = '';
    if (typeof data === 'object') {
      if (data.length === undefined && data[0] === undefined) {
        result = false;
        throw new Error('Invalid JSON Array');
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
              throw new Error('File is malformed');
            } else {
              result = true;
            }
          });
        }
      }
    } else {
      result = false;
      throw new Error('Invalid JSON Array');
    }
    return result;
  }

  /**
   * createIndex - creates indices from supplied JSON Array Object and stores it in a container.
   *
   * @param  {string} fileName    the name of the file to create index from
   * @param  {JSON} fileContent the file to create index from
   * @return {JSON}  indexObject   the result of the created Array.
   */
  createIndex(fileName, fileContent) {
    let token = '';
    const wordToken = {};
    if (InvertedIndex.checkIfArrayIsValid(fileContent) === true) {
      fileContent.forEach((individualFileContent) => {
        token += `${individualFileContent.text} `;
      });
      token = token.replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' ');
      fileContent.forEach((individualFileContent, index) => {
        token.forEach((word) => {
          if (!Object.prototype.hasOwnProperty.call(wordToken, word) && word !== '') {
            const result = (individualFileContent.text).toLowerCase().search(word);
            if (result >= 0) {
              wordToken[word] = [index];
            }
          } else if (Object.prototype.hasOwnProperty.call(wordToken, word) && word !== '') {
            const result = (individualFileContent.text).toLowerCase().search(word);
            if (result >= 0) {
              const alreadyIndex = wordToken[word];
              wordToken[word] = Array.from(new Set(alreadyIndex.concat([index])));
            }
          }
        });
      });
    }
    this.CreatedIndexObject[fileName] = wordToken;
    const indexObject = this.CreatedIndexObject;
    return indexObject;
  }

  /**
   * validateIndex - validates the created index.
   *
   * @param  {JSON} data the index to br validated
   * @return {boolean} result  the result of he validity test true means valid;
   */
  validateIndex(data) {
    if (!data) {
      data = this.CreatedIndexObject;
    }
    let resultIfValid;
    let resultIfInvalid = true;
    const books = Object.keys(data);
    books.forEach((book) => {
      const tokens = Object.keys(data[book]);
      tokens.forEach((token) => {
        const result = Array.isArray(data[book][token]);
        if (result === false) {
          resultIfInvalid = false;
        }
      });
    });
    if (resultIfInvalid !== undefined) {
      resultIfValid = resultIfInvalid;
    }
    return resultIfValid;
  }
  /**
   * resolveTerms -Processes the parameters to be sought for in the created Index
   *
   * @param  {array} terms the supplied search parameters
   * @return {array} searchTerms  processed array
   */
  static resolveTerms(terms) {
    let searchTerms = [];
    if (terms.length === 1) {
      if (typeof terms[0] === 'string') {
        searchTerms = (terms[0].replace(/[^a-zA-Z]/gi, ' ').toLowerCase().split(' '));
        return searchTerms;
      } else if (Array.isArray(terms[0])) {
        terms = terms[0];
        searchTerms = [].concat([], ...terms);
      }
    } else {
      searchTerms = [].concat([], ...terms);
    }
    return searchTerms;
  }
  /**
   * search - searches thrugh the created index.
   *
   * @param  {JSON} base  the JSON object to search from
   * @param  {array} terms the search parameters
   * @return {object} searchIndexResult result of the branch
   */
  static search(base, terms) {
    const searchIndexResult = {};
    terms.forEach((term) => {
      if (Object.prototype.hasOwnProperty.call(base, term)) {
        searchIndexResult[term] = base[term];
      } else {
        searchIndexResult[term] = '';
      }
    });
    return searchIndexResult;
  }

  /**
   * validateTerms - checks the supplied search terms for error
   *
   * @param  {array} terms data to be validated
   * @return {boolean} result the result of thr validity check
   */
  static validateTerms(terms) {
    let result = true;
    if (!Array.isArray(terms) || (terms.length === 0)) {
      result = false;
    } else {
      result = true;
    }
    return result;
  }

  /**
   * searchIndex - generates the search result from supplied parameters
   * validates search terms by calling validateTerms method.
   * resolves the search terms by calling resolveTerms method
   * @param  {array} index    the index to search from
   * @param  {string} fileName the name of the file to search from optional
   * @return {JSON} searchIndexResults  search index
   */
  searchIndex(index, fileName, ...terms) {
    let searchIndexResults = '';
    const indexValidity = this.validateIndex(index);
    if (indexValidity) {
      if (arguments.length === 3) {
        const searchTerms = InvertedIndex.resolveTerms(terms);
        const searchBase = index[fileName];
        searchIndexResults = InvertedIndex.search(searchBase, searchTerms);
      } else if (/\.json$/g.test(fileName)) {
        const searchTerms = InvertedIndex.resolveTerms(terms);
        const searchIndexResult = {};
        const books = Object.keys(index);
        books.forEach((book) => {
          const searchBase = index[book];
          const tempSearchResult = InvertedIndex.search(searchBase, searchTerms);
          searchIndexResult[book] = tempSearchResult;
        });
        searchIndexResults = searchIndexResult;
      } else {
        terms.push(fileName);
        const searchTerms = InvertedIndex.resolveTerms(terms);
        const searchIndexResult = {};
        const books = Object.keys(index);
        books.forEach((book) => {
          const searchBase = index[book];
          const tempSearchResult = InvertedIndex.search(searchBase, searchTerms);
          searchIndexResult[book] = tempSearchResult;
        });
        searchIndexResults = searchIndexResult;
      }
    } else {
      throw new Error('Invalid Index');
    }
    return searchIndexResults;
  }
}

export default InvertedIndex;
