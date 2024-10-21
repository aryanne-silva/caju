import { forwardRef, Ref } from "react";
import * as S from "./styles";
import { Props } from './types';

const TextField = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <S.Input ref={ref} {...props} />
      <S.Error>{props.error}</S.Error>
    </div>
  );
});

export default TextField;
