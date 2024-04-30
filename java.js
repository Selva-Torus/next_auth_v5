var SimplePresentTense = [
  "I eat breakfast every morning.",
  "She walks to school with her friends.",
  "The sun rises in the east.",
  "They play soccer after school.",
  "He reads a book before going to bed.",
  "We go for a walk in the park every Sunday.",
  "The cat sleeps on the windowsill.",
  "My mom cooks dinner for the family.",
  "The birds chirp in the trees.",
  "I brush my teeth twice a day.",
];

var SimplePastTense = [
  "I ate breakfast every morning.",
  "She walked to school with her friends.",
  "The sun rose in the east.",
  "They played soccer after school.",
  "He read a book before going to bed.",
  "We went for a walk in the park every Sunday.",
  "The cat slept on the windowsill.",
  "My mom cooked dinner for the family.",
  "The birds chirped in the trees.",
  "I brushed my teeth twice a day.",
];

var SimpleFutureTense = [
  "I will eat breakfast every morning.",
  "She will walk to school with her friends.",
  "The sun will rise in the east.",
  "They will play soccer after school.",
  "He will read a book before going to bed.",
  "We will go for a walk in the park every Sunday.",
  "The cat will sleep on the windowsill.",
  "My mom will cook dinner for the family.",
  "The birds will chirp in the trees.",
  "I will brush my teeth twice a day.",
];

var PresentPerfectTense = [
  "I have eaten breakfast every morning.",
  "She has walked to school with her friends.",
  "The sun has risen in the east.",
  "They have played soccer after school.",
  "He has read a book before going to bed.",
  "We have gone for a walk in the park every Sunday.",
  "The cat has slept on the windowsill.",
  "My mom has cooked dinner for the family.",
  "The birds have chirped in the trees.",
  "I have brushed my teeth twice a day.",
];

var PastPerfectTense = [
  "I had eaten breakfast every morning.",
  "She had walked to school with her friends.",
  "The sun had risen in the east.",
  "They had played soccer after school.",
  "He had read a book before going to bed.",
  "We had gone for a walk in the park every Sunday.",
  "The cat had slept on the windowsill.",
  "My mom had cooked dinner for the family.",
  "The birds had chirped in the trees.",
  "I had brushed my teeth twice a day.",
];

var FuturePerfectTense = [
  "I will have eaten breakfast every morning.",
  "She will have walked to school with her friends.",
  "The sun will have risen in the east.",
  "They will have played soccer after school.",
  "He will have read a book before going to bed.",
  "We will have gone for a walk in the park every Sunday.",
  "The cat will have slept on the windowsill.",
  "My mom will have cooked dinner for the family.",
  "The birds will have chirped in the trees.",
  "I will have brushed my teeth twice a day.",
];

var PresentContinuousTense = [
  "Breakfast is being eaten by me every morning.",
  "School is being walked to by her with her friends.",
  "The sun is being risen in the east.",
  "Soccer is being played by them after school.",
  "A book is being read by him before going to bed.",
  "A walk in the park is being gone for by us every Sunday.",
  "The windowsill is being slept on by the cat.",
  "Dinner is being cooked for the family by my mom.",
  "The trees are being chirped in by the birds.",
  "Teeth are being brushed by me twice a day.",
];

var PastContinuousTense = [
  "I was eating breakfast every morning.",
  "She was walking to school with her friends.",
  "The sun was rising in the east.",
  "They were playing soccer after school.",
  "He was reading a book before going to bed.",
  "We were going for a walk in the park every Sunday.",
  "The cat was sleeping on the windowsill.",
  "My mom was cooking dinner for the family.",
  "The birds were chirping in the trees.",
  "I was brushing my teeth twice a day.",
];

var FutureContinuousTense = [
  "I will be eating breakfast every morning.",
  "She will be walking to school with her friends.",
  "The sun will be rising in the east.",
  "They will be playing soccer after school.",
  "He will be reading a book before going to bed.",
  "We will be going for a walk in the park every Sunday.",
  "The cat will be sleeping on the windowsill.",
  "My mom will be cooking dinner for the family.",
  "The birds will be chirping in the trees.",
  "I will be brushing my teeth twice a day.",
];

