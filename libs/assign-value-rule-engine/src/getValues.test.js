import { getValues } from './getValues'
import { dataValues, programsOutput, values } from './__test__'

describe('getValues', () => {
    it('returns data values as an object', () => {
        const dataElements = programsOutput[1].programStages[0].dataElements
        const actual = getValues(dataValues, dataElements)

        return expect(actual).toEqual(values)
    })
})
