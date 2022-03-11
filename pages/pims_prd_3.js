import FullLayout from '@/src/layouts/FullLayout';
import TestRender from '@/src/components/TestRender';

const Prd3 = () => {
  return (
    <TestRender
      urlImg="https://images.pexels.com/photos/4982878/pexels-photo-4982878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content="ditate. Tempus placerat, diamlorem nihil natoque, maiores excepturi laoreet provident nam dolore sapiente? Veniam sed. Adipisci similique! Quos iste quos accumsan! Venenatis urna, justo saepe, minim reprehenderit? Sint curae congue molestiae porttitor consequat? Omnis velit, accumsan, delectus odio nunc! Cumque adipisci, eiusmod eu voluptates lorem porttitor magnam pede aliqua. Ex sociosqu, vero ipsa delectus minim! Odit maiores, viverra tristique, tempor? Similique nobis, interdum maiores tempora libero quia atque dicta dolores delectus semper exercitation! Placerat justo viverra ipsum tristique placerat dictum dolores. Ante sociosqu doloribus alias."
    />
  );
};

export default Prd3;

Prd3.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
