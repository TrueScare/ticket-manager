import {useStats} from "@/composables/useStats.js";
import {test, expect} from "vitest";

//#region setup
const getMockTasks = () => [
    {
        id: 536,
        title: "Testfall 1 - offen",
        isDone: false,
    },
    {
        id: 279,
        title: "Testfall 2 - offen",
        isDone: false,
    },
    {
        id: 976,
        title: "Testfall 3 - Done",
        isDone: true,
    }
];

const getMockEmptyTasks = () => [];

const getMockAllDoneTasks = () => [
         {
        id: 536,
        title: "Testfall 1 - offen",
        isDone: true,
    },
    {
        id: 279,
        title: "Testfall 2 - offen",
        isDone: true,
    },
    {
        id: 976,
        title: "Testfall 3 - Done",
        isDone: true,
    }
];

let {countOpenTasks} = useStats(getMockTasks);
//#endregion setup
//#region tests
test("der Wert der Anzahl sollte eine Zahl sein", () => {
    expect(typeof (countOpenTasks.value)).toBe('number');
});

test.each([
    {input: getMockTasks, expected: 2, label:"gibt 2 zurück wenn 2 von 3 Aufgaben offen sind"},
    {input: getMockEmptyTasks, expected: 0, label: "leere Liste gibt als Wert 0 zurück und nicht undefined oder null"},
    {input: getMockAllDoneTasks, expected: 0, label: "gibt 0 zurück, wenn alle Aufgaben erledigt sind"},
])("$label", ({input, expected})=>{
    expect(useStats(input).countOpenTasks.value).toEqual(expected);
});
//#endregion tests