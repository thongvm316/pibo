export const columnLayout = [
  {
    dataField: 'id',
    headerText: '사용자 계정',
    // width: 120,
  },
  {
    dataField: 'name',
    headerText: 'IP',
    // width: 140,
  },
  {
    dataField: 'country',
    headerText: '잠금 일시',
    // width: 120,
  },
  {
    dataField: 'flag',
    headerText: '해제 일시',
    // width: 100,
  },
  {
    dataField: 'product',
    headerText: '계정 잠금 해제 근거 문서번호',
    width: 200,
  },
  {
    dataField: 'color',
    headerText: '해제',
    // width: 100,
  },
  {
    dataField: 'price',
    headerText: 'PIC',
    dataType: 'numeric',
    // width: 120,
  },
  {
    dataField: 'quantity',
    headerText: 'Unblocking',
    dataType: 'numeric',
    // width: 100,
  },
  // {
  //   dataField: 'date',
  //   headerText: 'Date',
  // },
];

export const gridPros = {
  usePaging: true,
  headerHeight: 40,
};
