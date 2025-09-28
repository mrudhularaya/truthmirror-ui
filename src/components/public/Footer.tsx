import { Separator } from "../ui/separator";

export default function Footer () {
  return (
    <div className="bottom-0 min-h-36 mt-10">
      <Separator className="m-4"/>
        <div className="flex flex-col items-center justify-center text-center mt-8 p-2">
            <p className="text-sm">© {new Date().getFullYear()} Truth Mirror. All rights reserved.</p>
            <p className="text-xs">Built with ❤️ by Mrudhula Raya.</p>
            <p className="text-xs">Follow me on <a href="https://linkedin.com/in/mrudhularaya" className="text-blue-500 hover:underline">LinkedIn</a> and <a href="https://github.com/mrudhularaya" className="text-blue-500 hover:underline">GitHub</a>.</p>
        </div>
    </div>
  );
}
