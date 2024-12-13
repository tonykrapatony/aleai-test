import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-full">
      <p className="text-2xl">Thank You</p>
      <h1 className="text-4xl">Assignment submitted successfully!</h1>
      <Link href='/' className="text-base text-blue-800 underline">To main page</Link>
    </div>
  );
}
