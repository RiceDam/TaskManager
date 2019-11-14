function addTask(name, category, due) {
    var count = 1;
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("tasks").get().then(function (querySnapshot) {
            querySnapshot.forEach(function(doc) {
                count += 1;
            });
            var name1;
            if (count < 10) {
                name1 = "task0" + count;
            }
            else {
                name1 = "task" + count;
            }
            db.collection("users").doc(user.uid).collection("tasks").doc(name1).set({
                "Name": name,
                "Category": category,
                "Due_Date": due,
            });
        });
    });
}