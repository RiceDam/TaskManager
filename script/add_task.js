// Create Function to add task to database
function addTask(name, category, due, details) {
    //name: name of task
    //category: category of task
    //due: the due date of task
    //details: extra details of task
    //If user is authenticated
    firebase.auth().onAuthStateChanged(function (user) {
        //Accesses tasks collection
        db.collection("users").doc(user.uid).collection("tasks").get().then(function (querySnapshot) {
            //Add tasks with fields to database
            db.collection("users").doc(user.uid).collection("tasks").doc(name).set({
                "Name": name,
                "Category": category,
                "Due_Date": due,
                "Details": details,
                "Time_Stamp": new Date(),
            });
        });
    });
}