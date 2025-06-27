import { AirDropForm } from "@/components/AirDropForm";
import { Toaster } from "react-hot-toast";


export default function Home() {
  return (
    <div className="flex flex-col  justify-center  p-4 bg-gray-100 border rounded-lg shadow-md max-w-2xl mx-auto mt-8 border-blue-700 hover:shadow-lg transition-all duration-300  shadow-blue-600">
       <AirDropForm />
       <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    </div>
  );
}
