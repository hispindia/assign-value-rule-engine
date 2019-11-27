import { runAssignValueAction } from './runAssignValueAction'
import { values } from '../__test__'
import { programStage } from '../__test__/output'
import {
    SHOW_OPTION_GROUP,
    HIDE_FIELD,
    ASSIGN,
    SHOW_WARNING,
    SHOW_ERROR,
} from '../constants/actionTypes'

describe('runAssignValueAction', () => {
    it('sets the option set', () => {
        const expected = 'id'
        const id = 'KmgWX65h0iM'
        const dataElement = programStage.programStageDataElements[id]

        runAssignValueAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: SHOW_OPTION_GROUP,
                optionGroup: { id: expected },
            },
            {
                stage: programStage,
                optionSets: { [dataElement.optionSet]: [], [expected]: [] },
            }
        )

        return expect(dataElement.optionSet).toEqual(expected)
    })

    it('hides the field', () => {
        const id = 'KmgWX65h0iM'
        const dataElement = programStage.programStageDataElements[id]

        runAssignValueAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: HIDE_FIELD,
            },
            {
                stage: programStage,
            }
        )

        return expect(dataElement.hide).toEqual(true)
    })

    it('shows the field', () => {
        const id = 'KmgWX65h0iM'
        const dataElement = programStage.programStageDataElements[id]

        runAssignValueAction(
            values,
            {
                condition: 'false',
                dataElement: { id },
                programRuleActionType: HIDE_FIELD,
            },
            {
                stage: programStage,
            }
        )

        return expect(dataElement.hide).toEqual(false)
    })

    it('assigns the value', () => {
        const id = 'KmgWX65h0iM'
        const expected = 'data'

        runAssignValueAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: ASSIGN,
                data: expected,
            },
            {
                stage: programStage,
            }
        )

        return expect(values[id]).toEqual(expected)
    })

    it('sets the warning', () => {
        const id = 'KmgWX65h0iM'
        const expected = 'warning'

        runAssignValueAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: SHOW_WARNING,
                content: expected,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.programStageDataElements[id].warning).toEqual(expected)
    })

    it('removes the warning', () => {
        const id = 'KmgWX65h0iM'
        const warning = 'warning'

        programStage.programStageDataElements[id].warning = warning

        runAssignValueAction(
            values,
            {
                condition: 'false',
                dataElement: { id },
                programRuleActionType: SHOW_WARNING,
                content: warning,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.programStageDataElements[id].warning).toEqual(null)
    })

    it('sets the error', () => {
        const id = 'KmgWX65h0iM'
        const expected = 'error'

        runAssignValueAction(
            values,
            {
                condition: 'true',
                dataElement: { id },
                programRuleActionType: SHOW_ERROR,
                content: expected,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.programStageDataElements[id].error).toEqual(expected)
    })

    it('removes the error', () => {
        const id = 'KmgWX65h0iM'
        const error = 'error'

        programStage.programStageDataElements[id].error = error

        runAssignValueAction(
            values,
            {
                condition: 'false',
                dataElement: { id },
                programRuleActionType: SHOW_ERROR,
                content: error,
            },
            {
                stage: programStage,
            }
        )

        return expect(programStage.programStageDataElements[id].error).toEqual(null)
    })
})
