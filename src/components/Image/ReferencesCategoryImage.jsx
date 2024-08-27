import defaultReferencesCategoryImage from "@/assets/defaultCategory.jpg";

function ReferencesCategoryImage(props) {
    const categoryImage = props ? (props.image ? `/assets/finishedWorks/${props.image}` : defaultReferencesCategoryImage) : defaultReferencesCategoryImage;
    return (
        <img
            className={props.className ? props.className : "img-fluit shadow-sm"}
            src={categoryImage}
            style={props.style && props.style}
            onError={({target}) => {
                target.src = defaultReferencesCategoryImage
            }}
        />
    );
}

export default ReferencesCategoryImage;