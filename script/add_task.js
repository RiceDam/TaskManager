function addTask(name, category, due) {
    //If user is authenticated
    firebase.auth().onAuthStateChanged(function (user) {
        //Accesses tasks collection
        db.collection("users").doc(user.uid).collection("tasks").get().then(function (querySnapshot) {
            //Add tasks with fields to database
            db.collection("users").doc(user.uid).collection("tasks").doc(name).set({
                "Name": name,
                "Category": category,
                "Due_Date": due,
                "Time_Stamp": new Date(),
            });
        });
    });
}