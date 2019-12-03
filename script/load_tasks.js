function loadTasks() {
    //If user is authenticated
    firebase.auth().onAuthStateChanged(function(user) {
        //Gets the tasks collection and organizes by time stamp
        db.collection("users").doc(user.uid).collection("tasks").orderBy("Time_Stamp").onSnapshot(function(querySnapshot) {
            //For each document in the tasks collection
            querySnapshot.docChanges().forEach(function(change) {
                //On first time access of firestore
                if (change.type == "added") {
                    //Creates list item with all the doc fields and delete buttons
                    //Adds it to the list of the html
                    var docName = change.doc.id;
                    var listItem = document.createElement("LI");
                    var button = document.createElement("BUTTON");
                    listItem.className = "list-group-item";
                    button.className = "btn btn-outline-danger";
                    console.log(change.doc.data());
                    //Name of task
                    var name = change.doc.data().Name;
                    //Name of category
                    var category = change.doc.data().Category;
                    //Due date of task
                    var dueDate = change.doc.data().Due_Date;
                    //Details of task
                    var details = change.doc.data().Details;
                    //Time that task was created
                    var time = change.doc.data().Time_Stamp;
                    listItem.innerHTML = "Name: " + name + "<br>" +"Category: " + category + "<br>" + "Due Date: " + dueDate + "<br>" + "Details: " + details + "<br>" + "Time Stamp: " + time.toDate();
                    button.innerHTML = "Delete";
                    $(button).css("display", "none");
                    $(button).on("click", function() {
                        //Button that deletes list item and doc data from collection
                        $(this).parent().remove();
                        db.collection("users").doc(user.uid).collection("tasks").doc(docName).delete();
                    });
                    listItem.append(button);
                    var clicked = false;
                    $(listItem).on("click", function() {
                        //Shows delete button on click
                        if (!clicked) {
                            $(button).css("display","block");
                            clicked = true;
                        }
                        else{
                            $(button).css("display","none");
                            clicked = false;
                        }
                    });
                    var ele = document.getElementsByClassName("list-group");
                    //Adds task to list
                    for (var x = 0; x < ele.length; x++) {
                        ele[x].append(listItem);
                    }
                }
                //When item gets added to list
                if (change.type == "modified") {
                    //Creates list item with all of the new doc fields and delete button
                    //Adds it to the list of the html
                    var docName = change.doc.id;
                    var listItem = document.createElement("LI");
                    var button = document.createElement("BUTTON");
                    listItem.className = "list-group-item";
                    button.className = "btn btn-outline-danger";
                    console.log(change.doc.data());
                    //Name of task
                    var name = change.doc.data().Name;
                    //Name of category
                    var category = change.doc.data().Category;
                    //Due date of task
                    var dueDate = change.doc.data().Due_Date;
                    //Details of task
                    var details = change.doc.data().Details;
                    //Time that task was created
                    var time = change.doc.data().Time_Stamp;
                    listItem.innerHTML = "Name: " + name + "<br>" +"Category: " + category + "<br>" + "Due Date: " + dueDate + "<br>" + "Details: " + details + "<br>" + "Time Stamp: " + time.toDate();
                    button.innerHTML = "Delete";
                    $(button).css("display", "none");
                    $(button).on("click", function() {
                        //Button to delete task from list
                        $(this).parent().remove();
                        db.collection("users").doc(user.uid).collection("tasks").doc(docName).delete();
                    });
                    listItem.append(button);
                    var clicked = false;
                    $(listItem).on("click", function() {
                        //Shows delete button on click
                        if (!clicked) {
                            $(button).css("display","block");
                            clicked = true;
                        }
                        else{
                            $(button).css("display","none");
                            clicked = false;
                        }
                    });
                    var ele = document.getElementsByClassName("list-group");
                    //Adds list item to end ofl ist
                    ele[ele.length-1].append(listItem);
                }
                //When item gets deleted from firestore
                if (change.type == "removed") {
                    console.log("Document Removed");
                }
            });
        });
    });
}