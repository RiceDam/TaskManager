function addTask(String name, String category, String due) {
    firebase.auth().onAuthStateChanged(function (user) {
        var count = 0;
        db.collection("users").doc(user.uid).collection("tasks").get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                count += 1;
            });
        });
        var name = "task" + count;
        db.collection("users").doc(user.uid).collection("tasks").doc(name).set({
            "Name": name,
            "Category": category,
            "Due Date": due,
        })
    });
}