"use client";

export const Buy_Coffee_C = ({ user }: { user: any }) => {
  return (
    <div>
      <span className="text-2xl font-semibold leading-loose">
        Buy {user?.name} a Coffee
      </span>
    </div>
  );
};
