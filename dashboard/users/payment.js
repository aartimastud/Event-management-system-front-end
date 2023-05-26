// document.querySelector('.card-number-input').oninput = () =>{
//     document.querySelector('.card-number-box').innerText = document.querySelector('.card-number-input').value;
// }
//
// document.querySelector('.card-holder-input').oninput = () =>{
//     document.querySelector('.card-holder-name').innerText = document.querySelector('.card-holder-input').value;
// }
//
// document.querySelector('.month-input').oninput = () =>{
//     document.querySelector('.exp-month').innerText = document.querySelector('.month-input').value;
// }
//
// document.querySelector('.year-input').oninput = () =>{
//     document.querySelector('.exp-year').innerText = document.querySelector('.year-input').value;
// }
//
// document.querySelector('.cvv-input').onmouseenter = () =>{
//     document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
//     document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
// }
//
// document.querySelector('.cvv-input').onmouseleave = () =>{
//     document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
//     document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
// }
//
// document.querySelector('.cvv-input').oninput = () =>{
//     document.querySelector('.cvv-box').innerText = document.querySelector('.cvv-input').value;
// }

document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    submitPayment();
});

function submitPayment() {
    var cardNumber = document.getElementById("cardNumber").value;
    var expirationDate = document.getElementById("expirationDate").value;
    var cvv = document.getElementById("cvv").value;

    var paymentData = {
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv
    };

    fetch('http://localhost:8081/payment/processPayment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Payment Successful");
            } else {
                alert("Payment Failed");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred during payment processing");
        });
}