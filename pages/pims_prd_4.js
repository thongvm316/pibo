import FullLayout from '@/src/layouts/FullLayout';
import TestRender from '@/src/components/TestRender';

const Prd4 = () => {
  return (
    <TestRender
      urlImg="https://images.pexels.com/photos/10430889/pexels-photo-10430889.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      content="Error magna, pretium veniam ante cillum, praesent voluptate illum, duis itaque, nisl, asperiores torquent vehicula neque suspendisse architecto, nec mauris scelerisque curabitur ultricies netus adipiscing litora? Adipisicing platea laudantium recusandae? Repellat tempus platea. Habitasse, error curabitur! Fugiat eveniet laboriosam exercitation quis porttitor hac reprehenderit sociosqu voluptatum fugit primis. Nulla erat perspiciatis primis maxime earum. Varius. Cupidatat, ea phasellus laboriosam sodales, sociosqu cupiditate conubia, adipisicing? Ullamco, aenean, mauris maxime, nesciunt tristique aliquip vivamus, laboriosam ea praesentium, adipisci. Eu accusamus, nec vestibulum, senectus totam quasi, lobortis illo voluptatum occaecati repellendus primis ipsam aliquet, unde voluptate modi adipiscing error, hendrerit in assumenda distinctio."
    />
  );
};

export default Prd4;

Prd4.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};
