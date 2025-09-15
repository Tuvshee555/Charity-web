type InputProps = {
  type: string;
  placeholder: string;
  maxLength?: number;
  min?: number;
  max?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
};

type CreateAccount = {
  email?: string | null;
  password?: string | null;
  username?: string | null;
};
type CreateProfile = {
  image?: string | null;
  name?: string | null;
  about?: string | null;
  socialMediaURL?: string | null;
  userID?: number | null;
};
type UserProfile =
  | {
      id: string;
      userId: number | string;
      name: string;
      about: string;
      avatarImage: string;
      backgroundImage: string;
      socialMediaURL: string;
      successMessage: string;
      createdAt: string;
      updatedAt: string;
    }
  | undefined;
type Payment = {
  id: number | null;
  country: string | null;
  firstName: string | null;
  lastName: string | null;
  cardNumber: string | null;
  expiryDate: string | null;
  year: string | null;
  cvc: string | null;
};
// types.ts
type Donation = {
  amount: number | null;
  specialMessage: string | null;
  socialURLOrBuyMeACoffee: string | null;
  donorId: number | null;
  recipientId: number | null;
};
