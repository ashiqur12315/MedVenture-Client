

const SectionTitle = ({heading, subheading}) => {
    return (
        <div className="text-center my-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{heading}</h1>
            <p className="text-lg text-gray-500">{subheading}</p>
        </div>
    );
};

export default SectionTitle;