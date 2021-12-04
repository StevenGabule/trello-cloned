import { CardContainer } from "./styles";

type CardProps = {
  id: string;
  text: string;
};

export const Card = ({ id, text }: CardProps) => {
  return <CardContainer key={id}>{text}</CardContainer>;
};
