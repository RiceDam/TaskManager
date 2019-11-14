function loadTasks() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("tasks").onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var listItem = document.createElement("LI");
                listItem.className = "list-group-item";
                console.log(doc.data());
                var name = doc.data().Name;
                var category = doc.data().Category;
                var dueDate = doc.data().Due_Date;
                listItem.innerHTML = "Name: " + name + "<br>" +"Category: " + category + "<br>" + "Due Date: " + dueDate;
                var ele = document.getElementsByClassName("list-group");
                for (var x = 0; x < ele.length; x++) {
                    ele[x].append(listItem);
                }
            });
        });
    });
}