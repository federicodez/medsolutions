import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps {
  label: string;
  href: string;
  icon: any;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
}) => {
  return (
    <Link
      href={href}
      className={clsx(
        `
        group 
        flex 
        flex-col
        items-center
        gap-x-3 
        text-sm 
        leading-6 
        font-semibold 
        w-full 
        justify-center 
        p-4 
        text-[#8ebbff]
      `,
        active && "bg-[#8ebbff] text-black",
      )}
    >
      <Icon className="h-6 w-6" />
      <span>{label}</span>
    </Link>
  );
};

export default MobileItem;
