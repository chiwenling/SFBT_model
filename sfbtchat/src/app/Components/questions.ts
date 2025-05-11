interface Response {
    text: string;
    value: number;
  }
  
interface Question {
    text: string;
    responses: Response[];
}
  

const Questions: Question[] = [
    {
        text: "如果我盡力去解決問題，我總是能夠解決難題的。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "即使別人反對我的想法，我仍有辦法取得我所要的。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "對我來說，堅持理想和達成目標是輕而易舉的。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "我自信能有效地應付任何突如其來的事情。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "以我的才智，我定能應付意料之外的情況。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "如果我付出必要的努力，我一定能解決大多數的難題。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "我能冷靜地面對難題，因為我可以信賴自己處理問題的能力。 ",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "面對一個難題時，我通常能想到一些應付的方法。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "有麻煩的時候，我通常能想到一些應付的方法。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    {
        text: "無論甚麼事在我身上發生，我都能應付自如。",
        responses: [
            { text: "完成不正確",value: 1},
            { text: "尚算正確", value: 2 },
            { text: "多數正確", value: 3 },
            { text: "完全正確", value: 4 }
        ]
    },
    
  ];
  
export default Questions;
  