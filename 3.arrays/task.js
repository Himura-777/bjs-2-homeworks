function compareArrays(arr1, arr2) {
	return (
		arr1.length === arr2.length &&
		arr1.every((element, i) => element === arr2[i])
	);
}

function getUsersNamesInAgeRange(users, gender) {
	let result = users
		.filter(userGender => userGender.gender === gender)
		.map(userAge => userAge.age)
		.reduce((acc, item, i, arr) => {
			acc += item;
			if (i === arr.length - 1) {
				return acc / arr.length;
			}
			return acc;
		}, 0);
	return result;
}
