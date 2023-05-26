function setupTable() {
    const table = document.getElementById('tableEvent')
    apiFetchAllEvents(table)
}

setupTable()

function propulateActualData(table, events) {
    const sortedEvents = events.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
    for (const event of events) {
        const { id, title, startdate, enddate, location, time, description } = event

        const row = table.insertRow()
        row.insertCell(0).innerHTML = id
        row.insertCell(1).innerHTML = title
        row.insertCell(2).innerHTML = startdate
        row.insertCell(3).innerHTML = enddate
        row.insertCell(4).innerHTML = location
        row.insertCell(5).innerHTML = time
        row.insertCell(6).innerHTML = description
    }
}

function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../home/home.html"
}


function apiFetchAllEvents(table) {
    const id = localStorage.getItem("userId");
    axios.get(`http://localhost:8081/attendee/${id}`)
        .then(res => {
            const { data } = res
            propulateActualData(table, data)
        })
        .catch(err => console.log(err))
}



