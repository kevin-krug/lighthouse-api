export default {
  extends: 'lighthouse:default',
  settings: {
    onlyAudits: ['metrics'],
    onlyCategories: ['performance'],
  },
};
