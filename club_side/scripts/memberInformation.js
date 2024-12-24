import { memberInformation } from '../data/memberdata.js';

document.addEventListener('DOMContentLoaded', function() {
    // Get the table body element where rows will be inserted
    const tableBody = document.querySelector('#membersInfoTable tbody');

    // Iterate over each member and create a table row
    memberInformation.forEach(memberInformation => {
        const row = document.createElement('tr');

        // Create and append the Member Number cell
        const memberNumberCell = document.createElement('td');
        memberNumberCell.textContent = memberInformation.memberNumber;
        row.appendChild(memberNumberCell);

        // Create and append the First Name cell
        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = memberInformation.firstName;
        row.appendChild(firstNameCell);

        // Create and append the Last Name cell
        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = memberInformation.lastName;
        row.appendChild(lastNameCell);

        // Create and append the Membership Type cell
        const membershipTypeCell = document.createElement('td');
        membershipTypeCell.textContent = memberInformation.membershipType;
        row.appendChild(membershipTypeCell);

        // Create and append the Membership Status cell
        const membershipStatusCell = document.createElement('td');
        membershipStatusCell.textContent = memberInformation.membershipStatus;
        row.appendChild(membershipStatusCell);

        // Create and append the Membership Expiry cell
        const membershipExpiryCell = document.createElement('td');
        membershipExpiryCell.textContent = memberInformation.membershipExpiry;
        row.appendChild(membershipExpiryCell);

        // Create and append the more cell
        const moreCell = document.createElement('td');
        moreCell.classList.add('more-cell'); // Add a class for styling
        
        const moreIcon = document.createElement('img');
        moreIcon.src = './icons/more_vert_24dp_800000_FILL0_wght400_GRAD0_opsz24.svg'; // Update this path to the correct icon path
        //moreIcon.alt = 'More';
        moreIcon.classList.add('more-icon'); // Add a class for styling if needed
        moreIcon.addEventListener('click', () => openFancybox(memberInformation));
        moreCell.appendChild(moreIcon);
        row.appendChild(moreCell);


        // Append the row to the table body
        tableBody.appendChild(row);
    });
});

function openFancybox(memberInformation) {
    document.getElementById('memberNumber').value = memberInformation.memberNumber;
    document.getElementById('firstName').value = memberInformation.firstName;
    document.getElementById('lastName').value = memberInformation.lastName;
    document.getElementById('membershipType').value = memberInformation.membershipType;
    document.getElementById('membershipStatus').value = memberInformation.membershipStatus;
    document.getElementById('membershipExpiry').value = memberInformation.membershipExpiry;
    $.fancybox.open({
        src: '#memberModal',
        type: 'inline'
    });
}

document.getElementById('saveMember').addEventListener('click', () => {
    const memberNumber = document.getElementById('memberNumber').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const membershipType = document.getElementById('membershipType').value;
    const membershipStatus = document.getElementById('membershipStatus').value;
    const membershipExpiry = document.getElementById('membershipExpiry').value;

    // Update the member information in the data array
    const member = memberInformation.find(m => m.memberNumber === memberNumber);
    if (member) {
        member.firstName = firstName;
        member.lastName = lastName;
        member.membershipType = membershipType;
        member.membershipStatus = membershipStatus;
        member.membershipExpiry = membershipExpiry;
    }

    // Close the Fancybox
    $.fancybox.close();

    // Optionally, update the table row with the new information
    // (You can implement this part if needed)
});