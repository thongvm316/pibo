import FullLayout from '@/src/layouts/FullLayout';

const Prd3 = () => {
  return <div>Prd3</div>;
};

export default Prd3;

Prd3.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
