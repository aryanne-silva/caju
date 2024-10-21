import { BackgroundContainer } from "../SharedStyles";
import { Content } from "./styles";

const Loader = () => {
  return (
    <BackgroundContainer>
      <Content>
        <img className='spin' src="src/images/juca.png" alt="Juca" />
      </Content>
    </BackgroundContainer>
  );
};

export default Loader;
