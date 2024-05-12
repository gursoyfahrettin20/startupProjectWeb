import defaultProductImage from "@/assets/defaultCategory.jpg";

function ProductImage(props) {
    const productImage = props ? (props.image.url ? props.image.url : defaultProductImage) : defaultProductImage;
    return (
        <div>
            <img
                className={props.className ? props.className : "img-fluit shadow-sm"}
                src={productImage}
                style={props.style && props.style}
                onError={({target}) => {
                    target.src = defaultProductImage
                }}
            />
        </div>
    );
}

export default ProductImage;