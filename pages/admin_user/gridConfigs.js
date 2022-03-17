const columnLayout = [
  {
    dataField: 'userId',
    headerText: '관리자 계정',
  },
  {
    dataField: 'userNm',
    headerText: '관리자 권한',
  },
  {
    dataField: 'acctUsgYn',
    headerText: '잠금 여부',
  },
  {
    dataField: 'lastLoginDate',
    headerText: '마지막 로그인일시',
  },
  {
    dataField: 'lastModifyDate',
    headerText: '최종 수정일시',
  },
];

const gridProps = {
  showRowNumColumn: false,
  autoGridHeight: true,
  usePaging: true,
  pagingMode: 'simple',
  pageRowCount: 10,
};

export default { columnLayout, gridProps };
