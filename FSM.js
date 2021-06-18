function FSM(pattern, source) {
	let n = 0;
	let states = pattern.split('');
	const statesMap = []
	const result = [];
	states.forEach((item, index) => {
		eval((function () {
			return `statesMap.push(function (c) {
				++n;
				${
					item === pattern[pattern.length - 1] ?
						`
							if (c === '${pattern[pattern.length - 1]}') {
								console.log(n)
								result.push(n)
							}
							${
								((pattern.length - 1) % 1 === 0 &&
								pattern.substring(0, (pattern.length - 1) / 2) === pattern.substring((pattern.length - 1) / 2, pattern.length - 1)) ?
									`return statesMap[${index - 1}]` :
									''
							}
						` :
						`if (c === '${item}') {
							return statesMap[${index + 1}]
						}`
				}
				return statesMap[0]
			})`
		})());
	});

	let state = statesMap[0];
	for (let i = 0; i < source.length; i++) {
		state = state(source[i])
	}
	return result;
}
