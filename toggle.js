// const createLabels=(arr)=>{
//    const grpLabels=arr.map(el => `<span class="">${el}</span>`)
//    return(grpLabels.join(" "))

const createLabels = (labels) => {
    return labels.map(label => {
        let colorClass = "bg-gray-100 text-[#64748B]";
        // let widthClass="w-[100px]"
        let iconPath = "";

        // Logic for Colors and Icons
        if (label.toLowerCase().includes('bug')) {
            colorClass = "bg-[#FEECEC] border-1 border-[#EF4444]  text-[#EF4444]";
            iconPath = "./assets/BugDroid.png";
        } else if (label.toLowerCase().includes('help wanted')) {
            colorClass = "bg-[#FFF8DB] border-1 border-[#D97706] text-[#D97706]";

            iconPath = "./assets/Lifebuoy.png";
        } else if (label.toLowerCase().includes('enhancement')) {
            colorClass = "bg-[#DEFCE8] border-1 border-[#00A96E] text-[#00A96E]";
            iconPath = "./assets/Sparkle.png";
        } else if (label.toLowerCase().includes('documentation')) {
            colorClass = "bg-blue-100 text-blue-600 border-1 border-blue-600";
            iconPath = "./assets/Aperture.png"; // Or whichever icon you prefer for docs
        }

        // Return the HTML with the image included
        return `
            <span class="${colorClass} p-2 rounded-full text-[9px] font-bold uppercase flex items-center text-center gap-1">
                ${iconPath ? `<img src="${iconPath}" class="w-3 h-3" alt="">` : ""}
                ${label}
            </span>`;
    }).join("");
}

const manageSpinner=(status)=>{
    if(status===true){
        document.getElementById('spinner').classList.remove("hidden")
        document.getElementById('issue-container').classList.add("hidden")
    }
    else{
        document.getElementById('spinner').classList.add("hidden")
        document.getElementById('issue-container').classList.remove("hidden")
    }
}
    
// const removeBtn=()=>{
//     const statusBtn=document.querySelectorAll(".status-btn")
//     statusBtn.forEach((btn)=>btn.classList.remove("active"))
// }

// const openBtn=document.getElementById('open-btn')
// const closedBtn=document.getElementById('closed-btn')
let issuesCount=document.getElementById('issues-count')

let allIssues=[]
const loadAll=()=>{
    manageSpinner(true)
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=>res.json())
    .then(json => {
        
    console.log(json)
    allIssues=json.data
    displayIssues(allIssues)
    displayBtn(json.data)

    const allBtn=document.getElementById("all-btn")
    allBtn.classList.add('active')
    allBtn.classList.remove('bg-neutral-400')
    const searchBtn=document.getElementById('search-btn')
    searchBtn.classList.add('active')
   searchBtn.classList.remove('bg-neutral-400')

})
}

const displayBtn=()=>{
    
const btnContainer=document.getElementById('btn-container')
btnContainer.innerHTML=""
const btn=document.createElement("div")

btn.innerHTML=`
<button onclick="filterIssues('all',event)" id="all-btn" class="btn bg-blue-600 ">All</button>
 <button onclick="filterIssues('open',event)" id="open-btn" class="btn bg-neutral-300 ">Open</button>
<button onclick="filterIssues('closed',event)" id="closed-btn" class=" btn bg-neutral-300">Closed</button>`
btnContainer.appendChild(btn)
//    manageSpinner(true) 
}
const filterIssues=(status,event)=>{
manageSpinner(true)

setTimeout(()=>{
    const allBtn=document.querySelectorAll("#btn-container .btn")
    allBtn.forEach(btn=>{
        btn.classList.remove('active')
        btn.classList.add('bg-neutral-300')
    })
    event.target.classList.add("active")
    event.target.classList.remove("bg-neutral-300")
    if(status==="all"){
        displayIssues(allIssues)
    //    status.classlist.remove("bg-neutral-400")
        // openBtn.classList.remove("bg-neutral-400")
        // closedBtn.classList.remove("bg-neutral-400")
        // allBtn.classList.add('active')
    //  openBtn.classList.add('active')
    // status.classList.add('active')
    }
    else{
        const filteredIssue=allIssues.filter(issue=>issue.status.toLowerCase()===status.toLowerCase())
        // manageSpinner(true)
        displayIssues(filteredIssue)
        manageSpinner(false)
    }
},700)
}


const displayIssues=(issues)=>{
    // manageSpinner(true)
    const issueContainer=document.getElementById("issue-container")
    issueContainer.innerHTML=""
    issuesCount.innerText=issues.length
    for(let issue of issues){
        let borderColor="border-t-[#00A96E]"
        let backGround="bg-[#FEECEC] border-[#FEECEC]";
        let textColor="text-[#EF4444]"
        let status="./assets/Open-Status.png" 
        if(issue.priority.toLowerCase()==="high"){
            borderColor="border-t-4 border-t-[#00A96E]"
            backGround="bg-[#FEECEC] border-[#FEECEC]"
            textColor="text-[#EF4444]"
        }
        else if(issue.priority.toLowerCase()==="medium"){
            borderColor="border-t-4 border-t-[#00A96E]"
            backGround="bg-[#FFF8DB]  border-[#FDE68A]"
            textColor="text-[#F59E0B]"

        }
        else if(issue.priority.toLowerCase()==="low"){
            status="./assets/Closed-Status.png" 
            borderColor="border-t-4 border-t-[#A855F7]"
            backGround="bg-[#EEEFF2] border-[#BBF7D0]"
            textColor="text-[#9CA3AF]"
        }

        const cardDiv=document.createElement("div")
        cardDiv.innerHTML=`
        <div class="bg-white rounded-xl shadow-sm p-4 m-4 ${borderColor} space-y-3 w-[257px]">
            <div class="flex justify-between items-center">
                <div> <img src="${status}" alt=""></div>
            <div class="${backGround} rounded-full w-[70px] px-2 text-center">
                <p class="${textColor} text-[16px]">${issue.priority}</p>
            </div>
            </div>

            <div>
                <h3 class="font-semibold text-[14px] text-[#1F2937]">${issue.title}</h3>
                <p class="text-[12px] text-[#64748B]">${issue.description}</p>
            </div>

            <div class="flex gap-2 mt-3">
           ${createLabels(issue.labels)}
                
            </div>
            <div class="border border-gray-300 mt-4"></div>

            <div class="mt-4">
                <h3 class="text-[#64748B] text-[12px]">#1 by ${issue.author}</h3>
                <p class="text-[#64748B] text-[12px]">Created At:${issue.createdAt}</p>
                <p class="text-[#64748B] text-[12px]">Updated At:${issue.updatedAt}</p>
            </div>
            

        </div>`
        issueContainer.appendChild(cardDiv)
    }
    manageSpinner(false)
}


loadAll()
