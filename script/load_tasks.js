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
                    var name = change.doc.data().Name;
                    var category = change.doc.data().Category;
                    var dueDate = change.doc.data().Due_Date;
                    var details = change.doc.data().Details;
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
                    var name = change.doc.data().Name;
                    var category = change.doc.data().Category;
                    var dueDate = change.doc.data().Due_Date;
                    var details = change.doc.data().Details;
                    var time = change.doc.data().Time_Stamp;
                    listItem.innerHTML = "Name: " + name + "<br>" +"Category: " + category + "<br>" + "Due Date: " + dueDate + "<br>" + "Details: " + details + "<br>" + "Time Stamp: " + time.toDate();
                    button.innerHTML = "Delete";
                    $(button).css("display", "none");
                    $(button).on("click", function() {
                        //Function to remove list item from list and doc from collection
                        $(this).parent().remove();
                        db.collection("users").doc(user.uid).collection("tasks").doc(docName).delete();
                    });
                    listItem.append(button);
                    var clicked = false;
                    $(listItem).on("click", function() {
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