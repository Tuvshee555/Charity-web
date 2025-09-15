import { useState } from 'react';
import { Input } from './input';

type Props = {
  onChange?: (e: string) => void;
};

export const CardInput = ({ onChange }: Props) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const formattedInput = input.replace(/\D/g, '').slice(0, 16);


    const formattedCardNumber = formattedInput.replace(/(\d{4})(?=\d)/g, '$1-');


    setCardNumber(formattedCardNumber);

    if (onChange) {
      onChange(formattedCardNumber)
    }
  };

  return (
    <Input
      type="text"
      value={cardNumber}
      onChange={handleChange}
      placeholder="XXXX-XXXX-XXXX-XXXX"
      maxLength={19} 
      pattern="\d{4}-\d{4}-\d{4}-\d{4}"
      title="Enter the card number in the format XXXX-XXXX-XXXX-XXXX"
      inputMode="numeric"
    />
  );
};
