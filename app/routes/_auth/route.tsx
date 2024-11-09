import {Outlet} from "@remix-run/react";

export default function AuthLayout() {
  return(
    <div className="w-full h-screen bg-cover bg-secodnary">
      <div className="w-full h-full flex flex-col justify-center items-center gap-y-6">
        <Outlet/>
      </div>
    </div>
  )
}
