// CONTACT

let contactMessage = [];
const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    // EmailJS API 
    const serviceID = 'default_service';
    const templateID = 'template_313kwoq';


    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Send Email';
        let fromName = document.getElementById("from_name").value;
        let emailId = document.getElementById("email_id").value;
        let message = document.getElementById("message").value;
    
        if (fromName && emailId && message) {
            let newMessage = {
                fromName: fromName,
                emailId: emailId,
                message: message
            };
    
            contactMessage.push(newMessage);
    
            localStorage.setItem("contactMessage", JSON.stringify(contactMessage));
    
            document.getElementById('form').reset();

            toastifyNotifications('The email has been sent!', 'rgb(65, 155, 65)');
        }
    
    }, (err) => {
        btn.value = 'Send Email';
        toastifyNotifications('Failed to send email!', 'tomato');
        console.log(JSON.stringify(err));
    });
});

// Library Toastify Notifications
const toastifyNotifications = (message, backgroundColor) => {
    Toastify({
        text: message,
        className: "info",
        style: {
            background: backgroundColor,
            borderRadius: "4px"
        }
    }).showToast();
}

///////////////////////////////////////////////////////////////////////////////
/* const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_313kwoq';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
}); */