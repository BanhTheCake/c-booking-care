import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import './BarNavigator.scss';

const SubMenu = ({ item }) => {
    return (
        <>
            <div className="bar-navigator-item__subMenus">
                {item.subMenus.map((item, index) => {
                    return (
                        <div
                                key={item.name + index}
                                className="bar-navigator-item__menus-item" >
                                <NavLink to={item.link}>
                                    <p><FormattedMessage id={item.name} /></p>
                                </NavLink>
                                { item?.subMenus && item.subMenus?.length > 0 && (
                                        <SubMenu item={item} />
                                )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

const BarNavigator = ({ menus }) => {
    return (
        <>
            <div className="bar-navigator">
                {/* <div className="bar-navigator-item">
                    Admin
                    <div className="bar-navigator-item__menus">
                        <div className="bar-navigator-item__menus-item">
                            <NavLink to={'/system'}>
                                <p>BanhTheCake</p>
                            </NavLink>
                            <div className="bar-navigator-item__subMenus">
                                <div className="bar-navigator-item__menus-item">
                                    <NavLink to={'/system/user-manage'}>
                                        <p>banhthemug</p>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {menus?.length > 0 &&
                    menus.map((item, index) => {
                        return (
                            <div
                                key={item.name + index} 
                                className="bar-navigator-item"
                                >
                                <FormattedMessage id={item.name} />
                                {item?.menus && item.menus.length > 0 && (
                                    <> <div className="bar-navigator-item__menus">
                                            {item.menus.map((item, index) => {
                                                    return (
                                                        <div key={ item.name + index } className="bar-navigator-item__menus-item" >
                                                                <NavLink
                                                                    to={item.link}>
                                                                    <p> <FormattedMessage id={ item.name } /> </p>
                                                                </NavLink>
                                                                { item?.subMenus && item.subMenus.length > 0 && (
                                                                        <SubMenu item={item}/>
                                                                )}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default BarNavigator;
