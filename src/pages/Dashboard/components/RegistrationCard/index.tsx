import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineTrash,
} from "react-icons/hi";
import useRegistrationCard from './useRegistrationCard';
import { RegistrationCardProps } from './types';

const RegistrationCard = (props: RegistrationCardProps) => { 
  const { handleUpdateStatus, buttonProps, iconData }= useRegistrationCard(props)

  return (
    <S.Card>
      {iconData.map(({ icon, text }, index) => (
        <S.IconAndText key={index}>
          {icon}
          <span>{text}</span>
        </S.IconAndText>
      ))}
      <S.Actions>
        <S.Status>
          {props.data.status === "REVIEW" ? (
            <>
              {buttonProps.map(({ label, status, color }) => (
                <ButtonSmall
                  key={status}
                  bgcolor={color}
                  onClick={() => handleUpdateStatus(status)}
                >
                  {label}
                </ButtonSmall>
              ))}
            </>
          ) : (
            <ButtonSmall
              bgcolor="#FF8858"
              onClick={() => handleUpdateStatus("REVIEW")}
            >
              Revisar novamente
            </ButtonSmall>
          )}
        </S.Status>
        <HiOutlineTrash onClick={() => props.onDelete(props.data)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