var PresentPerfectContinuousTense = [
  "I have been eating breakfast every morning.",
  "She has been walking to school with her friends.",
  "The sun has been rising in the east.",
  "They have been playing soccer after school.",
  "He has been reading a book before going to bed.",
  "We have been going for a walk in the park every Sunday.",
  "The cat has been sleeping on the windowsill.",
  "My mom has been cooking dinner for the family.",
  "The birds have been chirping in the trees.",
  "I have been brushing my teeth twice a day.",
];

var PastPerfectContinuousTense = [
  "Breakfast had been being eaten by me every morning.",
  "School had been being walked to by her with her friends.",
  "The sun had been being risen in the east.",
  "Soccer had been being played by them after school.",
  "A book had been being read by him before going to bed.",
  "A walk in the park had been being gone for by us every Sunday.",
  "The windowsill had been being slept on by the cat.",
  "Dinner had been being cooked for the family by my mom.",
  "The trees had been being chirped in by the birds.",
  "Teeth had been being brushed by me twice a day.",
];

var FuturePerfectContinuousTense = [
  "Breakfast will have been being eaten by me every morning.",
  "School will have been being walked to by her with her friends.",
  "The sun will have been being risen in the east.",
  "Soccer will have been being played by them after school.",
  "A book will have been being read by him before going to bed.",
  "A walk in the park will have been being gone for by us every Sunday.",
  "The windowsill will have been being slept on by the cat.",
  "Dinner will have been being cooked for the family by my mom.",
  "The trees will have been being chirped in by the birds.",
  "Teeth will have been being brushed by me twice a day.",
];

