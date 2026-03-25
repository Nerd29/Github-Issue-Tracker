1️⃣What is difference var,let and const?
ans:
1.Var-oldest form to declare variables.If it's declared inside a function, it's available everywhere in that function.It can be redeclared and reassigned any time in that function.
2.Let-The main difference from var is that it can't be redeclared but it can be updated in a function
3.Const-It can't be redeclared,updated or reassigned...it is a fixed value for a function

2️⃣What is spread operator(...)?
Ans:Spread operator helps to combine arrays or objects to make it simplier.
just like-
const arr1-[]
const arr2-[]
const combined-[...arr1,...arr2]
const obj={}
const newObj={...obj,newObj materials}

3️⃣what is the difference between map(), filter () and forEach()?
Ans:
forEach():it is a function which is executed for each element.When we want to console or get the specific item/value/element of any array,strings or objects we run this function.
map():Creates a new array by performing an action on every elements of the current array.
filter():creates a new array by performing an action on an element which passes a specific condition.

4️⃣What is an arrow function?
ans:arrow function is the shorter syntax of a standard function.
such as:
function add(x,y){
return x+y;
}
instead of this we can use:
const add=(x,y)=>x+y;
in this..we write the condition and return value in one line without any curly brackets.This is the reduce version of main one.


5️⃣What are template literals?
Ans:It is such kind of string where it is expressed by backticks(`) instead of single quotation(').
it helps to introduce multi-line strings with dynamic object values without writing manually html code.
it helps to look a UI dynamic for better user experience.

