  /**
   *
   */
  class InvertedIndex {

    /**
     * constructor - description
     *
     * @param  {Array} book description
     *
     */
    constructor(fileName, fileContent) {
      this.fileName = fileName;
      this.fileContent = fileContent;
    }
    /**
     * checkIfArray - checks to see if book is actually a JSON array
     *
     * @return {boolean}  the result for the check
     */
    checkIfArrayIsValid() {
      if (this.book.length === 'undefined' && this.book[0] === undefined) {
        return true;
      }
    }

    /**
     * checkIfArrayIsEmpty - checks to see if book uploaded is an empty array
     *
     * @return {boolean}  result of the check
     */
    checkIfArrayIsEmpty() {
      if (this.book === []) {
        return true;
      }
    }

    /**
     * checkIfArrayIsMalformed - description
     *
     * @return {boolean}  the result of the check
     */
    checkIfArrayIsMalformed() {
      // return bookToCheck + true;
    }


    /**
     * get index - description
     *
     * @return {type}  description
     */
    createIndex() {
      const indexObject = {};
      let wordToken = [];
      let token = [];
      const book = this.book;
      const bookLength = book.length;
      for (let a = 0; a < bookLength; a += 1) {
        const bookContent = book[a];
        const title = bookContent.title;
        const content = bookContent.text;
        let fullBook = title + content;
        fullBook = (fullBook.toLower()).replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[]\\\/]/gi, '').split(' ');
        if (token === []) {
          token = fullBook;
        }
        token = token.concat(fullBook);
      }
      for(let b = 0; b < token.length; b++) {
        if(wordToken.indexof(token[b]) < 0) {
            wordToken.push(this[i]);
        }
      return indexObject;
    }

    /**
     * createIndex - description
     *
     * @return {type}  description
     */
    getIndex() {
      const book = this.book;
      // const indexObject = {};
      const validityResult = book.checkIfArrayIsValid();
      if (validityResult) {
        const emptyResult = book.checkIfArrayIsEmpty();
        if (emptyResult) {
          const malformedResult = book.checkIfArrayIsMalformed();
          if (malformedResult) {
               // indexObject = 1;
          } else {
            return 'Expects a Non-Empty JSON Object';
          }
        } else {
          return 'Expects a Non-Empty JSON Object';
        }
      } else {
        return 'Expects a valid JSON Object';
      }
    }
}


  const invertedIndex = InvertedIndex;
  export default invertedIndex;
