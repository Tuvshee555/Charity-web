import { Textarea } from "@/components/ui/textarea";

type Props = {
  onMessageChange?: (value: string) => void;
};

export const Message_D = ({ onMessageChange }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange?.(e.target.value);
  };

  return (
    <div className="mt-[20px] flex flex-col">
      <span className="text-sm font-medium leading-none mb-[8px]">
        Special message
      </span>
      <div>
        <Textarea
          className="w-full"
          placeholder="Please write your message here"
          onChange={onChange}
        />
      </div>
    </div>
  );
};
