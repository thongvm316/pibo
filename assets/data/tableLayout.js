export const columnLayout = [
  {
    dataField: 'id',
    headerText: 'ID',
    width: 140,
  },
  {
    dataField: 'name',
    headerText: 'Name',
    filter: {
      showIcon: true,
    },
    width: 140,
  },
  {
    dataField: 'country',
    headerText: 'Country',
    filter: {
      showIcon: true,
    },
    width: 150,
  },
  {
    dataField: 'product',
    headerText: 'Product',
    width: 150,
  },
  {
    dataField: 'color',
    headerText: 'Color',
    width: 150,
  },
  {
    dataField: 'price',
    headerText: 'Price',
    dataType: 'numeric',
    style: 'my-column',
    width: 150,
    editRenderer: {
      type: 'InputEditRenderer',
      onlyNumeric: true, // 0~9만 입력가능
      textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
      autoThousandSeparator: true, // 천단위 구분자 삽입 여부
    },
  },
  {
    dataField: 'quantity',
    headerText: 'Quantity',
    dataType: 'numeric',
    style: 'my-column',
    width: 140,
    editRenderer: {
      type: 'InputEditRenderer',
      onlyNumeric: true, // 0~9만 입력가능
      textAlign: 'right', // 오른쪽 정렬로 입력되도록 설정
      autoThousandSeparator: true, // 천단위 구분자 삽입 여부
    },
  },
  {
    dataField: 'date',
    headerText: 'Date',
  },
];
