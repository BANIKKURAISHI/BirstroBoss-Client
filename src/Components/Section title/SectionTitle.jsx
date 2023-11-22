
const SectionTitle = ({heading ,subHeading}) => {
    return (
        <div className="text-center">
            <h1 className="text-yellow-600">{subHeading}</h1>
            <h1 className="text-3xl border-width">{heading}</h1>
        </div>
    );
};

export default SectionTitle;