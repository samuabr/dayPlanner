var workday = [
    {  id: "0", hour: "09",time: "09", meridi: "am", saved: ""}, 
    {  id: "1", hour: "10",time: "10", meridi: "am", saved: ""},
    {  id: "2", hour: "11",time: "11", meridi: "am", saved: "" },
    {  id: "3", hour: "12",time: "12", meridi: "pm", saved: "" },
    {  id: "4", hour: "01",time: "13", meridi: "pm", saved: "" },
    {  id: "5", hour: "02",time: "14", meridi: "pm", saved: "" },
    {  id: "6", hour: "03",time: "15", meridi: "pm", saved: "" },
    {  id: "7", hour: "04",time: "16", meridi: "pm", saved: "" },
    {  id: "8", hour: "05",time: "17", meridi: "pm", saved: "" },
    ]
function headerdate() {
    var CD= moment().format('MMMM Do YYYY, h:mm:ss a');
    $("#currentDay").text(CD);
}

function save() {
    localStorage.setItem("workday", JSON.stringify(workday));
}

function display() {workday.forEach(function (rightnow) {
      
    $(`#${rightnow.id}`).val(rightnow.saved);
    
})
}
console.log(display);
workday.forEach(function(rightnow) {
    
    var hourRow = $("<form>").attr({"class": "row"});
    $(".container").append(hourRow);
    var hour = $("<div>").text(`${rightnow.hour}${rightnow.meridi}`).attr({"class": "col-md-2 hour"});  
    var hourshow = $("<div>").attr({"class": "col-md-9 description p-0"});
    var data = $("<textarea>");
    hourshow.append(data);
    data.attr("id", rightnow.id);
    if (rightnow.time < moment().format("HH"))
     { data.attr ({"class": "col-md-12 past", })
    }
     else if (rightnow.time === moment().format("HH"))
      { data.attr({ "class": "col-md-12 present" })
    } 
    else if (rightnow.time > moment().format("HH")) 
    { data.attr({ "class": "col-md-12 future" })    }

    var saveButton = $("<B>save</B>")
    var saveit = $("<button>")
        .attr({ "class": "col-md-1 saveBtn"});
    saveit.append(saveButton);
    hourRow.append(hour, hourshow, saveit);
 })
 headerdate();

saveddata();

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future, .present").attr("id");
    workday[saveIndex].saved = $(this).siblings(".description").children(".future,.present").val();
    

        save();
    display();
})


function saveddata() {
    var storedDay = JSON.parse(localStorage.getItem("workday"));

    if (storedDay) {
        workday = storedDay;
    }

    save();
    display();
}

