document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const civilId = document.getElementById('civilId').value;
    const phone = document.getElementById('phone').value;
    
    addPatient(name, civilId, phone);
    document.getElementById('patientForm').reset();
});

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const civilId = document.getElementById('appointmentCivilId').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('appointmentNotes').value;
    
    scheduleAppointment(civilId, date, time, notes);
    document.getElementById('appointmentForm').reset();
});

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const civilId = document.getElementById('searchCivilId').value;
    
    searchPatient(civilId);
});

function addPatient(name, civilId, phone) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push({ name, civilId, phone });
    localStorage.setItem('patients', JSON.stringify(patients));
    loadPatients();
}

function scheduleAppointment(civilId, date, time, notes) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push({ civilId, date, time, notes });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments();
}

function searchPatient(civilId) {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const patient = patients.find(p => p.civilId === civilId);
    
    if (patient) {
        document.getElementById('patientProfile').innerHTML = `
            <h3>Patient Profile</h3>
            <p>Name: ${patient.name}</p>
            <p>Civil ID: ${patient.civilId}</p>
            <p>Phone Number: ${patient.phone}</p>
            <a href="patient-info.html?id=${patient.civilId}">View Details and Notes</a>
        `;
    } else {
        document.getElementById('patientProfile').innerHTML = '<p>Patient not found.</p>';
    }
}

function loadPatients() {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const table = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    
    patients.forEach(patient => {
        const newRow = table.insertRow();
        
        const nameCell = newRow.insertCell(0);
        const civilIdCell = newRow.insertCell(1);
        const phoneCell = newRow.insertCell(2);
        const actionsCell = newRow.insertCell(3);
        
        nameCell.textContent = patient.name;
        civilIdCell.textContent = patient.civilId;
        phoneCell.textContent = patient.phone;
        
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Profile';
        viewButton.addEventListener('click', function() {
            window.location.href = `patient-info.html?id=${patient.civilId}`;
        });
        actionsCell.appendChild(viewButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deletePatient(patient.civilId);
        });
        actionsCell.appendChild(deleteButton);
    });
}

function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const table = document.getElementById('appointmentTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';
    
    appointments.forEach(appointment => {
        const newRow = table.insertRow();
        
        const civilIdCell = newRow.insertCell(0);
        const dateCell = newRow.insertCell(1);
        const timeCell = newRow.insertCell(2);
        const notesCell = newRow.insertCell(3);
        const actionsCell = newRow.insertCell(4);
        
        civilIdCell.textContent = appointment.civilId;
        dateCell.textContent = appointment.date;
        timeCell.textContent = appointment.time;
        notesCell.textContent = appointment.notes;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteAppointment(appointment.civilId, appointment.date, appointment.time);
        });
        actionsCell.appendChild(deleteButton);
    });
}

function deletePatient(civilId) {
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients = patients.filter(p => p.civilId !== civilId);
    localStorage.setItem('patients', JSON.stringify(patients));
    loadPatients();
}

function deleteAppointment(civilId, date, time) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments = appointments.filter(a => a.civilId !== civilId || a.date !== date || a.time !== time);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments();
}

document.addEventListener('DOMContentLoaded', function() {
    loadPatients();
    loadAppointments();
});