var allTenses = [
  {
    Simple_Present: "I eat breakfast every morning.",
    Simple_Past: "I ate breakfast every morning.",
    Simple_Future: "I will eat breakfast every morning.",
    Present_Perfect: "I have eaten breakfast every morning.",
    Past_Perfect: "I had eaten breakfast every morning.",
    Future_Perfect: "I will have eaten breakfast every morning.",
    Present_Continuous: "Breakfast is being eaten by me every morning.",
    Past_Continuous: "I was eating breakfast every morning.",
    Future_Continuous: "I will be eating breakfast every morning.",
    Present_Perfect_Continuous: "I have been eating breakfast every morning.",
    Past_Perfect_Continuous:
      "Breakfast had been being eaten by me every morning.",
    Future_Perfect_Continuous:
      "Breakfast will have been being eaten by me every morning.",
  },
  {
    Simple_Present: "She walks to school with her friends.",
    Simple_Past: "She walked to school with her friends.",
    Simple_Future: "She will walk to school with her friends.",
    Present_Perfect: "She has walked to school with her friends.",
    Past_Perfect: "She had walked to school with her friends.",
    Future_Perfect: "She will have walked to school with her friends.",
    Present_Continuous: "School is being walked to by her with her friends.",
    Past_Continuous: "She was walking to school with her friends.",
    Future_Continuous: "She will be walking to school with her friends.",
    Present_Perfect_Continuous:
      "She has been walking to school with her friends.",
    Past_Perfect_Continuous:
      "School had been being walked to by her with her friends.",
    Future_Perfect_Continuous:
      "School will have been being walked to by her with her friends.",
  },
  {
    Simple_Present: "The sun rises in the east.",
    Simple_Past: "The sun rose in the east.",
    Simple_Future: "The sun will rise in the east.",
    Present_Perfect: "The sun has risen in the east.",
    Past_Perfect: "The sun had risen in the east.",
    Future_Perfect: "The sun will have risen in the east.",
    Present_Continuous: "The sun is being risen in the east.",
    Past_Continuous: "The sun was rising in the east.",
    Future_Continuous: "The sun will be rising in the east.",
    Present_Perfect_Continuous: "The sun has been rising in the east.",
    Past_Perfect_Continuous: "The sun had been being risen in the east.",
    Future_Perfect_Continuous:
      "The sun will have been being risen in the east.",
  },
  {
    Simple_Present: "They play soccer after school.",
    Simple_Past: "They played soccer after school.",
    Simple_Future: "They will play soccer after school.",
    Present_Perfect: "They have played soccer after school.",
    Past_Perfect: "They had played soccer after school.",
    Future_Perfect: "They will have played soccer after school.",
    Present_Continuous: "Soccer is being played by them after school.",
    Past_Continuous: "They were playing soccer after school.",
    Future_Continuous: "They will be playing soccer after school.",
    Present_Perfect_Continuous: "They have been playing soccer after school.",
    Past_Perfect_Continuous:
      "Soccer had been being played by them after school.",
    Future_Perfect_Continuous:
      "They will have been playing soccer after school.",
  },
  {
    Simple_Present: "He reads a book before going to bed.",
    Simple_Past: "He read a book before going to bed.",
    Simple_Future: "He will read a book before going to bed.",
    Present_Perfect: "He has read a book before going to bed.",
    Past_Perfect: "He had read a book before going to bed.",
    Future_Perfect: "He will have read a book before going to bed.",
    Present_Continuous: "A book is being read by him before going to bed.",
    Past_Continuous: "He was reading a book before going to bed.",
    Future_Continuous: "He will be reading a book before going to bed.",
    Present_Perfect_Continuous:
      "He has been reading a book before going to bed.",
    Past_Perfect_Continuous:
      "A book had been being read by him before going to bed.",
    Future_Perfect_Continuous:
      "He will have been reading a book before going to bed.",
  },
  {
    Simple_Present: "We go for a walk in the park every Sunday.",
    Simple_Past: "We went for a walk in the park every Sunday.",
    Simple_Future: "We will go for a walk in the park every Sunday.",
    Present_Perfect: "We have gone for a walk in the park every Sunday.",
    Past_Perfect: "We had gone for a walk in the park every Sunday.",
    Future_Perfect: "We will have gone for a walk in the park every Sunday.",
    Present_Continuous:
      "A walk in the park is being gone for by us every Sunday.",
    Past_Continuous: "We were going for a walk in the park every Sunday.",
    Future_Continuous: "We will be going for a walk in the park every Sunday.",
    Present_Perfect_Continuous:
      "We have been going for a walk in the park every Sunday.",
    Past_Perfect_Continuous:
      "A walk in the park had been being gone for by us every Sunday.",
    Future_Perfect_Continuous:
      "We will have been going for a walk in the park every Sunday.",
  },
  {
    Simple_Present: "The cat sleeps on the windowsill.",
    Simple_Past: "The cat slept on the windowsill.",
    Simple_Future: "The cat will sleep on the windowsill.",
    Present_Perfect: "The cat has slept on the windowsill.",
    Past_Perfect: "The cat had slept on the windowsill.",
    Future_Perfect: "The cat will have slept on the windowsill.",
    Present_Continuous: "The windowsill is being slept on by the cat.",
    Past_Continuous: "The cat was sleeping on the windowsill.",
    Future_Continuous: "The cat will be sleeping on the windowsill.",
    Present_Perfect_Continuous: "The cat has been sleeping on the windowsill.",
    Past_Perfect_Continuous:
      "The windowsill had been being slept on by the cat.",
    Future_Perfect_Continuous:
      "The cat will have been sleeping on the windowsill.",
  },
  {
    Simple_Present: "My mom cooks dinner for the family.",
    Simple_Past: "My mom cooked dinner for the family.",
    Simple_Future: "My mom will cook dinner for the family.",
    Present_Perfect: "My mom has cooked dinner for the family.",
    Past_Perfect: "My mom had cooked dinner for the family.",
    Future_Perfect: "My mom will have cooked dinner for the family.",
    Present_Continuous: "Dinner is being cooked for the family by my mom.",
    Past_Continuous: "My mom was cooking dinner for the family.",
    Future_Continuous: "My mom will be cooking dinner for the family.",
    Present_Perfect_Continuous:
      "My mom has been cooking dinner for the family.",
    Past_Perfect_Continuous:
      "Dinner had been being cooked for the family by my mom.",
    Future_Perfect_Continuous:
      "My mom will have been cooking dinner for the family.",
  },
  {
    Simple_Present: "The birds chirp in the trees.",
    Simple_Past: "The birds chirped in the trees.",
    Simple_Future: "The birds will chirp in the trees.",
    Present_Perfect: "The birds have chirped in the trees.",
    Past_Perfect: "The birds had chirped in the trees.",
    Future_Perfect: "The birds will have chirped in the trees.",
    Present_Continuous: "The trees are being chirped in by the birds.",
    Past_Continuous: "The birds were chirping in the trees.",
    Future_Continuous: "The birds will be chirping in the trees.",
    Present_Perfect_Continuous: "The birds have been chirping in the trees.",
    Past_Perfect_Continuous:
      "The trees had been being chirped in by the birds.",
    Future_Perfect_Continuous:
      "The birds will have been chirping in the trees.",
  },
  {
    Simple_Present: "I brush my teeth twice a day.",
    Simple_Past: "I brushed my teeth twice a day.",
    Simple_Future: "I will brush my teeth twice a day.",
    Present_Perfect: "I have brushed my teeth twice a day.",
    Past_Perfect: "I had brushed my teeth twice a day.",
    Future_Perfect: "I will have brushed my teeth twice a day.",
    Present_Continuous: "Teeth are being brushed by me twice a day.",
    Past_Continuous: "I was brushing my teeth twice a day.",
    Future_Continuous: "I will be brushing my teeth twice a day.",
    Present_Perfect_Continuous: "I have been brushing my teeth twice a day.",
    Past_Perfect_Continuous: "Teeth had been being brushed by me twice a day.",
    Future_Perfect_Continuous:
      "I will have been brushing my teeth twice a day.",
  },
];

