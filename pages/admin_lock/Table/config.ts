export const columnLayout = [
  {
    dataField: 'userId',
    headerText: '사용자 계정',
  },
  {
    dataField: 'linIp',
    headerText: 'IP',
  },
  {
    dataField: '',
    headerText: '잠금 일시',
  },
  {
    dataField: 'acctLockCancDttm',
    headerText: '해제 일시',
  },
  {
    dataField: 'aponCnsnNo',
    headerText: '계정 잠금 해제 근거 문서번호',
    width: 200,
  },
  {
    dataField: 'price',
    headerText: 'PIC',
  },
  {
    dataField: 'button',
    headerText: 'Unlocking',
    dataType: 'numeric',
    renderer: {
      type: 'ButtonRenderer',
      onClick: function (event: any) {
        console.log(event);
      },
      visibleFunction: function (rowIndex, columnIndex, value, item, dataField) {
        if (item.aponCnsnNo === null) {
          return false;
        }
        return true;
      },
    },
  },
];

export const gridPros = {
  usePaging: true,
  headerHeight: 40,
  pageRowCount: 10,
};
