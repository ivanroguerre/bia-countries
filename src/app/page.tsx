import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <ModeToggle />
    </div>
  );
}
