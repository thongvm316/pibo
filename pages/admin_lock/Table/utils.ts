export const convertDataStructure = (data: Array<any>) =>
  data.map((item: any) => {
    if (!item.acctLockCancDttm) {
      item['button'] = '해제';
    }

    return item;
  });
