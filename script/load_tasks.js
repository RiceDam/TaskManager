function loadTasks() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("tasks").get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                var listItem = document.createElement("LI");
                listItem.className = "list-group-item";
                console.log(doc.data());
                var info = doc.data().Task_1;
                listItem.innerHTML = info;
                var ele = document.getElementsByClassName("list-group");
                for (var x = 0; x < ele.length; x++) {
                    ele[x].append(listItem);
                }
            });
        });
    });
}