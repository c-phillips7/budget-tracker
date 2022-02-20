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

request.onerror = function(evt) {
    console.log(evt.target.errorCode);
}

function saveBudget(record) {
    const transaction = db.transaction(['new_budget'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_budget');
    // add record to indexedDB store
    budgetObjectStore.add(record);
}

function uploadBudget() {
    const transaction = db.transaction(['new_budget'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_budget');
    const getAll = budgetObjectStore.getAll();

    getAll.onsuccess = function() {
        // if there is data in sore, send it to api
    }
}