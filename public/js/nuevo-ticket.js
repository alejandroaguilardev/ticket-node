// Referencias del HTML
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const button = document.querySelector("button");

const socket = io();

socket.on("connect", (id) => {
	button.style.disabled = false;
    button.style.opacity = 1;
	button.style.cursor = "pointer";
});

socket.on("disconnect", () => {
	button.style.disabled = true;
	button.style.opacity = .5;
	button.style.cursor = "not-allowed";
});

socket.on("last-ticket", (id) => {
    lblNuevoTicket.innerHTML = 'Ticket: '+id;
});


button.addEventListener("click", () => {
	socket.emit("next-ticket", null, (id) => {
		lblNuevoTicket.innerHTML = "Ticket: " + id;
	});
});
