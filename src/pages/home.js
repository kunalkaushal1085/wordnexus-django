import React, { useEffect } from "react";
import { Banner } from "../component/banner/banner";
import { Review } from "../component/review/review";
import { Article } from "../component/article/article";
import { GrowthPage } from "../component/growth/growth";
import { Results } from "../component/results/results";
import { JustSection } from "../component/just/just";
import { UnderstandSection } from "../component/understand/understand";
import { WorkSection } from "../component/work/work";
import { Language } from "../component/language/language";
import { Pricing } from "../component/pricing/Pricing";
import { Header } from "../component/header/header";
import { Footer } from "../component/footer/footer";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   } else {
  //     navigate("/register");
  //   }
  // }, []);

  return (
    <div>
      <Header />
      <Banner />
      <Review />
      <Article />
      <GrowthPage />
      <Results />
      <JustSection />
      <UnderstandSection />
      <Pricing />
      <WorkSection />
      <Language />
      <Footer />
    </div>
  );
};
