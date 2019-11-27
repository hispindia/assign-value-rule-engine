import { getAssignValueRules } from './getAssignValueRules'
import { programRules, programRuleVariables, eventRules } from '../../__test__'

describe('getAssignValueRules', () => {
    it('returns event program rules', () => {
        const expected = eventRules
        const actual = getAssignValueRules(programRules, programRuleVariables)

        return expect(actual).toEqual(expected)
    })
})
