import { runAssignValueAction } from './runAssignValueAction'
import { getAssignValueRules } from './getAssignValueRules'
import { getValues } from './getValues'

/**
 *
 * @param {Object[]} dataValues
 * @param {Object[]} programStageDataElements
 * @param {Object} params
 */
export const runAssignValueRules = (
    dataValues,
    programStageDataElements,
    { programRules, programRuleVariables }
) => {
    const values = getValues(dataValues, programStageDataElements)
    const assignValueRules = getAssignValueRules(
        programRules,
        programRuleVariables
    )

    assignValueRules.forEach(rule => {
        rule.programRuleActions.forEach(action => {
            try {
                runAssignValueAction(values, {
                    ...action,
                    condition: rule.condition,
                })
            } catch (error) {
                console.warn('Failed to evaluate rule:', rule, error)
            }
        })
    })

    return Object.keys(values).filter(id => values[id] !== '').map(id => ({
        dataElement: id,
        value: values[id],
    }))
}
