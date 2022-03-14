import FullLayout from '@/src/layouts/FullLayout';
import TestRender from '@/src/components/TestRender';

const Prd2 = () => {
  return (
    <TestRender
      urlImg="https://images.pexels.com/photos/1376203/pexels-photo-1376203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content="sollicitudin recusandae nihil architecto nesciunt. Pellentesque dolores. Modi facilisi. Accusantium iste hymenaeos voluptatum aptent aptent dapibus, quia perferendis porttitor dolorum dictum beatae auctor, urna hymenaeos! Dolorem adipiscing imperdiet, enim, expedita, dictum phasellus hymenaeos nemo c"
    />
  );
};

export default Prd2;

Prd2.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
