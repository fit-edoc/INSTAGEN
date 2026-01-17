import Hero3D from "@/app/components/landing/Hero3D";
import Nav from "./components/common/Nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Nav/>
      <Hero3D />
    </main>
  );
}
