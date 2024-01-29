import React from 'react'
import style from "./SideBar.module.css"
import SideBarItemTitle from './SideBarItemTitle'
import SideBarSubItem from './SideBarSubItem'
import { SideBarItemProps } from '../../../types/common/components'

export default function SideBarItem({ title, subItems }: SideBarItemProps): React.ReactElement {
    return (
        <section className={style.SideBarItemContainer}>
            <SideBarItemTitle title={title} />
            <ul className={style.SideBarItemListContainer}>
                {subItems.map((subItem, index) => (
                    <SideBarSubItem pathName={subItem.pathName} route={subItem.route} key={index} icon={subItem.icon} label={subItem.label} showBadge={subItem.showBadge} disabled={subItem.disabled} appName={subItem.appName} />
                ))}
            </ul>
        </section>
    )
}
