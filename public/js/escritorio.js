const lblDesk = document.querySelector("h1");
const lblPendientes = document.querySelector("#lblPendientes");
const button = document.querySelector("button");
const small = document.querySelector("small");
const lblAlert = document.querySelector("#alert");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
	window.location = "index.html";
	throw new Error("El escritorio es obligatorio");
}

const desk = searchParams.get("desk");
lblDesk.innerHTML = "Escritorio: " + desk;

const socket = io();

socket.on("connect", () => {
	button.style.disabled = false;
	button.style.opacity = 1;
	button.style.cursor = "pointer";
});

socket.on("disconnect", () => {
	button.style.disabled = true;
	button.style.opacity = 0.5;
	button.style.cursor = "not-allowed";
});

socket.on("cola", (cola) => {
	lblPendientes.innerHTML = cola ? cola : 0;
});

button.addEventListener("click", () => {
	socket.emit("attend-ticket", { desk }, (payload) => {
		if (payload.ok) {
			lblAlert.style.display = "none";
			return (small.innerHTML = payload.ticket.number);
		}
		lblAlert.style.display = "";
		lblAlert.innerHTML = payload.msg;
		small.innerHTML = "...";
	});
});
