import defaultCategoryImage from "@/assets/defaultCategory.jpg";

function CategoryImage(props) {
    const categoryImage = props ? (props.image ? `/assets/category/${props.image}` : defaultCategoryImage) : defaultCategoryImage;
    return (
        <img
            className={props.className ? props.className : "img-fluit shadow-sm"}
            src={categoryImage}
            style={props.style && props.style}
            onError={({target}) => {
                target.src = defaultCategoryImage
            }}
        />
    );
}

export default CategoryImage;