// var randomNumber = Math.floor(Math.random() * 10);
// console.log(randomNumber);

// for (let i = 0; i < 10; i++) {
//   var gram = Math.floor(Math.random() * 6);
//   console.log(gram);
//   var sen = Math.floor(Math.random() * 10);
//   console.log(sen);
//   switch (gram) {
//     case 0:
//       console.log(SPre[sen]);
//       break;
//     case 1:
//       console.log(SPast[sen]);
//       break;
//     case 2:
//       console.log(SF[sen]);
//       break;
//     case 3:
//       console.log(PreP[sen]);
//       break;
//     case 4:
//       console.log(PastP[sen]);
//       break;
//     case 5:
//       console.log(FP[sen]);
//       break;
//     default:
//       break;
//   }
// }

// Get input from the user in Node.js
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter something: ", (userInput) => {
//   console.log("You entered:", userInput);
//   rl.close();
// });

var tenseNames = [
  "Simple_Present",
  "Simple_Past",
  "Simple_Future",
  "Present_Perfect",
  "Past_Perfect",
  "Future_Perfect",
  "Present_Continuous",
  "Past_Continuous",
  "Future_Continuous",
  "Present_Perfect_Continuous",
  "Past_Perfect_Continuous",
  "Future_Perfect_Continuous",
];

var gram = Math.floor(Math.random() * 12);
var sen = Math.floor(Math.random() * 10);
console.log(allTenses[sen][tenseNames[gram]]);

