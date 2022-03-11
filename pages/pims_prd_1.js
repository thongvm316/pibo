import FullLayout from '@/src/layouts/FullLayout';

const Prd1 = () => {
  return <div>Prd1</div>;
};

export default Prd1;

Prd1.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
