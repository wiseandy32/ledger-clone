import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import OurServices from "./components/OurServices";
import WhyChooseUs from "./components/WhyChooseUs";
// import HowItWorks from "./components/HowItWorks";
// import LastSection from "./components/LastSection";
import Partners from "./components/Partners";

function Landing() {
  return (
    <>
      <Hero />
      <AboutUs />
      <OurServices />
      <WhyChooseUs />
      {/* <HowItWorks /> */}
      {/* <LastSection /> */}
      <Partners />
    </>
  );
}

export default Landing;
