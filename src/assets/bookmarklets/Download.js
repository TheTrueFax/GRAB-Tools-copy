(() => {
	const params = new URLSearchParams(window.location.search);
	const id = params.get('level');
	if (id) {
		let newUrl = 'https://grabvr.tools/download?level=' + id;
		window.location.href = newUrl;
	}
})();
