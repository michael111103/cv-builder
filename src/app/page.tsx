import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import WhyCharcoal from "@/components/sections/WhyCharcoal";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import QualityProof from "@/components/sections/QualityProof";
import OrderFlow from "@/components/sections/OrderFlow";
import ProductionProcess from "@/components/sections/ProductionProcess";
import Certifications from "@/components/sections/Certifications";
import Faq from "@/components/sections/Faq";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyCharcoal />
        <About />
        <Products />
        <QualityProof />
        <OrderFlow />
        <ProductionProcess />
        <Certifications />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
