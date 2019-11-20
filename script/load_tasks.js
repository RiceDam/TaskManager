function loadTasks() {
    firebase.auth().onAuthStateChanged(function(user) {
        db.collection("users").doc(user.uid).collection("tasks").orderBy("Time_Stamp").onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {
                if (change.type == "added") {
                    var docName = change.doc.id;
                    var listItem = document.createElement("LI");
                    var button = document.createElement("BUTTON");
                    listItem.className = "list-group-item";
                    button.className = "btn btn-outline-danger";
                    console.log(change.doc.data());
                    var name = change.doc.data().Name;
                    var category = change.doc.data().Category;
                    var dueDate = change.doc.data().Due_Date;
                    var time = change.doc.data().Time_Stamp;
                    listItem.innerHTML = "Name: " + name + "<br>" +"Category: " + category + "<br>" + "Due Date: " + dueDate + "<br>" + "Time Stamp: " + time.toDate();
                    button.innerHTML = "Delete";
                    $(button).css("display", "none");
                    $(button).on("click", function() {
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
                if (change.type == "modified") {
                    var docName = change.doc.id;
                    var listItem = document.createElement("LI");
                    var button = document.createElement("BUTTON");
                    listItem.className = "list-group-item";
                    button.className = "btn btn-outline-danger";
                    console.log(change.doc.data());
                    var name = change.doc.data().Name;
                    var category = change.doc.data().Category;
                    var dueDate = change.doc.data().Due_Date;
                    var time = change.doc.data().Time_Stamp;
                    listItem.innerHTML = "Name: " + name + "<br>" +"Category: " + category + "<br>" + "Due Date: " + dueDate + "<br>" + "Time Stamp: " + time.toDate();
                    button.innerHTML = "Delete";
                    $(button).css("display", "none");
                    $(button).on("click", function() {
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
                if (change.type == "removed") {
                    console.log("Document Removed");
                }
            });
        });
    });
}