("use client");
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Button,
  Input,
} from "@nextui-org/react";
var allTenses = [
  {
    Simple_Present: "I eat breakfast every morning.",
    Simple_Past: "I ate breakfast every morning.",
    Simple_Future: "I will eat breakfast every morning.",
    Present_Perfect: "I have eaten breakfast every morning.",
    Past_Perfect: "I had eaten breakfast every morning.",
    Future_Perfect: "I will have eaten breakfast every morning.",
    Present_Continuous: "Breakfast is being eaten by me every morning.",
    Past_Continuous: "I was eating breakfast every morning.",
    Future_Continuous: "I will be eating breakfast every morning.",
    Present_Perfect_Continuous: "I have been eating breakfast every morning.",
    Past_Perfect_Continuous:
      "Breakfast had been being eaten by me every morning.",
    Future_Perfect_Continuous:
      "Breakfast will have been being eaten by me every morning.",
  },
  {
    Simple_Present: "She walks to school with her friends.",
    Simple_Past: "She walked to school with her friends.",
    Simple_Future: "She will walk to school with her friends.",
    Present_Perfect: "She has walked to school with her friends.",
    Past_Perfect: "She had walked to school with her friends.",
    Future_Perfect: "She will have walked to school with her friends.",
    Present_Continuous: "School is being walked to by her with her friends.",
    Past_Continuous: "She was walking to school with her friends.",
    Future_Continuous: "She will be walking to school with her friends.",
    Present_Perfect_Continuous:
      "She has been walking to school with her friends.",
    Past_Perfect_Continuous:
      "School had been being walked to by her with her friends.",
    Future_Perfect_Continuous:
      "School will have been being walked to by her with her friends.",
  },
  {
    Simple_Present: "The sun rises in the east.",
    Simple_Past: "The sun rose in the east.",
    Simple_Future: "The sun will rise in the east.",
    Present_Perfect: "The sun has risen in the east.",
    Past_Perfect: "The sun had risen in the east.",
    Future_Perfect: "The sun will have risen in the east.",
    Present_Continuous: "The sun is being risen in the east.",
    Past_Continuous: "The sun was rising in the east.",
    Future_Continuous: "The sun will be rising in the east.",
    Present_Perfect_Continuous: "The sun has been rising in the east.",
    Past_Perfect_Continuous: "The sun had been being risen in the east.",
    Future_Perfect_Continuous:
      "The sun will have been being risen in the east.",
  },
  {
    Simple_Present: "They play soccer after school.",
    Simple_Past: "They played soccer after school.",
    Simple_Future: "They will play soccer after school.",
    Present_Perfect: "They have played soccer after school.",
    Past_Perfect: "They had played soccer after school.",
    Future_Perfect: "They will have played soccer after school.",
    Present_Continuous: "Soccer is being played by them after school.",
    Past_Continuous: "They were playing soccer after school.",
    Future_Continuous: "They will be playing soccer after school.",
    Present_Perfect_Continuous: "They have been playing soccer after school.",
    Past_Perfect_Continuous:
      "Soccer had been being played by them after school.",
    Future_Perfect_Continuous:
      "They will have been playing soccer after school.",
  },
  {
    Simple_Present: "He reads a book before going to bed.",
    Simple_Past: "He read a book before going to bed.",
    Simple_Future: "He will read a book before going to bed.",
    Present_Perfect: "He has read a book before going to bed.",
    Past_Perfect: "He had read a book before going to bed.",
    Future_Perfect: "He will have read a book before going to bed.",
    Present_Continuous: "A book is being read by him before going to bed.",
    Past_Continuous: "He was reading a book before going to bed.",
    Future_Continuous: "He will be reading a book before going to bed.",
    Present_Perfect_Continuous:
      "He has been reading a book before going to bed.",
    Past_Perfect_Continuous:
      "A book had been being read by him before going to bed.",
    Future_Perfect_Continuous:
      "He will have been reading a book before going to bed.",
  },
  {
    Simple_Present: "We go for a walk in the park every Sunday.",
    Simple_Past: "We went for a walk in the park every Sunday.",
    Simple_Future: "We will go for a walk in the park every Sunday.",
    Present_Perfect: "We have gone for a walk in the park every Sunday.",
    Past_Perfect: "We had gone for a walk in the park every Sunday.",
    Future_Perfect: "We will have gone for a walk in the park every Sunday.",
    Present_Continuous:
      "A walk in the park is being gone for by us every Sunday.",
    Past_Continuous: "We were going for a walk in the park every Sunday.",
    Future_Continuous: "We will be going for a walk in the park every Sunday.",
    Present_Perfect_Continuous:
      "We have been going for a walk in the park every Sunday.",
    Past_Perfect_Continuous:
      "A walk in the park had been being gone for by us every Sunday.",
    Future_Perfect_Continuous:
      "We will have been going for a walk in the park every Sunday.",
  },
  {
    Simple_Present: "The cat sleeps on the windowsill.",
    Simple_Past: "The cat slept on the windowsill.",
    Simple_Future: "The cat will sleep on the windowsill.",
    Present_Perfect: "The cat has slept on the windowsill.",
    Past_Perfect: "The cat had slept on the windowsill.",
    Future_Perfect: "The cat will have slept on the windowsill.",
    Present_Continuous: "The windowsill is being slept on by the cat.",
    Past_Continuous: "The cat was sleeping on the windowsill.",
    Future_Continuous: "The cat will be sleeping on the windowsill.",
    Present_Perfect_Continuous: "The cat has been sleeping on the windowsill.",
    Past_Perfect_Continuous:
      "The windowsill had been being slept on by the cat.",
    Future_Perfect_Continuous:
      "The cat will have been sleeping on the windowsill.",
  },
  {
    Simple_Present: "My mom cooks dinner for the family.",
    Simple_Past: "My mom cooked dinner for the family.",
    Simple_Future: "My mom will cook dinner for the family.",
    Present_Perfect: "My mom has cooked dinner for the family.",
    Past_Perfect: "My mom had cooked dinner for the family.",
    Future_Perfect: "My mom will have cooked dinner for the family.",
    Present_Continuous: "Dinner is being cooked for the family by my mom.",
    Past_Continuous: "My mom was cooking dinner for the family.",
    Future_Continuous: "My mom will be cooking dinner for the family.",
    Present_Perfect_Continuous:
      "My mom has been cooking dinner for the family.",
    Past_Perfect_Continuous:
      "Dinner had been being cooked for the family by my mom.",
    Future_Perfect_Continuous:
      "My mom will have been cooking dinner for the family.",
  },
  {
    Simple_Present: "The birds chirp in the trees.",
    Simple_Past: "The birds chirped in the trees.",
    Simple_Future: "The birds will chirp in the trees.",
    Present_Perfect: "The birds have chirped in the trees.",
    Past_Perfect: "The birds had chirped in the trees.",
    Future_Perfect: "The birds will have chirped in the trees.",
    Present_Continuous: "The trees are being chirped in by the birds.",
    Past_Continuous: "The birds were chirping in the trees.",
    Future_Continuous: "The birds will be chirping in the trees.",
    Present_Perfect_Continuous: "The birds have been chirping in the trees.",
    Past_Perfect_Continuous:
      "The trees had been being chirped in by the birds.",
    Future_Perfect_Continuous:
      "The birds will have been chirping in the trees.",
  },
  {
    Simple_Present: "I brush my teeth twice a day.",
    Simple_Past: "I brushed my teeth twice a day.",
    Simple_Future: "I will brush my teeth twice a day.",
    Present_Perfect: "I have brushed my teeth twice a day.",
    Past_Perfect: "I had brushed my teeth twice a day.",
    Future_Perfect: "I will have brushed my teeth twice a day.",
    Present_Continuous: "Teeth are being brushed by me twice a day.",
    Past_Continuous: "I was brushing my teeth twice a day.",
    Future_Continuous: "I will be brushing my teeth twice a day.",
    Present_Perfect_Continuous: "I have been brushing my teeth twice a day.",
    Past_Perfect_Continuous: "Teeth had been being brushed by me twice a day.",
    Future_Perfect_Continuous:
      "I will have been brushing my teeth twice a day.",
  },
];
var tenseNames = [
  "Simple_Present",
  "Simple_Past",
  "Simple_Future",
  "Present_Perfect",
  "Past_Perfect",
  "Future_Perfect",
  "Present_Continuous",
  "Past_Continuous",
  "Future_Continuous",
  "Present_Perfect_Continuous",
  "Past_Perfect_Continuous",
  "Future_Perfect_Continuous",
];

