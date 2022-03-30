class SuccessResponse {
  constructor(data, message = 'View Party') {
    this.message = message;
    this.data = data;
  }

  recordCreated() {
    return { data: this.data, message: this.message };
  }

  recordFetched() {
    return { data: this.data, message: this.message };
  }
}

module.exports = SuccessResponse;
