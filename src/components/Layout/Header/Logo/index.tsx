import { getImagePrefix , getAppPrefix } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src= {`${getAppPrefix()}images/logo/UVV.svg`}
        alt="logo"
        width={160}
        height={50}
        style={{ width: "12rem" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
