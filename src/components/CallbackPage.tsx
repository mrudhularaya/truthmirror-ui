import { LoaderCircle } from "lucide-react";


export default function CallbackPage () {
  return (
    <div className="pageLayout">
      <div className="flex justify-center items-center min-h-screen space-x-2">
        <LoaderCircle className="animate-spin"/>
        <span>Loading...</span>
      </div>
      <div className="page-layout__content" />
    </div>
  );
}
