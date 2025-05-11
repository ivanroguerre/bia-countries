import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="shadow-(--header-shadow) dark:bg-dark-blue">
      <div className="px-4 py-7 sm:px-16 mx-auto max-w-[1368px] flex items-center justify-between">
        <h1 className="font-extrabold sm:text-xl">Where in the world?</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
