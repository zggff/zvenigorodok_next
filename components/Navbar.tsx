import React, { useState } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

const useOutsideClick = (callback: () => any) => {
    const ref = React.useRef();

    React.useEffect(() => {
        // @ts-ignore
        const handleClick = (event) => {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [ref, callback]);

    return ref;
};

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const ref = useOutsideClick(() => setNavbarOpen(false));
    return (
        <>
            <div className="h-14" />
            <nav
                // @ts-ignore
                ref={ref}
                className="z-50 fixed top-0 flex flex-wrap items-center justify-between px-1 bg-white w-full"
            >
                <div className="w-full px-1 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full p-0 relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                            href="/"
                        >
                            <Image className="h-10 w-auto" src={Logo} alt="ЗвенигородОк" />
                        </Link>
                        <button
                            className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            aria-label="expand navbar"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                        id="example-navbar-danger"
                    >
                        <ul className="flex pb-2 flex-col gap-2 lg:flex-row list-none lg:gap-4 lg:ml-auto text-xs uppercase font-bold leading-snug text-black hover:text-red w-full text-center">
                            <NavLink href="/" setOpen={setNavbarOpen} text="шиномонтаж" />
                            <NavLink
                                href="/cleaning"
                                setOpen={setNavbarOpen}
                                text="химчистка"
                            />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

const NavLink: React.FC<{
    href: string;
    text: string;
    setOpen: (param: boolean) => any;
}> = (props) => {
    const router = useRouter();

    return (
        <>
            <li className="nav-item rounded bg-slate-100 border border-slate-50 hover:border-red-500">
                <Link
                    className="px-3 py-2 flex items-center"
                    onClick={() => props.setOpen(false)}
                    href={props.href}
                >
                    <span
                        className={
                            "w-full" + (props.href === router.pathname ? " text-red-500" : "")
                        }
                    >
                        {props.text}
                    </span>
                </Link>
            </li>
        </>
    );
};
