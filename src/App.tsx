/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ProjectsReplica from "./components/ProjectsReplica";
import Business from "./components/Business";
import Approach from "./components/Approach";
import Footer from "./components/Footer";
import CTAReplica from "./components/CTAReplica";

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-primary-start selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ProjectsReplica />
        <Business />
        <Approach />
        <CTAReplica />
      </main>
      <Footer />
    </div>
  );
}
