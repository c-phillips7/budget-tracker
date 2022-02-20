let db;
const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function(evt) {
    const db = evt.target.result;
    db.createObjectStore('new_budget', { autoIncrament: true });
};

request.onsuccess = function(evt) {

    db = evt.target.result;

    // check if app is online, and if yes then run function to store local data to db
    if (navigator.onLine) {
        uploadBudget()
    }
};

function saveBudget() {

}

function uploadBudget() {
    
}