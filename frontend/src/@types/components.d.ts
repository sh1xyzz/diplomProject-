interface DefaultLayoutProps {
  children: ReactNode;
}

interface LoginWindowProps {
  onSuccess: (userData: User) => void;
  onClose: () => void;
  isModal?: boolean;
  setLoginOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RegistrationWindowProps {
  onSuccess: (userData: User) => void;
  onClose: () => void;
  isModal?: boolean;
  setRegisterOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}