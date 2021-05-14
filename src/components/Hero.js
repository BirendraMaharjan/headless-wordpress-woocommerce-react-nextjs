import SignupForm from './SignupForm';

const outcomes = ['Introduction 05:24', 'Project Setup 05:40', 'Link and Router 10:02', 'App and Document 04:05'];
const Hero = () => {
    return (
        <div className="border border-gray-200">
            <div className="bg-gray-100 text-center md:w-1/3">
                <img className="mx-auto object-contain" src="/images/aldi.png" alt="icon image" />
            </div>{' '}
            <div className="px-4 py-8 md:px-8 self-center md:w-2/3">
                <h2 className="font-bold text-2xl mb-3">What you'll learn</h2>
                <div>
                    {outcomes && (
                        <ul>
                            {outcomes.map((i) => {
                                return (
                                    <li key={i} className="text-gray- list-decimal mb-2 ml-14">
                                        {i}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <SignupForm title="Leave your email below, to be notified when this course is ready." />
        </div>
    );
};

export default Hero;
