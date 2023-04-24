import { ColorRing } from 'react-loader-spinner';
import { Overlay } from '../modal/Modal.styled';

export const Loader = () => {
  return (
    <Overlay>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5']}
      />
    </Overlay>
  );
};
