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
    constructor(book) {
      this.book = book;
    }

    /**
     * checkIfArray - checks to see if book is actually a JSON array
     *
     * @return {boolean}  the result for the check
     */
    checkIfArrayIsValid() {
      const bookToCheck = this.book;
      return bookToCheck + true;
    }

    /**
     * checkIfArrayIsEmpty - checks to see if book uploaded is an empty array
     *
     * @return {boolean}  result of the check
     */
    checkIfArrayIsEmpty() {
      const bookToCheck = this.book;
      return bookToCheck + true;
    }

    /**
     * checkIfArrayIsMalformed - description
     *
     * @return {boolean}  the result of the check
     */
    checkIfArrayIsMalformed() {
      const bookToCheck = this.book;
      return bookToCheck + true;
    }

    /**
     * createIndex - description
     *
     * @return {JSON Object}  description
     */
    createIndex() {
      const book = this.book;
      const validityResult = book.checkIfArrayIsValid();
      if (validityResult) {
        const emptyResult = book.checkIfArrayIsEmpty();
        if (emptyResult){
          const malformedResult = book.checkIfArrayIsMalformed();
          if (malformedResult) {
          } else {
            return 'Expects a Non-Empty JSON Object';
          }
        }
        else {
          return 'Expects a Non-Empty JSON Object';
        }
      }
      else {
        return 'Expects a valid JSON Object';
      }
    }
}


  const invertedIndex = InvertedIndex;
  export default invertedIndex;
