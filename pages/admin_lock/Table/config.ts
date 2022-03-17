export const columnLayout = [
  {
    dataField: 'id',
    headerText: '사용자 계정',
  },
  {
    dataField: 'name',
    headerText: 'IP',
  },
  {
    dataField: 'country',
    headerText: '잠금 일시',
  },
  {
    dataField: 'flag',
    headerText: '해제 일시',
  },
  {
    dataField: 'product',
    headerText: '계정 잠금 해제 근거 문서번호',
    width: 200,
  },
  {
    dataField: 'color',
    headerText: '해제',
  },
  {
    dataField: 'price',
    headerText: 'PIC',
    dataType: 'numeric',
  },
  {
    dataField: 'quantity',
    headerText: 'Unblocking',
    dataType: 'numeric',
    renderer: {
      type: 'ButtonRenderer',
      onClick: function (event: any) {
        console.log(event);
      },
    },
  },
];

export const gridPros = {
  usePaging: true,
  headerHeight: 40,
  pageRowCount: 10,
};
