import React from 'react';
import { FormattedMessage } from 'react-intl';
import './MediaSection.scss';

const MediaSection = () => {
    return (
        <>
            <div className="home__section MediaSection">
                <div className="container">
                    <h4 className="title">
                        <FormattedMessage id={'homePage.mediaBookingCare'} />
                    </h4>
                    <div className="grid">
                        <div className="col">
                            <div className="iframe-wrapper">
                                <iframe
                                    src="https://www.youtube.com/embed/Teq1BzdUEN4"
                                    title="CHUYỆN ĐÊM MUỘN #12: LẦN ĐẦU NẤU ĂN MỜI ANH EM XEM STREAM !!! Ngon lắm anh em ạ =)))"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen={true}
                                ></iframe>
                            </div>
                        </div>
                        <div className="col">
                            <p>
                                - Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Saepe maiores ipsa inventore
                                ullam porro perspiciatis doloribus totam
                                voluptatibus dolorem impedit delectus facilis
                                animi dolore, vero eum placeat expedita pariatur
                                accusamus!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaSection;
