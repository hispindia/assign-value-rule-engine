import React, { useState, useEffect } from 'react'
import { useDataQuery, useDataMutation } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui-core'
import { WHONET_PROGRAM, ORGANISM_DATA_ELEMENT } from '../../constants'
import { toOrganismProgram } from './toOrganismPrograms'
import ruleEngine from '@hisp-amr/assign-value-rule-engine'

const { runAssignValueRules } = ruleEngine

const query = {
    events: {
        resource: 'events',
        params: ({ page }) => ({
            program: WHONET_PROGRAM,
            page,
        }),
    },
}

const mutation = {
    resource: 'events',
    id: ({ id }) => id,
    type: 'update',
    data: ({ data }) => data,
}

export const RuleRunner = ({ metadata }) => {
    const [organismProgram] = useState(
        toOrganismProgram(metadata.optionGroups, metadata.programs)
    )
    const [whonetProgramStage] = useState(
        metadata.programs.find(({ id }) => id === WHONET_PROGRAM)
            .programStages[0]
    )
    const { data, error, refetch } = useDataQuery(query)
    const [mutate] = useDataMutation(mutation)
    const [runRules, setRunRules] = useState(false)
    const [updated, setUpdated] = useState(0)
    const [ignored, setIgnored] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (data && data.events.events.length && runRules) {
            let eventsChanged = 0
            let eventsUnchanged = 0
            for (const event of data.events.events) {
                let valueHasChanged = false
                const organism = event.dataValues.find(
                    ({ dataElement }) => dataElement === ORGANISM_DATA_ELEMENT
                )
                if (organism) {
                    const programId = Object.keys(
                        organismProgram
                    ).find(programId =>
                        organismProgram[programId].includes(organism.value)
                    )

                    if (programId) {
                        const newDataValues = runAssignValueRules(
                            event.dataValues,
                            whonetProgramStage.programStageDataElements,
                            {
                                programRules: metadata.programRules.filter(
                                    ({ program }) => program.id === programId
                                ),
                                programRuleVariables:
                                    metadata.programRuleVariables,
                            }
                        )

                        newDataValues.forEach(({ dataElement, value }) => {
                            const oldDataValue = event.dataValues.find(
                                dv => dv.dataElement === dataElement
                            )
                            const oldValue = oldDataValue
                                ? oldDataValue.value
                                : ''
                            if (oldValue !== value) valueHasChanged = true
                        })
                        if (valueHasChanged)
                            mutate({
                                id: event.event,
                                data: {
                                    ...event,
                                    dataValues: newDataValues,
                                },
                            })
                    }
                }
                if (valueHasChanged) eventsChanged++
                else eventsUnchanged++
            }
            setUpdated(prev => prev + eventsChanged)
            setIgnored(prev => prev + eventsUnchanged)
            const newPage = page + 1
            setPage(newPage)
            getMoreEvents(newPage)
        }
    }, [data, runRules])

    const getMoreEvents = async newPage => await refetch({ page: newPage })

    const onClick = () => setRunRules(true)

    if (error) return error.message

    return (
        <div>
            <section>
                <span>Updated: {updated}</span>
                <span>Ignored: {ignored}</span>
                <Button
                    primary
                    initialFocus
                    onClick={onClick}
                    disabled={!data || runRules}
                >
                    Run program rules
                </Button>
            </section>
            <style jsx>
                {`
                    section {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    span {
                        padding: 8px;
                    }
                `}
            </style>
        </div>
    )
}
