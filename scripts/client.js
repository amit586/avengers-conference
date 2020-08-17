const avengersNames = [
	"Thor",
	"Cap",
	"Tony Stark",
	"Black Panther",
	"Black Widow",
	"Hulk",
	"Spider-Man",
];

let randomName =
	avengersNames[Math.floor(Math.random() * avengersNames.length)];

	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb290dXNlciIsImF1dGgiOiJST0xFX1VTRVIsUk9MRV9BRE1JTixST0xFX01PREVSQVRPUiIsImV4cCI6MTU5Nzc0ODA1NX0.rZOt0NHj2wBE1HPPMu3VlR1bqr69GRGnkHjUt2fE4cor3l6LL4GsU2qItqEOuH8H7NlcuMvuwWUp4UOcKU4FcA");
	
	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};
	

let uri = "https://aeronitkkr.herokuapp.com/api/dolby/token";

let access_token;

const main = async () => {
	VoxeetSDK.conference.on("streamAdded", (participant, stream) => {
		if (stream.type === "ScreenShare") return addScreenShareNode(stream);
		addVideoNode(participant, stream);
		addParticipantNode(participant);
	});

	VoxeetSDK.conference.on("streamRemoved", (participant, stream) => {
		if (stream.type === "ScreenShare") return removeScreenShareNode();
		removeVideoNode(participant);
		removeParticipantNode(participant);
	});
	try {
		await fetch(uri, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				access_token = result.access_token;
				console.log(access_token);

				VoxeetSDK.initializeToken(access_token, () => {
					fetch(uri, requestOptions)
						.then((data) => {
							return data.json();
						})
						.then((result) => {
							access_token = result.access_token;
							return access_token;
						})
						.catch((error) => {
							console.log("error occured during callback");
						});
				});
			})
			.catch((error) => console.log("error", error));
		await VoxeetSDK.session.open({ name: randomName });
		initUI();
	} catch (e) {
		alert("Something went wrong : " + e);
	}
};

main();
