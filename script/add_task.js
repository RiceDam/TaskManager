function addTask(name, category, due, task) {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("tasks").get().then(function (querySnapshot) {
            db.collection("users").doc(user.uid).collection("tasks").doc().set({
                "Name": name,
                "Category": category,
                "Due_Date": due,
            });
        });
    });
}