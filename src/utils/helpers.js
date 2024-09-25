function findObjectById(array, id) {
	for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
			return array[i];
		}
	}
	return null; // Return null if object with given id is not found
}
