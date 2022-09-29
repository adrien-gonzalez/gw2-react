import ModalAuth from "./ModalAuth";
import ModalCharacter from "./ModalCharacter";

export const setModalShow = (props) => {
  return <ModalAuth showModal={props} />;
};

export const setModalCharacterShow = (props) => {
  return <ModalCharacter showModal={props} />;
};

