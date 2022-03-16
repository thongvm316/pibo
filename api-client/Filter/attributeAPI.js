import axiosClient from '../axiosClient';

const attributeApi = {
  select: () => {
    const url = 'https://i-dev-piboapi.amorepacific.com/pibo/pims/pip/attribute-groups _';
    return axiosClient.get(url);
  },
};
