import Link from 'next/link';

interface Button {
  href: string;
  text: string;
  bg:string;
  onClick?: () => void;
}

const Button = ({href, text, bg, onClick}: Button) => {
  return (
    <Link href={href}>
      <div className="flex justify-center m-5">
        <div onClick={onClick} className={`${bg} inline-flex items-center px-5 py-3 text-base font-medium text-white rounded-full focus:ring-4 focus:outline-none focus:ring-indigo-300 transition-all duration-300 transform hover:scale-110 shadow-lg cursor-pointer`}>
          {text}
        </div>
      </div>
    </Link>
  );
};

export default Button;
