export default function(arr, n) {
	let array = [...arr];
	if (array.length < n) {
		return [];
	}
	let recur = ((array, n) => {
		if (--n < 0) {
			return [[]];
		}
		let combinations = [];
		array = array.slice();
		while (array.length - n) {
			let value = array.shift();
			recur(array, n).forEach(combination => {
				combination.unshift(value);
				combinations.push(combination);
			});
		}
		return combinations;
	});
	return recur(array, n);
}
