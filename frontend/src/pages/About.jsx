export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center dark:bg-black'>
      <div className='max-w-2xl mx-auto p-6 text-center'>
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>
            About MITLO
          </h1>
          <div className='text-md text-gray-700 flex text-white flex-col gap-6'>
            <p>
              Welcome to MITLO's website! We are committed to leveraging machine learning to revolutionize diabetes management. Our focus is on predicting diabetes and estimating insulin dosage to support better health outcomes for patients.
            </p>

            <p>
              Our platform provides insights into the advanced models we use, including the Gradient Boosting Classifier for diabetes prediction and the Linear Regression algorithm for insulin dosage estimation. We aim to bridge the gap between traditional management practices and cutting-edge technology.
            </p>

            <p>
              Explore our site to learn more about our projects, research, and how we're contributing to improved diabetes care. We welcome your feedback and collaboration as we strive to advance diabetes management through innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
