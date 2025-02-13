import React from 'react'
import style from "../Layout.module.css"
import { MainHeader, SideBar } from '../../components'
import { CenteredContent, CircularLoader } from "@dhis2/ui";
import { LayoutProps } from '../../types/layout/LayoutProps';
import { useGetInitialValues, useGetProgramConfig } from '../../hooks';
import { getDataStoreKeys } from '../../utils/commons/dataStore/getDataStoreKeys';

export default function FullLayout(props: LayoutProps) {
    useGetInitialValues()
    const { children } = props;
    const { isSetSectionType } = useGetInitialValues()
    const { program } = getDataStoreKeys()
    const { loading } = useGetProgramConfig(program);

    if (!isSetSectionType) {
        return (
            <CenteredContent>
                Cant load the app without section type
            </CenteredContent>
        )
    }

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    return (
        <div className={style.LayoutContainer}>
            <SideBar />
            <div className={style.FullLayoutContainer}>
                <MainHeader />
                <main className={style.MainContentContainer}>{children}</main>
            </div>
        </div>
    )
}
