import FullLayout from '@/src/layouts/FullLayout';

const Prd2 = () => {
  return <div>Prd2</div>;
};

export default Prd2;

Prd2.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
