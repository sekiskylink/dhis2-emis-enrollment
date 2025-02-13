
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { formatResponseRows } from "../../utils/table/rows/formatResponseRows";
import { useParams } from "../commons/useQueryParams";
import { HeaderFieldsState } from "../../schema/headersSchema";
import useShowAlerts from "../commons/useShowAlert";
import { EventQueryProps, EventQueryResults } from "../../types/api/WithoutRegistrationProps";
import { TeiQueryProps, TeiQueryResults } from "../../types/api/WithRegistrationProps";
import { TableDataProps } from "../../types/table/TableContentProps";
import { getDataStoreKeys } from "../../utils/commons/dataStore/getDataStoreKeys";

const EVENT_QUERY = (queryProps: EventQueryProps) => ({
    results: {
        resource: "tracker/events",
        params: {
            fields: "*",
            ...queryProps
        }
    }
})

const TEI_QUERY = (queryProps: TeiQueryProps) => ({
    results: {
        resource: "tracker/trackedEntities",
        params: {
            fields: "trackedEntity,createdAt,orgUnit,attributes[attribute,value],enrollments[enrollment,orgUnit,program]",
            ...queryProps
        }
    }
})


export function useTableData() {
    const engine = useDataEngine();
    const { program, registration } = getDataStoreKeys()
    const headerFieldsState = useRecoilValue(HeaderFieldsState)
    const { urlParamiters } = useParams()
    const [loading, setLoading] = useState<boolean>(false)
    const [tableData, setTableData] = useState<TableDataProps[]>([])
    const { hide, show } = useShowAlerts()
    const school = urlParamiters().school as unknown as string

    async function getData(page: number, pageSize: number) {
        if (school !== null) {
            setLoading(true)

            const eventsResults = await engine.query(EVENT_QUERY({
                ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                page,
                pageSize,
                program: program as unknown as string,
                order: "createdAt:desc",
                programStatus: "ACTIVE",
                programStage: registration?.programStage as unknown as string,
                filter: headerFieldsState?.dataElements,
                filterAttributes: headerFieldsState?.attributes,
                orgUnit: school
            })).catch((error) => {
                show({
                    message: `${("Could not get data")}: ${error.message}`,
                    type: { critical: true }
                });
                setTimeout(hide, 5000);
            }) as unknown as EventQueryResults;

            const trackedEntityToFetch = eventsResults?.results?.instances.map((x: { trackedEntity: string }) => x.trackedEntity).toString().replaceAll(",", ";")

            const teiResults = trackedEntityToFetch?.length > 0
                ? await engine.query(TEI_QUERY({
                    ouMode: school != null ? "SELECTED" : "ACCESSIBLE",
                    order: "created:desc",
                    pageSize,
                    program: program as unknown as string,
                    orgUnit: school,
                    trackedEntity: trackedEntityToFetch
                })).catch((error) => {
                    show({
                        message: `${("Could not get data")}: ${error.message}`,
                        type: { critical: true }
                    });
                    setTimeout(hide, 5000);
                }) as unknown as TeiQueryResults
                : { results: { instances: [] } } as unknown as TeiQueryResults

            setTableData(formatResponseRows({
                eventsInstances: eventsResults?.results?.instances,
                teiInstances: teiResults?.results?.instances
            }));

            setLoading(false)
        }
    }

    return {
        getData,
        tableData,
        loading
    }
}
