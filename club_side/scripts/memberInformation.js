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
        moreCell.appendChild(moreIcon);
        row.appendChild(moreCell);


        // Append the row to the table body
        tableBody.appendChild(row);
    });
});