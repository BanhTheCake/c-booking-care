import { useEffect, useState } from 'react';
import './CommentFacebook.scss'

const CommentFacebook = ({ width }) => {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse()
        }
        window.fbAsyncInit = () => {
            window.FB.init({
                appId: process.env.REACT_APP_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v11.0',
            });
        };
        (function (d, s, id) {
            var js,
            fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    return (
        <>
           <div
                className="fb-comments"
                data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
                data-width={width}
                data-numposts="5"
            ></div> 
        </>
    );
};

export default CommentFacebook;
