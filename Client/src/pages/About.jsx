import { Link } from "react-router-dom"
import about from '../assets/about2.jpg'

function About() {
  return (
    <main>
       <section className="max-w-6xl mx-auto py-24 sm:py-32 px-4 sm:px-0">
        {/* Top Section */}
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
          About Our all <span className="text-slate-500">Services</span>
          <br />
          to know stay with us
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm py-5">
          Shadow Estate is the best place to find your next perfect place to live
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          className="text-xs sm:text-sm text-sky-800 font-bold hover:underline"
          to={"/search"}
        >
          Let&apos;s get started
        </Link>
      </section>
      <section className="sm:h-[350px] h-[180px] w-full">
          <img src={about} className="w-full h-full object-cover"/>
      </section>
      <section className="max-w-6xl mx-auto py-10 px-4 sm:px-0">
        <h1 className="text-gray-800 font-bold text-3xl text-center">About our company</h1>
        <p className="text-slate-700 text-sm w-[80%] sm:w-[50%] py-2 mx-auto">Welcome to Shadow Estate, your trusted partner in finding your dream property. Based in the heart of the city at 123 Real Estate Avenue, Downtown, Metropolis, we are committed to providing seamless real estate solutions tailored to your needs.</p>
        <section className="mt-12 space-y-8 w-[80%] sm:w-[60%] py-2 mx-auto">
        {/* Our Aim */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Aim
          </h2>
          <p className="mt-4 text-gray-600">
            At <span className="font-bold">Shadow Estate</span>, our goal is to simplify the home-buying, renting, and selling process, ensuring that every client finds their perfect space with ease. We aim to bridge the gap between dreams and reality by offering a diverse portfolio of properties that cater to various lifestyles and budgets.
          </p>
        </div>

        {/* What We Offer */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            What We Offer
          </h2>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
            <li>
              <span className="font-bold">Wide Range of Properties:</span> From cozy apartments to luxurious villas, we have something for everyone.
            </li>
            <li>
              <span className="font-bold">Expert Guidance:</span> Our team of experienced real estate professionals ensures you receive expert advice at every step.
            </li>
            <li>
              <span className="font-bold">Smart Search Options:</span> Our user-friendly website and advanced search filters make finding your ideal property quick and convenient.
            </li>
            <li>
              <span className="font-bold">Transparency and Trust:</span> With every transaction, we prioritize your trust by maintaining complete transparency.
            </li>
          </ul>
        </div>

        {/* Our Features */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Features
          </h2>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
            <li>Properties across <span className="font-bold">prime locations</span> with detailed descriptions and high-quality images.</li>
            <li>An innovative and easy-to-use property search platform.</li>
            <li>Real-time support from our dedicated customer service team.</li>
            <li>Flexible viewing schedules to suit your convenience.</li>
          </ul>
        </div>

        {/* Our Rate & Business Policy */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Rate & Business Policy
          </h2>
          <p className="mt-4 text-gray-600">
            We believe in offering <span className="font-bold">competitive pricing</span> with no hidden charges. Our commission rates are straightforward and agreed upon upfront, ensuring there are no surprises. At <span className="font-bold">Shadow Estate</span>, we are committed to fostering long-term relationships through honesty, integrity, and superior service.
          </p>
        </div>

        {/* Closing Note */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700">
            Thank you for choosing <span className="font-bold">Shadow Estate</span>. Your perfect property journey begins here!
          </p>
        </div>
      </section>
      </section>
    </main>
  )
}

export default About
