import React, { useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { ScreenCover, CircularLoader } from '@dhis2/ui-core'
import { RuleRunner } from './RuleRunner'

const query = {
    metadata: {
        resource: 'metadata',
        params: {
            optionGroups: 'true',
            programs: 'true',
            programRules: 'true',
            programRuleVariables: 'true',
            fields: [
                'id',
                'options[code,displayName]',
                'dataElement',
                'name',
                'condition',
                'programRuleActions[programRuleActionType,dataElement,data]',
                'programStages[id,programStageDataElements]',
                'program',
            ],
        },
    },
}

export const AppContent = () => {
    const { data, loading, error } = useDataQuery(query)

    useEffect(() => {}, [data])

    if (error) return error.message

    if (loading)
        return (
            <ScreenCover>
                <CircularLoader />
            </ScreenCover>
        )

    return (
        <main>
            <RuleRunner metadata={data.metadata} />
        </main>
    )
}
