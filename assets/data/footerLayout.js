export const footerLayout = [
  {
    labelText: '총 합계',
    positionField: '#base',
  },
  {
    dataField: 'price',
    positionField: 'price',
    operation: 'SUM',
    formatString: '#,##0',
    style: 'aui-grid-my-footer-sum-total',
  },
  {
    dataField: 'price',
    positionField: 'date',
    operation: 'COUNT',
    style: 'aui-grid-my-footer-sum-total2',
  },
  {
    labelText: 'Count=>',
    positionField: 'phone',
    style: 'aui-grid-my-footer-sum-total2',
  },
];

