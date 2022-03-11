import FullLayout from '@/src/layouts/FullLayout';

const Prd4 = () => {
  return <div>Prd4</div>;
};

export default Prd4;

Prd4.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
