# assign-value-rule-engine

## Installation

```bash
yarn add @hisp-amr/assign-value-rule-engine
# or
npm i @hisp-amr/assign-value-rule-engine
```

## Usage
You need to pass along some metadata. In the example app the bellow query was used with [@dhis2/app-runtime](https://runtime.dhis2.nu/#/hooks/useDataQuery). See [AppContent.js](../../examples/whonet-program/src/components/AppContent.js)
```js
const query = {
    metadata: {
        resource: 'metadata',
        params: {
            optionGroups: 'true', // not strictly needed, but was used to find the correct program based on organism
            programs: 'true',
            programRules: 'true',
            programRuleVariables: 'true',
            fields: [
                'id',
                'options[code,displayName]',
                'dataElement',
                'name',
                'condition',
                'programRuleActions[programRuleActionType,dataElement,data]',
                'programStages[id,programStageDataElements]',
                'program',
            ],
        },
    },
}
```

See [RuleRunner.js](../../examples/whonet-program/src/components/RuleRunner/RuleRunner.js)

```js
import { runAssignValueRules } from '@hisp-amr/assign-value-rule-engine'

const newDataValues = runAssignValueRules(
    event.dataValues,
    programStage.programStageDataElements, // programStage of the event
    {
        programRules: metadata.programRules.filter(
            ({ program }) => program.id === programId
        ),
        programRuleVariables: metadata.programRuleVariables,
    }
)
```
