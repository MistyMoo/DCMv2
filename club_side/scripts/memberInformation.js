import { memberInformation } from '../data/memberdata.js';

document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#membersInfoTable tbody');

    // Mapping of field names to readable labels
    const fieldLabels = {
        memberNumber: "Member Number",
        firstName: "First Name",
        lastName: "Last Name",
        address1: "Address 1",
        address2: "Address 2",
        citySuburb: "City/Suburb",
        state: "State",
        postcode: "Postcode",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        emergencyContact: "Emergency Contact",
        emergencyContactPhone: "Emergency Contact Phone",
        dogsNSWrego: "Dogs NSW Registration",
        bbDeliveryMethod: "Border Bark delivery method",
        membershipStatus: "Membership Status",
        membershipType: "Membership Type",
        membershipExpiry: "Membership Expiry",
    
    };
    let memberInformation = JSON.parse(localStorage.getItem('memberInformation')) || [];


    const deliveryMethods = ['Email', 'Post'];
    const membershipType = ['Single','Dual','Family','Junior'];
    const state = ['NSW','VIC','QLD','SA','WA','TAS','NT','ACT'];

    function generateRadioButtons(methods) {
        return methods.map(method => `
            <label>
                <input type="radio" name="deliveryMethod" value="${method}">
                ${method}
            </label>
        `).join('');
    }

    function generateSelectOptions(options, selectedValue) {
        return options.map(option => `
            <option value="${option}" ${option === selectedValue ? 'selected' : ''}>${option}</option>
        `).join('');
    }

    function renderTable() {
        tableBody.innerHTML = '';
        memberInformation.forEach(member => {
            const row = document.createElement('tr');

            const memberNumberCell = document.createElement('td');
            memberNumberCell.textContent = member.memberNumber.value;
            row.appendChild(memberNumberCell);

            const firstNameCell = document.createElement('td');
            firstNameCell.textContent = member.firstName.value;
            row.appendChild(firstNameCell);

            const lastNameCell = document.createElement('td');
            lastNameCell.textContent = member.lastName.value;
            row.appendChild(lastNameCell);

            const membershipTypeCell = document.createElement('td');
            membershipTypeCell.textContent = member.membershipType.value;
            row.appendChild(membershipTypeCell);

            const membershipStatusCell = document.createElement('td');
            membershipStatusCell.textContent = member.membershipStatus.value;
            row.appendChild(membershipStatusCell);

            const membershipExpiryCell = document.createElement('td');
            membershipExpiryCell.textContent = member.membershipExpiry.value;
            row.appendChild(membershipExpiryCell);

            const moreCell = document.createElement('td');
            moreCell.classList.add('more-cell'); // Add a class for styling
        
            const moreIcon = document.createElement('img');
            moreIcon.src = './icons/more_vert_24dp_800000_FILL0_wght400_GRAD0_opsz24.svg'; // Update this path to the correct icon path
            moreIcon.alt = 'More';
            moreIcon.classList.add('more-icon'); // Add a class for styling if needed
            moreIcon.addEventListener('click', () => openFancybox(member));
            moreCell.appendChild(moreIcon);
            row.appendChild(moreCell);

            tableBody.appendChild(row);
            console.log('Table re-rendered with members:', memberInformation);
        });
    }

    function openFancybox(member, isNew = false) {
        // Clear the modal content
        const modalContent = document.getElementById('memberModalContent');
        modalContent.innerHTML = '';

        // Populate the modal with member information
        for (const [key, { value, label }] of Object.entries(member)) {
            if (key === 'bbDeliveryMethod') {
                // Insert the delivery method radio buttons in place of the input box and label
                const deliveryMethodContainer = document.createElement('div');
                deliveryMethodContainer.classList.add('radio-buttons');
                deliveryMethodContainer.innerHTML = `
                    <label>${label}</label>
                    <div class="radio-group">
                    ${generateRadioButtons(deliveryMethods)}
                    </div>
                `;
                modalContent.appendChild(deliveryMethodContainer);
            } else {
                const formGroup = document.createElement('div');
                formGroup.classList.add('form-group');
                
                const labelElement = document.createElement('label');
                labelElement.textContent = label;
                formGroup.appendChild(labelElement);

                
                if (key === 'membershipType') {
                    const select = document.createElement('select');
                    select.id = key;
                    select.innerHTML = generateSelectOptions(membershipType, value);
                    formGroup.appendChild(select);
                } else {

                if (key === 'state') {
                    const select = document.createElement('select');
                    select.id = key;
                    select.innerHTML = generateSelectOptions(state, value);
                    formGroup.appendChild(select);
                } else {
                
                const input = document.createElement('input');
                input.type = 'text';
                input.id = key;
                input.value = value;
                input.readOnly = key === 'memberNumber' && !isNew; // Make member number read-only if not new
                formGroup.appendChild(input);

            }}
            modalContent.appendChild(formGroup);
        }
    }

        // Add the save button
        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.id = 'saveMember';
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => saveMember(isNew));
        modalContent.appendChild(saveButton);

        $.fancybox.open({
            src: '#memberModal',
            type: 'inline'
        });
    }

    function saveMember(isNew) {
        const memberNumber = document.getElementById('memberNumber').value;

        if (isNew) {
            const newMember = {};
            for (const key in fieldLabels) {
                const input = document.getElementById(key);
                if (input) {
                    newMember[key] = {
                        value: input.value,
                        label: fieldLabels[key]
                    };
                }
            }
            // Add the selected delivery method
            const selectedDeliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
            if (selectedDeliveryMethod) {
                newMember['borderBarkDeliveryMethod'] = {
                    value: selectedDeliveryMethod.value,
                    label: fieldLabels['borderBarkDeliveryMethod']
                };
            }
            memberInformation.push(newMember);
        } else {
            const member = memberInformation.find(m => m.memberNumber.value === memberNumber);
            if (member) {
                for (const key in member) {
                    if (key !== 'memberNumber') {
                        const input = document.getElementById(key);
                        if (input) {
                            member[key].value = input.value;
                        }
                    }
                }
                // Update the selected delivery method
                const selectedDeliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
                if (selectedDeliveryMethod) {
                    member['borderBarkDeliveryMethod'].value = selectedDeliveryMethod.value;
                }
            }
        }

        // Save to localStorage
        localStorage.setItem('memberInformation', JSON.stringify(memberInformation));


        // Close the Fancybox
        $.fancybox.close();

        // Re-render the table
        renderTable();
    }

    function generateNewMemberNumber() {
        const maxMemberNumber = memberInformation.reduce((max, member) => {
            const memberNumber = parseInt(member.memberNumber.value, 10);
            return memberNumber > max ? memberNumber : max;
        }, 0);
        return (maxMemberNumber + 1).toString().padStart(3, '0'); // Pad with leading zeros if needed
    }

    function getNext30June() {
        const today = new Date();
        const year = today.getMonth() > 5 ? today.getFullYear() + 1 : today.getFullYear();
        const next30June = new Date(year, 5, 30, 12, 0, 0); // Set time to noon to avoid time zone issues
        const day = String(next30June.getDate()).padStart(2, '0');
        const month = String(next30June.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }

    document.getElementById('addMemberButton').addEventListener('click', () => {
        const newMember = {};
        for (const key in fieldLabels) {
            newMember[key] = {
                value: key === 'memberNumber' ? generateNewMemberNumber() : '',
                label: fieldLabels[key]
            };
        }
        newMember['membershipStatus'] = {
            value: 'Pending',
            label: 'Membership Status'
        };

        newMember['membershipExpiry'] = {
            value: getNext30June(),
            label: 'Membership Expiry Date'
        };
        openFancybox(newMember, true);
    });



    // Initial render of the table
    renderTable();
});