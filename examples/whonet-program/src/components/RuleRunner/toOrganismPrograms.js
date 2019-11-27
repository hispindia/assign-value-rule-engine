const arrayToObject = array => Object.assign({}, ...array)

export const toOrganismProgram = (optionGroups, programs) =>
    arrayToObject(
        programs
            .filter(({ name }) => !name.includes('[IGNORE]'))
            .map(({ name, id }) => ({
                [id]: optionGroups
                    .find(optionGroup => optionGroup.name === name)
                    .options.map(({ code }) => code),
            }))
    )
