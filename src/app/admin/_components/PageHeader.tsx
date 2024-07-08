import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function PageHeader({ children }: Props) {
  return <h1 className="text-4xl mb-4">{children}</h1>;
}
