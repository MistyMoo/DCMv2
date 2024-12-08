import { clubInformation } from "../data/clubInformation.js"; // Import the clubInformation array from the data/clubInformation.js file


// Function to generate the club information HTML
export function showClubInfo(clubId) {

    // find the information related to the club parameter passed to the function
    const club = clubInformation.find((club) => club.clubId === clubId);
    // Initialize an empty string to hold the HTML content
    let clubHtml = "";

    // if the clubid exsists, generate the HTML content
    if(club) {
        //append the HTML content to the clubHtml string
        clubHtml += `
            <div class="club-info">
                <h1>Club Information</h1>
                <h2>${club.clubName}</h2>
                <p><strong>Location:</strong> ${club.clubLocation}</p>
                <p><strong>Email:</strong> ${club.clubEmail ? club.clubEmail : 'No email available'}</p>
                <p><strong>Trial Secretary:</strong> ${club.trialSecretary}</p>
            </div>
        `;
        console.log(`Club id: ` + club.clubId);
    } else {
        // if the clubId does not exist, display a message
        clubHtml = '<p>No club information found.</p>';
    }

    // Set the innerHTML of the element with class 'js-club-info' to the generated clubHtml
    document.querySelector('.js-club-info').innerHTML = clubHtml;

    console.log(clubHtml);
}

// Add event listener to the button
document.getElementById('showClubInfoButton').addEventListener('click', () => {
    const clubId = document.getElementById('clubIdInput').value;
    showClubInfo(clubId);
    showTrialInfo(clubId); // Call showTrialInfo to display trials for the selected club
});

