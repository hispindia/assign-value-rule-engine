export const runAssignValueAction = (
    values,
    { condition, dataElement, data }
) => {
    if (!eval(condition) || values[dataElement.id] === data) return

    values[dataElement.id] = data
}
