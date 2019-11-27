import { getCondition } from './getCondition'

const ASSIGN = 'ASSIGN'

/**
 * Returns event program rules, excluding entity program rules,
 * sorted by priority.
 * @param {Object[]} programRules
 * @param {Object[]} programRuleVariables
 * @returns {Object[]}
 */
export const getAssignValueRules = (programRules, programRuleVariables) =>
    programRules
        .filter(r =>
            r.programRuleActions.find(
                a => a.dataElement && a.programRuleActionType === ASSIGN
            )
        )
        .map(r => ({
            ...r,
            programRuleActions: r.programRuleActions.filter(
                ({ programRuleActionType }) => programRuleActionType === ASSIGN
            ),
            condition: getCondition(r.condition, programRuleVariables),
        }))
        .sort((a, b) => (a.priority > b.priority || !a.priority ? 1 : -1))
