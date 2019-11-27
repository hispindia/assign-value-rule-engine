import { runAssignValueRules } from './runAssignValueRules'
import { values } from '../__test__'
import { programStage } from '../__test__/output'

describe('runAssignValueRules', () => {
    it('does not crash when there is a problem with a rule', () => {
        runAssignValueRules(values, programStage, {
            programRules: [
                {
                    programRuleActions: [
                        {
                            condition: 'values[sddsdsd] === true',
                            programRuleActionType: 'ASSIGN',
                            dataElement: { id: 'sdfsfsdf' },
                        },
                    ],
                },
            ],
        })

        return expect(true).toEqual(true)
    })
})
