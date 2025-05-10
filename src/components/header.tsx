import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="w-full border-b bg-white dark:bg-zinc-900 px-4 py-3 flex items-center justify-between">
      <h1 className="font-bold text-lg sm:text-xl">Where in the world?</h1>
      <ModeToggle />
    </header>
  );
}
