import React from "react";
import {  blue } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import {Redirect} from "react-router-dom";
const PopUpSlider = ({ handleOpen, setHandleOpen, isMobile, product }) => {
    const [redirect, setRedirect] = React.useState(false);
    const [path, setPath] = React.useState("");

    const setRedirectState = () => {
        setPath(`/mainProductView/${product._id}`);
        setRedirect(true);
    };
    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to={path} />;
        }
    };

    return (
        <div>
            {renderRedirect()}
            <AutoRotatingCarousel
                label="Buy Now"
                open={handleOpen.open}
                onClose={() => setHandleOpen({ open: false })}
                onStart={() => setHandleOpen({ open: false })}
                autoplay={true}
                mobile={false}
                style={{ position: "absolute" }}
                onStart={setRedirectState}
            >
                {product.productImageURLS.map(image=>{
                    return<Slide
                    media={
                        <img src={image.imageURL} />
                    }
                    mediaBackgroundStyle={{ backgroundColor: "#fff", height:"80%"}}
                    style={{ backgroundColor: blue[600] }}
                    title={""}
                    subtitle={''}

                />
                })}

            </AutoRotatingCarousel>
        </div>
    );
};


export default PopUpSlider;
