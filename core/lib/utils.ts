export default {
  newId: (): number => new Date().valueOf(),
  getIdFromString: (toSearch: string) => toSearch.match(/^(\d{13})/g),
  checkFormat: (toCheck: string) => {
    const pattern = RegExp("^(\\d{13})-(.+)", "g");
    return pattern.test(toCheck);
  }
};
