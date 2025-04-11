export default jest.fn(() => ({
  lhr: {
    finalDisplayedUrl: 'https://www.google.de',
    categories: { performance: { score: 0.92 } },
    audits: {
      'first-contentful-paint': {
        title: 'First Contentful Paint',
        displayValue: '1.6 s',
      },
      'largest-contentful-paint': {
        title: 'Largest Contentful Paint',
        displayValue: '2.7s',
      },
      'cumulative-layout-shift': {
        title: 'Cumulative Layout Shift',
        displayValue: '0',
      },
      interactive: {
        title: 'Time to Interactive',
        displayValue: '2.7 s',
      },
      'total-blocking-time': {
        title: 'Total Blocking Time',
        displayValue: '80 ms ',
      },
    },
  },
}));
