
import { RegistrationStatus } from "~/types/registration";
import { ButtonConfig, RegistrationCardProps } from "./types";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";

function useRegistrationCard(props: RegistrationCardProps) {
  const handleUpdateStatus = (status: RegistrationStatus) => {
    props.onUpdate(props.data, status);
  };

  const buttonProps: ButtonConfig[] = [
    { label: "Aprovar", status: "APPROVED", color: "rgb(155, 229, 155)" },
    { label: "Reprovar", status: "REPROVED", color: "rgb(255, 145, 154)" },
  ]

  const iconData = [
    { icon: <HiOutlineUser />, text: props.data.employeeName },
    { icon: <HiOutlineMail />, text: props.data.email },
    { icon: <HiOutlineCalendar />, text: props.data.admissionDate },
  ];

  return {
    handleUpdateStatus,
    buttonProps,
    iconData
  }
}

export default useRegistrationCard