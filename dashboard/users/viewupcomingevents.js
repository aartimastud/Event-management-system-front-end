const validateForm = ({ location }) => {

    if (location.length <= 0) return { msg: 'Enter location to search', sts: false }

    return { sts: 'success', msg: 'all fields are valid' }
}

function setupTable() {

    const table = document.getElementById('tableEvent')

    const btnSearch = document.getElementById('btnSearch')

    btnSearch.onclick = () => {

        apiFetchAllLocationEvents(table, document.getElementById('location').value)
    }

    apiFetchAllEvents(table)
}

setupTable()

function setupTable2() {
    const table = document.getElementById('tableEvent');
    const btnSearch = document.getElementById('btnSearch2');

    btnSearch.onclick = () => {
        const title = document.getElementById('title').value;
        apiFetchAllNameEvent(table, title);
    };

    apiFetchAllEvents(table);
}

setupTable2();
function populateActualData(table, events) {
    const sortedEvents = events.sort((a, b) => new Date(a.startdate) - new Date(b.startdate));
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    for (const event of events) {
        const { id, title, startdate, enddate, location, time } = event;
        const viewPageUrl = `./viewevent.html?id=${id}`;

        const row = table.insertRow();
        row.insertCell(0).innerHTML = id;
        row.insertCell(1).innerHTML = title;
        row.insertCell(2).innerHTML = startdate;
        row.insertCell(3).innerHTML = enddate;
        row.insertCell(4).innerHTML = location;
        row.insertCell(5).innerHTML = time;

        const slotBookingCell = row.insertCell(6);
        const slotBookingButton = document.createElement('button');
        slotBookingButton.className = 'btn btn-primary slot-booking-button';
        slotBookingButton.textContent = 'Slot Booking';
        slotBookingButton.style.color = '#ffffff';
        slotBookingButton.style.textDecoration = 'none';
        slotBookingButton.style.marginLeft = '0px';
        slotBookingButton.addEventListener('click', () => {
            window.location.href = viewPageUrl;
        });
        slotBookingCell.appendChild(slotBookingButton);
    }
}


function apiFetchAllEvents(table) {

    axios.get('http://localhost:8081/admin/events')
        .then(res => {
            const { data } = res
            populateActualData(table, data)
        })
        .catch(err => console.log(err))
}

function apiFetchAllLocationEvents(table, location) {
    const url = 'http://localhost:8081/attendee/events';
    axios
        .get(url, {
            params: {
                location: location
            }
        })
        .then(res => {
            const { data } = res;
            populateActualData(table, data);
        })
        .catch(err => console.log(err));
}

function apiFetchAllNameEvent(table, title) {
    const url = 'http://localhost:8081/attendee/event';
    axios
        .get(url, {
            params: {
                title: title
            }
        })
        .then(res => {
            const { data } = res;
            populateActualData(table, data);
        })
        .catch(err => console.log(err));
}
function logOut() {
    localStorage.setItem("userId", null)
    window.location.href = "../../home/home.html"
}




