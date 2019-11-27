const getValue = (id, dataValues) => {
    const dataValue = dataValues.find(dv => dv.dataElement === id)
    return dataValue ? dataValue.value : ''
}

export const getValues = (dataValues, programStageDataElements) =>
    Object.assign(
        {},
        ...programStageDataElements.map(({ dataElement }) => ({
            [dataElement.id]: getValue(dataElement.id, dataValues),
        }))
    )
