export default class Content {
  /**
   * @param http {AxiosInstance} Экземпляр библиотеки axios
   * @param path {String} Путь в url по умолчанию
   */
  constructor(http) {
    this.http = http;
  }

  getOne({ path }) {
    return this.http.get(`/content/${path}`);
  }
}