const Grammer = () => {
  const [id, setId] = useState(0);
  const [selected, setSelected] = useState < any > "";
  const [Question, setQuestion] = useState("");
  const [optios, setOptios] = useState([]);
  const [Answer, setAnswer] = useState("");
  const [points, setPoints] = useState(0);
  const [mgs, setMgs] = useState("");

  const generate = () => {
    var gram: number = Math.floor(Math.random() * 12);
    var sen: number = Math.floor(Math.random() * 10);
    setSelected(allTenses[sen][tenseNames[gram]]);
    setAnswer(tenseNames[gram]);
  };

  const check = (item: any) => {
    if (item === Answer) {
      setPoints(points + 10);
      setMgs("Good Job");
      generate();
    } else {
      setPoints(points - 10);
      setMgs("Try Again");
    }
  };
  return (
    <div className="flex flex-col h-screen w-full items-center gap-5">
      <div className=" flex flex-col w-[50%] gap-5">
        <div className="flex w-full justify-between">
          <h2>{mgs}</h2>
          <h2>{points}</h2>
        </div>
        <Input value={selected} />
        <Dropdown className="w-full border border-[#20252B]  p-0 ">
          <DropdownTrigger>
            <Button size="lg" variant="bordered">
              Choose
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Link Actions"
            className=" text-white rounded-sm"
            variant="light"
            classNames={{
              base: "bg-[#20252B] border-1 border-black",
            }}
          >
            {tenseNames.map((item: any, id: any) => (
              <DropdownItem
                id={id}
                className=" text-white hover:bg-slate-500"
                onClick={() => check(item)}
              >
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Button onClick={generate}>start</Button>
      </div>
    </div>
  );
};

export default Grammer;
