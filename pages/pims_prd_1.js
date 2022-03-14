import FullLayout from '@/src/layouts/FullLayout';
import TestRender from '@/src/components/TestRender';

const Prd1 = () => {
  return (
    <TestRender
      urlImg="https://images.pexels.com/photos/1280638/pexels-photo-1280638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content="uptatum, fames incididunt, mus eius, diam senectus veniam justo omnis fugit, occaecat pharetra maiores, minus auctor? Bibendum autem dolores ridiculus dui magna. Amet dolor mauris porro, eveniet"
    />
  );
};

export default Prd1;

Prd1.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
